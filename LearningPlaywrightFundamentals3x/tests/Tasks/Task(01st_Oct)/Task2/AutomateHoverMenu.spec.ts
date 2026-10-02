import {test, expect} from '@playwright/test';

test('Automate Hover Menu', async ({ page }) => {
    await page.goto('https://demo.applitools.com/');
    await page.locator('#username').fill('Admin');
    await page.locator('#password').fill('Password@123');
    await page.locator('#log-in').click();

    await expect(page).toHaveURL('https://demo.applitools.com/app.html');
    let values = await page.locator("tbody tr td:last-child").allInnerTexts();
    let totalValue = 0;
    let earned = 0;
    let spent = 0;
    for (let value of values) {
        totalValue += parseFloat(value.replace(/[^0-9.-]+/g, ''));
        let amount = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        if (amount > 0) {
            earned += amount;
        } else {
            spent += Math.abs(amount);
        }
    }  
    console.log("Total : " + totalValue);
    console.log("Earned : " + earned);
    console.log("Spent : " + spent);
    expect(totalValue).toBe(1996.22);
});