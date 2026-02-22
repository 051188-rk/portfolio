import avatar from "../assets/ppf1.png";

export const portfolioData = {
  hero: {
    name: "Rakesh",
    role: "Developer",
    location: "Mumbai, India",
    avatar,
    blurb:
      "I build minimal, fast interfaces and ship products that feel calm and precise.",
    links: [
      { label: "Email", href: "mailto:you@example.com" },
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "LeetCode", href: "https://leetcode.com/" },
    ],
  },
  skills: [
    {
      title: "LANGUAGES",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "C",
        "C++",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "FRAMEWORKS / LIBRARIES",
      items: [
        "React",
        "Next.js",
        "Express",
        "Tailwind",
        "TanStack Query",
        "Framer Motion",
        "LangChain",
      ],
    },
    { title: "BACKEND & RUNTIME", items: ["Node.js"] },
    { title: "DATABASE", items: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"] },
    {
      title: "DEVELOPER TOOLS",
      items: ["Git", "GitHub", "Cursor", "n8n", "Vercel", "Postman"],
    },
  ],
  experience: [
    {
      company: "Your Company",
      role: "Front-end Developer",
      period: "2025 — Present",
      location: "Remote",
      points: [
        "Built reusable UI patterns and motion systems.",
        "Improved performance and accessibility across key flows.",
      ],
      thumbnail: null,
      logo: null,
    },
  ],
  projects: [
    {
      name: "Project One",
      desc: "A minimal product with a clean UX and sharp performance.",
      stack: ["React", "Framer Motion"],
      live: "https://example.com",
      github: "https://github.com/",
      thumbnail: null,
      logo: null,
    },
    {
      name: "Project Two",
      desc: "A small tool that solves a real problem elegantly.",
      stack: ["TypeScript", "Node.js"],
      live: "https://example.com",
      github: "https://github.com/",
      thumbnail: null,
      logo: null,
    },
  ],
  hackathons: [
    {
      name: "Hackathon Name",
      result: "Finalist",
      desc: "Built an MVP in 24 hours and shipped the demo end-to-end.",
      stack: ["React", "API"],
      thumbnail: null,
      logo: null,
    },
  ],
  education: [
    {
      school: "Your University",
      degree: "B.Tech / BSc",
      period: "2022 — 2026",
      note: "Relevant coursework: DS&A, DBMS, OS.",
      logo: null,
    },
  ],
};
