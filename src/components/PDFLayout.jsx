import { useEffect } from "react";
import { projects as baseProjects } from "../data/projects";
import { experiences, educations, certifications, awards } from "../data/resume";

// 프로젝트 상세 정보 (ProjectDetail에서 가져옴)
const projectDetails = {
  tikkletikkle: {
    roles: [
      "예·적금 데이터 수집 및 필터링 로직 설계",
      "금융 상품 추천 챗봇 프롬프트 및 대화 흐름 구성",
      "커뮤니티 게시판·댓글 CRUD 및 권한 처리",
      "Kakao Map API 연동 은행 탐색 기능 구현",
      "예·적금 목록, 상세 페이지, 챗봇 UI 개발",
    ],
    troubleshooting: [
      {
        category: "프론트엔드 환경변수(API Key) 노출 문제",
        problem: "API Key가 클라이언트 코드에 노출되어 보안 위험 발생",
        cause: "환경변수를 프론트엔드에서 직접 사용",
        solution: "백엔드 프록시를 통한 API 호출로 전환하여 API Key를 서버에서만 관리하도록 변경",
      },
      {
        category: "CORS 설정 오류로 인한 배포 후 API 접근 실패",
        problem: "배포 환경에서 외부 API 호출 시 CORS 에러 발생",
        cause: "CORS 헤더 설정 미흡 및 Origin 허용 목록 누락",
        solution: "Django CORS 설정에 배포 도메인 추가 및 적절한 CORS 헤더 설정",
      },
      {
        category: "소셜 로그인 Redirect 및 토큰 발급 오류",
        problem: "소셜 로그인 후 리다이렉트 처리 및 토큰 발급 과정에서 오류 발생",
        cause: "콜백 URL 설정 불일치 및 토큰 저장 로직 오류",
        solution: "콜백 URL 검증 로직 추가 및 토큰 저장/관리 로직 개선",
      },
      {
        category: "외부 금융 API 응답 지연에 따른 데이터 로딩 구조 개선",
        problem: "금융감독원 API 응답 지연으로 인한 사용자 대기 시간 증가",
        cause: "동기식 API 호출 및 로딩 상태 관리 부재",
        solution: "비동기 처리 및 로딩 인디케이터 추가, 캐싱 전략 도입",
      },
      {
        category: "LangChain 프롬프트 개선을 통한 AI 추천 정확도 향상",
        problem: "초기 프롬프트로 인한 금융 상품 추천 정확도 부족",
        cause: "프롬프트가 사용자 프로필과 금융 상품 특성을 충분히 반영하지 못함",
        solution: "Few-shot 예시 추가 및 체인 구조 개선으로 컨텍스트 이해도 향상",
      },
    ],
  },
  nost: {
    roles: [
      "AI 소설 생성 플로우 설계(3가지 추천안 제시 → 선택/수정 → 최종 생성)",
      "LangChain 기반 생성 파이프라인 및 프롬프트 구성",
      "커뮤니티 피드/댓글 기능 설계 및 화면 구성",
      "AI 이미지 생성(DALL·E) 연동 및 결과 저장/표시",
      "다국어(번역) 유틸/컴포넌트 정리(DeepL)",
    ],
    troubleshooting: [
      {
        category: "장문 생성 결과 저장/조회 성능",
        problem: "소설 본문 저장 및 조회 시 응답 지연이 발생",
        cause: "DB에 장문 텍스트를 직접 저장/조회하며 인덱스 및 페이징 전략이 미흡",
        solution: "본문은 파일/오브젝트 스토리지로 분리하고, DB에는 메타데이터(제목/요약/작성자/참조키) 중심으로 저장하도록 구조를 분리",
        reference: "backend/README.md 구조, 장문 생성 서비스 특성",
      },
      {
        category: "이미지 생성 실패(429/간헐적 오류)",
        problem: "AI 이미지 생성 요청이 간헐적으로 실패하거나 429가 발생",
        cause: "외부 생성 API 쿼터/레이트리밋 및 동시 요청 제어 부재",
        solution: "요청 큐/쿨다운/지수 백오프 리트라이를 적용하고 사용자별 레이트리밋을 추가해 실패율을 낮춤",
        reference:
          "frontend 비동기 호출 구조, 생성형 워크플로우",
      },
      {
        category: "추천 3안 생성 지연",
        problem: "3가지 추천안을 생성하는 단계에서 대기 시간이 길어져 이탈이 발생",
        cause: "추천안 3개를 순차 생성하고 결과를 한 번에 렌더링",
        solution: "병렬 생성 + 부분 렌더링(첫 결과부터 즉시 표시), 동일 조건 요청 캐시로 반복 요청 비용을 줄임",
      },
    ],
  },
  "drug-service": {
    roles: [
      "FastAPI 기반 RESTful API 설계 및 구현",
      "LangChain과 Pinecone을 활용한 RAG 파이프라인 구축",
      "RetrievalQA 체인을 통한 검색-생성 시스템 개발",
      "Pinecone 벡터 인덱스 설계 및 구축",
      "공공데이터 전처리 및 벡터화",
      "Upstage Solar Pro와 OpenAI API 통합",
      "RAGAS를 활용한 RAG 시스템 정량적 평가",
      "Docker 컨테이너화 및 Fly.io 배포",
      "AWS Lambda 서버리스 배포 옵션 구현",
    ],
    troubleshooting: [
      {
        category: "RAG 검색 지연 문제",
        problem: "임베딩/벡터 쿼리 대기 시간으로 인한 질의 응답 지연",
        cause: "Top-K 값이 과대하여 벡터 검색 시간 증가 및 캐싱 전략 부재",
        solution: "Top-K 값 축소, LRU 캐시 구현, 요약 단계 캐싱으로 응답 시간 단축",
      },
      {
        category: "한글 PDF 파싱 인코딩 오류",
        problem: "EUC-KR 인코딩 문서 파싱 오류 발생",
        cause: "전처리 단계에서 인코딩 변환 처리 미흡",
        solution: "UTF-8 강제 변환 처리 및 예외 처리 파이프라인 구축으로 안정적인 데이터 파싱 구현",
      },
      {
        category: "프론트엔드 CORS 및 배포 환경 이슈",
        problem: "API 호출 시 CORS 에러 발생",
        cause: "프록시 및 헤더 설정 정합 부재, 빌드 타깃 환경 분리 미흡",
        solution: "프록시 및 헤더 설정 정합, 빌드 타깃 환경 분리로 CORS 문제 해결",
      },
    ],
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
        problem: "Canvas → 이벤트 로그 → Yorkie 시도 과정에서 동시 편집 충돌 발생",
        cause: "기존 기술 스택으로는 실시간 협업 동기화가 불안정",
        solution: "TLDraw + Yjs 조합으로 전환하여 백엔드에 YjsWebSocketHandler 구현, CRDT 기반 안정적인 동시 편집 지원",
      },
      {
        category: "연결 실패(음성 채팅) - WebRTC / Audio Chat",
        problem: "OpenVidu 토큰 연결 지연·타임아웃으로 인한 세션 연결 불가 및 재시도 루프",
        cause: "OpenVidu 토큰 연결 시 타임아웃 설정 부재 및 에러 처리 미흡",
        solution: "Promise.race 기반 10초 타임아웃 구현, 재시도/에러 상태 관리 추가로 안정성 향상",
      },
      {
        category: "참가자 목록 동기화 누락",
        problem: "connectionCreated/Destroyed 이벤트 처리 부재로 인한 트랙 소실/유저명 미표시",
        cause: "세션 이벤트 리스너 미구현",
        solution: "세션 이벤트 리스너 추가 및 connectedParticipants 상태 동기화로 실시간 참가자 정보 관리",
      },
      {
        category: "채팅룸 진입 안정성",
        problem: "화면 전환 시 세션/소켓 혼선으로 인한 채팅룸 진입 실패",
        cause: "페이지 단위 초기화 순서 불안정 및 소유자 권한 체크 부재",
        solution: "페이지 가드·소유자 권한 체크 추가, joinSession(roomId) 지연 호출로 안정성 개선",
      },
      {
        category: "BE/인프라 - OpenVidu 환경 불일치",
        problem: "서버/환경변수 미정합으로 인한 세션 생성 실패",
        cause: "OpenVidu 서버 설정 및 포트/인증 설정 누락",
        solution: "OpenViduServiceImpl 세션 생성 분리, docker-compose에 openvidu-server:2.31.0 구성, 4443 포트 노출",
      },
      {
        category: "FE 안정화 - 충돌 파일 로딩 실패",
        problem: "PR 상세/충돌 파일 로딩 오류",
        cause: "분기 병합 후 경로·상태 불일치",
        solution: "파일 로딩 로직 보정 및 상태 동기화 개선",
      },
    ],
  },
  orakgarak: {
    roles: [
      "프론트엔드 UI/UX 개선 (추천 페이지 텍스트 배치 및 반응형 최적화, 앨범 상세 페이지 작성자 정보 표시 형식 개선, 녹음 페이지 폰트 스타일 통일)",
      "피드 페이지 레이아웃 개선 (Sticky 탭 구현으로 스크롤 중 네비게이션 편의성 향상, backdrop-filter를 활용한 반투명 배경 효과 적용, 탭 전환 애니메이션 및 초기화 트랜지션 추가)",
      "Spring Boot 기반 백엔드 앨범 CRUD 기능 구현 (AlbumController/AlbumService를 통한 앨범 생성·조회·수정·삭제 API 개발, AlbumTrackService를 통한 트랙 관리 및 권한 검증 로직 구현, JPA Repository 및 DTO 패턴을 활용한 계층 구조 설계)",
      "앨범 CRUD, 피드·댓글·좋아요 API 연동 및 프론트엔드 UI 구성",
      "프론트엔드 빌드 최적화 및 번들 관리, Git LFS를 통한 대용량 파일 관리 체계화",
    ],
    troubleshooting: [
      {
        category: "프론트 빌드 번들 과대",
        problem: "Phaser 라이브러리 및 대용량 게임 에셋 포함으로 인한 초기 로딩 지연",
        cause: "모든 리소스를 하나의 번들에 포함하여 초기 로딩 시간 증가",
        solution: "코드 스플리팅 및 Phaser 정적 파일 분리로 번들 크기 최적화, 지연 로딩 전략 적용",
      },
      {
        category: "Sticky 탭과 헤더 z-index 충돌",
        problem: "피드 페이지에서 스크롤 시 탭이 사라지는 문제",
        cause: "FeedTabs 컴포넌트의 sticky positioning과 헤더의 z-index 충돌",
        solution: "FeedTabs 컴포넌트에 sticky positioning 적용 및 헤더와의 z-index 충돌 해결로 스크롤 중에도 탭이 유지되도록 개선",
      },
      {
        category: "반응형 레이아웃 오버플로우 문제",
        problem: "Material-UI Container 컴포넌트가 뷰포트 너비를 초과하여 모바일 환경에서 가로 스크롤 발생",
        cause: "전역 CSS에 max-width 제한 부재 및 Container 설정 미조정",
        solution: "전역 CSS에 max-width 제한 추가 및 Container 설정 조정으로 반응형 레이아웃 안정화",
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
        problem: "Call Trace 모달에서 특정 메서드를 클릭했을 때, 해당 span이 트리 깊숙이 있어 사용자가 수동으로 부모 노드들을 모두 확장해야 하는 UX 문제",
        cause: "중첩된 트리 구조에서 특정 노드를 찾고, 루트부터 해당 노드까지의 모든 경로를 자동으로 확장하는 로직 부재",
        solution: "재귀 함수로 해당 메서드까지 가는 경로의 모든 부모 노드를 자동으로 찾아서 한 번에 확장되도록 구현",
      },
      {
        category: "FormDataBodyForm 무한 업데이트 루프 해결",
        problem: "FormData 입력 필드에서 값을 변경하면 onChange → JSON 변환 → value 업데이트 → useEffect 실행 → 다시 onChange 호출이 반복되는 무한 루프 발생",
        cause: "useEffect에서 formData가 변경될 때마다 onChange를 호출하고, onChange가 부모 컴포넌트의 상태를 변경하여 다시 value prop으로 전달됨",
        solution: "useRef로 이전 값을 저장해두고, 실제로 값이 바뀐 경우에만 업데이트하도록 수정",
      },
      {
        category: "JSON 편집기 사용자 경험 개선",
        problem: "기본 textarea로는 JSON을 편집할 때 들여쓰기가 맞지 않고, 오타를 찾기 어려움",
        cause: "기본 HTML textarea는 코드 편집 기능이 제한적",
        solution: "react-ace 라이브러리를 사용해 코드 에디터처럼 들여쓰기 자동 정렬, 색상으로 구문 강조, 자동 완성 기능 추가",
      },
      {
        category: "Node.js 전용 라이브러리 브라우저 호환성 문제",
        problem: "코드 스니펫 생성에 사용하는 openapi-snippet 라이브러리가 Node.js 환경용이라 브라우저에서 실행 시 에러 발생",
        cause: "openapi-snippet은 Node.js 환경을 가정하고 설계된 라이브러리로, Node.js 전용 모듈(stream, string_decoder, qs 등)에 의존",
        solution: "vite-plugin-node-polyfills 플러그인을 추가해 Node.js 기능을 브라우저에서도 사용할 수 있도록 해결",
      },
      {
        category: "WebSocket 작업 완료 토글 반응성 최적화",
        problem: "작업 완료 상태를 변경할 때 서버 응답을 기다리는 동안 버튼이 반응하지 않아 사용자가 여러 번 클릭하는 문제",
        cause: "업데이트 중임을 표시하는 플래그 부재",
        solution: "업데이트 중임을 표시하는 플래그를 사용해, 업데이트가 진행 중일 때는 외부 변경을 무시하고 완료되면 즉시 화면에 반영되도록 개선",
      },
      {
        category: "Basic Auth 다국어 문자 Base64 인코딩 처리",
        problem: "Basic Auth에서 한글이 포함된 아이디/비밀번호를 인코딩할 때 브라우저 기본 함수(btoa)가 ASCII 문자만 지원해서 에러 발생",
        cause: "btoa 함수는 UTF-8 문자를 직접 처리할 수 없음",
        solution: "UTF-8 문자를 안전하게 인코딩하는 safeBase64 함수를 만들어서 해결",
      },
      {
        category: "React 모달 상태 기반 조건부 데이터 리프레시 패턴",
        problem: "모달을 닫은 상태에서 데이터가 변경되어도, 모달을 다시 열었을 때 이전 데이터가 그대로 보임",
        cause: "모달이 열릴 때 최신 데이터를 가져오는 로직 부재",
        solution: "모달이 열릴 때(isOpen이 true가 될 때)마다 최신 데이터를 서버에서 가져오도록 useEffect를 설정해 항상 최신 정보를 보여주도록 수정",
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

// 프로젝트 순서 정의: ouroboros -> ottereview -> orakgarak -> drug_service -> tikkletikkle -> nost
const projectOrder = ["ouroboros", "ottereview", "orakgarak", "drug-service", "tikkletikkle", "nost"];
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
          /* 페이지 단위 여백: 페이지 전환 시 상단이 붙는 문제 해결 */
          margin: 22mm 15mm 15mm 15mm;
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
          /* @page margin으로 페이지별 여백을 주기 때문에, 컨테이너 패딩은 최소화 */
          width: auto;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans KR', sans-serif;
          background: white;
          margin: 0;
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
          margin: 24pt 0 16pt 0;
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
          margin: 16pt 0 10pt 0;
          color: #111827;
          padding: 0;
          border-left: none;
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
          margin-top: 8pt;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout .page-break {
          page-break-before: always;
          break-before: page;
        }
        
        .pdf-layout .page-break + .section {
          margin-top: 16pt;
        }
        
        .pdf-layout .no-break {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout .project-item {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 20pt;
        }
        
        .pdf-layout .experience-item,
        .pdf-layout .education-item,
        .pdf-layout .certification-item,
        .pdf-layout .award-item {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 16pt;
        }
        
        .pdf-layout ul li,
        .pdf-layout ol li {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout .info-section {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout img {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout h1,
        .pdf-layout h2,
        .pdf-layout h3,
        .pdf-layout h4 {
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .pdf-layout p {
          orphans: 3;
          widows: 3;
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

        /* 상세 프로젝트 상단 메타(페이지 표기) */
        .pdf-layout .project-meta {
          font-size: 9pt;
          font-weight: 800;
          color: #6b7280;
          letter-spacing: 0.6pt;
          text-transform: uppercase;
          white-space: nowrap;
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
          page-break-inside: avoid;
          break-inside: avoid;
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
          padding: 16pt;
          background: #f9fafb;
          border-radius: 8pt;
          border: 1.5pt solid #e5e7eb;
          box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);
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
          padding: 16pt;
          background: #ffffff;
          border: 1.5pt solid #e5e7eb;
          border-radius: 8pt;
          page-break-inside: avoid;
          box-shadow: 0 2pt 6pt rgba(0,0,0,0.08);
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

        /* 트러블슈팅: 라벨/본문 2열 정렬 */
        .pdf-layout .troubleshooting-row {
          display: grid;
          grid-template-columns: 52pt 1fr;
          column-gap: 10pt;
          align-items: start;
          margin-bottom: 8pt;
        }

        .pdf-layout .troubleshooting-row .troubleshooting-label {
          margin-right: 0;
          text-align: center;
        }

        .pdf-layout .troubleshooting-row .troubleshooting-text {
          color: #374151;
          line-height: 1.8;
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
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .pdf-layout .highlight-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 12pt;
          border-radius: 8pt;
          border: 1.5pt solid #f59e0b;
          margin: 12pt 0;
          box-shadow: 0 2pt 4pt rgba(245, 158, 11, 0.1);
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

      {/* 1. 소개 (Hero) */}
      <section className="section no-break">
        <div style={{ 
          display: "flex",
          gap: "20pt",
          alignItems: "flex-start",
          marginBottom: "20pt",
          padding: "20pt",
          background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
          borderRadius: "12pt",
          border: "1.5pt solid #e5e7eb"
        }}>
          {/* 프로필 사진 */}
          <div style={{ flexShrink: 0 }}>
            <img 
              src="/images/증명사진_누끼.png" 
              alt="이혜민"
              style={{
                width: "120pt",
                height: "160pt",
                objectFit: "contain",
                borderRadius: "8pt",
                border: "2pt solid #e5e7eb",
                boxShadow: "0 4pt 12pt rgba(0,0,0,0.1)"
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* 텍스트 정보 */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "28pt", marginBottom: "12pt", color: "#111827", fontWeight: "900" }}>
              이혜민
            </h1>
            <h2 style={{ fontSize: "18pt", marginBottom: "16pt", color: "#374151", fontWeight: "700" }}>
              API부터 UI까지 연결하는 개발자
            </h2>
            <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "20pt", lineHeight: "1.7" }}>
              빠른 UI, 견고한 API, 실용적인 시스템을 설계합니다. API 설계와 실시간 협업에 집중합니다.
            </p>

            {/* 연락처 정보 */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8pt",
              padding: "12pt",
              background: "#ffffff",
              borderRadius: "8pt",
              border: "1pt solid #e5e7eb"
            }}>
              <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>이메일</strong>
                <span style={{ color: "#374151" }}>hy1x1mn@gmail.com</span>
              </div>
              <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>GitHub</strong>
                <span style={{ color: "#374151" }}>github.com/hy2min</span>
              </div>
              <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>LinkedIn</strong>
                <span style={{ color: "#374151" }}>linkedin.com/in/hy2min</span>
              </div>
              <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>Notion</strong>
                <span style={{ color: "#374151" }}>포트폴리오</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 프로젝트 목록 */}
      <section className="section">
        <div className="section-title">
          Projects
        </div>
        <h2>프로젝트 목록</h2>
        <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "20pt", lineHeight: "1.7" }}>
          주요 프로젝트 목록입니다. 각 프로젝트의 상세 정보는 다음 페이지에서 확인할 수 있습니다.
        </p>
        <div className="info-section">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "12pt",
            marginTop: "12pt"
          }}>
            {sortedDetailedProjects.map((project, index) => {
              // 각 프로젝트의 시작 페이지 계산: 소개(1) + 목록(1) + 이전 프로젝트들(각 평균 2페이지)
              // 실제로는 프로젝트 내용에 따라 다르지만, 대략적인 추정값
              const estimatedStartPage = 3 + index * 2;
              const projectName = String(project.title || "")
                .split("·")[0]
                .split("•")[0]
                .trim();
              
              return (
                <div key={project.id} className="project-item" style={{
                  padding: "12pt",
                  background: "#ffffff",
                  border: "1.5pt solid #e5e7eb",
                  borderRadius: "8pt",
                  position: "relative"
                }}>
                  {/* 페이지 번호 표시 (우측 상단) */}
                  <div style={{
                    position: "absolute",
                    top: "8pt",
                    right: "8pt",
                    fontSize: "9pt",
                    fontWeight: "700",
                    color: "#111827",
                    background: "#f3f4f6",
                    padding: "4pt 8pt",
                    borderRadius: "4pt",
                    border: "1pt solid #e5e7eb"
                  }}>
                    p.{estimatedStartPage}
                  </div>
                  
                  {/* 프로젝트 번호와 제목 */}
                  <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "6pt", paddingRight: "50pt" }}>
                    <span className="project-badge" style={{ width: "24pt", height: "24pt", fontSize: "12pt", flexShrink: 0 }}>{index + 1}</span>
                    <h4 style={{ margin: 0, fontSize: "11pt", fontWeight: "700", lineHeight: "1.4" }}>{projectName}</h4>
                  </div>
                  
                  {/* 한줄 설명 (별도 줄) */}
                  <p style={{ fontSize: "9pt", color: "#6b7280", lineHeight: "1.6", margin: "0 0 8pt 0", paddingLeft: "32pt" }}>
                    {project.summary}
                  </p>
                  
                  {/* 메타 정보 (기간/인원/역할) */}
                  {(project.period || project.teamSize || project.myRole) && (
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8pt",
                      fontSize: "8pt",
                      color: "#9ca3af",
                      paddingLeft: "32pt"
                    }}>
                      {project.period && (
                        <span><strong style={{ color: "#6b7280" }}>기간:</strong> {project.period}</span>
                      )}
                      {project.teamSize && (
                        <span><strong style={{ color: "#6b7280" }}>팀:</strong> {project.teamSize}명</span>
                      )}
                      {project.myRole && project.myRole.length > 0 && (
                        <span><strong style={{ color: "#6b7280" }}>역할:</strong> {project.myRole.join(", ")}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 상세 프로젝트 */}
      {sortedDetailedProjects.map((project, index) => (
        <div key={project.id} className="page-break">
          <section className="section">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12pt" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="project-badge">{index + 1}</span>
                <div className="project-meta">
                  Project {index + 1} / {detailedProjects.length}
                </div>
              </div>
            </div>
            <div className="project-header">
              <h1>{project.title}</h1>
              <p style={{ fontSize: "11pt", color: "#6b7280", marginTop: "8pt", lineHeight: "1.7" }}>
                {project.summary}
              </p>
              
              {/* 프로젝트 메타 정보 (기간, 팀 인원, 역할) */}
              {(project.period || project.teamSize || project.myRole) && (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12pt",
                  marginTop: "12pt",
                  paddingTop: "12pt",
                  borderTop: "1pt solid #e5e7eb"
                }}>
                  {project.period && (
                    <div style={{ fontSize: "10pt", lineHeight: "1.6" }}>
                      <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>개발 기간</strong>
                      <span style={{ color: "#374151" }}>{project.period}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div style={{ fontSize: "10pt", lineHeight: "1.6" }}>
                      <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>팀 인원</strong>
                      <span style={{ color: "#374151" }}>{project.teamSize}명</span>
                    </div>
                  )}
                  {project.myRole && project.myRole.length > 0 && (
                    <div style={{ fontSize: "10pt", lineHeight: "1.6" }}>
                      <strong style={{ color: "#111827", display: "block", marginBottom: "2pt" }}>담당 역할</strong>
                      <div style={{ display: "flex", gap: "4pt", flexWrap: "wrap" }}>
                        {project.myRole.map((role, i) => (
                          <span key={i} style={{
                            padding: "3pt 8pt",
                            background: role === "FE" ? "#dbeafe" : role === "BE" ? "#d1fae5" : role === "AI" ? "#ede9fe" : "#f3f4f6",
                            border: `1pt solid ${role === "FE" ? "#3b82f6" : role === "BE" ? "#10b981" : role === "AI" ? "#8b5cf6" : "#9ca3af"}`,
                            borderRadius: "4pt",
                            fontSize: "9pt",
                            fontWeight: "700",
                            color: role === "FE" ? "#1e40af" : role === "BE" ? "#065f46" : role === "AI" ? "#5b21b6" : "#374151"
                          }}>
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                <h4 style={{ fontSize: "11pt", fontWeight: "700", marginBottom: "8pt", color: "#111827" }}>프로젝트 링크</h4>
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

            <div
              className="project-content"
              style={
                project.slug === "orakgarak" || project.slug === "nost"
                  ? { breakBefore: "page", pageBreakBefore: "always" }
                  : undefined
              }
            >
              <h3>프로젝트 개요</h3>
              <div className="quote-box" style={{ marginTop: "12pt" }}>
                <p style={{ fontSize: "11pt", lineHeight: "1.8", margin: 0, paddingLeft: "20pt" }}>
                  {project.description}
                </p>
              </div>
            </div>

            <div className="info-section">
              <h3>기술 스택</h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6pt",
                marginTop: "12pt"
              }}>
                {project.tech.map((tech) => (
                  <div key={tech} style={{
                    padding: "6pt 10pt",
                    background: "#ffffff",
                    border: "1.5pt solid #e5e7eb",
                    borderRadius: "999pt",
                    fontSize: "10pt",
                    fontWeight: "700",
                    color: "#374151",
                    lineHeight: "1",
                    whiteSpace: "nowrap"
                  }}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="info-section">
                <h3>주요 기능</h3>
                <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                  {project.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: "4pt" }}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.roles && project.roles.length > 0 && (
              <div className="info-section">
                <h3>담당 역할</h3>
                <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt" }}>
                  {project.roles.map((role, i) => (
                    <li key={i} style={{ marginBottom: "4pt" }}>• {role}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.troubleshooting && project.troubleshooting.length > 0 && (
              <div style={{ marginTop: "24pt" }}>
                <h3 style={{ marginBottom: "16pt" }}>트러블슈팅</h3>
                {project.troubleshooting.map((item, i) => (
                  <div key={i} className="troubleshooting-item">
                    <h4 style={{ fontSize: "12pt", marginBottom: "10pt", color: "#111827", fontWeight: "700" }}>
                      {i + 1}. {item.category}
                    </h4>
                    <div style={{ fontSize: "10pt", lineHeight: "1.8" }}>
                      <div className="troubleshooting-row">
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#dc2626" }}>문제</span>
                        <span className="troubleshooting-text">{item.problem}</span>
                      </div>
                      <div className="troubleshooting-row">
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#d97706" }}>원인</span>
                        <span className="troubleshooting-text">{item.cause}</span>
                      </div>
                      <div className="troubleshooting-row">
                        <span className="troubleshooting-label" style={{ color: "#ffffff", background: "#059669" }}>해결</span>
                        <span className="troubleshooting-text">{item.solution}</span>
                      </div>
                      {item.note && (
                        <p style={{ marginTop: "8pt", fontSize: "9pt", color: "#6b7280", fontStyle: "italic", paddingLeft: "12pt", borderLeft: "2pt solid #d1d5db" }}>
                          참고: {item.note}
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

      {/* 4. 스킬 */}
      <section className="section">
        <div className="section-title">
          Tech Stack
        </div>
        <h2>기술 스택</h2>
        <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "20pt", lineHeight: "1.7" }}>
          분야별로 그룹화된 기술들입니다. 각 기술은 실제 프로젝트에서 사용한 경험을 반영합니다.
        </p>

        <div className="info-section category-color-frontend">
          <h3>Frontend</h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "6pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-frontend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #3b82f6", boxShadow: "0 2pt 4pt rgba(59, 130, 246, 0.2)" }}>TypeScript</div>
            <div className="tech-tag-frontend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #3b82f6", boxShadow: "0 2pt 4pt rgba(59, 130, 246, 0.2)" }}>React</div>
            <div className="tech-tag-frontend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #3b82f6", boxShadow: "0 2pt 4pt rgba(59, 130, 246, 0.2)" }}>Zustand</div>
            <div className="tech-tag-frontend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #3b82f6", boxShadow: "0 2pt 4pt rgba(59, 130, 246, 0.2)" }}>React Query</div>
            <div className="tech-tag-frontend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #3b82f6", boxShadow: "0 2pt 4pt rgba(59, 130, 246, 0.2)" }}>WebRTC</div>
          </div>
        </div>

        <div className="info-section category-color-backend">
          <h3>Backend</h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "6pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>Spring Boot</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>FastAPI</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>REST APIs</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>OpenAPI/Swagger</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>WebSocket</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>PostgreSQL</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>MySQL</div>
            <div className="tech-tag-backend" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #10b981", boxShadow: "0 2pt 4pt rgba(16, 185, 129, 0.2)" }}>Redis</div>
          </div>
        </div>

        <div className="info-section category-color-devops">
          <h3>DevOps & Cloud</h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "6pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>Docker</div>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>Docker Compose</div>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>Nginx</div>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>AWS EC2/S3</div>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>GitHub Actions</div>
            <div className="tech-tag-devops" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #f59e0b", boxShadow: "0 2pt 4pt rgba(245, 158, 11, 0.2)" }}>CI/CD</div>
          </div>
        </div>

        <div className="info-section category-color-ai">
          <h3>AI & Data</h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "6pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-ai" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #8b5cf6", boxShadow: "0 2pt 4pt rgba(139, 92, 246, 0.2)" }}>OpenAI API</div>
            <div className="tech-tag-ai" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #8b5cf6", boxShadow: "0 2pt 4pt rgba(139, 92, 246, 0.2)" }}>LangChain</div>
            <div className="tech-tag-ai" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #8b5cf6", boxShadow: "0 2pt 4pt rgba(139, 92, 246, 0.2)" }}>RAG</div>
            <div className="tech-tag-ai" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #8b5cf6", boxShadow: "0 2pt 4pt rgba(139, 92, 246, 0.2)" }}>Vector DB</div>
            <div className="tech-tag-ai" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #8b5cf6", boxShadow: "0 2pt 4pt rgba(139, 92, 246, 0.2)" }}>Pinecone</div>
          </div>
        </div>

        <div className="info-section category-color-collab">
          <h3>Collaboration</h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "6pt",
            marginTop: "12pt"
          }}>
            <div className="tech-tag-collab" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #ec4899", boxShadow: "0 2pt 4pt rgba(236, 72, 153, 0.2)" }}>Notion</div>
            <div className="tech-tag-collab" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #ec4899", boxShadow: "0 2pt 4pt rgba(236, 72, 153, 0.2)" }}>Slack</div>
            <div className="tech-tag-collab" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #ec4899", boxShadow: "0 2pt 4pt rgba(236, 72, 153, 0.2)" }}>Figma</div>
            <div className="tech-tag-collab" style={{ padding: "8pt 14pt", textAlign: "center", borderRadius: "20pt", fontSize: "11pt", fontWeight: "700", border: "2pt solid #ec4899", boxShadow: "0 2pt 4pt rgba(236, 72, 153, 0.2)" }}>Jira</div>
          </div>
        </div>
      </section>

      {/* 5. 경험 */}
      <div className="page-break" />
      <section className="section">
        <div className="section-title">
          Experience
        </div>
        <h2>경험</h2>
        {experiences.length > 0 ? (
          <div style={{ marginTop: "20pt" }}>
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item" style={{
                padding: "16pt",
                background: "#ffffff",
                border: "1.5pt solid #e5e7eb",
                borderRadius: "8pt",
                marginBottom: "16pt",
                boxShadow: "0 2pt 6pt rgba(0,0,0,0.08)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8pt" }}>
                  <div>
                    <h3 style={{ fontSize: "14pt", margin: "0 0 4pt 0", color: "#111827" }}>{exp.position}</h3>
                    <h4 style={{ fontSize: "12pt", margin: 0, color: "#6b7280", fontWeight: "600" }}>{exp.company}</h4>
                  </div>
                  <div style={{ fontSize: "10pt", color: "#6b7280", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {exp.period}
                  </div>
                </div>
                {exp.description && (
                  <p style={{ fontSize: "10pt", color: "#374151", lineHeight: "1.6", marginBottom: "8pt" }}>
                    {exp.description}
                  </p>
                )}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt", paddingLeft: "18pt" }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={{ marginBottom: "4pt", color: "#374151" }}>• {resp}</li>
                    ))}
                  </ul>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div style={{ marginTop: "12pt", paddingTop: "12pt", borderTop: "1pt solid #e5e7eb" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6pt" }}>
                      {exp.technologies.map((tech, i) => (
                        <span key={i} style={{
                          padding: "4pt 8pt",
                          background: "#f9fafb",
                          border: "1pt solid #e5e7eb",
                          borderRadius: "4pt",
                          fontSize: "9pt",
                          color: "#374151",
                          fontWeight: "600"
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="info-section" style={{ marginTop: "20pt" }}>
            <p style={{ fontSize: "10pt", color: "#6b7280", fontStyle: "italic" }}>
              경험 정보를 추가해주세요. (src/data/resume.ts 파일에서 experiences 배열을 수정하세요)
            </p>
          </div>
        )}
      </section>

      {/* 6. 교육 */}
      <div className="page-break" />
      <section className="section">
        <div className="section-title">
          Education
        </div>
        <h2>교육</h2>
        {educations.length > 0 ? (
          <div style={{ marginTop: "20pt" }}>
            {educations.map((edu, index) => (
              <div key={index} className="education-item" style={{
                padding: "16pt",
                background: "#ffffff",
                border: "1.5pt solid #e5e7eb",
                borderRadius: "8pt",
                marginBottom: "16pt",
                boxShadow: "0 2pt 6pt rgba(0,0,0,0.08)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8pt" }}>
                  <div>
                    <h3 style={{ fontSize: "14pt", margin: "0 0 4pt 0", color: "#111827" }}>{edu.school}</h3>
                    <h4 style={{ fontSize: "12pt", margin: "0 0 4pt 0", color: "#6b7280", fontWeight: "600" }}>
                      {edu.major} · {edu.degree}
                    </h4>
                  </div>
                  <div style={{ fontSize: "10pt", color: "#6b7280", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {edu.period}
                  </div>
                </div>
                {edu.description && (
                  <p style={{ fontSize: "10pt", color: "#374151", lineHeight: "1.6", marginBottom: "8pt" }}>
                    {edu.description}
                  </p>
                )}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul style={{ fontSize: "10pt", lineHeight: "1.8", marginTop: "8pt", paddingLeft: "18pt" }}>
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} style={{ marginBottom: "4pt", color: "#374151" }}>• {achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="info-section" style={{ marginTop: "20pt" }}>
            <p style={{ fontSize: "10pt", color: "#6b7280", fontStyle: "italic" }}>
              교육 정보를 추가해주세요. (src/data/resume.ts 파일에서 educations 배열을 수정하세요)
            </p>
          </div>
        )}
      </section>

      {/* 7. 자격증 */}
      <div className="page-break" />
      <section className="section">
        <div className="section-title">
          Certification
        </div>
        <h2>자격증</h2>
        {certifications.length > 0 ? (
          <div style={{ marginTop: "20pt" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: "12pt"
            }}>
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item" style={{
                  padding: "16pt",
                  background: "#ffffff",
                  border: "1.5pt solid #e5e7eb",
                  borderRadius: "8pt",
                  boxShadow: "0 2pt 6pt rgba(0,0,0,0.08)"
                }}>
                  <h3 style={{ fontSize: "12pt", margin: "0 0 6pt 0", color: "#111827" }}>{cert.name}</h3>
                  <div style={{ fontSize: "10pt", color: "#6b7280", marginBottom: "4pt" }}>
                    <strong>발급기관:</strong> {cert.issuer}
                  </div>
                  <div style={{ fontSize: "10pt", color: "#6b7280", marginBottom: "4pt" }}>
                    <strong>취득일:</strong> {cert.date}
                  </div>
                  {cert.credentialId && (
                    <div style={{ fontSize: "9pt", color: "#9ca3af", fontFamily: "monospace", marginTop: "6pt" }}>
                      ID: {cert.credentialId}
                    </div>
                  )}
                  {cert.description && (
                    <p style={{ fontSize: "9pt", color: "#374151", lineHeight: "1.6", marginTop: "8pt" }}>
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="info-section" style={{ marginTop: "20pt" }}>
            <p style={{ fontSize: "10pt", color: "#6b7280", fontStyle: "italic" }}>
              자격증 정보를 추가해주세요. (src/data/resume.ts 파일에서 certifications 배열을 수정하세요)
            </p>
          </div>
        )}
      </section>

      {/* 8. 수상내역 */}
      <div className="page-break" />
      <section className="section">
        <div className="section-title">
          Awards
        </div>
        <h2>수상내역</h2>
        {awards.length > 0 ? (
          <div style={{ marginTop: "20pt" }}>
            {awards.map((award, index) => (
              <div key={index} className="award-item" style={{
                padding: "16pt",
                background: "#ffffff",
                border: "1.5pt solid #e5e7eb",
                borderRadius: "8pt",
                marginBottom: "12pt",
                boxShadow: "0 2pt 6pt rgba(0,0,0,0.08)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6pt" }}>
                  <h3 style={{ fontSize: "13pt", margin: 0, color: "#111827", fontWeight: "700" }}>{award.name}</h3>
                  <div style={{ fontSize: "10pt", color: "#6b7280", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {award.date}
                  </div>
                </div>
                <div style={{ fontSize: "10pt", color: "#6b7280" }}>
                  <strong>수여 기관:</strong> {award.issuer}
                </div>
                {award.description && (
                  <p style={{ fontSize: "9pt", color: "#374151", lineHeight: "1.6", marginTop: "8pt" }}>
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="info-section" style={{ marginTop: "20pt" }}>
            <p style={{ fontSize: "10pt", color: "#6b7280", fontStyle: "italic" }}>
              수상내역 정보를 추가해주세요. (src/data/resume.ts 파일에서 awards 배열을 수정하세요)
            </p>
          </div>
        )}
      </section>

    </div>
  );
};

export default PDFLayout;
