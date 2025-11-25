import { useEffect, useState } from "react";
import DarkModeToggle from "../common/DarkModeToggle";

const nav = [
  { href: "#projects", label: "Projects", emoji: "💼" },
  { href: "#about", label: "About", emoji: "🙋‍♂️" },
  { href: "#skills", label: "Skills", emoji: "🛠️" },
  { href: "#contact", label: "Contact", emoji: "📬" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      
      // 현재 스크롤 위치에 따라 활성 섹션 감지
      const sections = nav.map(n => n.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-transparent"
      }`}
      aria-label="Site header"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-20 flex items-center justify-between">
          {/* 로고 */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Home"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 opacity-0 group-hover:opacity-70 blur transition-all duration-300" />
              <div
                className="relative h-10 w-10 rounded-xl flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #3B82F6, #0EA5E9)" }}
              >
                <span className="text-white font-black">H</span>
              </div>
            </div>
            <div>
              <span className="block font-black text-lg text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-600 transition-all">
                Hyemin
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400 font-medium">
                Portfolio
              </span>
            </div>
          </a>

          {/* 네비게이션 - 데스크톱 */}
          <nav
            className="hidden md:flex items-center gap-2"
            aria-label="Primary"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`group relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeSection === n.href
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {activeSection === n.href && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg" />
                )}
                <span className="relative flex items-center gap-2">
                  <span className="text-base group-hover:scale-110 transition-transform inline-block">
                    {n.emoji}
                  </span>
                  {n.label}
                </span>
                {activeSection !== n.href && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </a>
            ))}

            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </nav>

          {/* 모바일 버튼 */}
          <div className="md:hidden flex items-center gap-3">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* 진행 바 */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 dark:bg-gray-700/30">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-300"
            style={{
              width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
            }}
          />
        </div>
      )}
    </header>
  );
}
