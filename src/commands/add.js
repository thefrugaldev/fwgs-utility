import chalk from "chalk";
import { readFile } from "fs";
import path from "path";
import textract from "@nosferatu500/textract-lite";
import launch, { login } from "../utils/puppeteer.js";

const add = async (filename, email, password) => {
  console.log(chalk.blue.bold(`Importing wishlist from ${filename}...`));

  const __dirname = path.resolve();
  const fullPath = `${__dirname}/${filename}`;

  textract.fromFileWithPath(fullPath, async function (error, text) {
    if (error) throw error;
    const regEx = /\d+/g;
    const catIds = text.match(regEx);

    catIds.forEach((id) => {
      // console.log(chalk.blue.bold(`Adding to wishlist for item ${id}...`));
    });

    const { browser, page } = await launch();

    await login(page, email, password);

    // await browser.close();
  });

  // readFile(fullPath, "utf8", (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // });
};

export default add;
