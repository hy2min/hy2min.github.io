/* eslint-env node */
/* eslint-disable no-undef */
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { statSync } from "fs";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

async function checkServer(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: "HEAD",
      timeout: 3000,
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });

    req.on("error", () => {
      resolve(false);
    });

    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function generatePDF() {
  console.log("🚀 PDF 생성 시작...");

  let browser;
  let page;
  let pdfUrl;

  try {
    // PDF 전용 라우트로 이동
    // 개발 서버: http://localhost:5173
    // 프리뷰 서버: http://localhost:4173
    const previewUrl = "http://localhost:4173";
    const devUrl = "http://localhost:5173";

    // 서버 연결 확인
    console.log("🔍 서버 상태 확인 중...");
    const isPreviewRunning = await checkServer(previewUrl);
    const isDevRunning = await checkServer(devUrl);

    if (isPreviewRunning) {
      pdfUrl = `${previewUrl}/pdf`;
      console.log(`✅ 프리뷰 서버를 사용합니다: ${pdfUrl}`);
    } else if (isDevRunning) {
      pdfUrl = `${devUrl}/pdf`;
      console.log(`✅ 개발 서버를 사용합니다: ${pdfUrl}`);
    } else {
      throw new Error(
        `서버가 실행되지 않았습니다.\n` +
          `프리뷰 서버: ${previewUrl}\n` +
          `개발 서버: ${devUrl}\n\n` +
          `해결 방법:\n` +
          `1. npm run build 실행\n` +
          `2. npm run preview 실행 (별도 터미널)\n` +
          `또는\n` +
          `npm run dev 실행 (별도 터미널)`
      );
    }

    // Puppeteer 브라우저 실행
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    page = await browser.newPage();

    console.log(`📄 페이지 로드: ${pdfUrl}`);

    // 페이지 로드
    await page.goto(pdfUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // React Router가 라우팅을 완료할 때까지 대기
    console.log("⏳ React Router 라우팅 대기...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // PDF 준비 완료 대기
    console.log("⏳ PDF 레이아웃 렌더링 대기...");

    // 페이지 내용 확인
    const pageContent = await page.content();
    console.log(
      "📋 페이지 로드 확인:",
      pageContent.includes("pdf-layout") ? "성공" : "실패"
    );

    // 레이아웃이 렌더링될 때까지 대기 (더 관대한 조건)
    try {
      await page.waitForFunction(
        () => {
          const layout = document.querySelector(".pdf-layout");
          if (!layout) {
            console.log("레이아웃 요소를 찾을 수 없습니다");
            return false;
          }
          const height =
            layout.offsetHeight || layout.scrollHeight || layout.clientHeight;
          console.log("레이아웃 높이:", height);
          return height > 50; // 최소 높이 확인 (더 관대하게)
        },
        { timeout: 60000, polling: 500 }
      );
    } catch {
      console.warn("⚠️ waitForFunction 타임아웃, 계속 진행...");
      // 타임아웃되어도 계속 진행
    }

    // 추가 안정화 대기
    console.log("⏳ 최종 렌더링 안정화 대기...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 이미지 로딩 대기
    console.log("⏳ 이미지 로딩 대기...");
    try {
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.images).map((img) => {
            if (img.complete && img.naturalHeight > 0) return Promise.resolve();
            return new Promise((resolve) => {
              const timeout = setTimeout(resolve, 5000); // 최대 5초 대기
              img.onload = () => {
                clearTimeout(timeout);
                resolve();
              };
              img.onerror = () => {
                clearTimeout(timeout);
                resolve(); // 에러가 나도 계속 진행
              };
            });
          })
        );
      });
    } catch (error) {
      console.warn("⚠️ 이미지 로딩 대기 중 오류:", error.message);
    }

    // 추가 렌더링 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // PDF 생성
    const pdfPath = join(rootDir, "portfolio.pdf");
    console.log("📄 PDF 생성 중...");

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    console.log(`✅ PDF 생성 완료: ${pdfPath}`);
    const stats = statSync(pdfPath);
    console.log(`📊 파일 크기: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("❌ PDF 생성 실패:", error);
    console.error("\n💡 해결 방법:");
    console.error("1. npm run build 실행");
    console.error("2. npm run preview 실행 (다른 터미널)");
    console.error("3. npm run generate-pdf 실행");
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generatePDF();
