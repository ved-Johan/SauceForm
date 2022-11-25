const webdriver = require("selenium-webdriver");

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

  const nameInputField = await driver.findElement(webdriver.By.css("#name"));
  const numberInputField = await driver.findElement(
    webdriver.By.css("#number")
  );

  await nameInputField.sendKeys("Johan");
  await numberInputField.sendKeys("20");

  const submitButton = await driver.findElement(webdriver.By.css("#submit"));

  await submitButton.click();

  try {
    let ele = await driver.wait(until.elementLocated(By.css(".alert")), 1000);
    let alertText = await ele.getText();
    assert(alertText == "Success");
    await driver.executeScript("sauce:job-result=passed");
  } catch (e) {
    console.error(e)
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
    name: "sauce on macOS",
  },
};

testValidInputs(capabilities);
