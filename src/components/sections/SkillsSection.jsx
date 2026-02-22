import Reveal from "../Reveal";
import Section from "../Section";
import {
  SiC,
  SiCplusplus,
  SiCss3,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiReactquery,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaRobot, FaTerminal, FaWandMagicSparkles } from "react-icons/fa6";

function getSkillIcon(label) {
  const key = String(label).toLowerCase();

  if (key === "javascript") return SiJavascript;
  if (key === "typescript") return SiTypescript;
  if (key === "c") return SiC;
  if (key === "c++" || key === "cplusplus") return SiCplusplus;
  if (key === "html" || key === "html5") return SiHtml5;
  if (key === "css" || key === "css3") return SiCss3;

  if (key === "react") return SiReact;
  if (key === "next.js" || key === "nextjs" || key === "next") return SiNextdotjs;
  if (key === "express" || key === "express.js" || key === "expressjs")
    return SiExpress;
  if (key === "tailwind" || key === "tailwindcss") return SiTailwindcss;
  if (key === "tanstack query" || key === "tanstackquery" || key === "react query")
    return SiReactquery;
  if (key === "framer motion" || key === "framermotion") return SiFramer;

  if (key === "node.js" || key === "nodejs" || key === "node") return SiNodedotjs;
  if (key === "mongodb") return SiMongodb;
  if (key === "postgres" || key === "postgresql") return SiPostgresql;
  if (key === "mysql") return SiMysql;
  if (key === "sqlite" || key === "sqlite3" || key === "sql lite") return SiSqlite;
  if (key === "python") return SiPython;

  if (key === "git") return SiGit;
  if (key === "github") return SiGithub;
  if (key === "vercel") return SiVercel;
  if (key === "postman") return SiPostman;

  if (key === "langchain") return FaWandMagicSparkles;
  if (key === "n8n") return FaRobot;
  if (key === "cursor") return FaTerminal;

  return null;
}

export default function SkillsSection({ skills }) {
  return (
    <Section id="skills" title="Skills" hint="What I use / know">
      <Reveal>
        <div className="grid">
          {skills.map((group) => (
            <div key={group.title} className="card cardSlim">
              <div className="cardTop">
                <h3 className="cardTitle">&lt; {group.title} /&gt;</h3>
              </div>
              <div className="chipRow">
                {group.items.map((item) => {
                  const Icon = getSkillIcon(item);
                  return (
                    <span key={item} className="chip">
                      {Icon ? <Icon className="chipIcon" /> : null}
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
