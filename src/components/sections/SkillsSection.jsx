import Reveal from "../Reveal";
import Section from "../Section";
import { FaCode } from "react-icons/fa6";

export default function SkillsSection({ skills }) {
  return (
    <Section id="skills" title="Skills" hint="What I use / know">
      <Reveal>
        <div className="grid">
          {skills.map((group) => (
            <div key={group.title} className="card">
              <div className="cardInner">
                <div className="cardMedia">
                  <div className="cardLogo">
                    <FaCode />
                  </div>
                </div>

                <div className="cardBody">
                  <div className="cardTop">
                    <h3 className="cardTitle">&lt; {group.title} /&gt;</h3>
                  </div>
                  <div className="chipRow">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        <FaCode className="chipIcon" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
