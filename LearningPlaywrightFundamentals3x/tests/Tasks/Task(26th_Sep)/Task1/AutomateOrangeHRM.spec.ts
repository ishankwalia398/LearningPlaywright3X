import {test, expect} from '@playwright/test';

test('Automate OrangeHRM', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const userName = page.locator("//div/input[@name='username']");
    await userName.fill('Admin');

    const password = page.locator("//div/input[@name='password']");
    await password.fill('admin123');

    const loginButton = page.locator("//div/button[@type='submit']");
    await loginButton.click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    let pimTab = page.locator('li.oxd-main-menu-item-wrapper').filter({ hasText : 'PIM'});
    await pimTab.click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");

    await page.locator("//button[normalize-space()='Add']").click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee");

    const firstName = page.locator("//div/input[@name='firstName']");
    await firstName.fill('Rohan');

    const lastName = page.locator("//div/input[@name='lastName']");
    await lastName.fill('Sharma');

    let employeeId = page.locator("//div/label[@class ='oxd-label']/following::input[1]");
    const empId = Date.now();
    await employeeId.fill(empId.toString().slice(-9));

    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("//div/h6").filter({ hasText : 'Personal Details' })).toBeVisible();

    pimTab = page.locator('li.oxd-main-menu-item-wrapper').filter({ hasText : 'PIM'});
    await pimTab.click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");

    employeeId = page.locator("//label[normalize-space()='Employee Id']/following::input[1]");
    await employeeId.fill(empId.toString().slice(-9));

    await page.locator("//div/button[@type='submit']").click();
    await expect(page.locator("//span[contains(normalize-space(), 'Record Found')]")).toBeVisible();

    await page.locator("//div[@class='oxd-table-cell-actions']/button[2]").click();
    await expect(page.locator("//div/p[@class='oxd-text oxd-text--p oxd-text--card-title']").filter({ hasText : 'Are you Sure?' })).toBeVisible();

    await page.locator("//div[@class='orangehrm-modal-footer']/button[2]").click();
    await expect(page.locator("//span[contains(normalize-space(), 'No Records Found')]")).toBeVisible();

    await page.pause();
});
