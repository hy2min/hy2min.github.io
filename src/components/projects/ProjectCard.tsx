import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectCardProps } from '../../lib/adapters/projectAdapter';

export default function ProjectCard({ title, summary, stacks, cover, links, badges, slug, period, teamSize, myRole, organization }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <article
      className="group relative overflow-hidden rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover-lift focus-within:ring-4 focus-within:ring-indigo-400/50 transition-all duration-500"
      tabIndex={-1}
      aria-label={title}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateY(-10px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
    >

      {/* 이미지 섹션 */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={cover}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* 그라데이션 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        

        {/* 배지 */}
        <div className="absolute right-4 top-4 flex flex-wrap gap-2 max-w-[60%] justify-end">
          {badges?.slice(0, 3).map((b, idx) => (
            <span 
              key={b} 
              className="rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 shadow-lg"
            >
              {b}
            </span>
          ))}
        </div>

        {/* 호버 시 나타나는 Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:scale-110 transition-all shadow-xl"
              aria-label={`Open demo for ${title}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:scale-110 transition-all shadow-xl"
              aria-label={`Open repository for ${title}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="p-6 relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
            {title}
          </h3>
          {slug && (
            <Link
              to={`/projects/${slug}`}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:scale-110 transition-all"
              aria-label={`View details for ${title}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
          {summary}
        </p>

        {/* 프로젝트 메타 (기관/기간/인원/역할) */}
        {(organization || period || teamSize || (myRole && myRole.length > 0)) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
            {organization && (
              <span>
                <span className="text-gray-700 dark:text-gray-300">기관</span> {organization}
              </span>
            )}
            {period && (
              <span>
                <span className="text-gray-700 dark:text-gray-300">기간</span> {period}
              </span>
            )}
            {teamSize && (
              <span>
                <span className="text-gray-700 dark:text-gray-300">인원</span> {teamSize}명
              </span>
            )}
            {myRole && myRole.length > 0 && (
              <span className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">역할</span>
                <span className="flex flex-wrap gap-1">
                  {myRole.map((r) => (
                    <span
                      key={r}
                      className={
                        r === 'FE'
                          ? 'px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
                          : r === 'BE'
                            ? 'px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                            : r === 'AI'
                              ? 'px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-200 border border-violet-200 dark:border-violet-800'
                              : 'px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }
                    >
                      {r}
                    </span>
                  ))}
                </span>
              </span>
            )}
          </div>
        )}

        {/* 기술 스택 태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stacks.split(',').slice(0, 4).map((stack, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            >
              {stack.trim()}
            </span>
          ))}
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-105"
              aria-label={`Open demo for ${title}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:border-gray-800 dark:hover:border-gray-200 hover:scale-105 transition-all duration-300"
              aria-label={`Open repository for ${title}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

