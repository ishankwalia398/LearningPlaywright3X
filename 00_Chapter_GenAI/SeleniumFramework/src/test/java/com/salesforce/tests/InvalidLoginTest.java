package com.salesforce.tests;

import org.testng.Assert;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.salesforce.base.BaseTest;
import com.salesforce.pages.LoginPage;

public class InvalidLoginTest extends BaseTest {

    @Test
    @Parameters({"invalidUsername", "invalidPassword"})
    public void testInvalidLogin(String username, String password) {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.doLogin(username, password);
        String actualError = loginPage.getErrorMessage();
        Assert.assertFalse(actualError.isEmpty(), "Error message should be displayed for invalid login");
        Assert.assertTrue(actualError.toLowerCase().contains("please check"), "Error message should indicate invalid credentials. Actual: " + actualError);
    }
}
