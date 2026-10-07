import { test, expect, Locator } from '@playwright/test';

test.describe('Selector Hub', () => {
   const URL = 'https://selectorshub.com/xpath-practice-page/';
   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('Shadow DOM practice', async ({ page }) => {
      await page.locator('#kils').fill('ShadowDOM');
      await page.locator('#pizza').fill('Farmhouse');
      await page.locator('#training').fill('Playwright');
      await page.locator('#pwd').fill('123Abc');
   });
});