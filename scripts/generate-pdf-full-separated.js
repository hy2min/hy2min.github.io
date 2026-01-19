/* eslint-env node */
/* eslint-disable no-undef */
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { statSync, mkdirSync } from "fs";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// 프로젝트 목록
const projects = [
  { slug: "orakgarak", name: "Orakgarak" },
  { slug: "tikkletikkle", name: "TikkleTikkle" },
  { slug: "nost", name: "NOST" },
  { slug: "drug-service", name: "Drug Service" },
  { slug: "ottereview", name: "OtteReview" },
  { slug: "ouroboros", name: "Ouroboros" },
];

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

async function waitForPageReady(page) {
  try {
    await page.waitForFunction(
      () => {
        const body = document.body;
        const height = body?.offsetHeight || body?.scrollHeight || 0;
        return height > 500;
      },
      { timeout: 60000, polling: 500 }
    );
  } catch {
    console.warn("⚠️ waitForFunction 타임아웃, 계속 진행...");
  }
}

async function waitForImages(page) {
  try {
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete && img.naturalHeight > 0) return Promise.resolve();
          return new Promise((resolve) => {
            const timeout = setTimeout(resolve, 5000);
            img.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            img.onerror = () => {
              clearTimeout(timeout);
              resolve();
            };
          });
        })
      );
    });
  } catch (error) {
    console.warn("⚠️ 이미지 로딩 대기 중 오류:", error.message);
  }
}

async function scrollPage(page) {
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
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

async function generateProjectPDF(browser, baseUrl, project, mainPdfBuffer) {
  const page = await browser.newPage();

  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    console.log(`📄 [${project.name}] PDF 생성 시작...`);
    
    // 상세 페이지 로드
    console.log(`   └─ 상세 페이지 로드 중...`);
    const detailUrl = `${baseUrl}/projects/${project.slug}`;
    await page.goto(detailUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await waitForPageReady(page);
    await waitForImages(page);
    await scrollPage(page);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 상세 페이지 PDF 생성
    const detailPdf = await page.pdf({
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

    // 메인 페이지 PDF와 상세 페이지 PDF 병합
    const { PDFDocument } = await import("pdf-lib");
    const fs = await import("fs");

    const mainPdfDoc = await PDFDocument.load(mainPdfBuffer);
    const detailPdfDoc = await PDFDocument.load(detailPdf);

    // 새 PDF 문서 생성
    const mergedPdf = await PDFDocument.create();

    // 메인 페이지 PDF 페이지 복사
    const mainPages = await mergedPdf.copyPages(mainPdfDoc, mainPdfDoc.getPageIndices());
    mainPages.forEach((page) => mergedPdf.addPage(page));

    // 상세 페이지 PDF 페이지 복사
    const detailPages = await mergedPdf.copyPages(detailPdfDoc, detailPdfDoc.getPageIndices());
    detailPages.forEach((page) => mergedPdf.addPage(page));

    // 병합된 PDF 저장
    const mergedPdfBytes = await mergedPdf.save();
    const finalPath = join(rootDir, `pdfs`, `portfolio-${project.slug}.pdf`);
    fs.writeFileSync(finalPath, mergedPdfBytes);

    const stats = statSync(finalPath);
    console.log(`✅ [${project.name}] PDF 생성 완료: ${finalPath} (${(stats.size / 1024).toFixed(2)} KB)`);

    return finalPath;
  } catch (error) {
    console.error(`❌ [${project.name}] PDF 생성 중 오류:`, error.message);
    throw error;
  } finally {
    await page.close();
  }
}

async function generateMainPagePDF(browser, baseUrl) {
  const page = await browser.newPage();

  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    console.log("📄 메인 페이지 PDF 생성 중...");
    await page.goto(baseUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await waitForPageReady(page);
    await waitForImages(page);
    await scrollPage(page);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mainPdf = await page.pdf({
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

    console.log("✅ 메인 페이지 PDF 생성 완료\n");
    return mainPdf;
  } finally {
    await page.close();
  }
}

async function generateAllPDFs() {
  console.log("🚀 프로젝트별 PDF 생성 시작...\n");

  let browser;
  let pdfUrl;

  try {
    const previewUrl = "http://localhost:4173";
    const devUrl = "http://localhost:5173";

    console.log("🔍 서버 상태 확인 중...");
    const isPreviewRunning = await checkServer(previewUrl);
    const isDevRunning = await checkServer(devUrl);

    if (isPreviewRunning) {
      pdfUrl = previewUrl;
      console.log(`✅ 프리뷰 서버를 사용합니다: ${pdfUrl}\n`);
    } else if (isDevRunning) {
      pdfUrl = devUrl;
      console.log(`✅ 개발 서버를 사용합니다: ${pdfUrl}\n`);
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

    // PDF 저장 디렉토리 생성
    const pdfsDir = join(rootDir, "pdfs");
    try {
      mkdirSync(pdfsDir, { recursive: true });
    } catch {
      // 이미 존재하면 무시
    }

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // 먼저 메인 페이지 PDF 생성 (한 번만)
    const mainPdfBuffer = await generateMainPagePDF(browser, pdfUrl);

    console.log(`📚 총 ${projects.length}개 프로젝트 처리 시작...\n`);

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`[${i + 1}/${projects.length}] ${project.name}`);
      try {
        await generateProjectPDF(browser, pdfUrl, project, mainPdfBuffer);
      } catch (error) {
        console.error(`❌ [${project.name}] PDF 생성 실패:`, error.message);
      }
      console.log("");
    }

    console.log(`✅ 모든 프로젝트 PDF 생성 완료!`);
    console.log(`📁 PDF 파일 위치: ${pdfsDir}`);
  } catch (error) {
    console.error("❌ PDF 생성 실패:", error);
    console.error("\n💡 해결 방법:");
    console.error("1. npm run build 실행");
    console.error("2. npm run preview 실행 (다른 터미널)");
    console.error("3. npm run generate-pdf-full-separated 실행");
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generateAllPDFs();
