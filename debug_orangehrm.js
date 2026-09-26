const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator("input[name='username']").fill('Admin');
  await page.locator("input[name='password']").fill('admin123');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard/index');

  await page.locator('li.oxd-main-menu-item-wrapper').filter({ hasText: 'PIM' }).click();
  await page.waitForURL('**/pim/viewEmployeeList');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForURL('**/pim/addEmployee');

  const empId = Date.now().toString().slice(-9);
  await page.locator('input[name="firstName"]').fill('Rohan');
  await page.locator('input[name="lastName"]').fill('Sharma');
  await page.locator("//label[normalize-space()='Employee Id']/following::input[1]").fill(empId);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/pim/viewEmployeeList');
  await page.waitForTimeout(4000);

  const selectors = [
    'div.oxd-table-card',
    'div.oxd-table-row',
    'div.oxd-table-body',
    'div.orangehrm-container',
    'div.oxd-table-cell',
    'div.oxd-table-card-cell',
    'div.oxd-table-row--highlight',
    'div.oxd-table-row--hover',
    'div.oxd-table-cell.oxd-padding-cell',
    'div.orangehrm-paper-container'
  ];

  for (const sel of selectors) {
    const count = await page.locator(sel).count();
    console.log('SELECTOR', sel, 'COUNT', count);
    if (count > 0) {
      const sample = await page.locator(sel).first().evaluate(el => el.outerHTML.slice(0, 500).replace(/\s+/g, ' '));
      console.log('SAMPLE', sample);
    }
  }

  const bodyText = await page.locator('body').textContent();
  console.log('HAS EMPID', bodyText.includes(empId));
  console.log('EMPID', empId);

  await browser.close();
})();
