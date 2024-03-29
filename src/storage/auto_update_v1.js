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

  const urlLogin = process.env.HOST_DOMAIN + "wp-login.php?loggedout=true&wp_lang=vi";

  const urlPostPrivate = process.env.HOST_DOMAIN + "wp-admin/edit.php?post_status=private";

  const urlPost = process.env.HOST_DOMAIN + "wp-admin/post.php?action=edit&post=";

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
    console.log(" \n Step 1: Login page \n");
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
    console.log(" \n -- SUCCESS --");
  } catch (error) {
  }

  /**
   * Step 2: Get list id post
   */
  console.log(" \n Step 2: Get list id post \n");

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
        console.log(post_ids);
      } catch (e) {

      }


      /**
       * Step 2. Go to 1 post
       */
      let number_id = 0;
      if (post_ids.length > 0) {
        console.log(" \n Step 3: Go to post \n");
        while (1) {
          try {
            await page.goto(urlPost + post_ids[number_id], {
              waitUntil: ["networkidle2"],
            });
          } catch (e) {

          }
          console.log(" \n PUBLISH post " + number_id + ": " + post_ids[number_id]);

          //save remote image
          try {
            console.log("Save Remote Image")
            await page.click('#save-remote-images-button');
            await page.waitForTimeout(1000 * 60 * 10);
            await page.reload();
            try {
              await page.waitForNavigation({timeout: 10000});
            } catch (error) {
            }
          } catch (error) {

          }

          try {
            //add category
            /*await page.$eval("#in-category-1", (el) => el.click()); //Tin tức
            await page.$eval("#in-category-4", (el) => el.click()); //Top kỳ thú
            await page.$eval("#in-category-7", (el) => el.click()); //Thợ công nghệ
            await page.$eval("#in-category-63", (el) => el.click()); //Đời sống*/

            //add tag
            /*await page.$eval("#new-tag-post_tag", (el) => {
              el.value = "Top";
            });
            await page.$eval(".tagadd", (el) => el.click());*/

            //publish
            await page.$eval(".edit-visibility", (el) => el.click());
            await page.$eval("#visibility-radio-public", (el) => el.click());
            await page.$eval(".save-post-visibility", (el) => el.click());

            //save
            await page.$eval("#publish", (el) => el.click());

            try {
              await page.waitForNavigation({
                waitUntil: "networkidle2",
              });
            } catch (error) {
            }

            console.log(" \n -- DONE " + number_id + ": " + post_ids[number_id]);
            number_id = number_id + 1;

            if (number_id >= post_ids.length) {
              break;
            }
          } catch (e) {

          }
        }
      } else {
        break;
      }
    }
  } catch (e) {

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
