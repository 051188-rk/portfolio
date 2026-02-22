import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const API_BASE = "https://alfa-leetcode-api.onrender.com";
const LC_USERNAME = "051188-rk";

// LeetCode brand orange palette (0 → 5 shades)
const LC_COLORS = ["#1f242c", "#3d2b1f", "#7a4520", "#e07b39", "#f0a060", "#ffd700"];

function getColor(count, max) {
    if (count === 0) return LC_COLORS[0];
    const ratio = count / max;
    if (ratio < 0.15) return LC_COLORS[1];
    if (ratio < 0.35) return LC_COLORS[2];
    if (ratio < 0.6) return LC_COLORS[3];
    if (ratio < 0.85) return LC_COLORS[4];
    return LC_COLORS[5];
}

async function fetchCalendar() {
    const res = await fetch(`${API_BASE}/${LC_USERNAME}/calendar`);
    if (!res.ok) throw new Error(`LeetCode API error (${res.status})`);
    const json = await res.json();
    // submissionCalendar is a JSON-stringified object
    const raw = typeof json.submissionCalendar === "string"
        ? JSON.parse(json.submissionCalendar)
        : json.submissionCalendar;

    const totalActiveDays = json.totalActiveDays ?? 0;
    const streak = json.streak ?? 0;

    // Convert { "unix_ts": count } → array of { date, count }
    const entries = Object.entries(raw).map(([ts, count]) => ({
        date: new Date(Number(ts) * 1000),
        count: Number(count),
    }));

    return { entries, totalActiveDays, streak };
}

/** Build a 52-week (364-day) grid ending today */
function buildGrid(entries) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Map date-string → count for O(1) lookup
    const byDate = {};
    for (const { date, count } of entries) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const key = d.toISOString().slice(0, 10);
        byDate[key] = (byDate[key] ?? 0) + count;
    }

    // Find the Sunday on or before 52 weeks ago
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    start.setDate(start.getDate() - start.getDay()); // back to Sunday

    const weeks = [];
    let cur = new Date(start);
    let maxCount = 0;

    while (cur <= today) {
        const week = [];
        for (let d = 0; d < 7; d++) {
            const key = cur.toISOString().slice(0, 10);
            const count = byDate[key] ?? 0;
            if (count > maxCount) maxCount = count;
            week.push({ date: key, count, weekday: cur.getDay() });
            cur.setDate(cur.getDate() + 1);
            if (cur > today) break;
        }
        weeks.push(week);
    }

    return { weeks, maxCount };
}

export default function LeetCodeHeatmap() {
    const [state, setState] = useState({ status: "idle", data: null, error: null });

    useEffect(() => {
        let cancelled = false;
        setState({ status: "loading", data: null, error: null });

        fetchCalendar()
            .then((data) => { if (!cancelled) setState({ status: "success", data, error: null }); })
            .catch((err) => { if (!cancelled) setState({ status: "error", data: null, error: String(err?.message ?? err) }); });

        return () => { cancelled = true; };
    }, []);

    const { weeks, maxCount } = useMemo(() => {
        if (!state.data) return { weeks: [], maxCount: 0 };
        return buildGrid(state.data.entries);
    }, [state.data]);

    // ── Tooltip ────────────────────────────────────────────────
    const [tooltip, setTooltip] = useState(null);
    const hideTimer = useRef(null);

    const handleCellEnter = (e, day, color) => {
        clearTimeout(hideTimer.current);
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({ x: rect.left + rect.width / 2, y: rect.top, date: day.date, count: day.count, color });
    };
    const handleCellLeave = () => {
        hideTimer.current = setTimeout(() => setTooltip(null), 120);
    };

    // ── Render states ─────────────────────────────────────────
    if (state.status === "loading" || state.status === "idle") {
        return (
            <div className="card cardWide cardSlim">
                <div className="cardTop"><div>
                    <h3 className="cardTitle">LeetCode</h3>
                    <p className="cardSub">Loading submissions…</p>
                </div></div>
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="card cardWide cardSlim">
                <div className="cardTop"><div>
                    <h3 className="cardTitle">LeetCode</h3>
                    <p className="cardSub">{state.error}</p>
                </div></div>
            </div>
        );
    }

    const { totalActiveDays, streak } = state.data;

    return (
        <div className="card cardWide">
            <div className="cardTop">
                <div>
                    <h3 className="cardTitle">LeetCode</h3>
                    <p className="cardSub">
                        {totalActiveDays} active days &nbsp;·&nbsp; 🔥 {streak}-day streak
                    </p>
                </div>
                <div className="sectionHint">@{LC_USERNAME}</div>
            </div>

            <div
                className="heatmapWrap"
                aria-label="LeetCode submissions heatmap"
                style={{ "--weeks": weeks.length }}
            >
                <div className="heatmapGrid" role="grid" aria-label="LeetCode submissions heatmap">
                    {weeks.map((week, weekIndex) =>
                        week.map((day) => {
                            const color = getColor(day.count, maxCount);
                            const label = `${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`;
                            return (
                                <div
                                    key={day.date}
                                    role="gridcell"
                                    className="heatmapCell"
                                    aria-label={label}
                                    onMouseEnter={(e) => handleCellEnter(e, day, color)}
                                    onMouseLeave={handleCellLeave}
                                    style={{
                                        backgroundColor: color,
                                        gridColumnStart: weekIndex + 1,
                                        gridRowStart: day.weekday + 1,
                                    }}
                                />
                            );
                        })
                    )}
                </div>
            </div>

            {tooltip && createPortal(
                <div className="heatmapTooltip" style={{ left: tooltip.x, top: tooltip.y }}>
                    <span className="heatmapTooltipDot" style={{ background: tooltip.color }} />
                    <div className="heatmapTooltipBody">
                        <span className="heatmapTooltipCount">
                            {tooltip.count === 0
                                ? "No submissions"
                                : `${tooltip.count} submission${tooltip.count !== 1 ? "s" : ""}`}
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
                    {LC_COLORS.map((c) => (
                        <span key={c} className="heatmapSwatch" style={{ background: c }} />
                    ))}
                    <span className="sectionHint">More</span>
                </div>
            </div>
        </div>
    );
}
