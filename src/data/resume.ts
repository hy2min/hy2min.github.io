// 경험 데이터 구조
export interface Experience {
  company: string;
  position: string;
  period: string;
  description?: string;
  responsibilities: string[];
  technologies?: string[];
}

// 교육 데이터 구조
export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
  description?: string;
  achievements?: string[];
}

// 자격증 데이터 구조
export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description?: string;
}

// 수상내역 데이터 구조
export interface Award {
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export const experiences: Experience[] = [
  {
    company: "궁전요리제과제빵미용직업학교",
    position: "제과·제빵 강사 및 행정 업무",
    period: "2022.04 - 2023.09",
    description: "교육 과정 기획·운영 및 행정 업무를 담당하며, 프로젝트 관리 및 커뮤니케이션 역량을 발휘했습니다.",
    responsibilities: [
      "단계별 커리큘럼 설계 및 운영 (기초~고급 실습 과정 체계화)",
      "교육생 숙련도 기반 맞춤형 수업 설계 및 개별 피드백 제공",
      "국비지원 직업훈련 행정 업무 (훈련계획서·평가표 작성, 출결·진도 관리)",
      "신규 커리큘럼 기획 및 운영 구조 정비 (고교생 대상 1년 과정 신설)",
      "프로세스 개선을 통한 운영 효율성 향상 (반 규모 3개 → 6개 확장)",
      "교육생 상담 및 취업 준비 지원을 통한 커뮤니케이션 역량 강화",
      "실습 환경 구성 및 기자재 관리 (운영 환경 최적화)",
    ],
    technologies: ["프로젝트 관리", "프로세스 개선", "문서화", "커뮤니케이션"],
  },
];

export const educations: Education[] = [
  {
    school: "SSAFY (삼성청년SW·AI아카데미)",
    major: "백엔드 개발자 양성 과정",
    degree: "이수 중",
    period: "2025.01 - 2025.12",
    description: "실무 중심 프로젝트 기반 SW·AI 교육 과정",
    achievements: [
      "Python, Django, REST API를 활용한 웹 백엔드 구현 실습",
      "Vue.js, React, OpenAI를 활용한 프로젝트 수행 경험",
      "팀 프로젝트 및 코드 리뷰를 통한 협업 역량 강화",
    ],
  },
  {
    school: "스파르타코딩클럽",
    major: "AI 웹개발 부트캠프",
    degree: "수료",
    period: "2024.04 - 2024.08",
    description: "AI 기술 기반 웹 서비스 개발 실무 부트캠프",
    achievements: [
      "Python, Django, REST API를 활용한 백엔드 로직 설계 및 구현",
      "OpenAI, LangChain 연동을 통한 챗봇 기능 및 프롬프트 설계 경험",
    ],
  },
  {
    school: "단국대학교",
    major: "화학공학과",
    degree: "학사",
    period: "2015.02 - 2020.08",
  },
];

export const certifications: Certification[] = [
  {
    name: "OPIC IM1",
    issuer: "ACTFL",
    date: "2025.04",
  },
  {
    name: "리눅스마스터 2급",
    issuer: "정보통신기술자격검정",
    date: "2024.12",
  },
  {
    name: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    date: "2024.06",
  },
  {
    name: "컴퓨터활용능력 1급",
    issuer: "대한상공회의소",
    date: "2021.04",
  },
  {
    name: "화학분석기사",
    issuer: "한국산업인력공단",
    date: "2019.12",
  },
];

export const awards: Award[] = [
  {
    name: "최종프로젝트 우수상",
    issuer: "삼성청년SW·AI아카데미(SSAFY)",
    date: "2025.12",
  },
  {
    name: "공통프로젝트 우수상",
    issuer: "삼성청년SW·AI아카데미(SSAFY)",
    date: "2025.08",
  },
  {
    name: "관통프로젝트 우수상",
    issuer: "삼성청년SW·AI아카데미(SSAFY)",
    date: "2025.05",
  },
  {
    name: "우수상",
    issuer: "스파르타코딩클럽",
    date: "2024.06",
  },
];
