package com.salesforce.base;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.Duration;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

import io.github.bonigarcia.wdm.WebDriverManager;

public class BaseTest {

    protected WebDriver driver;
    protected Properties config;

    @BeforeTest
    @Parameters({"url"})
    public void setUp(@Optional("https://login.salesforce.com/?locale=in") String url) {
        try {
            config = new Properties();
            try (FileInputStream fis = new FileInputStream("src/test/resources/config.properties")) {
                config.load(fis);
            } catch (IOException e) {
                config.setProperty("browser", "chrome");
                config.setProperty("timeout", "10");
            }

            String browser = config.getProperty("browser", "chrome").toLowerCase();

            switch (browser) {
                case "firefox":
                    WebDriverManager.firefoxdriver().setup();
                    driver = new FirefoxDriver();
                    break;
                case "edge":
                    WebDriverManager.edgedriver().setup();
                    driver = new EdgeDriver();
                    break;
                default:
                    WebDriverManager.chromedriver().setup();
                    driver = new ChromeDriver();
                    break;
            }

            int timeout = Integer.parseInt(config.getProperty("timeout", "10"));
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(timeout));
            driver.manage().window().maximize();
            driver.get(url);
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize WebDriver: " + e.getMessage(), e);
        }
    }

    @AfterTest
    public void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
            } catch (Exception e) {
                System.err.println("Error during driver quit: " + e.getMessage());
            }
        }
    }
}
