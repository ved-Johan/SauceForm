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
  capabilities["sauce:options"].name = "CP-SF-01 on macOS";
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

async function testSF2(capabilities) {
  capabilities["sauce:options"].name = "CP-SF-02 on macOS";
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

  await fillAndSubmitForm(webdriver, driver, "", "1");

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

async function testSF3(capabilities) {
  capabilities["sauce:options"].name = "CP-SF-03 on macOS";
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

  await fillAndSubmitForm(
    webdriver,
    driver,
    "Areallylongnamethatismorethantwentycharacters",
    "11"
  );

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

async function testSF4(capabilities) {
  capabilities["sauce:options"].name = "CP-SF-04 on macOS";
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

  await fillAndSubmitForm(webdriver, driver, "Pedro", "0");

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

async function testSF5(capabilities) {
  capabilities["sauce:options"].name = "CP-SF-05 on macOS";
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

  await fillAndSubmitForm(webdriver, driver, "Ribak", "199");

  try {
    let ele = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.css(".alert")),
      500
    );
    let alertText = await ele.getText();
    assert(alertText == "Success");
    await driver.executeScript("sauce:job-result=passed");
  } catch (e) {
    await driver.executeScript("sauce:job-result=failed");
  }
  await driver.quit();
}

async function testSF6(capabilities) {
  capabilities["sauce:options"].name = "CP-SF-06 on macOS";
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

  await fillAndSubmitForm(webdriver, driver, "Jesus", "200");

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

const capabilities = {
  browserName: "safari",
  browserVersion: "15",
  platformName: "macOS 12",
  "sauce:options": {
    build: "sauce-js",
    name: "CP-SF-01 on macOS",
  },
};

testSF1(capabilities);
testSF2(capabilities);
testSF3(capabilities);
testSF4(capabilities);
testSF5(capabilities);
testSF6(capabilities);
