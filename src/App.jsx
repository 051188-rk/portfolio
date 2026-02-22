import React, { useEffect, useMemo, useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaFolderOpen,
  FaGraduationCap,
  FaTrophy,
} from "react-icons/fa6";

import "./App.css";

import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import GitHubHeatmap from "./components/GitHubHeatmap";
import Hero from "./components/Hero";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import HackathonsSection from "./components/sections/HackathonsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";

import { portfolioData } from "./data/portfolioData";
import { useActiveSection } from "./hooks/useActiveSection";

import Section from "./components/Section";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "light" : "dark"
    );
  }, [theme]);

  const data = useMemo(() => portfolioData, []);

  const sectionIds = useMemo(
    () => [
      "skills",
      "experience",
      "projects",
      "github",
      "hackathons",
      "education",
    ],
    []
  );
  const activeId = useActiveSection(sectionIds);

  const navItems = useMemo(
    () => [
      { id: "skills", label: "Skills", icon: FaCode },
      { id: "experience", label: "Experience", icon: FaBriefcase },
      { id: "projects", label: "Projects", icon: FaFolderOpen },
      { id: "github", label: "GitHub", icon: FaCode },
      { id: "hackathons", label: "Hackathons", icon: FaTrophy },
      { id: "education", label: "Education", icon: FaGraduationCap },
    ],
    []
  );

  return (
    <div className="page">
      <Hero
        hero={data.hero}
        theme={theme}
        onToggleTheme={() =>
          setTheme((t) => (t === "light" ? "dark" : "light"))
        }
      />

      <SkillsSection skills={data.skills} />
      <ExperienceSection experience={data.experience} />
      <ProjectsSection projects={data.projects} />

      <Section id="github" title="GitHub" hint="Contributions">
        <div className="grid">
          <GitHubHeatmap />
        </div>
      </Section>

      <HackathonsSection hackathons={data.hackathons} />
      <EducationSection education={data.education} />

      <Footer name={data.hero.name} />
      <BottomNav items={navItems} activeId={activeId} />
    </div>
  );
}

export default App;
