import { expect, test } from "@playwright/test";

test("portfolio renders and core interactions work", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".opening-gate")).toBeHidden({ timeout: 5_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("女性商业项目的VI视觉识别");
  await expect(page.locator(".brand__mark")).toHaveCSS("object-fit", "contain");
  await expect.poll(() => page.locator(".brand__mark").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect.poll(() => page.locator(".hero__media img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator("#works")).toHaveCount(0);

  const sectionOrder = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id).filter(Boolean),
  );
  expect(sectionOrder).toEqual([
    "intro",
    "about",
    "sectors",
    "services",
    "visual",
    "value",
    "process",
    "contact",
  ]);
  await expect(page.locator("#sectors .industry-entry-grid > article")).toHaveCount(5);
  await expect(page.locator("#services .services-editorial__list > article")).toHaveCount(3);
  await expect(page.locator("#visual .visual-entry-grid > article")).toHaveCount(3);
  await expect.poll(() => page.locator(".about-profile__portrait img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".section-heading > span")).toHaveText([
    "02 / SECTORS",
    "04 / VISUAL",
    "05 / VALUE",
    "06 / PROCESS",
  ]);
  await expect(page.locator("#intro .hero__module-label")).toHaveText("00 / INTRO");
  await expect(page.locator("#about .about-profile__heading > span")).toHaveText("01 / ABOUT");
  await expect(page.locator("#services .services-editorial__intro > span")).toHaveText("03 / SERVICES");
  await expect(page.locator("#contact .contact__lead > span")).toHaveText("07 / CONTACT");
  await expect(page.locator("#sectors [data-media-status='final']")).toHaveCount(5);
  const ratios = await page.locator(".about-profile__portrait, #sectors .media-frame, #visual .visual-cover").evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return Number((box.width / box.height).toFixed(2));
  }));
  expect(ratios).toEqual([0.8, 1.33, 1.33, 1.33, 1.33, 1.33, 0.8, 0.8, 0.8]);
  const contentSources = await page.locator(".hero__media img, #sectors img, #visual img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(new Set(contentSources).size).toBe(contentSources.length);
  await expect(page.locator("#visual .visual-cover")).toHaveCount(3);
  await expect(page.locator("#visual")).not.toContainText(/IP 形象|情绪板|作品持续整理中/);
  await expect(page.locator("#services ul")).toHaveCount(3);
  await expect(page.locator("#services li")).toHaveCount(24);
  await expect(page.locator("#visual ul")).toHaveCount(0);
  await expect(page.locator("#process .process-line > li > span")).toHaveText(["01", "02", "03", "04", "05", "06"]);
  await expect(page.locator("#process .process-line > li > small")).toHaveCount(6);
  await expect(page.locator("#sectors .industry-entry-grid a")).toHaveCount(0);
  await expect(page.locator(".desktop-nav")).not.toContainText("项目");
  await expect(page.locator("#about")).toContainText("INDEPENDENT DESIGNER");
  const invalidAlt = await page.locator("img").evaluateAll((images) => images.filter((image) => /^(image|photo|project image|placeholder)$/i.test(image.alt.trim())).length);
  expect(invalidAlt).toBe(0);
  await expect(page.locator("body")).not.toContainText(/品牌战略|商业咨询|运营增长|AI 视觉|数字体验/);

  await page.getByRole("button", { name: "菜单" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.getByRole("button", { name: "菜单" }).click();
  await expect(page.locator("#mobile-menu")).toBeHidden();

  await page.goto("/projects/womenswear-system-concept");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#intro")).toBeVisible();
  await expect(page.locator(".language-toggle")).toHaveCount(0);
  await expect(page.locator("#contact .contact-channel")).toHaveCount(0);
  await expect(page.locator("#contact .contact-simple > article")).toHaveCount(2);
  await expect(page.locator("#contact .contact-qr")).toHaveCount(0);
  await expect(page.locator("#contact")).toContainText("403592913@qq.com");
  await expect(page.locator("#contact")).toContainText("18789493906");
  await expect(page.locator("#contact a[href='tel:18789493906']")).toHaveCount(1);
  await expect(page.locator("#contact a[href='mailto:403592913@qq.com']")).toHaveCount(1);
  await expect(page.locator("#contact")).not.toContainText(/微信|二维码|抖音|小红书|Instagram|TikTok|Behance|LinkedIn|Facebook|Pinterest|YouTube/);
  const invalidAnchors = await page.locator("a").evaluateAll((links) => links.filter((link) => !link.getAttribute("href")).length);
  expect(invalidAnchors).toBe(0);
  expect(errors).toEqual([]);
});

test("visual archive routes remain public while empty project routes stay private", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#intro")).toBeVisible();
  await page.goto("/visual");
  await expect(page.locator(".visual-archive-list > article")).toHaveCount(3);
  await expect(page.locator(".visual-archive-list").first()).toContainText("图形标志");
  await page.goto("/visual/logo");
  await expect(page.locator(".visual-category-pending h2")).toHaveText("标志设计");
  await expect.poll(() => page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
});

test("mobile hero remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".opening-gate")).toBeHidden({ timeout: 5_000 });
  const hero = page.locator(".hero");
  await expect(hero).toBeVisible();
  await expect(page.getByRole("link", { name: /查看视觉专项/ })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const width of [390, 430, 768, 1024, 1440]) {
  test(`homepage layout remains stable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 900 : 1000 });
    await page.goto("/");
    await expect(page.locator(".opening-gate")).toBeHidden({ timeout: 5_000 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator("#services .services-editorial__list > article")).toHaveCount(3);
    await expect(page.locator("#process .process-line > li")).toHaveCount(6);
    await expect(page.locator("#contact a[href='tel:18789493906']")).toBeVisible();
    const clipped = await page.locator("#services article, #value article, #process li, #contact article").evaluateAll((items) =>
      items.filter((item) => item.scrollWidth > item.clientWidth + 1 || item.scrollHeight > item.clientHeight + 1).length,
    );
    expect(clipped).toBe(0);
  });
}
