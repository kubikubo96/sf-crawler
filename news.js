import puppeteer from "puppeteer";
import "dotenv/config";
import {
  DATA_ELEMENT_INTERNAL_POST,
  DATA_INTERNAL_FULL,
  DATA_INTERNAL_POST,
  ELM_TRASH,
  ELM_TRASH_PARENT,
  LIST_TRASH_LINK,
  LIST_TRASH_P,
  TRASH_AUTHOR
} from "./constants.js";
import {handleListPage, saveData} from "./helper.js";

(async () => {
  //set puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-site-isolation-trials",
      "--window-size=1900,1000",
      "--lang=en-US,en",
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  // data crawl
  let listPage = handleListPage();
  const limitPage = listPage.length;
  let numberPage = 0;

  /**
   * Vòng lặp danh sách trang
   */
  while (1) {
    try {
      console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");
      try {
        await page.goto(listPage[numberPage].url, {
          waitUntil: ["networkidle2"],
        });
      } catch (error) {
        console.log(error)
      }
      const sourceCrawl = listPage[numberPage].source;

      /**
       * Get danh sách bài viết
       *
       * @type {{url}[]}
       */
      let elmLinkPost = listPage[numberPage].elmLinkPost;
      let typeLinkPost = listPage[numberPage].typeLinkPost;
      const listPost = await page.evaluate((sourceCrawl, elmLinkPost, typeLinkPost) => {
        let links = document.querySelectorAll(elmLinkPost);
        links = [...links];
        switch (typeLinkPost) {
          case 'path':
            return links.map((link) => ({
              url: 'https://' + sourceCrawl + link.getAttribute("href"),
            }));
          case 'full':
            return links.map((link) => ({
              url: link.getAttribute("href"),
            }));
        }
      }, sourceCrawl, elmLinkPost, typeLinkPost);

      let totalCrawled = 0; // tổng số bài đã crawl
      let numberPostCrawled = 0; // number bài đã crawl

      //let numberPost = listPost.length - 1 - totalCrawled; // tính theo totalCrawled
      let numberPost = listPost.length - 1;
      //numberPost = numberPost - (numberPost - numberPostCrawled); // tính theo numberPostCrawled
      let minPost = 0;

      /**
       * Lặp danh sách bài viết
       */
      while (1) {
        console.log('Number Post: \x1b[33m' + numberPost + ' \x1b[0m');
        console.log('Url Crawl: \x1b[32m' + listPost[numberPost].url + ' \x1b[0m');
        try {
          try {
            await page.goto(listPost[numberPost].url, {
              waitUntil: ["networkidle2"],
            });
          } catch (error) {
            console.log(error)
          }
          await page.waitForTimeout(3000);

          try {
            await page.evaluate(() => {
              window.scrollTo(0, document.body.scrollHeight);
            });
          } catch (error) {
            console.log(error)
          }
          await page.waitForTimeout(2000);

          try {
            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
          } catch (error) {
            console.log(error)
          }
          await page.waitForTimeout(4000);

          const elmTitle = listPage[numberPage].elmTitle;
          const elmContent = listPage[numberPage].elmContent;
          const elmLink = listPage[numberPage].elmLink;
          const elmImage = listPage[numberPage].elmImage;
          const elmSortContent = listPage[numberPage].elmSortContent;
          const elmTagP = listPage[numberPage].elmTagP;
          const elmTagQuote = listPage[numberPage].elmTagQuote;
          const elmTagFigure = listPage[numberPage].elmTagFigure;
          try {
            await page.waitForSelector(elmTitle);
            await page.waitForSelector(elmContent);
          } catch (error) {
            console.log(error)
          }

          //Khởi tạo Data
          const data = {
            title: "",
            content: "",
            source: "",
            url_crawl: page.url(),
            tag: listPage[numberPage].tag,
            seo_tag_description: "",
          };

          //start: replace src image
          try {
            await page.$$eval(elmImage, (elms) => {
              return elms.forEach((elm) => {
                elms = [...elms];
                elm.src = elm.getAttribute("data-src")
                  ? elm.getAttribute("data-src")
                  : elm.src;
              });
            });
          } catch (error) {
            console.log(error)
          }
          //end: replace src image

          //start: thay để nội dung ngắn h2 thành strong
          switch (sourceCrawl) {
            case 'dienmayxanh.com':
            case 'funix.edu.vn':
              try {
                await page.$eval(elmSortContent, (elm) => {
                  if (elm) {
                    elm.outerHTML = '<strong>' + elm.textContent + '</strong>'
                  }
                });
              } catch (error) {
                console.log(error)
              }
              break;
          }
          //end: thay để nội dung ngắn h2 thành strong


          //start: remove trash
          try {
            await page.evaluate((ELM_TRASH, ELM_TRASH_PARENT) => {
              ELM_TRASH.forEach((item) => {
                try {
                  let queryTrash = document.querySelectorAll(item);
                  queryTrash.forEach((elm) => {
                    //start: remove parent
                    if (ELM_TRASH_PARENT.includes(item)) {
                      elm.closest('ul').remove();
                    }
                    //start: remove parent

                    elm.remove();
                  });
                } catch (error) {
                  console.log(error)
                }
              });
            }, ELM_TRASH, ELM_TRASH_PARENT);
          } catch (error) {
            console.log(error)
          }
          //end: remove trash

          //start: remove trash tag a
          try {
            await page.$$eval(
              elmLink,
              (elms, LIST_TRASH_LINK) => {
                elms = [...elms];
                return elms.forEach((elm) => {
                  let content = elm.textContent?.toLowerCase();
                  LIST_TRASH_LINK.forEach(itemTrash => {
                    if (
                      content.includes(itemTrash)
                    ) {
                      elm.remove();
                    }
                  });
                });
              },
              LIST_TRASH_LINK
            );
          } catch (error) {
            console.log(error)
          }
          //end: remove trash tag a

          //start: remove trash tag p
          try {
            await page.$$eval(
              elmTagP,
              (elms, LIST_TRASH_P) => {
                elms = [...elms];
                return elms.forEach((elm) => {
                  let content = elm.textContent;
                  LIST_TRASH_P.forEach(itemTrash => {
                    if (
                      content.includes(itemTrash)
                    ) {
                      elm.remove();
                    }
                  });
                });
              },
              LIST_TRASH_P
            );
          } catch (error) {
            console.log(error)
          }
          //end: remove trash tag p

          //start: remove trash tag blockquote
          try {
            await page.$$eval(
              elmTagQuote,
              (elms, LIST_TRASH_P) => {
                elms = [...elms];
                return elms.forEach((elm) => {
                  let content = elm.textContent;
                  LIST_TRASH_P.forEach(itemTrash => {
                    if (
                      content.includes(itemTrash)
                    ) {
                      elm.remove();
                    }
                  });
                });
              },
              LIST_TRASH_P
            );
          } catch (error) {
            console.log(error)
          }
          //end: remove trash tag blockquote

          //start: remove trash tag figure
          try {
            await page.$$eval(
              elmTagFigure,
              (elms, LIST_TRASH_P) => {
                elms = [...elms];
                return elms.forEach((elm) => {
                  let content = elm.textContent;
                  LIST_TRASH_P.forEach(itemTrash => {
                    if (
                      content.includes(itemTrash)
                    ) {
                      elm.remove();
                    }
                  });
                });
              },
              LIST_TRASH_P
            );
          } catch (error) {
            console.log(error)
          }
          //end: remove trash tag figure

          //start: convert link thành text cho link crawl
          try {
            await page.$$eval(
              elmLink,
              (elms, sourceCrawl) => {
                elms = [...elms];
                return elms.map((elm) => {
                  if (elm.href && elm.href.toLowerCase().search(sourceCrawl) !== -1) {
                    elm.outerHTML = elm.textContent;
                  }
                });
              },
              sourceCrawl
            );
          } catch (error) {
            console.log(error)
          }
          //end: convert link thành text cho link crawl

          //start: replace src image
          try {
            await page.$$eval(
              elmImage,
              (elms, sourceCrawl) => {
                return elms.forEach((elm) => {
                  elms = [...elms];
                  elm.src = elm.src.replace("./", 'https://' + sourceCrawl + '/');
                  elm.src = elm.src.replace("../", 'https://' + sourceCrawl + '/');
                  elm.src = elm.src.replace("./../", 'https://' + sourceCrawl + '/');
                  elm.src = elm.src.replace("../../", 'https://' + sourceCrawl + '/');
                });
              },
              sourceCrawl
            );
          } catch (error) {
            console.log(error)
          }
          //end: replace src image

          //start: add internal link tag
          try {
            let countInternal = 0;
            data.tag = await page.$$eval(elmTagP, (elms, data, countInternal, DATA_INTERNAL_FULL) => {
              if (countInternal <= 1) {
                DATA_INTERNAL_FULL.forEach((dataInternal) => {
                  let BreakException = {};
                  let addInternal = true;
                  if (addInternal) {
                    try {
                      elms.forEach((item) => {
                        if (
                          !item.querySelector('ul') &&
                          !item.querySelector('li') &&
                          !item.querySelector('ol') &&
                          !item.querySelector('a') &&
                          !item.querySelector('code') &&
                          !item.querySelector('code') &&
                          !item.querySelector('kbd') &&
                          !item.querySelector('figure') &&
                          !item.querySelector('figcaption') &&
                          !item.querySelector('img')) {

                          if (item.innerHTML.search(dataInternal.name) !== -1) {
                            item.innerHTML = item.innerHTML.replace(dataInternal.name, ' <a href="' + dataInternal.url + '" target="_blank">' + dataInternal.name + '</a> ');

                            //Nếu chưa có tag thì thì thêm tag
                            let dataCheck = data.tag.filter(item => item.trim().toLowerCase() === dataInternal.name.trim().toLowerCase());
                            if (dataCheck.length === 0) {
                              data.tag = [...data.tag, dataInternal.name.trim()];
                              countInternal++;
                              addInternal = false;
                              throw BreakException; //xử lý break forEach element
                            }
                          }
                        }
                      })
                    } catch (e) {
                      if (e !== BreakException) throw e; //xử lý break forEach element
                    }
                  }
                })
              }
              return data.tag;
            }, data, countInternal, DATA_INTERNAL_FULL);
          } catch (error) {
            console.log(error)
          }
          //end: add internal link tag

          //start: add internal link post
          await page.evaluate((DATA_INTERNAL_POST, DATA_ELEMENT_INTERNAL_POST) => {
            DATA_ELEMENT_INTERNAL_POST.forEach((elmInternal) => {
              let elms = document.querySelectorAll(elmInternal);
              DATA_INTERNAL_POST.forEach((internalPost) => {
                elms.forEach((item) => {
                  if (
                    !item.querySelector('ul') &&
                    !item.querySelector('li') &&
                    !item.querySelector('ol') &&
                    !item.querySelector('a') &&
                    !item.querySelector('code') &&
                    !item.querySelector('code') &&
                    !item.querySelector('kbd') &&
                    !item.querySelector('caption') &&
                    !item.querySelector('figure') &&
                    !item.querySelector('figcaption') &&
                    !item.querySelector('img')) {
                    if (item.innerHTML.search(internalPost.key_start) !== -1) {
                      let maxLengthBetween = internalPost.space * 7;
                      if (item.innerHTML.search(internalPost.key_end) !== -1) {
                        if ((item.innerHTML.search(internalPost.key_end) - item.innerHTML.search(internalPost.key_start)) < maxLengthBetween) {
                          let textPostInternal = item.innerHTML.slice(item.innerHTML.search(internalPost.key_start), (item.innerHTML.search(internalPost.key_end) + internalPost.key_end.length));
                          item.innerHTML = item.innerHTML.replace(textPostInternal, ' <a href="' + internalPost.url + '" target="_blank">' + textPostInternal + '</a> ')
                        }
                      }
                    }
                  }
                })
              });
            });
          }, DATA_INTERNAL_POST, DATA_ELEMENT_INTERNAL_POST);
          //end: add internal link post

          await page.waitForTimeout(2000);
          data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
          data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

          const lengthTitle = data.title.length;
          const lengthDescription = 145 - lengthTitle;

          //thêm seo tag description

          //thêm title trước seo tag
          //data.seo_tag_description = data.title;
          try {
            if (lengthDescription > 0) {
              /*data.seo_tag_description + '. ' + */
              data.seo_tag_description = await page.$$eval(elmContent, (elm, lengthDescription) => {
                return elm[0].textContent.slice(0, Number(lengthDescription)).trim() + "..."
              }, lengthDescription);
            }
          } catch (error) {
            console.log(error)
          }

          //start: replace Tên trang
          TRASH_AUTHOR.forEach((item) => {
            data.content = data.content.replaceAll(item, "KungFuCongNghe.Com");
          });
          //end: replace Tên trang

          /**
           * Save data
           */
          if (data.content.length > 0) {
            // Thêm lời kết KungFuCongNghe
            // data.content = '<strong>' + data.title + '. </strong> ' + data.content + '
            // Vậy là bạn đã cùng KungFuCongNghe.Com tìm hiểu cách thực hiện. Chúc bạn thành công nhé!';

            /**
             * dùng cho trường hợp auto save images
             */
            data.content = data.content.replaceAll('\\', '\\\\');

            await saveData(data);

            console.log('\x1b[44mDONE!\x1b[0m \n');
          }
          numberPost = numberPost - 1;
          /**
           * Done 1 page
           */
          if (numberPost < minPost) {
            numberPage = numberPage + 1;
            console.log("\n -- DONE 1 PAGE -- \n");
            break;
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }

    /**
     * Finish
     */
    if (numberPage >= limitPage) {
      break;
    }
  }

  console.log("\n************* !!! FINISH ALL !!!! ************* \n");

  await browser.close();
})();
