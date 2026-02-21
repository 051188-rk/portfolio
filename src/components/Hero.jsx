import Reveal from "./Reveal";
import {
  FaArrowUpRightFromSquare,
  FaLocationDot,
  FaMoon,
  FaSun,
} from "react-icons/fa6";

export default function Hero({ hero, theme, onToggleTheme }) {
  return (
    <header className="hero">
      <div className="container">
        <Reveal>
          <div className="kicker">Minimal portfolio</div>
          <div className="heroTitleRow">
            {hero.avatar ? (
              <img
                src={hero.avatar}
                alt={hero.name}
                className="avatar"
                draggable={false}
              />
            ) : null}
            <h1 className="title">
              {hero.name} — {hero.role}
            </h1>
          </div>
          <p className="subtitle">{hero.blurb}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="metaRow">
            <div className="pill">
              <FaLocationDot />
              {hero.location}
            </div>
            <button type="button" className="pill" onClick={onToggleTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
              {theme === "light" ? "Dark" : "Light"}
            </button>
            {hero.links.map((l) => (
              <a
                key={l.label}
                className="pill"
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                {l.label}
                <FaArrowUpRightFromSquare />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  );
}
