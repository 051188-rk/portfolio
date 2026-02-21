import Reveal from "../Reveal";
import Section from "../Section";
import { FaBolt } from "react-icons/fa6";

export default function HackathonsSection({ hackathons }) {
  return (
    <Section id="hackathons" title="Hackathons" hint="Build fast, ship">
      <div className="grid">
        {hackathons.map((h, idx) => (
          <Reveal key={h.name} delay={idx * 0.06}>
            <div className="card">
              <div className="cardInner">
                <div className="cardMedia">
                  {h.thumbnail ? (
                    <img src={h.thumbnail} alt="" className="cardThumb" />
                  ) : null}
                  {h.logo ? (
                    <div className="cardLogo">
                      <img src={h.logo} alt="" />
                    </div>
                  ) : null}
                </div>

                <div className="cardBody">
                  <div className="cardTop">
                    <h3 className="cardTitle">{h.name}</h3>
                    <div className="sectionHint">{h.result}</div>
                  </div>
                  <p className="cardSub">{h.desc}</p>
                  <div className="chipRow">
                    {h.stack.map((s) => (
                      <span key={s} className="chip">
                        <FaBolt className="chipIcon" />
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
