export type LegacyProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  roles?: string[];
  features?: string[];
  links: { github?: string; demo?: string };
  image: string;
  gallery?: string[];
  tags?: string[];
  category?: "AI" | "Frontend" | "Backend" | "DevOps" | "Fullstack";
};

export const projects: LegacyProject[] = [
  {
    id: 5,
    slug: "orakgarak",
    title: "Orakgarak · Vocal Analysis & AI Covers",
    summary:
      "Interactive vocal analysis and AI cover generation with community features.",
    description:
      "React (Vite + Tailwind + MUI) frontend, Spring Boot backend. Features include segment analysis, AI cover generation, likes/bookmarks, and deployment via Docker Compose.",
    tech: [
      "React",
      "Tailwind",
      "MUI",
      "Framer Motion",
      "Zustand",
      "Spring Boot",
      "Redis",
      "MySQL",
      "Docker",
    ],
    links: { github: "https://github.com/hy2min/orakgarak", demo: "" },
    image: "/images/orakgarak_screen.png",
    gallery: ["/images/orak-1.png", "/images/orak-2.png", "/images/orak-3.png"],
    tags: ["AI", "Frontend", "Backend"],
    category: "AI",
  },
  {
    id: 1,
    slug: "tikkletikkle",
    title: "TikkleTikkle · Finance Recommender & Community",
    summary:
      "FSS API-based product recommendations, Kakao Maps local community, and an AI chatbot.",
    description:
      "Django backend with React frontend, deployed to EC2 with Docker + Nginx. Includes recommendation flows, validation, and map-based discovery.",
    tech: [
      "Django",
      "React",
      "Docker",
      "Nginx",
      "AWS EC2",
      "OpenAI",
      "Kakao Maps",
    ],
    links: {
      github: "https://github.com/hy2min/tikkletikkle",
      demo: "http://tikkle.r-e.kr",
    },
    image: "/images/tikkletikkle_screen.png",
    gallery: ["/images/tikkle-1.png", "/images/tikkle-2.png"],
    tags: ["Frontend", "Backend", "DevOps"],
    category: "Fullstack",
  },
  {
    id: 2,
    slug: "nost",
    title: "NOST · AI Writing Community",
    summary:
      "AI suggests outlines and variations with translation support and community sharing.",
    description:
      "React + Django + PostgreSQL. Uses LangChain/OpenAI/DALLE/DeepL. Handles content creation flow and collaboration features.",
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
    links: { github: "https://github.com/hy2min/nost_service", demo: "" },
    image: "/src/assets/nost_main.png",
    gallery: [
      "/src/assets/nost_main.png",
      "/src/assets/nost_create1.png",
      "/src/assets/nost_create2.png",
    ],
    tags: ["AI", "Frontend", "Backend"],
    category: "AI",
  },
  {
    id: 3,
    slug: "drug-service",
    title: "Drug Service · RAG-based Medication Guide",
    summary:
      "LLM + RAG chatbot for safe medication information and contraindications.",
    description:
      "Builds an index from public drug datasets with retrieval chains and reference citations. Backend framework pluggable.",
    tech: ["LLM", "RAG", "Vector DB", "FastAPI/Django", "OpenAI"],
    links: { github: "https://github.com/hy2min/drug_service", demo: "" },
    image: "/images/drug_screen.png",
    gallery: ["/images/guide_drug.gif", "/images/guide_mind.gif"],
    tags: ["AI", "Backend"],
    category: "AI",
  },
  {
    id: 4,
    slug: "otterreview",
    title: "OtterReview · Live Code Review & Whiteboard",
    summary:
      "Yorkie CRDT + tldraw + WebRTC for real-time collaboration and reviews.",
    description:
      "React (Vite) + Zustand + Yorkie + tldraw; Spring Boot backend. Live code sharing, whiteboarding, chat, and secure sessions.",
    tech: [
      "React",
      "Zustand",
      "Yorkie",
      "tldraw",
      "OpenVidu",
      "STOMP",
      "Spring Boot",
    ],
    links: { github: "https://github.com/hy2min/ottereview", demo: "" },
    image: "/images/ottereview_screen.png",
    gallery: [
      "/images/guide_repolist.gif",
      "/images/guide_prcreate.gif",
      "/images/guide_collabo.gif",
    ],
    tags: ["Frontend", "Backend"],
    category: "Fullstack",
  },
  {
    id: 6,
    slug: "ouroboros",
    title: "Ouroboros · OpenAPI Specification Management & Mock Server",
    summary:
      "OpenAPI 3.1.0 기반 REST API 명세서 관리 및 Mock Server 라이브러리.",
    description:
      "Java Spring Boot + React 기반의 API 명세서 작성부터 Mock Server, 테스트, 성능 분석까지 지원하는 통합 개발 도구. OpenAPI 3.1.0 스펙 준수 및 자동 검증 기능 제공.",
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "OpenAPI 3.1.0",
      "DataFaker",
    ],
    links: {
      github: "https://github.com/whitesnakegang/ouroboros",
      demo: "https://ouroboros.co.kr",
    },
    image: "/images/ouroboros_screen.png",
    gallery: [
      "/images/ouroboros_screen.png",
      "/images/rest-work-flow.gif",
      "/images/websocket-workflow.gif",
      "/images/method-test-results.gif",
    ],
    tags: ["Frontend"],
    category: "Frontend",
  },
];
