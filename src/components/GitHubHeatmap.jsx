import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

async function fetchContributionCalendar({ username, token }) {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                color
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error("Missing contributionCalendar in response");
  return cal;
}

export default function GitHubHeatmap() {
  const username = process.env.REACT_APP_GITHUB_USERNAME;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const envStatus = useMemo(() => {
    const hasUsername = Boolean(username && String(username).trim());
    const hasToken = Boolean(token && String(token).trim());
    return { hasUsername, hasToken };
  }, [username, token]);

  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    if (!username || !token) {
      setState({ status: "missing_env", data: null, error: null });
      return undefined;
    }

    setState({ status: "loading", data: null, error: null });

    fetchContributionCalendar({ username, token })
      .then((data) => {
        if (cancelled) return;
        setState({ status: "success", data, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: "error", data: null, error: String(err?.message || err) });
      });

    return () => {
      cancelled = true;
    };
  }, [username, token]);

  const weeks = useMemo(() => state.data?.weeks ?? [], [state.data]);

  const { maxCount } = useMemo(() => {
    let max = 0;
    for (const w of weeks) {
      for (const d of w.contributionDays) {
        if (d.contributionCount > max) max = d.contributionCount;
      }
    }
    return { maxCount: max };
  }, [weeks]);

  const [tooltip, setTooltip] = useState(null); // { x, y, date, count, color }
  const hideTimer = useRef(null);

  const handleCellEnter = (e, day) => {
    clearTimeout(hideTimer.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      date: day.date,
      count: day.contributionCount,
      color: day.contributionCount === 0 ? "#1f242c" : day.color,
    });
  };

  const handleCellLeave = () => {
    hideTimer.current = setTimeout(() => setTooltip(null), 120);
  };

  if (state.status === "missing_env") {
    return (
      <div className="card cardWide cardSlim">
        <div className="cardTop">
          <div>
            <h3 className="cardTitle">GitHub Heatmap</h3>
            <p className="cardSub">
              Set <span className="chip">REACT_APP_GITHUB_USERNAME</span> and{" "}
              <span className="chip">REACT_APP_GITHUB_TOKEN</span> in your .env to
              enable.
            </p>
            <p className="cardSub">
              Detected:
              <span className="chip" style={{ marginLeft: 8 }}>
                username: {envStatus.hasUsername ? "set" : "missing"}
              </span>
              <span className="chip" style={{ marginLeft: 8 }}>
                token: {envStatus.hasToken ? "set" : "missing"}
              </span>
            </p>
            <p className="cardSub">
              After editing <span className="chip">.env</span>, restart the dev server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className="card cardWide cardSlim">
        <div className="cardTop">
          <div>
            <h3 className="cardTitle">GitHub Heatmap</h3>
            <p className="cardSub">Loading contributions…</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="card cardWide cardSlim">
        <div className="cardTop">
          <div>
            <h3 className="cardTitle">GitHub Heatmap</h3>
            <p className="cardSub">{state.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card cardWide">
      <div className="cardTop">
        <div>
          <h3 className="cardTitle">GitHub</h3>
          <p className="cardSub">
            {state.data.totalContributions} contributions in the last year
          </p>
        </div>
        <div className="sectionHint">@{username}</div>
      </div>

      <div className="heatmapWrap" aria-label="GitHub contributions heatmap" style={{ "--weeks": weeks.length }}>
        <div className="heatmapGrid" role="grid" aria-label="GitHub contributions heatmap">
          {weeks.map((week, weekIndex) =>
            week.contributionDays.map((day) => {
              const label = `${day.date}: ${day.contributionCount} contributions`;
              return (
                <div
                  key={day.date}
                  role="gridcell"
                  className="heatmapCell"
                  aria-label={label}
                  onMouseEnter={(e) => handleCellEnter(e, day)}
                  onMouseLeave={handleCellLeave}
                  style={{
                    backgroundColor: day.contributionCount === 0 ? "#1f242c" : day.color,
                    gridColumnStart: weekIndex + 1,
                    gridRowStart: day.weekday + 1,
                  }}
                  data-count={day.contributionCount}
                  data-max={maxCount}
                />
              );
            })
          )}
        </div>
      </div>

      {tooltip && createPortal(
        <div
          className="heatmapTooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span className="heatmapTooltipDot" style={{ background: tooltip.color }} />
          <div className="heatmapTooltipBody">
            <span className="heatmapTooltipCount">
              {tooltip.count === 0 ? "No contributions" : `${tooltip.count} contribution${tooltip.count !== 1 ? "s" : ""}`}
            </span>
            <span className="heatmapTooltipDate">
              {new Date(tooltip.date + "T00:00:00").toLocaleDateString("en", {
                weekday: "short", month: "short", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
        </div>,
        document.body
      )}

      <div className="heatmapMeta">
        <div className="heatmapLegend">
          <span className="sectionHint">Less</span>
          <span className="heatmapSwatch" style={{ background: "#161b22" }} />
          <span className="heatmapSwatch" style={{ background: "#0e4429" }} />
          <span className="heatmapSwatch" style={{ background: "#006d32" }} />
          <span className="heatmapSwatch" style={{ background: "#26a641" }} />
          <span className="heatmapSwatch" style={{ background: "#39d353" }} />
          <span className="sectionHint">More</span>
        </div>
      </div>
    </div>
  );
}
