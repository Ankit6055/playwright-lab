import { expect, test } from "@playwright/test";
import { title } from "node:process";

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

// Env issue rn
test.skip("Sign In Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  console.log(`${process.env.USER_EMAIL!}`); // verify this in action
  await page.locator("#userEmail").fill(`${process.env.USER_EMAIL!}`);

  console.log(`${process.env.USER_PASSWORD!}`);
  await page.locator("#userPassword").fill(`${process.env.USER_PASSWORD!}`);
  await page.locator("#login").click();

  await page.waitForTimeout(5000);

  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("UI Control", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("consult");

  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
  console.log(await page.locator(".radiotextsty").nth(1).isChecked());

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await page.locator("#terms").uncheck(); // for uncheck there is no assertion
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child Windows Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // listen for any new page to open
    documentLink.click(), // new page is opened
  ]);

  const text = await newPage.locator(".red").textContent();
  const emailMatch = text
    ? text.match(/[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
    : null;

  let domain: string | null = emailMatch ? emailMatch[1] : null;
  console.log(domain);

  if (domain === null) {
    domain = "test.com";
  }

  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").textContent());
});
