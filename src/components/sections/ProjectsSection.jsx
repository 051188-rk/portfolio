import Reveal from "../Reveal";
import Section from "../Section";
import {
  FaArrowUpRightFromSquare,
  FaCodeBranch,
  FaGlobe,
  FaLayerGroup,
} from "react-icons/fa6";

export default function ProjectsSection({ projects }) {
  return (
    <Section id="projects" title="Projects" hint="Selected work">
      <div className="grid">
        {projects.map((p, idx) => (
          <Reveal key={p.name} delay={idx * 0.06}>
            <div className="card">
              <div className="cardInner">
                <div className="cardMedia">
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt="" className="cardThumb" />
                  ) : null}
                  {p.logo ? (
                    <div className="cardLogo">
                      <img src={p.logo} alt="" />
                    </div>
                  ) : null}
                </div>

                <div className="cardBody">
                  <div className="cardTop">
                    <h3 className="cardTitle">{p.name}</h3>
                    <div className="projectActions">
                      {p.github ? (
                        <a
                          className="iconLink"
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub"
                          title="GitHub"
                        >
                          <FaCodeBranch />
                        </a>
                      ) : null}
                      {p.live ? (
                        <a
                          className="iconLink"
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Website"
                          title="Website"
                        >
                          <FaGlobe />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="cardSub">{p.desc}</p>
                  <div className="chipRow">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        <FaLayerGroup className="chipIcon" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
