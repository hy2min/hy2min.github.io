import { useEffect } from "react";

// 프로젝트 데이터 (ProjectDetail에서 가져옴)
const detailedProjects = [
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
    image: "/images/tikkletikkle_screen.png",
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
    image: "/images/nost_main.png",
    troubleshooting: [
      {
        category: "대용량 텍스트 저장 성능",
        problem: "본문 저장 시 응답 지연",
        cause: "단일 모델 직접 저장",
        solution: "본문 외부 스토리지 분리(S3)·메타데이터 DB 저장 제안",
        reference: "backend/README.md 구조, 창문 생성 서비스 특성",
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
  {
    id: 3,
    slug: "drug-service",
    title: "Drug Service – RAG 기반 복약 가이드",
    summary:
      "LLM + RAG로 정확하고 안전한 복약 정보를 제공하는 챗봇.",
    description:
      "FastAPI + LangChain + OpenAI. 의약품 데이터 파싱, 벡터 DB 인덱싱, RAG 파이프라인 구성.",
    tech: [
      "FastAPI",
      "LangChain",
      "OpenAI",
      "Pinecone",
      "PostgreSQL",
      "Python",
    ],
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
      github: "https://github.com/hy2min/drug-service",
      demo: "",
    },
    image: "/images/drug_screen.png",
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
        problem: "질의 응답 시간 과다",
        cause: "벡터 검색 후 LLM 호출 순차 처리",
        solution: "비동기 파이프라인 구성, 캐싱 레이어 추가",
        reference: "backend/rag_pipeline.py, 성능 최적화",
      },
    ],
  },
  {
    id: 4,
    slug: "api-spec-editor",
    title: "API Spec Editor – 협업형 API 문서 편집기",
    summary:
      "WebSocket 기반 실시간 협업으로 API 명세서를 작성하고 테스트하는 도구.",
    description:
      "React + TypeScript + Spring Boot. CRDT 기반 동시 편집, OpenAPI 스펙 검증, 코드 스니펫 생성.",
    tech: [
      "React",
      "TypeScript",
      "Spring Boot",
      "WebSocket",
      "CRDT",
      "OpenAPI",
    ],
    roles: [
      "CRDT 기반 실시간 협업 로직 구현",
      "OpenAPI 스펙 파싱/검증 시스템",
      "코드 스니펫 생성 엔진",
    ],
    features: [
      "실시간 동시 편집",
      "API 엔드포인트 테스트",
      "코드 스니펫 자동 생성",
      "버전 관리 및 히스토리",
    ],
    links: {
      github: "https://github.com/hy2min/api-spec-editor",
      demo: "",
    },
    image: "/images/ouroboros_screen.png",
    troubleshooting: [
      {
        category: "FormData 무한 루프",
        problem: "useEffect 무한 루프 발생",
        cause: "상태 업데이트 사이클",
        solution: "useRef로 이전 값 추적, 조건부 업데이트",
        reference:
          "front/src/features/testing/components/RequestBodyForm.tsx, FormDataBodyForm 컴포넌트",
      },
      {
        category: "Node.js 전용 라이브러리 브라우저 호환성",
        problem: "openapi-snippet 브라우저 에러",
        cause: "Node.js 전용 모듈 의존",
        solution: "vite-plugin-node-polyfills 추가",
        reference:
          "front/vite.config.ts, front/src/features/spec/components/CodeSnippetPanel.tsx",
      },
      {
        category: "Basic Auth 다국어 문자 Base64 인코딩",
        problem: "InvalidCharacterError 발생",
        cause: "btoa() ASCII만 처리",
        solution: "UTF-8 안전 인코딩 함수 구현",
        reference: "front/src/utils/encoding.ts, safeBase64 함수",
      },
      {
        category: "JSON 편집기 사용자 경험 개선",
        problem: "들여쓰기/구문 강조 부재",
        cause: "기본 textarea 제한",
        solution: "react-ace 에디터 통합",
        reference:
          "front/src/components/JsonEditor.tsx, react-ace 통합",
      },
      {
        category: "WebSocket 작업 완료 토글 반응성 최적화",
        problem: "토글 클릭 후 지연",
        cause: "비동기 작업 순차 실행",
        solution: "isUpdatingProgressRef 플래그 추가",
        reference:
          "front/src/features/spec/components/ApiEditorLayout.tsx, progress 토글 핸들러",
      },
    ],
  },
];

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
          background: linear-gradient(135deg, #111827 0%, #374151 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        
        .pdf-layout .tech-list {
          margin: 8pt 0;
          padding-left: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8pt;
        }
        
        .pdf-layout .tech-list li {
          margin: 0;
          padding: 8pt 10pt;
          background: #ffffff;
          border: 1.5pt solid #e5e7eb;
          border-radius: 8pt;
          font-size: 10pt;
          font-weight: 600;
          color: #374151;
          text-align: center;
          position: relative;
          transition: all 0.2s;
        }
        
        .pdf-layout .tech-list li:before {
          display: none;
        }
        
        .pdf-layout .tech-list li:hover {
          transform: translateY(-2pt);
          box-shadow: 0 2pt 6pt rgba(0,0,0,0.1);
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
          
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20pt", gap: "8pt" }}>
            <div className="stat-box">
              <div className="stat-number">6+</div>
              <div className="stat-label">프로젝트</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">30+</div>
              <div className="stat-label">기술 스택</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">100%</div>
              <div className="stat-label">Full-Stack</div>
            </div>
          </div>
          
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
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Vite</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Tailwind CSS</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>Zustand</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>React Query</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>React Router</div>
            <div className="tech-tag-frontend" style={{ padding: "10pt", textAlign: "center", borderRadius: "8pt", fontSize: "10pt", fontWeight: "600" }}>MUI</div>
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
      {detailedProjects.map((project, index) => (
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

            <div className="info-section">
              <h3>✨ 주요 기능</h3>
              <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                {project.features.map((feature, i) => (
                  <li key={i} style={{ marginBottom: "4pt" }}>• {feature}</li>
                ))}
              </ul>
            </div>

            <div className="info-section">
              <h3>👨‍💻 담당 역할</h3>
              <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                {project.roles.map((role, i) => (
                  <li key={i} style={{ marginBottom: "4pt" }}>• {role}</li>
                ))}
              </ul>
            </div>

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
            <p style={{ fontSize: "12pt", lineHeight: "2" }}>
              <span className="info-label" style={{ color: "#d1d5db" }}>GitHub:</span>
              <span className="info-content" style={{ color: "#ffffff", fontWeight: "600" }}>github.com/hy2min</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDFLayout;
