import { test } from "@playwright/test";

test("Browser context playwright test", async ({ browser }) => {
  const context = browser.newContext(); // Creates a new browser context. It won't share cookies/cache with other browser contexts.
  const page = (await context).newPage(); // Creates a new page in the browser context.
  (await page).goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page fixture Playwright test", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // This is the most common fixture used in a test.
});
