import { useState } from "react";

const groups = [
  {
    name: "Frontend",
    emoji: "🎨",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 4h18v2H3zM3 18h18v2H3zM3 9h18v6H3z" />
      </svg>
    ),
    items: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Material-UI",
      "Zustand",
      "Framer Motion",
    ],
    gradient: "from-blue-500 to-sky-500",
    color: "blue",
    proficiency: 90,
  },
  {
    name: "Backend",
    emoji: "⚙️",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 5h16v6H4zM4 13h16v6H4z" />
      </svg>
    ),
    items: [
      "Spring Boot",
      "Django",
      "FastAPI",
      "Python",
      "Java",
      "Uvicorn",
      "Pydantic",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "OpenAPI",
    ],
    gradient: "from-emerald-500 to-teal-500",
    color: "emerald",
    proficiency: 85,
  },
  {
    name: "DevOps & Cloud",
    emoji: "☁️",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 7a6 6 0 1111.31 2.5A4.5 4.5 0 1117.5 19H7a5 5 0 01-1-9.9V9a2 2 0 010-2z" />
      </svg>
    ),
    items: [
      "Docker",
      "Nginx",
      "AWS EC2",
      "AWS S3",
      "Fly.io",
      "Vercel",
    ],
    gradient: "from-amber-500 to-orange-500",
    color: "amber",
    proficiency: 80,
  },
  {
    name: "AI & Data",
    emoji: "🤖",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
    items: [
      "OpenAI",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "RAGAS",
    ],
    gradient: "from-slate-500 to-gray-500",
    color: "slate",
    proficiency: 70,
  },
  {
    name: "Collaboration Tools",
    emoji: "💬",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    items: ["Notion", "Slack", "Figma", "Jira"],
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
    proficiency: 80,
  },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            기술 스택
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            분야별로 그룹화된 기술들입니다. 각 태그는 실제 프로젝트에서 사용한
            경험을 반영합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((g, idx) => (
            <div
              key={g.name}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredGroup(idx)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div
                className={`relative h-full rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:shadow-xl ${
                  hoveredGroup === idx ? "transform -translate-y-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 dark:bg-white shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl">{g.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                      {g.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {g.items.length} technologies
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.items.map((t, itemIdx) => (
                    <button
                      key={t}
                      onClick={() =>
                        setSelectedSkill(selectedSkill === t ? null : t)
                      }
                      className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 ${
                        selectedSkill === t
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                      style={{ animationDelay: `${itemIdx * 0.05}s` }}
                    >
                      <span className="relative z-10">{t}</span>
                      {selectedSkill === t && (
                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>

                {/* 프로그레스 바: 그룹별 개별 수치로 변경 */}
                <div className="mt-5 pt-5 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {g.proficiency}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width:
                          hoveredGroup === idx ? `${g.proficiency}%` : "0%",
                      }}
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="transform scale-150">{g.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 선택된 스킬 표시 */}
        {selectedSkill && (
          <div className="mt-12 text-center animate-scale-in">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 shadow-xl">
              <p className="text-base md:text-lg font-bold">
                <span className="text-gray-600 dark:text-gray-400">
                  선택한 기술:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {selectedSkill}
                </span>
              </p>
              <button
                onClick={() => setSelectedSkill(null)}
                className="ml-2 w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
              >
                <span className="text-red-600 dark:text-red-400 text-sm">
                  ✕
                </span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
