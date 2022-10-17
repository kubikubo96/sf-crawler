import puppeteer from "puppeteer";
import "dotenv/config";
import {MINIMAL_ARGS} from "./minimal.js";

(async () => {
  while (1) {
    const browser = await puppeteer.launch({
      headless: true,
      args: MINIMAL_ARGS,
      userDataDir: './cache'
    });
    const page = await browser.newPage();

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
      try {
        await page.waitForNavigation({timeout: 60000});
      } catch (error) {
      }
      console.log("\n-- LOGIN SUCCESS --\n");
    } catch (error) {
    }

    /**
     * Get list id post
     */
    while (1) {
      let breakWhileGetListPost = false;
      try {
        let post_ids = [];

        //go to list post private
        try {
          await page.goto(urlPostPrivate, {
            waitUntil: ["networkidle2"],
          });
        } catch (error) {

        }

        //get list id post private
        try {
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

        if (!post_ids[0]) {
          break;
        }

        //break while get list post
        if (breakWhileGetListPost) {
          break;
        }

        /**
         * Go to 1 post
         */
        let number_id = 0;
        while (1) {

          //break while go to post and list post
          if (!post_ids[number_id]) {
            breakWhileGetListPost = true;
            break;
          }

          //go to 1 post
          try {
            try {
              await page.goto(urlPost + post_ids[number_id], {
                waitUntil: ["networkidle2"],
              });
            } catch (error) {
            }
            try {
              await page.waitForNavigation({timeout: 60000});
            } catch (error) {
            }
            await page.waitForTimeout(5000);
          } catch (error) {
          }
          console.log("Post ID: " + post_ids[number_id]);


          //save remote image
          try {
            console.log("Save Remote Image");
            await page.click('#save-remote-images-button');
            await page.waitForTimeout(1000 * 60 * 5);
            console.log("Reload Page");
            await page.reload();
            try {
              await page.waitForNavigation({timeout: 60000});
            } catch (error) {
            }
          } catch (error) {
            //break while go to post and list post
            breakWhileGetListPost = true;
            break;
          }

          //publish
          try {
            console.log("Publish Post");
            await page.$eval(".edit-visibility", (el) => el.click());
            await page.waitForTimeout(2000);
            await page.$eval("#visibility-radio-public", (el) => el.click());
            await page.waitForTimeout(2000);
            await page.$eval(".save-post-visibility", (el) => el.click());

            await page.waitForTimeout(5000);
          } catch (error) {
            try {
              try {
                await page.goto(urlPost + post_ids[number_id], {
                  waitUntil: ["networkidle2"],
                });
              } catch (error) {
              }
              try {
                await page.waitForNavigation({timeout: 60000});
              } catch (error) {
              }
              await page.waitForTimeout(5000);
            } catch (error) {
              //break while go to post and list post
              breakWhileGetListPost = true;
              break;
            }
          }

          //save post
          try {
            console.log("Save Post");
            await page.$eval("#publish", (el) => el.click());

            try {
              await page.waitForNavigation({timeout: 60000});
            } catch (error) {
            }
            await page.waitForTimeout(2000);
          } catch (error) {
            try {
              try {
                await page.goto(urlPost + post_ids[number_id], {
                  waitUntil: ["networkidle2"],
                });
              } catch (error) {
              }
              try {
                await page.waitForNavigation({timeout: 60000});
              } catch (error) {
              }
              await page.waitForTimeout(5000);
            } catch (error) {
              //break while go to post and list post
              breakWhileGetListPost = true;
              break;
            }
          }

          //next post
          console.log("Done Post: " + post_ids[number_id] + "\n");
          console.log("\x1b[34m------------\x1b[0m\n");
          number_id = number_id + 1;
        }

        //break while get list post
        if (breakWhileGetListPost) {
          break;
        }
      } catch (error) {
        break;
      }
    }

    await browser.close();
  }
})();

function getNumberInString(string) {
  return string.replace(/[^0-9]/g, "");
}
