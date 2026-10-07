import {test, expect} from '@playwright/test';
import path from 'node:path';

test.describe('Automate Profile Pic', () => {
    const URL = 'https://app.thetestingacademy.com/login';

    test.beforeEach(async({page}) => {
        await page.goto(URL);
    });

    test('ProfilePicUpdate', async({page}) => {
        await page.locator('#identifier-field').fill('ishank.walia398@gmail.com');
        await page.getByRole('button', {name: 'Continue', exact:true}).click();
        await page.getByRole('textbox', {name: 'Enter verification code'}).fill('453473');
        await page.keyboard.press('Escape');

        await page.getByRole('link', {name: 'Settings'}).click();

        await expect(page).toHaveURL('https://app.thetestingacademy.com/student/settings');
        await page.getByText('Upload Photo').click();
        const filePath = path.join(__dirname, 'profilePic.jpg');
        console.log('File Path:', filePath);
        await page.getByLabel('Upload Photo').setInputFiles([filePath]);

        await page.pause();
    });
});