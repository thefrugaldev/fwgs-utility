import puppeteer from "puppeteer";
import chalk from "chalk";

const HOMEPAGE =
  "https://www.finewineandgoodspirits.com/webapp/wcs/stores/servlet/StoreCatalogDisplay?storeId=10051&catalogId=10051&langId=-1";
const LOGIN_PAGE =
  "https://www.finewineandgoodspirits.com/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10051";
const BOTTLE_PAGE =
  "https://www.finewineandgoodspirits.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=10051&storeId=10051&productId=1941442&langId=-1&partNumber=000003863prod&errorViewName=ProductDisplayErrorView&categoryId=1334015&top_category=25208&parent_category_rn=1334013&urlLangId=&variety=Bourbon&categoryType=Spirits&fromURL=%2fwebapp%2fwcs%2fstores%2fservlet%2fCatalogSearchResultView%3fstoreId%3d10051%26catalogId%3d10051%26langId%3d-1%26categoryId%3d1334015%26variety%3dBourbon%26categoryType%3dSpirits%26top_category%3d25208%26parent_category_rn%3d1334013%26sortBy%3d5%26searchSource%3dE%26pageView%3d%26beginIndex%3d0";

const launch = async () => {
  //Creates a Headless Browser Instance in the Background
  const browser = await puppeteer.launch({ headless: false });

  //Creates a Page Instance, similar to creating a new Tab
  const page = await browser.newPage();

  //Navigate to the homepage
  await page.goto(HOMEPAGE);
  //Close any popups
  const ageGateSelector = "#ltkpopup-age-gate-yes";
  const emailPopupClose = ".ltkpopup-close";
  await page.waitForSelector(ageGateSelector);
  await page.click(ageGateSelector);
  await page.click(emailPopupClose);

  // Go to widely available page
  // await page.goto(BOTTLE_PAGE);
  //   // Update entry id
  //   const catEntryIdSelector = "input[name=catEntryId]";
  //   await page.waitForSelector(catEntryIdSelector);
  //   await page.$eval(
  //     catEntryIdSelector,
  //     (el) => (el.value = "Adenosine triphosphate")
  //   );

  //Closes the Browser Instance
  // await browser.close();

  return { browser, page };
};

export const login = async (page, email, pw) => {
  //Login
  await page.goto(LOGIN_PAGE);
  const emailInputSelector = "input[name=logonId]";
  const pwInputSelector = "input[name=logonPassword]";
  const submitButton = "#loginButton";
  await page.waitForSelector(emailInputSelector);

  await page.$eval(
    emailInputSelector,
    (el, emailVal) => (el.value = emailVal),
    email
  );
  await page.$eval(
    pwInputSelector,
    (el, pwVal) => {
      el.value = pwVal;
    },
    pw
  );
  await page.click(submitButton);
};

export default launch;
