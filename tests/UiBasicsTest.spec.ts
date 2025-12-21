import { expect, test } from "@playwright/test";

test("Browser context playwright test", async ({ browser }) => {
  const context = browser.newContext(); // Creates a new browser context. It won't share cookies/cache with other browser contexts.

  const page = (await context).newPage(); // Creates a new page in the browser context.

  (await page).goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("Page fixture Playwright test", async ({ page }) => {
  await page.goto("https://google.com"); // This is the most common fixture used in a test.

  console.log(await page.title()); // Returns the page's title.

  await expect(page).toHaveTitle("Google"); // Ensures the page has the given title.
});
