import puppeteer from "puppeteer";
import "dotenv/config";
import {
  DATA_ELEMENT_INTERNAL_POST,
  ELM_TRASH,
  ELM_TRASH_PARENT,
  LIST_TRASH_LINK,
  LIST_TRASH_P,
  TRASH_AUTHOR,
  TRASH_TEXT,
} from "./constants.js";
import {DATA_INTERNAL_FULL} from "./internal_full.js";
import {DATA_INTERNAL_POST} from "./internal_smart.js";
import {checkTitleTrue, handleListPage, saveData, timestamps} from "./helper.js";
import {BLOCKED_URL, MINIMAL_ARGS} from "./minimal.js";
import axios from "axios";

(async () => {

  while (1) { /*@todo bot*/

    //data crawl default
    let listPage = handleListPage();
    const limitPage = listPage.length;
    let numberPage = 0;

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

    await page.setRequestInterception(true);

    page.on('request', request => {
      const url = request.url()
      if (
        BLOCKED_URL.some(domain => url.includes(domain)) ||
        request.resourceType() === 'video' ||
        request.resourceType() === 'audio' ||
        request.resourceType() === 'embed' ||
        request.resourceType() === 'iframe' ||
        request.resourceType() === 'frame' ||
        request.resourceType() === 'xslt' ||
        request.resourceType() === 'XSLT'
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    /**
     * Vòng lặp danh sách trang
     */
    while (1) {
      try {
        console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");

        const sourceCrawl = listPage[numberPage].source;
        let elmLinkPost = listPage[numberPage].elmLinkPost;
        let typeLinkPost = listPage[numberPage].typeLinkPost;
        let listPost = [];

        if (listPage[numberPage].method === 'POST') {
          //TYPE GET LIST POST

          switch (listPage[numberPage].source) {
            case 'fptshop.com.vn':
              const response = await axios.post(listPage[numberPage].url);
              let dataResponse = response.data.datas;
              listPost = dataResponse.map((item) => {
                return {url: 'https://fptshop.com.vn/tin-tuc/thu-thuat/' + item.titleAscii};
              });
          }

        } else {
          //TYPE POST GET LIST

          try {
            await page.goto(listPage[numberPage].url, {
              waitUntil: ["networkidle2"],
            });
          } catch (error) {
            console.log(error);
          }

          //Get danh sách bài viết
          listPost = await page.evaluate((sourceCrawl, elmLinkPost, typeLinkPost) => {
            try {
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
            } catch (error) {
              return [];
            }
          }, sourceCrawl, elmLinkPost, typeLinkPost);

        }

        let totalCrawled = 0; // tổng số bài đã crawl
        let numberPostCrawled = 0; // number bài đã crawl

        //let numberPost = listPost.length - 1 - totalCrawled; // tính theo totalCrawled
        let numberPost = listPost.length ? (listPost.length - 1) : -1;
        //numberPost = numberPost - (numberPost - numberPostCrawled); // tính theo numberPostCrawled
        let minPost = 0;

        if (numberPost < 0) {
          numberPage = numberPage + 1;
          continue;
        }

        /**
         * Lặp danh sách bài viết
         */
        while (1) {
          try {
            console.log('Number Post: \x1b[33m' + numberPost + ' \x1b[0m');
            console.log('Url Crawl: \x1b[32m' + listPost[numberPost].url + ' \x1b[0m');
            try {
              await page.goto(listPost[numberPost].url, {
                waitUntil: ["networkidle2"],
              });
            } catch (error) {
              console.log(error);
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
            const elmH1 = listPage[numberPage].elmH1;
            const elmH2 = listPage[numberPage].elmH2;
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

            //start: remove trash img
            await page.$$eval(elmImage, (elms) => {
              return elms.forEach((elm) => {
                if (elm.src?.includes("base64")) {
                  elm.remove();
                }
              });
            });
            //end: remove trash img

            //start: replace src image
            try {
              await page.$$eval(elmImage, (elms) => {
                return elms.forEach((elm) => {
                  elms = [...elms];
                  elm.src = elm.getAttribute("data-src") ? elm.getAttribute("data-src") : (elm.getAttribute("data-img-url") ? elm.getAttribute("data-img-url") : elm.src);
                });
              });
            } catch (error) {
              console.log(error)
            }
            //end: replace src image

            //start: thay để nội dung ngắn h2
            switch (sourceCrawl) {
              case 'dienmayxanh.com':
              case 'bachhoaxanh.com':
                try {
                  await page.$eval(elmH2, (elm) => {
                    if (elm) {
                      elm.outerHTML = '<strong>' + elm.textContent + '</strong>'
                    }
                  });
                } catch (error) {
                  //console.log(error)
                }
                break;
            }
            //end: thay để nội dung ngắn h1,2

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
            let dataInternalFull = [...DATA_INTERNAL_FULL];
            try {
              data.tag = await page.$$eval(elmTagP, (elms, data, dataInternalFull) => {
                let countInternal = 0;
                if (countInternal <= 1) {
                  dataInternalFull.forEach((dataInternal) => {
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
                              }

                              dataInternalFull = dataInternalFull.filter((item) => item !== dataInternal);
                              countInternal++;
                              addInternal = false;
                              throw BreakException; //xử lý break forEach element
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
              }, data, dataInternalFull);
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
            try {
              data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
              data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);
            } catch (error) {
              console.log(error)
            }

            const lengthTitle = data.title.length;
            //const lengthDescription = 140 - lengthTitle;
            const lengthDescription = 140;

            //thêm seo tag description

            //thêm title trước seo tag
            //data.seo_tag_description = data.title;
            try {
              if (lengthDescription > 0) {
                /*data.seo_tag_description + '. ' + */
                data.seo_tag_description = await page.$$eval(elmContent, (elm, lengthDescription) => {
                  return elm[0].textContent.replace(/\s\s+/g, ' ').slice(0, Number(lengthDescription)).trim() + "..."
                }, lengthDescription);
              }
            } catch (error) {
              console.log(error)
            }

            //start: replace Tên trang
            TRASH_AUTHOR.forEach((item) => {
              data.content = data.content.replaceAll(item, "CNKungFu");
            });
            //end: replace Tên trang

            //start: remove trash text
            TRASH_TEXT.forEach((item) => {
              data.content = data.content.replaceAll(item, "");
            });
            //end: replace trash text

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

              //nếu không có trash thì trả về true
              if (checkTitleTrue(data.title)) {
                await saveData(data);
              }
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

    //await browser.close();

    if (process.env.HOST_PRODUCT === '0') {
      break;
    }

    //start: bot
    let timeSleep = 3600000 * 4; //4 giờ
    console.log("\n\x1b[43m************************\x1b[0m");
    console.log('\x1b[43m ! --- SLEEP TIME --- ! \x1b[0m');
    console.log("\x1b[43m************************\x1b[0m \n");
    console.log("START TIME: " + "\x1b[32m" + timestamps() + "\x1b[0m" + " - DURATION: " + "\x1b[32m" + timeSleep / 1000 + "\x1b[0m" + 's');
    await page.waitForTimeout(timeSleep);
    //end: bot
  }
})();
