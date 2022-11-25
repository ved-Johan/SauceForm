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

async function testValidInputs(capabilities) {
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

  fillAndSubmitForm(webdriver, driver, "Johan", "20");

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

async function testInvalidName(capabilities) {
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

  fillAndSubmitForm(webdriver, driver, "", "20");

  try {
    let ele = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.css(".alert")),
      500
    );
    let alertText = await ele.getText();
    assert(alertText == "Error");
    await driver.executeScript("sauce:job-result=passed");
  } catch (e) {
    await driver.executeScript("sauce:job-result=failed");
  }
  await driver.quit();
}

async function testInvalidNumber(capabilities) {
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

  fillAndSubmitForm(webdriver, driver, "Pedro", "-1");

  try {
    let ele = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.css(".alert")),
      500
    );
    let alertText = await ele.getText();
    assert(alertText == "Error");
    await driver.executeScript("sauce:job-result=passed");
  } catch (e) {
    await driver.executeScript("sauce:job-result=failed");
  }
  await driver.quit();
}

const capabilities1 = {
  browserName: "safari",
  browserVersion: "15",
  platformName: "macOS 12",
  "sauce:options": {
    build: "sauce-js",
    name: "CP-SC-01 on macOS",
  },
};

const capabilities2 = {
  browserName: "safari",
  browserVersion: "15",
  platformName: "macOS 12",
  "sauce:options": {
    build: "sauce-js",
    name: "CP-SC-02 on macOS",
  },
};

const capabilities3 = {
  browserName: "safari",
  browserVersion: "15",
  platformName: "macOS 12",
  "sauce:options": {
    build: "sauce-js",
    name: "CP-SC-03 on macOS",
  },
};

testValidInputs(capabilities1);
testInvalidName(capabilities2);
testInvalidNumber(capabilities3);
