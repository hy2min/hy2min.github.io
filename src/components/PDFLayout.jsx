import { useEffect } from "react";
import { projects as baseProjects } from "../data/projects";

// 프로젝트 상세 정보 (ProjectDetail에서 가져옴)
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
        solution: "큐-쿨다운·리트라이, 사용자별 레이트리밋",
        reference:
          "frontend 비동기 호출 구조, 생성형 워크플로우",
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
    ],
  },
  ottereview: {
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
    ],
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
        category: "FormDataBodyForm 무한 업데이트 루프 해결",
        problem: "FormDataBodyForm 컴포넌트에서 `Maximum update depth exceeded` 에러가 발생하고 브라우저가 응답하지 않는 문제가 있었습니다.",
        cause: "useEffect에서 `formData`가 변경될 때마다 `onChange`를 호출하고, `onChange`가 부모 컴포넌트의 상태를 변경하여 다시 `value` prop으로 전달되었습니다.",
        solution: "useRef를 사용하여 이전 값을 추적하는 `prevValueRef`를 구현했습니다. 실제로 값이 변경되었을 때만 업데이트하도록 조건을 추가하고, `handleFormDataChange`에서 `useEffect` 대신 직접 `onChange`를 호출하도록 변경했습니다.",
        reference: "front/src/features/testing/components/RequestBodyForm.tsx, FormDataBodyForm 컴포넌트, useRef를 활용한 상태 관리 최적화",
      },
      {
        category: "Node.js 전용 라이브러리 브라우저 호환성 문제",
        problem: "코드 스니펫 생성 기능을 위해 `openapi-snippet` 라이브러리를 사용했으나, 브라우저에서 `Module 'stream' has been externalized`, `global is not defined` 등의 에러가 발생했습니다.",
        cause: "`openapi-snippet`은 Node.js 환경을 가정하고 설계된 라이브러리로, Node.js 전용 모듈(`stream`, `string_decoder`, `qs` 등)에 의존합니다.",
        solution: "`vite-plugin-node-polyfills`를 설치하고 Vite 설정에 추가하여 Node.js 모듈을 브라우저에서 사용할 수 있도록 폴리필을 제공했습니다.",
        reference: "front/vite.config.ts, front/src/features/spec/components/CodeSnippetPanel.tsx, vite-plugin-node-polyfills 통합",
      },
    ],
  },
};

// 모든 프로젝트 데이터 병합
const detailedProjects = baseProjects.map((baseProject) => {
  const details = projectDetails[baseProject.slug] || {};
  return {
    ...baseProject,
    roles: details.roles || baseProject.roles || [],
    troubleshooting: details.troubleshooting || [],
    features: baseProject.features || [],
  };
});

// 프로젝트 순서 정의: ouroboros -> ottereview -> drug_service -> orakgarak -> tikkletikkle -> nost
const projectOrder = ["ouroboros", "ottereview", "drug-service", "orakgarak", "tikkletikkle", "nost"];
const sortedDetailedProjects = [...detailedProjects].sort((a, b) => {
  const indexA = projectOrder.indexOf(a.slug);
  const indexB = projectOrder.indexOf(b.slug);
  return indexA - indexB;
});

const PDFLayout = () => {
  useEffect(() => {
    // 모든 이미지 로드 대기
    const images = document.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
        setTimeout(resolve, 5000);
      });
    });

    Promise.all(imagePromises).then(() => {
      // PDF 생성 준비 완료 신호
      window.dispatchEvent(new Event("pdf-ready"));
    });
  }, []);

  return (
    <div className="pdf-layout bg-white text-gray-900">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        
        @page {
          @bottom-right {
            content: counter(page) " / " counter(pages);
            font-size: 9pt;
            color: #9ca3af;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
        }
        
        .pdf-layout {
          width: 210mm;
          min-height: 297mm;
          padding: 12mm 15mm;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans KR', sans-serif;
          background: white;
          margin: 0 auto;
        }
        
        .pdf-layout * {
          box-sizing: border-box;
        }
        
        .pdf-layout h1 {
          font-size: 28pt;
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 12pt 0;
          color: #111827;
          letter-spacing: -0.5pt;
        }
        
        .pdf-layout h2 {
          font-size: 20pt;
          font-weight: 800;
          line-height: 1.3;
          margin: 18pt 0 12pt 0;
          color: #111827;
          letter-spacing: -0.3pt;
          padding-bottom: 8pt;
          border-bottom: 3pt solid #111827;
          display: inline-block;
          width: 100%;
        }
        
        .pdf-layout h3 {
          font-size: 14pt;
          font-weight: 700;
          line-height: 1.4;
          margin: 14pt 0 8pt 0;
          color: #111827;
          padding-left: 12pt;
          border-left: 4pt solid #111827;
        }
        
        .pdf-layout h4 {
          font-size: 12pt;
          font-weight: 700;
          line-height: 1.4;
          margin: 10pt 0 6pt 0;
          color: #374151;
        }
        
        .pdf-layout p {
          font-size: 10pt;
          line-height: 1.6;
          margin: 6pt 0;
          color: #374151;
        }
        
        .pdf-layout ul, .pdf-layout ol {
          font-size: 10pt;
          line-height: 1.6;
          margin: 6pt 0;
          padding-left: 18pt;
          color: #374151;
        }
        
        .pdf-layout li {
          margin: 3pt 0;
        }
        
        .pdf-layout .section {
          margin-bottom: 16pt;
          page-break-inside: avoid;
        }
        
        .pdf-layout .page-break {
          page-break-before: always;
        }
        
        .pdf-layout .no-break {
          page-break-inside: avoid;
        }
        
        .pdf-layout img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 12pt auto;
        }
        
        .pdf-layout .section-title {
          font-size: 10pt;
          font-weight: 700;
          color: #ffffff;
          background: #111827;
          text-transform: uppercase;
          letter-spacing: 1pt;
          margin-bottom: 8pt;
          padding: 6pt 12pt;
          display: inline-block;
          border-radius: 4pt;
        }
        
        .pdf-layout .section-icon {
          font-size: 16pt;
          margin-right: 6pt;
          vertical-align: middle;
        }
        
        .pdf-layout .project-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32pt;
          height: 32pt;
          background: #111827;
          color: #ffffff;
          border-radius: 50%;
          font-size: 14pt;
          font-weight: 900;
          margin-right: 12pt;
          vertical-align: middle;
        }
        
        .pdf-layout .stat-number {
          font-size: 24pt;
          font-weight: 900;
          color: #111827;
          line-height: 1;
          margin-right: 8pt;
        }
        
        .pdf-layout .stat-label {
          font-size: 10pt;
          color: #6b7280;
          font-weight: 600;
        }
        
        .pdf-layout .stat-box {
          display: inline-block;
          padding: 12pt;
          background: #f9fafb;
          border-radius: 8pt;
          border: 1.5pt solid #e5e7eb;
          margin: 6pt;
          text-align: center;
          min-width: 80pt;
        }
        
        .pdf-layout .quote-box {
          padding: 16pt;
          background: #fef3c7;
          border-left: 4pt solid #f59e0b;
          border-radius: 8pt;
          margin: 16pt 0;
          font-style: italic;
          position: relative;
        }
        
        .pdf-layout .quote-box:before {
          content: '"';
          font-size: 48pt;
          color: #f59e0b;
          position: absolute;
          left: 8pt;
          top: 8pt;
          opacity: 0.3;
          font-family: serif;
        }
        
        .pdf-layout .category-color-frontend {
          border-left-color: #3b82f6;
        }
        
        .pdf-layout .category-color-backend {
          border-left-color: #10b981;
        }
        
        .pdf-layout .category-color-devops {
          border-left-color: #f59e0b;
        }
        
        .pdf-layout .category-color-ai {
          border-left-color: #8b5cf6;
        }
        
        .pdf-layout .category-color-collab {
          border-left-color: #ec4899;
        }
        
        .pdf-layout .tech-tag-frontend {
          background: #dbeafe;
          border-color: #3b82f6;
          color: #1e40af;
        }
        
        .pdf-layout .tech-tag-backend {
          background: #d1fae5;
          border-color: #10b981;
          color: #065f46;
        }
        
        .pdf-layout .tech-tag-devops {
          background: #fef3c7;
          border-color: #f59e0b;
          color: #92400e;
        }
        
        .pdf-layout .tech-tag-ai {
          background: #ede9fe;
          border-color: #8b5cf6;
          color: #5b21b6;
        }
        
        .pdf-layout .tech-tag-collab {
          background: #fce7f3;
          border-color: #ec4899;
          color: #9f1239;
        }
        
        .pdf-layout .divider {
          height: 2pt;
          background: linear-gradient(90deg, #111827 0%, #e5e7eb 100%);
          margin: 16pt 0;
          border: none;
          border-radius: 1pt;
        }
        
        .pdf-layout .info-section {
          margin: 16pt 0;
          padding: 12pt;
          background: #f9fafb;
          border-radius: 8pt;
          border-left: 4pt solid #111827;
        }
        
        .pdf-layout .info-label {
          font-weight: 700;
          color: #111827;
          display: inline-block;
          min-width: 60pt;
          margin-right: 8pt;
        }
        
        .pdf-layout .info-content {
          color: #374151;
        }
        
        .pdf-layout .troubleshooting-item {
          margin: 12pt 0;
          padding: 12pt;
          background: #ffffff;
          border: 1.5pt solid #e5e7eb;
          border-radius: 8pt;
          border-left: 4pt solid #111827;
          page-break-inside: avoid;
          box-shadow: 0 1pt 3pt rgba(0,0,0,0.05);
        }
        
        .pdf-layout .troubleshooting-item:first-child {
          margin-top: 0;
        }
        
        .pdf-layout .troubleshooting-label {
          font-weight: 700;
          display: inline-block;
          min-width: 45pt;
          margin-right: 8pt;
          padding: 2pt 6pt;
          border-radius: 4pt;
          font-size: 9pt;
        }
        
        .pdf-layout .project-header {
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
          padding: 16pt;
          border-radius: 12pt;
          margin-bottom: 16pt;
          border: 1.5pt solid #e5e7eb;
        }
        
        .pdf-layout .project-content {
          background: #ffffff;
          padding: 16pt;
          border-radius: 8pt;
          border: 1.5pt solid #f3f4f6;
          margin-bottom: 12pt;
        }
        
        .pdf-layout .highlight-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 12pt;
          border-radius: 8pt;
          border-left: 4pt solid #f59e0b;
          margin: 12pt 0;
        }
        
        .pdf-layout .contact-box {
          background: linear-gradient(135deg, #111827 0%, #374151 100%);
          color: #ffffff;
          padding: 20pt;
          border-radius: 12pt;
          text-align: center;
        }
        
        .pdf-layout .contact-box h2 {
          color: #ffffff;
          border-bottom: 2pt solid #ffffff;
        }
        
        .pdf-layout .contact-box .info-label {
          color: #d1d5db;
        }
        
        .pdf-layout .contact-box .info-content {
          color: #ffffff;
        }
      `}</style>

      {/* Hero Section + About Section */}
      <section className="section no-break">
        <div style={{ 
          marginBottom: "16pt",
          padding: "12pt 16pt",
          background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
          borderRadius: "8pt",
          border: "1pt solid #e5e7eb"
        }}>
          <h1 style={{ fontSize: "24pt", marginBottom: "6pt" }}>API부터 UI까지 연결하는 개발자</h1>
          <p style={{ fontSize: "10pt", color: "#6b7280", marginTop: "4pt", lineHeight: "1.6" }}>
            빠른 UI, 견고한 API, 실용적인 시스템을 설계합니다. API 설계와 실시간 협업에 집중합니다.
          </p>
        </div>

        <div className="divider" />

        <div style={{ marginTop: "20pt" }}>
          <div className="section-title">
            <span className="section-icon">👤</span>About Me
          </div>
          <h2>나에 대하여</h2>
          
          <div className="info-section">
            <h3>소개</h3>
            <ul style={{ fontSize: "10pt", lineHeight: "1.7" }}>
              <li>AI/RAG에 집중하는 풀스택 엔지니어</li>
              <li>실시간 협업 도구 구축을 즐김</li>
              <li>신뢰성과 UX를 중요시</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>핵심 역량</h3>
            <ul style={{ fontSize: "10pt", lineHeight: "1.7" }}>
              <li>End-to-end 책임감 (UI → 인프라)</li>
              <li>API 설계 + 데이터 모델링</li>
              <li>Docker/AWS/Nginx로 DevOps</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>주요 성과</h3>
            <ul style={{ fontSize: "10pt", lineHeight: "1.7" }}>
              <li>CRDT 기반 라이브 리뷰 도구 구축</li>
              <li>AI 기반 글쓰기 플랫폼 출시</li>
              <li>AWS에 풀스택 앱 배포</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="page-break" />
      <section className="section">
        <div className="contact-box">
          <div className="section-title" style={{ background: "#ffffff", color: "#111827" }}>
            <span className="section-icon">📧</span>Contact
          </div>
          <h2 style={{ color: "#ffffff", borderBottom: "2pt solid #ffffff", marginTop: "8pt" }}>연락하기</h2>
          <div style={{ marginTop: "20pt" }}>
            <p style={{ fontSize: "12pt", lineHeight: "2", marginBottom: "8pt" }}>
              <span className="info-label" style={{ color: "#d1d5db" }}>이메일:</span>
              <span className="info-content" style={{ color: "#ffffff", fontWeight: "600" }}>hy1x1mn@gmail.com</span>
            </p>
            <p style={{ fontSize: "12pt", lineHeight: "2", marginBottom: "8pt" }}>
              <span className="info-label" style={{ color: "#d1d5db" }}>GitHub:</span>
              <span className="info-content" style={{ color: "#ffffff", fontWeight: "600" }}>github.com/hy2min</span>
            </p>
            <p style={{ fontSize: "12pt", lineHeight: "2" }}>
              <span className="info-label" style={{ color: "#d1d5db" }}>LinkedIn:</span>
              <span className="info-content" style={{ color: "#ffffff", fontWeight: "600" }}>linkedin.com/in/hy2min</span>
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div className="page-break" />
      <section className="section">
        <div className="section-title">
          <span className="section-icon">🛠️</span>Tech Stack
        </div>
        <h2>기술 스택</h2>
        <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "20pt", lineHeight: "1.7" }}>
          분야별로 그룹화된 기술들입니다. 각 기술은 실제 프로젝트에서 사용한 경험을 반영합니다.
        </p>

        <div className="info-section category-color-frontend">
          <h3>🎨 Frontend</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>TypeScript</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>React</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Zustand</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>React Query</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>WebRTC</div>
          </div>
        </div>

        <div className="info-section category-color-backend">
          <h3>⚙️ Backend</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Spring Boot</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>FastAPI</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>REST APIs</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>OpenAPI/Swagger</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>WebSocket</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>PostgreSQL</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>MySQL</div>
            <div className="tech-tag-backend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Redis</div>
          </div>
        </div>

        <div className="info-section category-color-devops">
          <h3>☁️ DevOps & Cloud</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Docker</div>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Docker Compose</div>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Nginx</div>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>AWS EC2/S3</div>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>GitHub Actions</div>
            <div className="tech-tag-devops" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>CI/CD</div>
          </div>
        </div>

        <div className="info-section category-color-ai">
          <h3>🤖 AI & Data</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-ai" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>OpenAI API</div>
            <div className="tech-tag-ai" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>LangChain</div>
            <div className="tech-tag-ai" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>RAG</div>
            <div className="tech-tag-ai" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Vector DB</div>
            <div className="tech-tag-ai" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Pinecone</div>
          </div>
        </div>

        <div className="info-section category-color-collab">
          <h3>🤝 Collaboration</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-collab" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Notion</div>
            <div className="tech-tag-collab" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Slack</div>
            <div className="tech-tag-collab" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Figma</div>
            <div className="tech-tag-collab" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Jira</div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {sortedDetailedProjects.map((project, index) => (
        <div key={project.id} className="page-break">
          <section className="section">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12pt" }}>
              <span className="project-badge">{index + 1}</span>
              <div className="section-title">Project {index + 1} of {detailedProjects.length}</div>
            </div>
            <div className="project-header">
              <h1>{project.title}</h1>
              <p style={{ fontSize: "12pt", color: "#6b7280", marginTop: "8pt", lineHeight: "1.7" }}>
                {project.summary}
              </p>
            </div>

            {project.image && (
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ 
                  width: "100%", 
                  marginBottom: "20pt",
                  borderRadius: "8pt",
                  border: "1.5pt solid #e5e7eb",
                  boxShadow: "0 2pt 8pt rgba(0,0,0,0.1)"
                }} 
              />
            )}

            {(project.links?.github || project.links?.demo) && (
              <div style={{ 
                marginBottom: "16pt", 
                padding: "10pt", 
                background: "#f9fafb", 
                borderRadius: "8pt",
                border: "1pt solid #e5e7eb"
              }}>
                <h4 style={{ fontSize: "11pt", fontWeight: "700", marginBottom: "8pt", color: "#111827" }}>🔗 프로젝트 링크</h4>
                <div style={{ display: "flex", gap: "12pt", flexWrap: "wrap" }}>
                  {project.links?.github && (
                    <div style={{ fontSize: "10pt", color: "#374151" }}>
                      <strong style={{ color: "#111827" }}>GitHub:</strong> {project.links.github}
                    </div>
                  )}
                  {project.links?.demo && (
                    <div style={{ fontSize: "10pt", color: "#374151" }}>
                      <strong style={{ color: "#111827" }}>Demo:</strong> {project.links.demo}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="project-content">
              <h3>📋 프로젝트 개요</h3>
              <div className="quote-box" style={{ marginTop: "12pt" }}>
                <p style={{ fontSize: "11pt", lineHeight: "1.8", margin: 0, paddingLeft: "20pt" }}>
                  {project.description}
                </p>
              </div>
            </div>

            <div className="info-section">
              <h3>🛠️ 기술 스택</h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)", 
                gap: "8pt",
                marginTop: "12pt"
              }}>
                {project.tech.map((tech) => (
                  <div key={tech} style={{ 
                    padding: "8pt 10pt", 
                    background: "#ffffff", 
                    border: "1.5pt solid #e5e7eb", 
                    borderRadius: "8pt", 
                    fontSize: "10pt", 
                    fontWeight: "600", 
                    color: "#374151",
                    textAlign: "center"
                  }}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="info-section">
                <h3>✨ 주요 기능</h3>
                <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                  {project.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: "4pt" }}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.roles && project.roles.length > 0 && (
              <div className="info-section">
                <h3>👨‍💻 담당 역할</h3>
                <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                  {project.roles.map((role, i) => (
                    <li key={i} style={{ marginBottom: "4pt" }}>• {role}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.troubleshooting && project.troubleshooting.length > 0 && (
              <div style={{ marginTop: "24pt" }}>
                <h3 style={{ marginBottom: "16pt" }}>🔧 트러블슈팅</h3>
                {project.troubleshooting.map((item, i) => (
                  <div key={i} className="troubleshooting-item">
                    <h4 style={{ fontSize: "12pt", marginBottom: "10pt", color: "#111827", fontWeight: "700" }}>
                      {i + 1}. {item.category}
                    </h4>
                    <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                      <p style={{ marginBottom: "8pt" }}>
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#dc2626" }}>문제</span>
                        <span className="info-content">{item.problem}</span>
                      </p>
                      <p style={{ marginBottom: "8pt" }}>
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#d97706" }}>원인</span>
                        <span className="info-content">{item.cause}</span>
                      </p>
                      <p style={{ marginBottom: "8pt" }}>
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#059669" }}>해결</span>
                        <span className="info-content">{item.solution}</span>
                      </p>
                      {item.reference && (
                        <div className="highlight-box" style={{ marginTop: "10pt" }}>
                          <p style={{ fontSize: "9pt", color: "#92400e", fontFamily: "monospace", lineHeight: "1.6", margin: 0 }}>
                            <strong>근거:</strong> {item.reference}
                          </p>
                        </div>
                      )}
                      {item.note && (
                        <p style={{ marginTop: "8pt", fontSize: "9pt", color: "#6b7280", fontStyle: "italic", paddingLeft: "12pt", borderLeft: "2pt solid #d1d5db" }}>
                          💡 {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ))}
    </div>
  );
};

export default PDFLayout;
