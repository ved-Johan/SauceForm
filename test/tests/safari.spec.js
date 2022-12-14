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

function getCapabilites(s) {
  return {
    browserName: "safari",
    browserVersion: "15",
    platformName: "macOS 12",
    "sauce:options": {
      build: process.env.COMMIT_MESSAGE,
      name: s,
    },
  };
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

async function testSF2(capabilities) {
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

testSF1(getCapabilites("CP-SF-01 on macOS"));
testSF2(getCapabilites("CP-SF-02 on macOS"));
testSF3(getCapabilites("CP-SF-03 on macOS"));
testSF4(getCapabilites("CP-SF-04 on macOS"));
testSF5(getCapabilites("CP-SF-05 on macOS"));
testSF6(getCapabilites("CP-SF-06 on macOS"));
