# PDF 생성 가이드

Puppeteer를 사용하여 A4 사이즈에 최적화된 PDF를 생성합니다.

## 사용 방법

### 1. 프로젝트 빌드

```bash
npm run build
```

### 2. 프리뷰 서버 실행 (별도 터미널)

```bash
npm run preview
```

### 3. PDF 생성

```bash
npm run generate-pdf
```

또는 한 번에 실행:

```bash
npm run build && npm run preview
# 다른 터미널에서
npm run generate-pdf
```

## 생성된 파일

- `portfolio.pdf` - 루트 디렉토리에 생성됩니다.

## PDF 레이아웃

PDF는 `/pdf` 라우트를 통해 렌더링되며, A4 사이즈(210mm × 297mm)에 최적화되어 있습니다.

### HTML에서 미리보기

PDF로 변환하기 전에 HTML에서 레이아웃을 확인할 수 있습니다:

1. 개발 서버 실행:

   ```bash
   npm run dev
   ```

2. 브라우저에서 접속:
   ```
   http://localhost:5173/pdf
   ```

또는 프리뷰 서버 실행 후:

```bash
npm run preview
# http://localhost:4173/pdf
```

### 주요 특징

- **A4 사이즈 최적화**: 정확한 A4 크기와 여백
- **페이지 자동 분할**: Puppeteer가 자동으로 페이지를 분할
- **고품질 렌더링**: 실제 브라우저 렌더링 엔진 사용
- **이미지 지원**: 모든 이미지가 제대로 로드됨

## 문제 해결

### PDF가 생성되지 않는 경우

1. 프리뷰 서버가 실행 중인지 확인
2. `http://localhost:4173/pdf` 접속 가능한지 확인
3. 브라우저 콘솔에서 에러 확인

### 이미지가 로드되지 않는 경우

- 이미지 경로가 올바른지 확인 (`/images/` 폴더)
- 빌드 후 이미지가 `dist/images/`에 복사되었는지 확인

## 커스터마이징

PDF 레이아웃을 수정하려면 `src/components/PDFLayout.jsx` 파일을 편집하세요.
