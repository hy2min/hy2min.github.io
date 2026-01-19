import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects as baseProjects } from "../data/projects";

// 기술 스택을 카테고리별로 분류하는 함수
const categorizeTech = (techArray) => {
  const categories = {
    Frontend: [],
    Backend: [],
    "DevOps & Cloud": [],
    "AI & Data": [],
    "Collaboration Tools": [],
  };

  const frontendKeywords = [
    "React", "TypeScript", "Vue.js", "JavaScript", "Vite", "TailwindCSS", "Tailwind",
    "MUI", "Zustand", "Framer Motion", "Axios", "React Router", "i18next",
    "CodeMirror", "tldraw", "Vue", "JSX", "CSS", "HTML"
  ];

  const backendKeywords = [
    "Java", "Spring Boot", "Spring", "Python", "Django", "FastAPI", "PostgreSQL",
    "MySQL", "Redis", "OpenAPI", "Spring AOP", "AspectJ", "Spring WebSocket",
    "Springwolf", "SpringDoc", "DataFaker", "OpenTelemetry", "Gradle", "YAML",
    "Uvicorn", "Pydantic", "Pydantic"
  ];

  const devopsKeywords = [
    "Docker", "docker-compose", "Nginx", "AWS EC2", "AWS S3", "EC2", "S3",
    "GitHub Actions", "Vercel", "Fly.io", "CI/CD", "AWS"
  ];

  const aiKeywords = [
    "OpenAI", "LangChain", "Pinecone", "Whisper", "RAG", "DALL·E", "DALL-E",
    "DeepL", "LLM", "Vector DB", "Vector"
  ];

  const collaborationKeywords = [
    "GitHub API", "STOMP", "SockJS", "WebSocket", "OpenVidu", "Yorkie", "yjs",
    "WebRTC"
  ];

  techArray.forEach((tech) => {
    const techLower = tech.toLowerCase();
    let categorized = false;

    // Frontend 체크
    if (frontendKeywords.some(keyword => techLower.includes(keyword.toLowerCase()) || tech === keyword)) {
      categories.Frontend.push(tech);
      categorized = true;
    }
    // Backend 체크
    else if (backendKeywords.some(keyword => techLower.includes(keyword.toLowerCase()) || tech === keyword)) {
      categories.Backend.push(tech);
      categorized = true;
    }
    // DevOps 체크
    else if (devopsKeywords.some(keyword => techLower.includes(keyword.toLowerCase()) || tech === keyword)) {
      categories["DevOps & Cloud"].push(tech);
      categorized = true;
    }
    // AI 체크
    else if (aiKeywords.some(keyword => techLower.includes(keyword.toLowerCase()) || tech === keyword)) {
      categories["AI & Data"].push(tech);
      categorized = true;
    }
    // Collaboration 체크
    else if (collaborationKeywords.some(keyword => techLower.includes(keyword.toLowerCase()) || tech === keyword)) {
      categories["Collaboration Tools"].push(tech);
      categorized = true;
    }
    // 분류되지 않은 경우 Backend에 추가 (기본값)
    else {
      categories.Backend.push(tech);
    }
  });

  // 빈 카테고리 제거
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
};

// 프로젝트 상세 정보 (roles, troubleshooting 등)
const projectDetails = {
  tikkletikkle: {
    roles: [
      "금융 추천 로직 및 외부 API 연동",
      "커뮤니티/지도 기능 구현",
      "AI 챗봇 프롬프트·플로우 구성",
      "배포 파이프라인 일부 구성 및 CORS/환경변수 정리",
    ],
    troubleshooting: [
      {
        category: "모델 입력 스케일 불일치",
        problem: "예측치 분산 과대",
        cause: "전처리 불일관",
        solution: "입력 스케일러 고정·검증 단계 추가",
      },
      {
        category: "로컬/배포 환경 차이",
        problem: "브랜치별 동작 차이",
        cause: "master(배포) vs release/local(로컬) 분기",
        solution: ".env 프로필 분리·CI 환경 행렬",
      },
    ],
  },
  nost: {
    roles: [
      "생성 파이프라인 설계 및 프롬프트 엔지니어링",
      "피드/댓글 등 커뮤니티 흐름 설계",
      "다국어(번역) 유틸/컴포넌트 정리",
    ],
    troubleshooting: [
      {
        category: "이미지 생성 실패율",
        problem: "이미지 실패/429 에러",
        cause: "생성 API 쿼터 초과",
        solution: "큐·쿨다운·리트라이, 사용자별 레이트리밋 구현",
      },
      {
        category: "대용량 텍스트 저장 성능",
        problem: "본문 저장 시 응답 지연",
        cause: "단일 모델 직접 저장",
        solution: "본문 외부 스토리지 분리(S3)·메타데이터 DB 저장 제안",
      },
    ],
  },
  "drug-service": {
    roles: [
      "RAG 파이프라인 설계(인덱싱·검색·답변 체인)",
      "의약품 데이터 파싱/정규화",
      "안전성/금기/상호작용 가이드 출력 포맷",
    ],
    troubleshooting: [
      {
        category: "RAG 검색 지연",
        problem: "질의 응답 지연",
        cause: "임베딩/벡터 쿼리 대기",
        solution: "Top-K 축소·LRU 캐시·요약 단계 캐시",
      },
      {
        category: "한글 PDF 파싱 인코딩",
        problem: "EUC-KR 문서 파싱 오류",
        cause: "전처리 미흡",
        solution: "UTF-8 강제 변환·예외 처리 파이프라인",
      },
      {
        category: "프론트 CORS/배포 환경",
        problem: "API 호출 CORS 에러",
        cause: "프록시/Origin 미설정",
        solution: "프록시/헤더 정합, 빌드 타깃 분리",
      },
    ],
    video: "https://www.youtube.com/embed/Hbl3lOcMKS4",
  },
  ottereview: {
    roles: [
      "CRDT 연동/문서 키 관리(attach/detach 안정화) - yjs 기반",
      "화이트보드 도구 구성(tldraw + yjs CRDT 동기화)",
      "오디오 룸 토큰/세션 만료 복구",
      "채팅(WS) + 보안헤더/코르스 정리",
    ],
    troubleshooting: [
      {
        category: "화이트보드 협업 동기화 - 기술 선택 및 진화",
        problem: "Canvas → 이벤트 로그 → Yorkie 시도 과정에서 동시 편집 충돌, Late join 상태 불일치 지속",
        cause: "Canvas는 상태 관리 불가, 이벤트 로그는 동시성 병합 규칙 부재, Yorkie는 도형 상태 모델링 추상화 레이어 부재로 직접 설계 필요",
        solution: "검증된 도형 상태 모델이 있는 TLDraw + Yjs 조합으로 전환, 백엔드에 YjsWebSocketHandler 구현(방별 세션 그룹 관리, BinaryMessage 브로드캐스트)",
      },
      {
        category: "연결 실패(음성 채팅) - WebRTC / Audio Chat",
        problem: "세션 연결 불가, 재시도 루프",
        cause: "OpenVidu 토큰 연결 지연·타임아웃",
        solution: "Promise.race 기반 10s 타임아웃, 재시도/에러 상태 관리 추가",
      },
      {
        category: "참가자 목록 동기화 누락",
        problem: "트랙 소실/유저명 미표시",
        cause: "connectionCreated/Destroyed 이벤트 처리 부재",
        solution: "세션 이벤트 리스너 추가, connectedParticipants 상태 동기화",
      },
      {
        category: "채팅룸 진입 안정성",
        problem: "화면 전환 시 세션/소켓 혼선",
        cause: "페이지 단위 초기화 순서 불안정",
        solution: "페이지 가드·소유자 권한 체크, joinSession(roomId) 지연 호출",
      },
      {
        category: "BE/인프라 - OpenVidu 환경 불일치",
        problem: "세션 생성 실패",
        cause: "서버/환경변수 미정합, 포트/인증 설정 누락",
        solution: "OpenViduServiceImpl 세션 생성 분리, docker-compose에 openvidu-server:2.31.0 구성, 4443 노출",
      },
      {
        category: "FE 안정화 - 충돌 파일 로딩 실패",
        problem: "PR 상세/충돌 파일 로딩 오류",
        cause: "분기 병합 후 경로·상태 불일치",
        solution: "파일 로딩 로직 보정",
      },
    ],
    video: "https://www.youtube.com/embed/PciBxQA3SzQ",
  },
  orakgarak: {
    roles: [
      "프론트엔드 UI/UX 개선: 추천 페이지 텍스트 배치 및 반응형 최적화, 앨범 상세 페이지 작성자 정보 표시 형식 개선",
      "피드 페이지 레이아웃 개선: Sticky 탭 구현으로 스크롤 중 네비게이션 편의성 향상, backdrop-filter를 활용한 반투명 배경 효과 적용",
      "Spring Boot 기반 백엔드 앨범 CRUD 기능 구현: AlbumController/AlbumService를 통한 앨범 생성·조회·수정·삭제 API 개발, 트랙 관리 및 권한 검증 로직 구현",
      "앨범 CRUD, 피드·댓글·좋아요 API 연동 및 프론트엔드 UI 구성",
      "프론트엔드 빌드 최적화 및 번들 관리, Git LFS를 통한 대용량 파일 관리 체계화",
    ],
    troubleshooting: [
      {
        category: "프론트 빌드 번들 과대",
        problem: "초기 로딩 지연",
        cause: "Phaser 라이브러리 및 대용량 게임 에셋 포함",
        solution: "코드 스플리팅 및 Phaser 정적 파일 분리. `vite.config.ts`에서 `manualChunks` 설정으로 vendor(react, react-dom), mui, router 분리. Phaser 라이브러리를 `public/assets/js/phaser.min.js`로 복사하여 정적 파일로 분리하여 초기 번들에서 제외. React.lazy를 통한 동적 import 및 라우트 기반 코드 스플리팅",
      },
      {
        category: "Sticky 탭과 헤더 z-index 충돌",
        problem: "피드 페이지에서 스크롤 시 탭이 사라져 사용자가 탭 전환을 위해 상단으로 이동해야 하는 불편함",
        cause: "피드 페이지 탭이 일반적인 레이아웃 흐름에 포함되어 스크롤 시 함께 사라짐, 헤더와의 z-index 충돌 가능성",
        solution: "FeedTabs 컴포넌트에 `position: sticky`, `top: 80px` (헤더 높이 60px + 여백 20px), `zIndex: 1000` 설정. 헤더의 z-index(1100)보다 낮게 설정하여 겹침 방지. `backdropFilter: blur(20px)`와 반투명 배경(`rgba(26, 26, 46, 0.95)`) 적용으로 시각적 일관성 확보",
      },
      {
        category: "반응형 레이아웃 오버플로우 문제",
        problem: "Material-UI Container 컴포넌트가 뷰포트 너비를 초과하여 모바일 환경에서 가로 스크롤 발생",
        cause: "Material-UI의 기본 Container 설정이 뷰포트 너비를 고려하지 않아 일부 화면 크기에서 오버플로우 발생",
        solution: "전역 CSS(`app/index.css`)에 `max-width: 100% !important`, `overflow-x: hidden !important` 적용. FeedPage의 Container에 `maxWidth={false}` 설정 후 내부 Box 컴포넌트로 `maxWidth: 1200px` 제한. 모든 컨테이너를 단일 컬럼으로 강제하는 CSS 규칙 추가",
      },
    ],
  },
  ouroboros: {
    roles: [
      "React + TypeScript 기반 웹 UI 전면 개발 및 아키텍처 설계",
      "OpenAPI 명세서 작성/편집 인터페이스 및 실시간 미리보기 기능 구현",
      "Mock Server 테스트 인터페이스 및 Request/Response 스키마 관리 UI 개발",
      "Call Trace 성능 추적 시각화 및 트리 구조 자동 확장 기능 구현",
      "코드 스니펫 생성 기능 및 다국어 지원(i18n) 구현",
      "인증 처리 (Bearer Token, API Key, Basic Auth) 구현",
      "WebSocket/STOMP 명세서 관리 UI 및 실시간 상태 동기화 구현",
      "JSON 에디터 통합 및 사용자 경험 최적화",
    ],
    troubleshooting: [
      {
        category: "Call Trace 트리 구조 자동 경로 탐색 및 확장",
        problem: "사용자가 특정 메서드를 클릭했을 때, 그 메서드가 트리 구조의 깊은 곳에 있으면 수동으로 여러 번 클릭해서 확장해야 했습니다.",
        cause: "트리 구조에서 특정 노드까지의 경로를 자동으로 찾는 로직이 없었습니다.",
        solution: "재귀 함수로 해당 메서드까지 가는 경로의 모든 부모 노드를 자동으로 찾아서 한 번에 확장되도록 구현했습니다.",
      },
      {
        category: "FormDataBodyForm 무한 업데이트 루프 해결",
        problem: "FormData 입력 필드에서 값을 변경하면 onChange → JSON 변환 → value 업데이트 → useEffect 실행 → 다시 onChange 호출이 반복되는 무한 루프가 발생했습니다.",
        cause: "useEffect와 onChange가 서로를 트리거하는 순환 구조가 형성되었습니다.",
        solution: "useRef로 이전 값을 저장해두고, 실제로 값이 바뀐 경우에만 업데이트하도록 수정했습니다.",
      },
      {
        category: "JSON 편집기 사용자 경험 개선",
        problem: "기본 textarea로는 JSON을 편집할 때 들여쓰기가 맞지 않고, 오타를 찾기 어려웠습니다.",
        cause: "기본 textarea는 코드 편집 기능이 제한적입니다.",
        solution: "react-ace 라이브러리를 사용해 코드 에디터처럼 들여쓰기 자동 정렬, 색상으로 구문 강조, 자동 완성 기능을 추가했습니다.",
      },
      {
        category: "Node.js 전용 라이브러리 브라우저 호환성 문제",
        problem: "코드 스니펫 생성에 사용하는 openapi-snippet 라이브러리가 Node.js 환경용이라 브라우저에서 실행 시 에러가 발생했습니다.",
        cause: "openapi-snippet은 Node.js 전용 모듈에 의존합니다.",
        solution: "vite-plugin-node-polyfills 플러그인을 추가해 Node.js 기능을 브라우저에서도 사용할 수 있도록 해결했습니다.",
      },
      {
        category: "WebSocket 작업 완료 토글 반응성 최적화",
        problem: "작업 완료 상태를 변경할 때 서버 응답을 기다리는 동안 버튼이 반응하지 않아 사용자가 여러 번 클릭하는 문제가 있었습니다.",
        cause: "비동기 작업 완료를 기다리는 동안 UI가 반응하지 않았습니다.",
        solution: "업데이트 중임을 표시하는 플래그를 사용해, 업데이트가 진행 중일 때는 외부 변경을 무시하고 완료되면 즉시 화면에 반영되도록 개선했습니다.",
      },
      {
        category: "Basic Auth 다국어 문자 Base64 인코딩 처리",
        problem: "Basic Auth에서 한글이 포함된 아이디/비밀번호를 인코딩할 때 브라우저 기본 함수 (btoa)가 ASCII 문자만 지원해서 에러가 발생했습니다.",
        cause: "btoa() 함수는 ASCII 문자만 처리할 수 있습니다.",
        solution: "UTF-8 문자를 안전하게 인코딩하는 safeBase64 함수를 만들어서 해결했습니다.",
      },
      {
        category: "React 모달 상태 기반 조건부 데이터 리프레시 패턴",
        problem: "모달을 닫은 상태에서 데이터가 변경되어도, 모달을 다시 열었을 때 이전 데이터가 그대로 보였습니다.",
        cause: "모달이 열릴 때 최신 데이터를 가져오지 않았습니다.",
        solution: "모달이 열릴 때 (isOpen이 true가 될 때) 마다 최신 데이터를 서버에서 가져오도록 useEffect를 설정해 항상 최신 정보를 보여주도록 수정했습니다.",
      },
    ],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const baseProject = baseProjects.find((p) => p.slug === slug);
  const details = slug ? projectDetails[slug] : undefined;

  // 기본 프로젝트 데이터와 상세 정보 병합
  const project = baseProject ? {
    ...baseProject,
    features: baseProject.features || [],
    roles: details?.roles || baseProject.roles || [],
    troubleshooting: details?.troubleshooting || [],
    video: details?.video,
    links: {
      github: baseProject.links?.github,
      demo: baseProject.links?.demo,
    },
  } : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
            프로젝트를 찾을 수 없습니다
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* 상단 여백 (헤더 공간) */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 뒤로가기 버튼 */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 mb-12 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all animate-fade-in-up"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          프로젝트 목록으로 돌아가기
        </Link>

        {/* 프로젝트 헤더 */}
        <div
          className="text-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Project Detail
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {project.summary}
          </p>

          {(project.organization || project.period || project.teamSize || (project.myRole && project.myRole.length > 0)) && (
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              {project.organization && (
                <div>
                  <span className="text-gray-900 dark:text-white">기관</span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">{project.organization}</span>
                </div>
              )}
              {project.period && (
                <div>
                  <span className="text-gray-900 dark:text-white">개발 기간</span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">{project.period}</span>
                </div>
              )}
              {project.teamSize && (
                <div>
                  <span className="text-gray-900 dark:text-white">팀 인원</span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">{project.teamSize}명</span>
                </div>
              )}
              {project.myRole && project.myRole.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">내 역할</span>
                  <div className="flex flex-wrap gap-2">
                    {project.myRole.map((r) => (
                      <span
                        key={r}
                        className={
                          r === "FE"
                            ? "px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                            : r === "BE"
                              ? "px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                              : r === "AI"
                                ? "px-3 py-1 rounded-full text-xs font-bold bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-200 border border-violet-200 dark:border-violet-800"
                                : "px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        }
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 메인 컨텐츠 카드 */}
        <div
          className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden transition-colors animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* 커버 이미지 */}
          <div className="aspect-[21/9] bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden w-full h-full bg-gray-100 dark:bg-gray-800 items-center justify-center text-gray-400 dark:text-gray-300 text-2xl">
              이미지를 불러올 수 없습니다
            </div>
          </div>

          <div className="p-10 md:p-12">
            {/* 설명 */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
              {project.description}
            </p>

            {/* 그리드 섹션 */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* 기술 스택 */}
              <div className="p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    기술 스택
                  </h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(categorizeTech(project.tech)).map(([category, techs]) => {
                    const categoryEmojis = {
                      Frontend: "🎨",
                      Backend: "⚙️",
                      "DevOps & Cloud": "☁️",
                      "AI & Data": "🤖",
                      "Collaboration Tools": "💬",
                    };
                    const categoryColors = {
                      Frontend: "from-blue-500 to-sky-500",
                      Backend: "from-emerald-500 to-teal-500",
                      "DevOps & Cloud": "from-amber-500 to-orange-500",
                      "AI & Data": "from-slate-500 to-gray-500",
                      "Collaboration Tools": "from-purple-500 to-pink-500",
                    };
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{categoryEmojis[category] || "📦"}</span>
                          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {category}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 주요 기능 */}
              {project.features && project.features.length > 0 && (
                <div className="p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      주요 기능
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500 transition-all">
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 담당 역할 */}
            {project.roles && project.roles.length > 0 && (
              <div className="mb-12 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    담당 역할
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.roles.map((role, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 트러블슈팅 */}
            {project.troubleshooting && project.troubleshooting.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                    트러블슈팅
                  </h3>
                </div>

                <div className="space-y-6">
                  {project.troubleshooting.map((item, index) => (
                    <div
                      key={index}
                      className="relative p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                    >
                      {/* 카테고리 */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 text-base font-black shadow-lg">
                          {index + 1}
                        </span>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">
                          {item.category}
                        </h4>
                      </div>

                      {/* 문제/원인/해결 */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base font-black text-red-600 dark:text-red-400">
                              문제
                            </span>
                            <span className="text-red-500">●</span>
                          </div>
                          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                            {item.problem}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base font-black text-amber-600 dark:text-amber-400">
                              원인
                            </span>
                            <span className="text-amber-500">●</span>
                          </div>
                          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                            {item.cause}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                              해결
                            </span>
                            <span className="text-emerald-500">●</span>
                          </div>
                          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                            {item.solution}
                          </p>
                        </div>

                        {/* 노트가 있는 경우 */}
                        {item.note && (
                          <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                              💡 {item.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 갤러리 */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white dark:text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    프로젝트 갤러리
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="group relative bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} 스크린샷 ${index + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden w-full h-64 bg-gray-100 dark:bg-gray-800 items-center justify-center text-gray-400 dark:text-gray-300 text-sm">
                        이미지를 불러올 수 없습니다
                      </div>
                      {/* 호버 시 확대 아이콘 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-900 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 시연 영상 */}
            {project.video && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-xl">🎥</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    시연 영상
                  </h3>
                </div>
                <div
                  className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-700"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src={project.video}
                    title={`${project.title} 시연 영상`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub 보기
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 border-2 border-gray-800 dark:border-gray-200 bg-transparent text-gray-800 dark:text-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 shadow-lg hover:scale-105 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  라이브 데모
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white hover:scale-110 transition-transform shadow-xl"
            onClick={() => setSelectedImage(null)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
            <img
              src={selectedImage}
              alt="확대 이미지"
              className="w-full h-full object-contain bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
