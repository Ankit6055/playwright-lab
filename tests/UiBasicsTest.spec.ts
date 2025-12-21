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

  const signIn = page.locator("#signInBtn");

  const cardTitle = page.locator(".card-body a");

  const userName = page.locator("#username");
  await userName.fill("rahulshetty");

  const userPassword = page.locator("[type='password']");
  await userPassword.fill("learning");

  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent()); // prints the text content in the pop-up

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill(""); // clears out the text
  await userName.fill("rahulshettyacademy");
  userPassword.fill("learning");
  signIn.click();

  console.log(await cardTitle.nth(0).textContent());
  console.log(await cardTitle.nth(1).textContent());
  console.log(await cardTitle.nth(2).textContent());
  console.log(await cardTitle.nth(3).textContent());
  console.log(await page.locator(".card-body a").nth(-1).textContent()); // returns the last element
  // console.log(await page.locator(".card-body a").first().textContent()); // same as nth(0)

  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});

test("Sign In Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  console.log(`${process.env.USER_EMAIL!}`); // verify this in action
  await page.locator("#userEmail").fill(`${process.env.USER_EMAIL!}`);

  console.log(`${process.env.USER_PASSWORD!}`);
  await page.locator("#userPassword").fill(`${process.env.USER_PASSWORD!}`);
  await page.locator("#login").click();
});
