import puppeteer from "puppeteer";
import "dotenv/config";
import {MINIMAL_ARGS} from "./minimal.js";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: MINIMAL_ARGS,
    userDataDir: './cache'
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const urlLogin = process.env.HOST_ADMIN + "/wp-login.php?loggedout=true&wp_lang=vi";

  const urlPostPrivate = process.env.HOST_ADMIN + "/wp-admin/edit.php?post_status=private";

  const urlPost = process.env.HOST_ADMIN + "/wp-admin/post.php?action=edit&post=";

  try {
    await page.goto(urlLogin, {
      waitUntil: ["networkidle2"],
    });
  } catch (error) {
  }

  /**
   * Step 1: Login
   */
  try {
    console.log("Login admin:");
    console.log("username: " + process.env.USER_ADMIN);
    console.log("password: " + process.env.USER_PASSWORD);

    await page.$eval(
      "#loginform #user_login",
      (el, process) => {
        el.value = process.env.USER_ADMIN;
      },
      process
    );
    await page.$eval(
      "#loginform #user_pass",
      (el, process) => {
        el.value = process.env.USER_PASSWORD;
      },
      process
    );
    await page.click("#wp-submit");
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });
    console.log("\n-- LOGIN SUCCESS --\n");
  } catch (error) {
  }

  /**
   * Get list id post
   */
  try {
    while (1) {
      let post_ids = [];
      try {
        await page.goto(urlPostPrivate, {
          waitUntil: ["networkidle2"],
        });

        await page.$eval("#the-list tr", (el) => el.id);
        let ids_perpage = await page.$$eval("#the-list tr", (els) => {
          return els.map((el) => el.id);
        });

        ids_perpage = ids_perpage.map((id) => {
          return getNumberInString(id);
        });
        post_ids = ids_perpage[0] !== "" ? post_ids.concat(ids_perpage) : post_ids;
      } catch (e) {

      }

      //stop nếu chưa có bài biết riêng tư
      if (post_ids.length <= 0) {
        await page.waitForTimeout(5000);
        continue;
      }
      console.log(post_ids);

      /**
       * Go to 1 post
       */
      let number_id = 0;
      while (1) {

        //go page
        try {
          await page.goto(urlPost + post_ids[number_id], {
            waitUntil: ["networkidle2"],
          });
        } catch (error) {
          console.log(error);
        }
        console.log("Post ID: " + post_ids[number_id]);


        //save remote image
        try {
          console.log("Save Remote Image");
          await page.click('#save-remote-images-button');
          await page.waitForTimeout(1000 * 60 * 10);
          console.log("Reload Page");
          await page.reload();
          try {
            await page.waitForNavigation({timeout: 10000});
          } catch (error) {
          }
        } catch (error) {
          console.log(error)
        }

        //publish
        try {
          console.log("Publish Post");
          await page.$eval(".edit-visibility", (el) => el.click());
          await page.$eval("#visibility-radio-public", (el) => el.click());
          await page.$eval(".save-post-visibility", (el) => el.click());

          await page.waitForTimeout(5000);
        } catch (error) {
          console.log(error);
        }

        //save post
        try {
          console.log("Save Post");
          await page.$eval("#publish", (el) => el.click());

          try {
            await page.waitForNavigation({
              waitUntil: "networkidle2",
            });
          } catch (error) {
            console.log(error);
          }
          await page.waitForTimeout(2000);
        } catch (error) {
          console.log(error);
        }

        //next post
        console.log("Done Post: " + post_ids[number_id] + "\n");
        console.log("\x1b[34m------------\x1b[0m\n");
        number_id = number_id + 1;
      }
    }
  } catch (error) {
    console.log(error)
  }

  console.log("\n");
  console.log("---------------");
  console.log("--- SUCCESS ---");
  console.log("---------------");

  await browser.close();
})();

function getNumberInString(string) {
  return string.replace(/[^0-9]/g, "");
}
