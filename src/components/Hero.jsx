import { useEffect, useState } from "react";

const Hero = () => {
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const firstLineText = "API부터 UI까지";
  const secondLineText = "연결하는 개발자";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= firstLineText.length) {
        setFirstLine(firstLineText.slice(0, index));
        index++;
      } else if (index <= firstLineText.length + secondLineText.length) {
        const secondIndex = index - firstLineText.length;
        setSecondLine(secondLineText.slice(0, secondIndex));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      aria-label="Hero section"
    >
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-32 text-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for full-time & freelance
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight text-gray-900 dark:text-white">
            {firstLine}
            {firstLine.length === firstLineText.length && (
              <>
                <br />
                {secondLine}
                {secondLine.length < secondLineText.length && (
                  <span className="inline-block w-1 h-16 md:h-20 ml-2 bg-gray-900 dark:bg-white animate-blink" />
                )}
              </>
            )}
            {firstLine.length < firstLineText.length && (
              <span className="inline-block w-1 h-16 md:h-20 ml-2 bg-gray-900 dark:bg-white animate-blink" />
            )}
          </h1>

          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            빠른 UI, 견고한 API, 실용적인 시스템을 설계합니다.
            <br />
            <span className="font-semibold text-gray-900 dark:text-white">
              API 설계
            </span>
            와{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              실시간 협업
            </span>
            에 집중합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <button
              onClick={() => scrollTo("#projects")}
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              aria-label="View projects"
            >
              <span className="flex items-center gap-2">
                View Projects
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-2xl border-2 border-gray-800 dark:border-gray-200 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-all duration-300 shadow-lg hover:scale-105"
              aria-label="Get in touch"
            >
              <span className="flex items-center gap-2">
                Get in Touch
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
