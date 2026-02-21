import Reveal from "../Reveal";
import Section from "../Section";
import { FaCheck } from "react-icons/fa6";

export default function ExperienceSection({ experience }) {
  return (
    <Section id="experience" title="Experience" hint="Where I’ve worked">
      <div className="grid">
        {experience.map((x, idx) => (
          <Reveal key={x.company + x.period} delay={idx * 0.06}>
            <div className="card cardWide">
              <div className="cardInner">
                <div className="cardMedia">
                  {x.thumbnail ? (
                    <img src={x.thumbnail} alt="" className="cardThumb" />
                  ) : null}
                  {x.logo ? (
                    <div className="cardLogo">
                      <img src={x.logo} alt="" />
                    </div>
                  ) : null}
                </div>

                <div className="cardBody">
                  <div className="cardTop">
                    <div>
                      <h3 className="cardTitle">
                        {x.company} — {x.role}
                      </h3>
                      <p className="cardSub">{x.location}</p>
                    </div>
                    <div className="sectionHint">{x.period}</div>
                  </div>
                  <div className="chipRow">
                    {x.points.map((p) => (
                      <span key={p} className="chip">
                        <FaCheck className="chipIcon" />
                        {p}
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
