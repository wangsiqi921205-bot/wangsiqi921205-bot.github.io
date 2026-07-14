import { expect, test } from "@playwright/test";

test("portfolio renders and core interactions work", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("从商业定位到空间体验");
  await expect(page.locator(".brand__mark")).toHaveCSS("object-fit", "contain");
  await expect.poll(() => page.locator(".hero__media img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect.poll(() => page.locator(".work-card__media img").first().evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "菜单" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.getByRole("button", { name: "菜单" }).click();
  await expect(page.locator("#mobile-menu")).toBeHidden();

  await page.locator(".work-card__media").first().click();
  await expect(page.getByRole("dialog", { name: /零售品牌一体化概念/ })).toBeVisible();
  await page.getByRole("button", { name: "Close project" }).click();
  await expect(page.locator(".project-modal")).toBeHidden();

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("From commercial positioning");
  expect(errors).toEqual([]);
});

test("mobile hero remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hero = page.locator(".hero");
  await expect(hero).toBeVisible();
  await expect(page.getByRole("link", { name: /查看精选案例/ })).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
});
