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
  console.log("🚀 메인 포트폴리오 페이지 PDF 생성 시작...");

  let browser;
  let page;
  let pdfUrl;

  try {
    // 메인 페이지로 이동
    const previewUrl = "http://localhost:4173";
    const devUrl = "http://localhost:5173";

    // 서버 연결 확인
    console.log("🔍 서버 상태 확인 중...");
    const isPreviewRunning = await checkServer(previewUrl);
    const isDevRunning = await checkServer(devUrl);

    if (isPreviewRunning) {
      pdfUrl = previewUrl;
      console.log(`✅ 프리뷰 서버를 사용합니다: ${pdfUrl}`);
    } else if (isDevRunning) {
      pdfUrl = devUrl;
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

    // 뷰포트 설정 (데스크톱 크기)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    console.log(`📄 페이지 로드: ${pdfUrl}`);

    // 페이지 로드
    await page.goto(pdfUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // React Router가 라우팅을 완료할 때까지 대기
    console.log("⏳ React Router 라우팅 대기...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 페이지 내용 확인
    const pageContent = await page.content();
    console.log(
      "📋 페이지 로드 확인:",
      pageContent.includes("Hero") || pageContent.includes("projects") ? "성공" : "실패"
    );

    // 모든 섹션이 로드될 때까지 대기
    console.log("⏳ 전체 페이지 렌더링 대기...");
    try {
      await page.waitForFunction(
        () => {
          const hero = document.querySelector("section[id='hero'], section:has(h1)");
          const projects = document.getElementById("projects");
          const about = document.getElementById("about");
          const skills = document.getElementById("skills");
          const contact = document.getElementById("contact");
          
          const hasContent = hero || projects || about || skills || contact;
          if (hasContent) {
            const heroHeight = hero?.offsetHeight || 0;
            const projectsHeight = projects?.offsetHeight || 0;
            return heroHeight > 100 || projectsHeight > 100;
          }
          return false;
        },
        { timeout: 60000, polling: 500 }
      );
    } catch {
      console.warn("⚠️ waitForFunction 타임아웃, 계속 진행...");
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

    // 스크롤해서 모든 콘텐츠가 로드되도록 함
    console.log("⏳ 페이지 스크롤하여 모든 콘텐츠 로드...");
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0); // 다시 맨 위로
            resolve();
          }
        }, 100);
      });
    });

    // 스크롤 후 추가 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // PDF 생성
    const pdfPath = join(rootDir, "portfolio-full.pdf");
    console.log("📄 PDF 생성 중...");

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
      preferCSSPageSize: false,
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
    console.error("3. npm run generate-pdf-full 실행");
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generatePDF();

