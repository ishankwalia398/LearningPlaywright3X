1. Install
    - npm install --save-dev @playwright/test allure-playwright 
2. Config 
    - In the `playwright.config.ts add this line``**["allure-playwright"]]**` 
3. One time command 
    - npm i allure-commandline (if error use -> npm i -g allure-commandline)
4. To see the report/results
    - allure serve allure-results/