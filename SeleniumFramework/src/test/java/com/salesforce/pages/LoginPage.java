package com.salesforce.pages;

import java.time.Duration;

import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement usernameInput;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement passwordInput;

    @FindBy(xpath = "//input[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//div[@id='error']")
    private WebElement errorMessage;

    @FindBy(xpath = "//div[@class='profileCard']")
    private WebElement profileCard;

    public LoginPage(WebDriver driver) {
        try {
            this.driver = driver;
            this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            PageFactory.initElements(driver, this);
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize LoginPage: " + e.getMessage(), e);
        }
    }

    public void doLogin(String username, String password) {
        try {
            wait.until(ExpectedConditions.visibilityOf(usernameInput)).sendKeys(username);
            passwordInput.sendKeys(password);
            wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
        } catch (Exception e) {
            throw new RuntimeException("Login failed for user [" + username + "]: " + e.getMessage(), e);
        }
    }

    public String getErrorMessage() {
        try {
            wait.until(ExpectedConditions.visibilityOf(errorMessage));
            return errorMessage.getText();
        } catch (TimeoutException | NoSuchElementException e) {
            return "";
        }
    }

    public boolean isHomePageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(profileCard)).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }
}
