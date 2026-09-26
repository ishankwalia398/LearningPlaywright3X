import {test, expect} from '@playwright/test';

test('Automate Web Table', async ({page}) => {

    await page.goto('https://app.thetestingacademy.com/playwright/webtable');
    const firstPart = "//table[@aria-label='Employee Management System table']/tbody/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    const rowsCount = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr").count();
    const colsCount = await page.locator("//table[@aria-label='Employee Management System table']/tbody/tr[1]/td").count();

    for (let i = 1; i <= rowsCount; i++) {
        for (let j = 1; j <= colsCount; j++) {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            const data = await page.locator(dynamicPath).innerText();
            if (data.includes('Rohan.Mehta')) {
                const precedingSibling = `${dynamicPath}/preceding-sibling::td`;
                await page.locator(precedingSibling).click();
            }
        }
    }
    await page.pause();
});