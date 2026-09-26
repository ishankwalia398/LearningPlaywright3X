import {test, expect, Page, Locator} from '@playwright/test';

async function findRowByName(page: Page, id: string): Promise<Locator> {
    while (true) {
        const row = page.locator("div.oxd-table-card").filter({ hasText: id }).first();
        if (await row.count()) {
            return row;
        }

        const next = page.locator("//ul[@class='oxd-pagination__ul']//li[last()]//button");
        if (await next.count() === 0) {
            throw new Error(`Row not found: ${id}`);
        }

        if (await next.isDisabled()) {
            throw new Error(`Row not found: ${id}`);
        }

        await next.click();
    }
}

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

    const empId = Date.now().toString().slice(-9);
    const employeeId = page.locator("//label[normalize-space()='Employee Id']/following::input[1]");
    await employeeId.fill(empId);

    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("//div/h6").filter({ hasText : 'Personal Details' })).toBeVisible();

    pimTab = page.locator('li.oxd-main-menu-item-wrapper').filter({ hasText : 'PIM'});
    await pimTab.click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");
    await expect(page.locator("div.oxd-table-card").first()).toBeVisible();

    const rowLocator = await findRowByName(page, empId);
    await rowLocator.locator("button i.bi-trash").click();
    await expect(page.locator("//div/p[@class='oxd-text oxd-text--p oxd-text--card-title']").filter({ hasText : 'Are you Sure?' })).toBeVisible();

    await page.locator("//div[@class='orangehrm-modal-footer']/button[2]").click();
    await expect(page.locator('body')).toContainText('Successfully Deleted');

    await page.pause();
});