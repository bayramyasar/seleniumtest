const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const chromeOptions = new chrome.Options().addArguments("--start-maximized");
const LCWaikikiPage = require("./lcwaikikiPage");
async function lcWaikikiTest() {
  // Chrome sürücüsünü yapılandırma ve seçenekleri ile başlatma
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  const lcwaikikiPage = new LCWaikikiPage(driver);
  try {
    // 1. Ana sayfaya gitme
    await lcwaikikiPage.openHomePage();

    // 2. Kategori sayfasına gitme
    await lcwaikikiPage.openCategoryPage();

    // 3. Ürün kategori sayfasına gitme (SWEATSHIRT EŞOFMAN)

    await lcwaikikiPage.openProductcategoryPage();

    // // 4. Ürün sayfasına gitme
    await lcwaikikiPage.openProductPage();

    // //5.ürün bedenini seç
    await lcwaikikiPage.selectSize();

    // // 5. Ürünü sepete ekleme
    await lcwaikikiPage.addToCart();

    // // 6. Sepet sayfasına gitme
    await lcwaikikiPage.goToCartPage();

    // // 6. Anasayfaya geri dönme
    await lcwaikikiPage.goBackToHomePage();
  } finally {
    await driver.quit();
  }
}

lcWaikikiTest().catch((err) => {
  console.error("Hata:", err.message);
});
