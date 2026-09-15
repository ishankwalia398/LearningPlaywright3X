import{test, expect} from '@playwright/test'

test('tc#1 - Verify the Appoitment', async({page})=>{
    await page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
    let usernameLocator = page.locator('#txt-username');
    let passwordLocator = page.locator('#txt-password');
    let loginButtonLocator = page.locator('#btn-login');
    await usernameLocator.fill("John Doe");
    await passwordLocator.fill("ThisIsNotAPassword");
    await loginButtonLocator.click();
    await expect(page).toHaveURL("https://katalon-demo-cura.herokuapp.com/#appointment");
});