import ProjectCard from './projects/ProjectCard.tsx';
import { adaptList } from '../lib/adapters/projectAdapter.ts';
import { projects as legacyProjects } from '../data/projects.ts';

const Projects = () => {
  const cards = adaptList(legacyProjects);

  return (
    <section id="projects" className="relative py-32 px-4 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />

      <div className="relative max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              💼 Portfolio
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI, 풀스택, 실시간 협업 분야의 선별된 작업물들입니다. <br />
            각 프로젝트를 통해 <span className="font-semibold text-gray-900 dark:text-white">문제 해결</span>과 <span className="font-semibold text-gray-900 dark:text-white">기술 구현</span> 능력을 보여줍니다.
          </p>

          {/* 통계 */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { num: cards.length, label: 'Projects' },
              { num: '10+', label: 'Technologies' },
              { num: '2+', label: 'Years' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                  {stat.num}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 프로젝트 카드 그리드 - 모두 동일한 크기 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, idx) => (
            <div 
              key={c.title} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ProjectCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
