const { By } = require("selenium-webdriver");
const assert = require("assert");
class LCWaikikiPage {
  constructor(driver) {
    this.driver = driver;
    this.baseUrl = "https://www.lcwaikiki.com/tr-TR/TR";
    // Locators
    this.categoryLinkLocator = By.linkText("KADIN");
    this.productCategoryLinkLocator = By.xpath(
      "//img[@alt='SWEATSHIRT VE EŞOFMAN']"
    );
    this.productLinkLocator = By.xpath(
      "//img[contains(@src,'https://img-lcwaikiki.mncdn.com/mnresize/600/800/pim/productimages/20232/6795734/v1/l_20232-w3g830z8-cvl-75-61-88-178_a.jpg')]"
    );
    this.addToCartButtonLocator = By.className("add-to-cart");
    this.cartLinkLocator = By.linkText("Sepetim");
    this.selectSizeLocator = By.linkText("XS");
  }

  async openHomePage() {
    await this.driver.get(this.baseUrl);
  }

  async openCategoryPage() {
    try {
      const categoryLink = await this.driver.findElement(
        this.categoryLinkLocator
      ); // Örnek bir kategori linki

      await categoryLink.click();
      const expectedUrl = "https://www.lcwaikiki.com/tr-TR/TR/lp/32-33-kadin";
      const currentUrl = await this.driver.getCurrentUrl();
      assert.strictEqual(
        currentUrl,
        expectedUrl,
        "KADIN kategori sayfasına yönlendirme başarısız."
      );
      console.log("KADIN kategori sayfasına başarıyla yönlendirildi.");
    } catch (error) {
      console.error("Hata: " + error.message);
    }
  }

  async openProductcategoryPage() {
    try {
      const productcategoryLink = await this.driver.findElement(
        this.productCategoryLinkLocator
      );
      //örnek bir kadın kategorisinden ürün başlığına git
      await productcategoryLink.click();
      const expectedUrl =
        "https://www.lcwaikiki.com/tr-TR/TR/etiket/kadin-sweatshirt-esofmanalti";
      const currentUrl = await this.driver.getCurrentUrl();
      assert.strictEqual(
        currentUrl,
        expectedUrl,
        "KADIN kategorisi SWEATSHIRT VE EŞOFMAN sayfasına yönlendirme başarısız."
      );
      console.log(
        "KADIN kategorisi SWEATSHIRT VE EŞOFMAN sayfasına başarıyla yönlendirildi."
      );
    } catch (error) {
      console.error("Hata: " + error.message);
    }
  }
  async openProductPage() {
    try {
      const productLink = await this.driver.findElement(
        this.productLinkLocator
      ); //örnek bir ürün seç
      await productLink.click();
      const expectedUrl =
        "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Esofman-Alti/6795734/3141638";
      const currentUrl = await this.driver.getCurrentUrl();
      assert.strictEqual(
        currentUrl,
        expectedUrl,
        "LCW Casual Beli Lastikli Rahat Kalıp Kadın Eşofman Altı ürün sayfasına yönlendirme başarısız."
      );
      console.log(
        "LCW Casual Beli Lastikli Rahat Kalıp Kadın Eşofman Altı ürün sayfasına başarıyla yönlendirildi."
      );
    } catch (error) {
      console.error("Hata: " + error.message);
    }
  }

  async selectSize() {
    const selectSizeButton = await this.driver.findElement(
      this.selectSizeLocator
    );
    await selectSizeButton.click();
    await this.driver.sleep(1000);

    const isSelected = await this.isSizeSelected("XS");

    if (isSelected) {
      console.log("Beden seçimi yapıldı.");
      assert.strictEqual(isSelected, true, "Beden seçimi başarısız oldu.");
    } else {
      console.error("Beden seçimi başarısız oldu.");
      assert.fail("Beden seçimi başarısız oldu.");
    }
  }

  async isSizeSelected(size) {
    try {
      const selectedSizeButton = await this.driver.findElement(
        By.linkText(size)
      );
      const classAttributeValue = await selectedSizeButton.getAttribute(
        "class"
      );
      return classAttributeValue.includes("selected");
    } catch (error) {
      console.error("Hata: " + error.message);
      return false;
    }
  }

  async addToCart() {
    const addToCartButton = await this.driver.findElement(
      this.addToCartButtonLocator
    ); // Sepete ekleme butonu
    await addToCartButton.click();
  }

  async goToCartPage() {
    try {
      const cartLink = await this.driver.findElement(this.cartLinkLocator);
      await cartLink.click();
      const expectedUrl = "https://www.lcwaikiki.com/tr-TR/TR/sepetim";
      const currentUrl = await this.driver.getCurrentUrl();

      assert.strictEqual(
        currentUrl,
        expectedUrl,
        "Sepetim sayfasına yönlendirme başarısız oldu."
      );

      console.log("Sepetim sayfasına başarıyla yönlendirildi.");
    } catch (error) {
      console.error("Hata: " + error.message);
      assert.fail("Sepetim sayfasına yönlendirme başarısız oldu.");
    }
  }

  async goBackToHomePage() {
    try {
      await this.driver.navigate().to(this.baseUrl);
      const expectedUrl = "https://www.lcwaikiki.com/tr-TR/TR";
      const currentUrl = await this.driver.getCurrentUrl();
      assert.strictEqual(
        currentUrl,
        expectedUrl,
        " Ana sayfaya yönlendirme başarısız."
      );
      console.log("Ana Sayfaya başarıyla geri Dönüldü.");
    } catch (error) {
      console.error("Hata:" + error.message);
    }
  }
}

module.exports = LCWaikikiPage;
