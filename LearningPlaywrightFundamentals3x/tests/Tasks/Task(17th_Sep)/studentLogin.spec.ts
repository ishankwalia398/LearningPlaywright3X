import{test, expect} from '@playwright/test'

test('tc#1 - Verify the Student Login', async({page})=>{
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    let usernameLocator = page.locator("//input[@id='email']");
    let passwordLocator = page.locator("//input[contains(@id,'password')]");
    let checkboxLocator = await page.locator("//input[@name='remember']").click();
    let loginButtonLocator = page.locator("//button[@data-testid='login-button']");
    
    await usernameLocator.fill("asdadad@ad.com");
    await passwordLocator.fill("asdladlakdha");
    await loginButtonLocator.click();
    await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter?email=asdadad%40ad.com&password=asdladlakdha&remember=yes#login-success");
});