import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects as baseProjects } from "../data/projects";

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
        reference: "final_pjt_back/requirements.txt(ML 스택), 금융 입력 변수 특성",
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
  nost: {
    roles: [
      "생성 파이프라인 설계 및 프롬프트 엔지니어링",
      "피드/댓글 등 커뮤니티 흐름 설계",
      "다국어(번역) 유틸/컴포넌트 정리",
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
  "drug-service": {
    roles: [
      "RAG 파이프라인 설계(인덱싱·검색·답변 체인)",
      "의약품 데이터 파싱/정규화",
      "안전성/금기/상호작용 가이드 출력 포맷",
    ],
    troubleshooting: [
      {
        category: "한글 PDF 파싱 인코딩",
        problem: "EUC-KR 문서 파싱 오류",
        cause: "전처리 미흡",
        solution: "UTF-8 강제 변환·예외 처리 파이프라인",
        reference: "backend/requirements.txt(PDF 관련), 데이터 소스 comprehensive_drug_safety_docs.csv",
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
    video: "https://www.youtube.com/embed/Hbl3lOcMKS4",
  },
  otterreview: {
    roles: [
      "CRDT 연동/문서 키 관리(attach/detach 안정화)",
      "화이트보드 도구 구성(tldraw)",
      "오디오 룸 토큰/세션 만료 복구",
      "채팅(WS) + 보안헤더/코르스 정리",
    ],
    troubleshooting: [
      {
        category: "연결 실패(음성 채팅) - WebRTC / Audio Chat",
        problem: "세션 연결 불가, 재시도 루프",
        cause: "OpenVidu 토큰 연결 지연·타임아웃",
        solution: "Promise.race 기반 10s 타임아웃, 재시도/에러 상태 관리 추가",
        reference: "fix: 음성채팅 연결 에러 (815fd912, 2025-08-13), useWebRTC.js 타임아웃 로직",
      },
      {
        category: "참가자 목록 동기화 누락",
        problem: "트랙 소실/유저명 미표시",
        cause: "connectionCreated/Destroyed 이벤트 처리 부재",
        solution: "세션 이벤트 리스너 추가, connectedParticipants 상태 동기화",
        reference: "useWebRTC.js 이벤트 핸들러 추가",
      },
      {
        category: "채팅룸 진입 안정성",
        problem: "화면 전환 시 세션/소켓 혼선",
        cause: "페이지 단위 초기화 순서 불안정",
        solution: "페이지 가드·소유자 권한 체크, joinSession(roomId) 지연 호출",
        reference: "fix: chatroom (5fb148d2, 2025-08-15), AudioChatRoomRefactored.jsx",
      },
      {
        category: "BE/인프라 - OpenVidu 환경 불일치",
        problem: "세션 생성 실패",
        cause: "서버/환경변수 미정합, 포트/인증 설정 누락",
        solution: "OpenViduServiceImpl 세션 생성 분리, docker-compose에 openvidu-server:2.31.0 구성, 4443 노출",
        reference: "openvidu-browser 사용, openvidu-server 도커 정의, OpenViduConfig.java",
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
        reference: "fix: 화이트보드 사이즈 수정, style: 로딩창 간격 수정 (ca59a10 등)",
      },
    ],
    video: "https://www.youtube.com/embed/PciBxQA3SzQ",
  },
  orakgarak: {
    roles: [
      "보컬 음역대 분석 게임(Phaser.js) 로직 및 시각화 구현",
      "AI 커버 생성 UI/비교모드 및 이미지 프리셋 로직 개발",
      "앨범 CRUD, 피드·댓글·좋아요 API 연동 및 프론트 UI 구성",
      "Spring Boot + Docker Compose 배포 환경 구성 및 모니터링 설정",
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
  ouroboros: {
    roles: [
      "React + TypeScript 기반 웹 UI 전면 개발 및 아키텍처 설계",
      "OpenAPI 명세서 작성/편집 인터페이스 및 실시간 미리보기 기능 구현",
      "Mock Server 테스트 인터페이스 및 Request/Response 스키마 관리 UI 개발",
      "Call Trace 성능 추적 시각화 및 트리 구조 자동 확장 기능 구현",
      "코드 스니펫 생성 기능 및 다국어 지원 인증 처리",
      "WebSocket/STOMP 명세서 관리 UI 및 실시간 상태 동기화 구현",
      "JSON 에디터 통합 및 사용자 경험 최적화",
    ],
    troubleshooting: [
      {
        category: "Call Trace 트리 구조 자동 경로 탐색 및 확장",
        problem: "Call Trace 모달에서 특정 메서드를 클릭했을 때, 해당 span이 트리 깊숙이 있어 사용자가 수동으로 부모 노드들을 모두 확장해야 하는 UX 문제가 발생했습니다.",
        cause: "중첩된 트리 구조에서 특정 노드를 찾고, 루트부터 해당 노드까지의 모든 경로를 자동으로 확장하는 로직이 없었습니다.",
        solution: "DFS 알고리즘을 구현한 `findSpanPath` 함수를 개발하여 대상 노드까지의 전체 경로를 자동으로 찾고, React state로 관리하여 모든 부모 노드를 한 번에 자동 확장하도록 구현했습니다. `initialExpandedSpanId` 변경 시에만 실행하여 성능을 최적화했습니다.",
        reference: "front/src/features/spec/components (Call Trace 관련 컴포넌트), DFS 알고리즘 구현",
      },
      {
        category: "React 모달 상태 기반 조건부 데이터 리프레시 패턴",
        problem: "스키마를 생성한 후 모달을 열어도 새로 생성된 스키마가 목록에 표시되지 않는 문제가 있었습니다.",
        cause: "컴포넌트 마운트 시점에만 API 호출을 하면, 모달이 열리는 시점의 최신 데이터를 보장할 수 없었습니다.",
        solution: "모달 상태(`isSchemaModalOpen`)를 dependency로 사용하는 useEffect 패턴을 적용하여, 모달이 열릴 때마다 데이터를 다시 로드하도록 구현했습니다. 모달 상태가 실제로 변경될 때만 실행되도록 dependency 배열을 관리하여 불필요한 API 호출을 방지했습니다.",
        reference: "front/src/features/spec/components (스키마 모달 관련 컴포넌트), useEffect 패턴 최적화",
      },
      {
        category: "FormDataBodyForm 무한 업데이트 루프 해결",
        problem: "FormDataBodyForm 컴포넌트에서 `Maximum update depth exceeded` 에러가 발생하고 브라우저가 응답하지 않는 문제가 있었습니다. 사용자가 폼 필드를 수정하려고 하면 즉시 브라우저가 멈추는 현상이 발생했습니다.",
        cause: "useEffect에서 `formData`가 변경될 때마다 `onChange`를 호출하고, `onChange`가 부모 컴포넌트의 상태를 변경하여 다시 `value` prop으로 전달되었습니다. `value` prop이 변경되면 다시 useEffect가 실행되어 무한 루프가 발생했습니다. React의 상태 업데이트 사이클이 끊기지 않아 컴포넌트가 계속 리렌더링되었습니다.",
        solution: "useRef를 사용하여 이전 값을 추적하는 `prevValueRef`를 구현했습니다. 실제로 값이 변경되었을 때만 업데이트하도록 조건을 추가하고, `handleFormDataChange`에서 `useEffect` 대신 직접 `onChange`를 호출하도록 변경했습니다. 이를 통해 상태 업데이트 사이클을 끊고, 사용자 입력이 부모 컴포넌트로 정확히 전달되도록 했습니다. 무한 루프 문제를 완전히 해결하여 FormDataBodyForm이 정상적으로 작동하게 되었습니다.",
        reference: "front/src/features/testing/components/RequestBodyForm.tsx, FormDataBodyForm 컴포넌트, useRef를 활용한 상태 관리 최적화",
      },
      {
        category: "Node.js 전용 라이브러리 브라우저 호환성 문제",
        problem: "코드 스니펫 생성 기능을 위해 `openapi-snippet` 라이브러리를 사용했으나, 브라우저에서 `Module 'stream' has been externalized`, `global is not defined` 등의 에러가 발생했습니다.",
        cause: "`openapi-snippet`은 Node.js 환경을 가정하고 설계된 라이브러리로, Node.js 전용 모듈(`stream`, `string_decoder`, `qs` 등)에 의존합니다. 브라우저 환경에는 이러한 모듈이 존재하지 않습니다.",
        solution: "`vite-plugin-node-polyfills`를 설치하고 Vite 설정에 추가하여 Node.js 모듈을 브라우저에서 사용할 수 있도록 폴리필을 제공했습니다. `global` 변수를 `window`로 매핑하고, `process.env`를 빈 객체로 정의하여 브라우저 환경에 맞게 변환했습니다. 실패 시 fallback 함수로 자동 전환하여 안정성을 확보했습니다.",
        reference: "front/vite.config.ts, front/src/features/spec/components/CodeSnippetPanel.tsx, vite-plugin-node-polyfills 통합",
      },
      {
        category: "Basic Auth 다국어 문자 Base64 인코딩 처리",
        problem: "Basic Auth 미리보기에서 한국어, 일본어 등 다국어 문자를 입력하면 `InvalidCharacterError`가 발생하고 컴포넌트 렌더링이 깨지는 문제가 있었습니다.",
        cause: "`btoa()` 함수는 ASCII 문자만 처리할 수 있어 UTF-8 문자를 직접 전달하면 에러가 발생합니다.",
        solution: "UTF-8 문자열을 Base64로 안전하게 인코딩하는 `safeBase64` 함수를 구현했습니다. `encodeURIComponent` → `unescape` → `btoa` 순서로 3단계 변환 프로세스를 적용하고, 에러 발생 시 fallback 메시지를 표시하여 컴포넌트가 깨지지 않도록 방어 코드를 추가했습니다.",
        reference: "front/src/features/spec/components/ApiRequestCard.tsx, safeBase64 함수, UTF-8 인코딩 처리",
      },
      {
        category: "JSON 편집기 사용자 경험 개선",
        problem: "JSON 입력 폼에서 자동 들여쓰기가 작동하지 않고, Tab 키를 눌러도 들여쓰기가 되지 않았습니다. 구문 강조, 라인 번호, 자동 완성 등 코드 편집 기능이 전혀 없어 사용자가 수동으로 JSON을 포맷팅해야 했습니다. 특히 중첩된 객체나 배열을 편집할 때 매우 불편했습니다.",
        cause: "기본 `textarea` 요소는 코드 편집 기능이 제한적입니다. JSON 편집 시 들여쓰기, 구문 강조, 자동 완성 등의 기능이 필요하나, 여러 위치에서 JSON 입력이 필요하여 일관된 편집 경험을 제공하기 어려웠습니다.",
        solution: "`react-ace`와 `ace-builds` 패키지를 설치하고 `JsonEditor` 공통 컴포넌트를 생성했습니다. JSON 모드, 다크 모드 자동 감지 및 테마 전환(monokai/github), 자동 완성, 라인 번호, 코드 폴딩 등 코드 에디터 수준의 기능을 제공했습니다. `RequestBodyForm.tsx`와 `SpecForm.tsx`에 적용하여 일관된 JSON 편집 경험을 제공했습니다. 이를 통해 JSON 편집 편의성이 크게 향상되었고, 사용자가 코드 에디터 수준의 기능을 사용할 수 있게 되었습니다.",
        reference: "front/src/components/JsonEditor.tsx, front/src/features/testing/components/RequestBodyForm.tsx, react-ace 통합",
      },
      {
        category: "WebSocket 작업 완료 토글 반응성 최적화",
        problem: "WebSocket 명세서의 '작업 완료' 토글을 클릭해도 즉시 반응하지 않고, 몇 초 후에야 상태가 변경되어 UX 문제가 발생했습니다.",
        cause: "토글 클릭 시 여러 비동기 작업이 순차적으로 실행되어 지연이 발생했습니다. `localProgress` 상태를 즉시 업데이트했지만, `selectedEndpoint` 변경 시 `useEffect`가 `localProgress`를 다시 초기화하여 즉시 반영되지 않았습니다.",
        solution: "`isUpdatingProgressRef` 플래그를 추가하여 progress 업데이트 중인지 추적하도록 했습니다. 토글 핸들러에서 즉시 `localProgress`를 업데이트하고, `useEffect`에서 업데이트 중일 때는 `localProgress`를 덮어쓰지 않도록 조건을 추가했습니다. `loadEndpoints()`는 백그라운드에서 비동기로 실행하여 토글 반응성에 영향을 주지 않도록 했습니다.",
        reference: "front/src/features/spec/components/ApiEditorLayout.tsx, progress 토글 핸들러, 비동기 상태 관리 최적화",
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
                  {(project.features || []).map((feature, index) => (
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
            {project.roles && project.roles.length > 0 && (
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
            )}

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

                        {item.reference && (
                          <div className="flex items-start gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-500 min-w-[60px]">
                              근거:
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                              {item.reference}
                            </span>
                          </div>
                        )}

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
