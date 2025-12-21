import { expect, test } from "@playwright/test";

test.skip("Browser context playwright test", async ({ browser }) => {
  const context = browser.newContext(); // Creates a new browser context. It won't share cookies/cache with other browser contexts.

  const page = (await context).newPage(); // Creates a new page in the browser context.

  (await page).goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page fixture Playwright test", async ({ page }) => {
  await page.goto("https://google.com"); // This is the most common fixture used in a test.

  console.log(await page.title()); // Returns the page's title.

  await expect(page).toHaveTitle("Google"); // Ensures the page has the given title.
});

test("Playwright test on a Login page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  page.locator("#username").fill("rahulshettyacademy");
  page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent()); // prints the text content in the pop-up

  await expect(page.locator("[style*='block']")).toContainText("Empty username/password.")
});
