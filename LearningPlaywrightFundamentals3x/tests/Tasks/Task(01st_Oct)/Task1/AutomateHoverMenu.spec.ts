import {test, expect} from '@playwright/test';

test('Automate Hover Menu', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');

    const navAddOns = page.getByTestId('nav-add-ons');
    await navAddOns.hover();
    await navAddOns.getByTestId('test-id-Wifi').click();

    const outputLocator = page.locator('#output');
    await expect(outputLocator).toBeVisible();

    const output = await outputLocator.innerText();
    const jsonOutput = JSON.parse(output);
    expect(jsonOutput.testId).toBe('test-id-Wifi');
});