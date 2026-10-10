import { test, expect } from '@playwright/test';

test.describe('Simple expect assertions - Multiple Element Filter', () => {
    const URL = 'https://app.thetestingacademy.com/playwright/multiple_element_filter';

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Page title, headings and practice notes', async ({ page }) => {
        await expect(page).toHaveURL(URL);
        await expect(page).toHaveTitle('Multiple Element Filter Login — The Testing Academy');
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Master multiple element filters on a real login UI');
        await expect(page.locator('h1')).toContainText('multiple element filters');
        await expect(page.getByRole('heading', { name: 'Student Login', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Account navigation' })).toBeVisible();
        await expect(page.locator('#login')).toContainText('Practice page for Playwright selectors');
        await expect(page.locator('#login')).toContainText('Secure Practice');
        await expect(page.locator('#practice-notes .practice-card')).toHaveCount(3);
        await expect(page.locator('#practice-notes strong')).toHaveText(['13', '16', '1']);
        await expect(page.locator('.lesson-card')).toHaveCount(3);
        await expect(page.locator('.lesson-card').first()).toContainText('Use case 1 — collect text');
        await expect(page.locator('.lesson-card').nth(1)).toContainText('Use case 2 — filter one link');
        await expect(page.locator('.lesson-card').last()).toContainText('Use case 3 — footer links');
    });

    test('Login fields and button', async ({ page }) => {
        const email = page.getByLabel('Email Address', { exact: true });
        const password = page.getByLabel('Password', { exact: true });
        const loginButton = page.getByRole('button', { name: 'Login to Practice Account' });

        await expect(page.locator('#login form')).toBeVisible();
        await expect(page.locator('#login form')).toHaveAttribute('action', '#login-success');
        await expect(page.locator('#login form')).toHaveAttribute('method', 'get');
        await expect(email).toBeVisible();
        await expect(email).toBeEnabled();
        await expect(email).toBeEditable();
        await expect(email).toBeEmpty();
        await expect(email).toHaveValue('');
        await expect(email).toHaveAttribute('type', 'email');
        await expect(email).toHaveAttribute('placeholder', 'student@thetestingacademy.com');
        await expect(email).toHaveAttribute('name', 'email');
        await expect(password).toBeVisible();
        await expect(password).toBeEnabled();
        await expect(password).toBeEditable();
        await expect(password).toBeEmpty();
        await expect(password).toHaveValue('');
        await expect(password).toHaveAttribute('type', 'password');
        await expect(password).toHaveAttribute('placeholder', 'Enter your password');
        await expect(password).toHaveAttribute('name', 'password');
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toBeEnabled();
        await expect(loginButton).toHaveText('Login to Practice Account');
        await expect(loginButton).toHaveAttribute('type', 'submit');
    });

    test('Fill, focus and clear the login fields', async ({ page }) => {
        const email = page.getByLabel('Email Address', { exact: true });
        const password = page.getByLabel('Password', { exact: true });

        await email.fill('student@example.com');
        await expect(email).toHaveValue('student@example.com');
        await expect(email).toBeFocused();

        await password.fill('Practice123!');
        await expect(password).toHaveValue('Practice123!');
        await expect(password).toBeFocused();
        await expect(email).not.toBeFocused();

        await email.clear();
        await expect(email).toBeEmpty();
        await expect(email).toHaveValue('');

        await password.clear();
        await expect(password).toBeEmpty();
        await expect(password).toHaveValue('');
    });

    test('Remember me checkbox', async ({ page }) => {
        const rememberMe = page.getByRole('checkbox', { name: 'Remember me' });

        await expect(rememberMe).toBeVisible();
        await expect(rememberMe).toBeEnabled();
        await expect(rememberMe).toHaveAttribute('type', 'checkbox');
        await expect(rememberMe).toHaveAttribute('name', 'remember');
        await expect(rememberMe).toHaveValue('yes');
        await expect(rememberMe).not.toBeChecked();

        await rememberMe.check();
        await expect(rememberMe).toBeChecked();

        await rememberMe.uncheck();
        await expect(rememberMe).not.toBeChecked();
    });

    test('Account link count, texts and hrefs', async ({ page }) => {
        const accountLinks = page.locator('a.list-group-item');

        await expect(page.locator('#account-panel')).toBeVisible();
        await expect(accountLinks).toHaveCount(13);
        await expect(accountLinks).toHaveText([
            'Login', 'Register', 'Forgotten Password', 'My Account',
            'Address Book', 'Wish List', 'Order History', 'Downloads',
            'Recurring Payments', 'Reward Points', 'Returns', 'Transactions', 'Newsletter'
        ]);
        await expect(accountLinks.first()).toBeVisible();
        await expect(accountLinks.first()).toHaveText('Login');
        await expect(accountLinks.last()).toBeVisible();
        await expect(accountLinks.last()).toHaveText('Newsletter');
        await expect(accountLinks.nth(0)).toHaveAttribute('href', '#login');
        await expect(accountLinks.nth(1)).toHaveAttribute('href', '#register');
        await expect(accountLinks.nth(2)).toHaveAttribute('href', '#forgotten-password');
        await expect(accountLinks.nth(3)).toHaveAttribute('href', '#my-account');
        await expect(accountLinks.nth(4)).toHaveAttribute('href', '#address-book');
        await expect(accountLinks.nth(5)).toHaveAttribute('href', '#wish-list');
        await expect(accountLinks.nth(6)).toHaveAttribute('href', '#order-history');
        await expect(accountLinks.nth(7)).toHaveAttribute('href', '#downloads');
        await expect(accountLinks.nth(8)).toHaveAttribute('href', '#recurring-payments');
        await expect(accountLinks.nth(9)).toHaveAttribute('href', '#reward-points');
        await expect(accountLinks.nth(10)).toHaveAttribute('href', '#returns');
        await expect(accountLinks.nth(11)).toHaveAttribute('href', '#transactions');
        await expect(accountLinks.nth(12)).toHaveAttribute('href', '#newsletter');

        // A simple filter selects one link from the account panel.
        const forgottenPassword = accountLinks.filter({ hasText: 'Forgotten Password' });
        await expect(forgottenPassword).toHaveCount(1);
        await expect(forgottenPassword).toBeVisible();
        await expect(forgottenPassword).toHaveText('Forgotten Password');
        await expect(forgottenPassword).toHaveAttribute('data-testid', 'forgotten-password-link');
    });

    test('Forgotten Password click changes the URL and shows a toast', async ({ page }) => {
        const forgottenPassword = page.getByTestId('forgotten-password-link');
        const toast = page.getByRole('status');

        // The toast uses opacity to hide, so check its class before and after clicking.
        await expect(toast).toHaveClass('toast');
        await forgottenPassword.click();
        await expect(page).toHaveURL(URL + '#forgotten-password');
        await expect(toast).toBeVisible();
        await expect(toast).toHaveClass('toast visible');
        await expect(toast).toContainText('Forgotten Password clicked');
        await expect(toast).toHaveAttribute('aria-live', 'polite');
        await expect(forgottenPassword).toBeVisible();
    });

    test('Form links and social login links', async ({ page }) => {
        const forgotPassword = page.getByTestId('form-forgot-password');
        const github = page.getByRole('link', { name: 'Continue with GitHub', exact: true });
        const google = page.getByRole('link', { name: 'Continue with Google', exact: true });

        await expect(forgotPassword).toBeVisible();
        await expect(forgotPassword).toHaveText('Forget password?');
        await expect(forgotPassword).toHaveAttribute('href', '#forgotten-password');
        await expect(page.locator('.social-row a')).toHaveCount(2);
        await expect(github).toBeVisible();
        await expect(github).toHaveAttribute('href', '#github-login');
        await expect(google).toBeVisible();
        await expect(google).toHaveAttribute('href', '#google-login');

        await github.click();
        await expect(page).toHaveURL(URL + '#github-login');
        await google.click();
        await expect(page).toHaveURL(URL + '#google-login');
        await forgotPassword.click();
        await expect(page).toHaveURL(URL + '#forgotten-password');
        await expect(page.getByRole('status')).toBeVisible();
    });

    test('Footer headings, link texts and hrefs', async ({ page }) => {
        const footer = page.locator('footer');
        const footerLinks = footer.locator('a');

        await expect(footer).toBeVisible();
        await expect(footer.getByRole('heading', { name: 'The Testing Academy', exact: true })).toBeVisible();
        await expect(footer.locator('h4')).toHaveCount(4);
        await expect(footer.locator('h4')).toHaveText(['Information', 'Customer Service', 'Extras', 'My Account']);
        await expect(footerLinks).toHaveCount(16);
        await expect(footerLinks).toHaveText([
            'About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions',
            'Contact Us', 'Returns', 'Site Map', 'Brands',
            'Gift Certificates', 'Affiliate', 'Specials', 'Support Center',
            'My Account', 'Order History', 'Wish List', 'Newsletter'
        ]);
        await expect(footerLinks.first()).toHaveText('About Us');
        await expect(footerLinks.last()).toHaveText('Newsletter');
        await expect(footerLinks.nth(0)).toHaveAttribute('href', '#about-us');
        await expect(footerLinks.nth(1)).toHaveAttribute('href', '#delivery-information');
        await expect(footerLinks.nth(2)).toHaveAttribute('href', '#privacy-policy');
        await expect(footerLinks.nth(3)).toHaveAttribute('href', '#terms-conditions');
        await expect(footerLinks.nth(4)).toHaveAttribute('href', '#contact-us');
        await expect(footerLinks.nth(5)).toHaveAttribute('href', '#returns-footer');
        await expect(footerLinks.nth(6)).toHaveAttribute('href', '#site-map');
        await expect(footerLinks.nth(7)).toHaveAttribute('href', '#brands');
        await expect(footerLinks.nth(8)).toHaveAttribute('href', '#gift-certificates');
        await expect(footerLinks.nth(9)).toHaveAttribute('href', '#affiliate');
        await expect(footerLinks.nth(10)).toHaveAttribute('href', '#specials');
        await expect(footerLinks.nth(11)).toHaveAttribute('href', '#support-center');
        await expect(footerLinks.nth(12)).toHaveAttribute('href', '#footer-my-account');
        await expect(footerLinks.nth(13)).toHaveAttribute('href', '#footer-order-history');
        await expect(footerLinks.nth(14)).toHaveAttribute('href', '#footer-wish-list');
        await expect(footerLinks.nth(15)).toHaveAttribute('href', '#footer-newsletter');

        await footer.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
        await expect(page).toHaveURL(URL + '#privacy-policy');
        await footer.getByRole('link', { name: 'Terms & Conditions', exact: true }).click();
        await expect(page).toHaveURL(URL + '#terms-conditions');
    });

    test('Show and hide the Playwright solution', async ({ page }) => {
        const solution = page.locator('#playwright-solution');
        const solutionCode = solution.locator('pre');

        await expect(solution).toBeVisible();
        await expect(solution.locator('summary')).toContainText('Playwright solution');
        await expect(solutionCode).toBeHidden();

        await solution.locator('summary').click();
        await expect(solutionCode).toBeVisible();
        await expect(solutionCode).toContainText('allInnerTexts()');
        await expect(solutionCode).toContainText('Forgotten Password');
        await expect(solutionCode).toContainText('footer a');

        await solution.locator('summary').click();
        await expect(solutionCode).toBeHidden();
    });
});
