const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("http://127.0.0.1:4174/", { waitUntil: "networkidle" });
  const title = await page.title();
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  await page.goto("http://127.0.0.1:4174/visual/logo", { waitUntil: "networkidle" });
  const imageFailures = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => !image.complete || image.naturalWidth === 0).length,
  );

  const result = { title, desktopOverflow, mobileOverflow, imageFailures, errors };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();

  const expectedTitle = "WANGSIQI Studio｜VI视觉识别与商业空间一体化设计";
  if (title !== expectedTitle || errors.length || desktopOverflow || mobileOverflow || imageFailures) process.exit(1);
})();
