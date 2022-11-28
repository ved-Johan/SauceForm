const webdriver = require("selenium-webdriver");
const assert = require("assert");

async function fillAndSubmitForm(webdriver, driver, name, number) {
  const nameInputField = await driver.findElement(webdriver.By.css("#name"));
  const numberInputField = await driver.findElement(
    webdriver.By.css("#number")
  );

  await nameInputField.sendKeys(name);
  await numberInputField.sendKeys(number);

  const submitButton = await driver.findElement(webdriver.By.css("#submit"));

  await submitButton.click();
}

async function testSF1(capabilities) {
  let driver = new webdriver.Builder()
    .usingServer(
      `http://${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com/wd/hub`
    )
    .withCapabilities({
      ...capabilities,
      ...(capabilities["browser"] && { browserName: capabilities["browser"] }), // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  await driver.get("https://sauce-form.vercel.app/");

  await fillAndSubmitForm(webdriver, driver, "Johan", "1");

  try {
    let ele = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.css(".alert")),
      1000
    );
    let alertText = await ele.getText();
    assert(alertText == "Success");
    await driver.executeScript("sauce:job-result=passed");
  } catch (e) {
    console.error(e);
    await driver.executeScript("sauce:job-result=failed");
  }
  await driver.quit();
}

const capabilities = {
  browserName: "Safari",
  browserVersion: "latest",
  platformName: "iOS",
  "sauce:options": {
    build: "iosB",
    name: "CP-SF-01 on iOS",
  },
};

testSF1(capabilities);
