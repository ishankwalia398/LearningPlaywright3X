package com.salesforce.tests;

import org.testng.Assert;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.salesforce.base.BaseTest;
import com.salesforce.pages.LoginPage;

public class ValidLoginTest extends BaseTest {

    @Test
    @Parameters({"validUsername", "validPassword"})
    public void testValidLogin(String username, String password) {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.doLogin(username, password);
        Assert.assertTrue(loginPage.isHomePageDisplayed(), "Home page should be displayed after valid login");
    }
}
