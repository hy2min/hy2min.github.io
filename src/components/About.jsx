import { useState } from "react";

const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      title: "About Me",
      emoji: "👨‍💻",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0v1H5v-1z" />
        </svg>
      ),
      bullets: [
        "AI/RAG에 집중하는 풀스택 엔지니어",
        "실시간 협업 도구 구축을 즐김",
        "신뢰성과 UX를 중요시",
      ],
      gradient: "from-blue-500 to-sky-500",
    },
    {
      title: "Core Strengths",
      emoji: "⚡",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
        </svg>
      ),
      bullets: [
        "End-to-end 책임감 (UI → 인프라)",
        "API 설계 + 데이터 모델링",
        "Docker/AWS/Nginx로 DevOps",
      ],
      gradient: "from-slate-500 to-gray-500",
    },
    {
      title: "Achievements",
      emoji: "🏆",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      bullets: [
        "CRDT 기반 라이브 리뷰 도구 구축",
        "AI 기반 글쓰기 플랫폼 출시",
        "AWS에 풀스택 앱 배포",
      ],
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950" />

      <div className="relative max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              About Me
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            나에 대하여
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            빠르게 스캔할 수 있는 핵심 하이라이트입니다.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, idx) => (
            <div
              key={c.title}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* 카드 컨텐츠 */}
              <div
                className={`relative h-full rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 transition-all duration-300 hover:shadow-xl ${
                  activeCard === idx ? "transform -translate-y-2" : ""
                }`}
              >
                {/* 아이콘 */}
                <div className="relative mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 dark:bg-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <span className="text-3xl">{c.emoji}</span>
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
                  {c.title}
                </h3>

                {/* 내용 */}
                <ul className="space-y-3">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* 장식 요소 */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {c.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
              <span className="font-bold text-gray-900 dark:text-white">
                협업
              </span>
              과{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                커뮤니케이션
              </span>
              을 중시하며, 항상{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                새로운 도전
              </span>
              을 찾습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
