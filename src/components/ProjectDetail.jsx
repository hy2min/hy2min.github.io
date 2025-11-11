import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    {
      id: 1,
      slug: "tikkletikkle",
      title: "TikkleTikkle – 금융 추천 & 커뮤니티",
      summary:
        "예·적금 추천, 자산·지도, 커뮤니티, AI 챗봇까지 묶은 재테크 파트너 서비스.",
      description:
        "금융감독원 API를 통한 금융상품 추천, Kakao 지도, 자산·커뮤니티, OpenAI/LangChain 챗봇 연동. EC2 + Docker + Nginx로 배포.",
      tech: [
        "Django",
        "React",
        "Docker",
        "Nginx",
        "AWS EC2",
        "OpenAI",
        "Kakao Maps",
      ],
      roles: [
        "금융 추천 로직 및 외부 API 연동",
        "커뮤니티/지도 기능 구현",
        "AI 챗봇 프롬프트·플로우 구성",
        "배포 파이프라인 일부 구성 및 CORS/환경변수 정리",
      ],
      features: [
        "금융상품 API 기반 추천/검색",
        "지도 기반 매장/지점 보기",
        "커뮤니티 게시판/댓글",
        "AI 챗봇로 금융 Q&A",
      ],
      links: {
        github: "https://github.com/hy2min/tikkletikkle",
        demo: "http://tikkle.r-e.kr",
      },
      image: "/images/tikkle-cover.png",
      gallery: ["/images/tikkle-1.png", "/images/tikkle-2.png"],
      troubleshooting: [
        {
          category: "모델 입력 스케일 불일치",
          problem: "예측치 분산 과대",
          cause: "전처리 불일관",
          solution: "입력 스케일러 고정·검증 단계 추가",
          reference:
            "final_pjt_back/requirements.txt(ML 스택), 금융 입력 변수 특성",
        },
        {
          category: "로컬/배포 환경 차이",
          problem: "브랜치별 동작 차이",
          cause: "master(배포) vs release/local(로컬) 분기",
          solution: ".env 프로필 분리·CI 환경 행렬",
          reference: "README.md(브랜치 안내)",
        },
      ],
    },
    {
      id: 2,
      slug: "nost",
      title: "NOST – AI 소설 생성 커뮤니티",
      summary:
        "AI가 제안한 3가지 후보 중 선택/수정해 소설을 완성하는 생성형 커뮤니티.",
      description:
        "React + Django + PostgreSQL. LangChain/ChatGPT/DALL·E/DeepL을 활용해 다국어/이미지 생성 파이프라인 구성.",
      tech: [
        "React",
        "Zustand",
        "Django",
        "PostgreSQL",
        "AWS",
        "LangChain",
        "OpenAI",
        "DALL·E",
      ],
      roles: [
        "생성 파이프라인 설계 및 프롬프트 엔지니어링",
        "피드/댓글 등 커뮤니티 흐름 설계",
        "다국어(번역) 유틸/컴포넌트 정리",
      ],
      features: [
        "3가지 후보안 생성·선택",
        "문장 단위 편집/재생성",
        "이미지 생성(표지/일러스트)",
        "커뮤니티 공유·댓글",
      ],
      links: {
        github: "https://github.com/hy2min/nost_service",
        demo: "",
      },
      image: "/images/nost-cover.png",
      gallery: [
        "/src/assets/nost_main.png",
        "/src/assets/nost_create1.png",
        "/src/assets/nost_create2.png",
      ],
      troubleshooting: [
        {
          category: "대용량 텍스트 저장 성능",
          problem: "본문 저장 시 응답 지연",
          cause: "단일 모델 직접 저장",
          solution: "본문 외부 스토리지 분리(S3)·메타데이터 DB 저장 제안",
          reference: "backend/README.md 구조, 장문 생성 서비스 특성",
        },
        {
          category: "이미지 생성 실패율",
          problem: "이미지 실패/429",
          cause: "생성 API 쿼터 초과",
          solution: "큐·쿨다운·리트라이, 사용자별 레이트리밋",
          reference: "frontend 비동기 호출 구조, 생성형 워크플로우",
        },
      ],
    },
    {
      id: 3,
      slug: "drug-service",
      title: "Drug Service – RAG 기반 복약 가이드",
      summary: "LLM + RAG로 정확하고 안전한 복약 정보를 제공하는 챗봇.",
      description:
        "의약품 공공 데이터 기반 임베딩 인덱스 구성, 상호작용/금기 사항 안내. (백엔드 프레임워크/벡터DB는 프로젝트 설정에 맞게 교체 가능)",
      tech: ["LLM", "RAG", "Vector DB", "(FastAPI/Django)", "OpenAI"],
      roles: [
        "RAG 파이프라인 설계(인덱싱·검색·답변 체인)",
        "의약품 데이터 파싱/정규화",
        "안전성/금기/상호작용 가이드 출력 포맷",
      ],
      features: [
        "의약품 검색/QA",
        "상호작용/금기 자동 안내",
        "출처 근거(References) 함께 제시",
      ],
      links: {
        github: "https://github.com/hy2min/drug_service",
        demo: "",
      },
      video: "https://www.youtube.com/embed/Hbl3lOcMKS4",
      image: "/images/drug-cover.png",
      gallery: ["/images/drug-1.png"],
      troubleshooting: [
        {
          category: "한글 PDF 파싱 인코딩",
          problem: "EUC-KR 문서 파싱 오류",
          cause: "전처리 미흡",
          solution: "UTF-8 강제 변환·예외 처리 파이프라인",
          reference:
            "backend/requirements.txt(PDF 관련), 데이터 소스 comprehensive_drug_safety_docs.csv",
        },
        {
          category: "RAG 검색 지연",
          problem: "질의 응답 지연",
          cause: "임베딩/벡터 쿼리 대기",
          solution: "Top-K 축소·LRU 캐시·요약 단계 캐시",
          reference: "backend/app.py 구조",
        },
        {
          category: "프론트 CORS/배포 환경",
          problem: "API 호출 CORS",
          cause: "프록시/Origin 미설정",
          solution: "프록시/헤더 정합, 빌드 타깃 분리",
          reference: "frontend/.env.*, index.html",
        },
      ],
    },
    {
      id: 4,
      slug: "otterreview",
      title: "OtterReview – 실시간 코드리뷰 & 화이트보드",
      summary:
        "Yorkie(CRDT) + tldraw + OpenVidu + SockJS/STOMP 기반 실시간 협업 플랫폼.",
      description:
        "React(Vite) + Zustand + Yorkie + tldraw, Spring Boot 3.x 백엔드. 실시간 코드 공유, 화이트보드, 다자간 오디오, 채팅 제공.",
      tech: [
        "React(Vite)",
        "Zustand",
        "Yorkie(CRDT)",
        "tldraw",
        "OpenVidu/LiveKit",
        "SockJS",
        "STOMP",
        "Spring Boot 3",
      ],
      roles: [
        "CRDT 연동/문서 키 관리(attach/detach 안정화)",
        "화이트보드 도구 구성(tldraw)",
        "오디오 룸 토큰/세션 만료 복구",
        "채팅(WS) + 보안헤더/코르스 정리",
      ],
      features: [
        "다자간 코드 편집/하이라이트",
        "화이트보드 드로잉/도형",
        "오디오 룸(뮤트/언뮤트)",
        "채팅/멘션",
      ],
      links: {
        github: "https://github.com/hy2min/ottereview",
        demo: "",
      },
      video: "https://www.youtube.com/embed/PciBxQA3SzQ",
      image: "/images/otter-cover.png",
      gallery: ["/images/otter-1.png", "/images/otter-2.png"],
      troubleshooting: [
        {
          category: "연결 실패(음성 채팅) - WebRTC / Audio Chat",
          problem: "세션 연결 불가, 재시도 루프",
          cause: "OpenVidu 토큰 연결 지연·타임아웃",
          solution:
            "Promise.race 기반 10s 타임아웃, 재시도/에러 상태 관리 추가",
          reference:
            "fix: 음성채팅 연결 에러 (815fd912, 2025-08-13), useWebRTC.js 타임아웃 로직",
        },
        {
          category: "참가자 목록 동기화 누락",
          problem: "트랙 소실/유저명 미표시",
          cause: "connectionCreated/Destroyed 이벤트 처리 부재",
          solution:
            "세션 이벤트 리스너 추가, connectedParticipants 상태 동기화",
          reference: "useWebRTC.js 이벤트 핸들러 추가",
        },
        {
          category: "채팅룸 진입 안정성",
          problem: "화면 전환 시 세션/소켓 혼선",
          cause: "페이지 단위 초기화 순서 불안정",
          solution:
            "페이지 가드·소유자 권한 체크, joinSession(roomId) 지연 호출",
          reference:
            "fix: chatroom (5fb148d2, 2025-08-15), AudioChatRoomRefactored.jsx",
        },
        {
          category: "BE/인프라 - OpenVidu 환경 불일치",
          problem: "세션 생성 실패",
          cause: "서버/환경변수 미정합, 포트/인증 설정 누락",
          solution:
            "OpenViduServiceImpl 세션 생성 분리, docker-compose에 openvidu-server:2.31.0 구성, 4443 노출",
          reference:
            "openvidu-browser 사용, openvidu-server 도커 정의, OpenViduConfig.java",
        },
        {
          category: "FE 안정화 - 충돌 파일 로딩 실패",
          problem: "PR 상세/충돌 파일 로딩 오류",
          cause: "분기 병합 후 경로·상태 불일치",
          solution: "파일 로딩 로직 보정",
          reference: "fix: 충돌파일 불러올 코드 수정 (52b7191, 2025-08-17)",
        },
        {
          category: "레이아웃 깨짐/사이즈 문제",
          problem: "화이트보드/로딩창 UI 이슈",
          cause: "반응형 스타일 미세 조정 미비",
          solution: "사이즈/간격 보정",
          reference:
            "fix: 화이트보드 사이즈 수정, style: 로딩창 간격 수정 (ca59a10 등)",
        },
      ],
    },
    {
      id: 5,
      slug: "orakgarak",
      title: "Orakgarak – 보컬 분석 & AI 앨범 생성 플랫폼",
      summary:
        "음역대 분석, AI 커버 생성, 앨범 피드까지 하나로 통합한 AI 기반 보컬 앨범 제작 서비스.",
      description:
        "React(Vite + TypeScript) + Tailwind + MUI + Framer Motion 프론트엔드, Spring Boot 3 + JPA + Redis + MySQL 백엔드 구조로 구성되어 있습니다. 음성 녹음·분석, AI 커버 이미지 생성, 앨범 피드, 댓글·좋아요 기능을 지원하며, Kafka와 S3를 통한 이벤트/파일 처리, Docker Compose로 개발 및 배포 환경을 일원화했습니다.",
      tech: [
        "React (Vite + TypeScript)",
        "Tailwind CSS",
        "MUI",
        "Framer Motion",
        "Zustand",
        "React Query",
        "Three.js / React Three Fiber / Drei",
        "Phaser.js",
        "Spring Boot 3",
        "JPA + QueryDSL",
        "MySQL",
        "Redis",
        "Kafka",
        "AWS S3 + EventBridge",
        "FFmpeg (Jaffree)",
        "Docker Compose",
      ],
      roles: [
        "보컬 음역대 분석 게임(Phaser.js) 로직 및 시각화 구현",
        "AI 커버 생성 UI/비교모드 및 이미지 프리셋 로직 개발",
        "앨범 CRUD, 피드·댓글·좋아요 API 연동 및 프론트 UI 구성",
        "Spring Boot + Docker Compose 배포 환경 구성 및 모니터링 설정",
      ],
      features: [
        "보컬 음역대 분석 및 시각화",
        "AI 커버 이미지 생성(스타일 프리셋/비교)",
        "앨범 생성 및 공유 피드",
        "댓글/좋아요 커뮤니티 기능",
        "녹음본 미리듣기 및 음파 시각화",
      ],
      links: {
        github: "https://github.com/hy2min/orakgarak",
        demo: "",
      },
      image: "/images/orak-cover.png",
      gallery: [
        "/images/orak-1.png",
        "/images/orak-2.png",
        "/images/orak-3.png",
      ],
      troubleshooting: [
        {
          category: "음성 분석 지연",
          problem: "분석 대기 시간 과다",
          cause: "Python voice_analysis 파이프라인 단일 처리",
          solution: "비동기 큐·배치 처리 분리 제안, 결과 폴링형 API 제안",
          reference: "python/voice_analysis/requirements.txt, python/main.py",
          note: "제공된 아카이브에 .git 이력 부재 → 커밋 로그 직접 확인 불가. 코드 구조/의존성 근거로 정리.",
        },
        {
          category: "프론트 빌드 번들 과대",
          problem: "초기 로딩 지연",
          cause: "대용량 에셋/게임 빌드 스크립트 포함",
          solution: "코드 스플리팅·지연 로드, compress_bundle.cjs 활용",
          reference: "front/build-game.js, compress_bundle.cjs",
        },
        {
          category: "백/프론트 스키마 불일치 리스크",
          problem: "필드 불일치 가능성",
          cause: "멀티 리포 구성, 단일 소스 오브 트루스 부재",
          solution: "스키마 공유 패키지 제안, CI 스키마 검증 단계",
          reference: "ARCHITECTURE.md와 다중 폴더 구조",
        },
      ],
    },
  ];

  const project = projects.find((p) => p.slug === slug);

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
              💼 Project Detail
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {project.summary}
          </p>
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
            <div className="hidden w-full h-full bg-gray-100 dark:bg-gray-800 items-center justify-center text-gray-400 dark:text-gray-300 text-8xl">
              🖼️
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
              <div className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    기술 스택
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-xl border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 주요 기능 */}
              <div className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    주요 기능
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 담당 역할 */}
            <div className="mb-12 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                  <span className="text-xl">👤</span>
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

            {/* 트러블슈팅 */}
            {project.troubleshooting && project.troubleshooting.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-xl">🔧</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    트러블슈팅
                  </h3>
                </div>

                <div className="space-y-6">
                  {project.troubleshooting.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all"
                    >
                      {/* 카테고리 */}
                      <div className="flex items-start gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white">
                          {item.category}
                        </h4>
                      </div>

                      {/* 문제/원인/해결 */}
                      <div className="ml-9 space-y-3">
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-bold text-red-600 dark:text-red-400 min-w-[60px]">
                            문제:
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.problem}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-sm font-bold text-amber-600 dark:text-amber-400 min-w-[60px]">
                            원인:
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.cause}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 min-w-[60px]">
                            해결:
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.solution}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-500 min-w-[60px]">
                            근거:
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {item.reference}
                          </span>
                        </div>

                        {/* 노트가 있는 경우 */}
                        {item.note && (
                          <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 italic">
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
                    <span className="text-xl">🖼️</span>
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
                      <div className="hidden w-full h-64 bg-gray-100 dark:bg-gray-800 items-center justify-center text-gray-400 dark:text-gray-300 text-6xl">
                        🖼️
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
              {project.links.github && (
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
              {project.links.demo && (
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
