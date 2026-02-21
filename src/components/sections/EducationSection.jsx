import Reveal from "../Reveal";
import Section from "../Section";
import { FaBookOpen } from "react-icons/fa6";

export default function EducationSection({ education }) {
  return (
    <Section id="education" title="Education" hint="Formal learning">
      <div className="grid">
        {education.map((e, idx) => (
          <Reveal key={e.school + e.period} delay={idx * 0.06}>
            <div className="card cardWide">
              <div className="cardInner">
                <div className="cardMedia">
                  {e.logo ? (
                    <div className="cardLogo">
                      <img src={e.logo} alt="" />
                    </div>
                  ) : null}
                </div>

                <div className="cardBody">
                  <div className="cardTop">
                    <div>
                      <h3 className="cardTitle">
                        {e.school} — {e.degree}
                      </h3>
                      <p className="cardSub">
                        <FaBookOpen className="chipIcon" /> {e.note}
                      </p>
                    </div>
                    <div className="sectionHint">{e.period}</div>
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
