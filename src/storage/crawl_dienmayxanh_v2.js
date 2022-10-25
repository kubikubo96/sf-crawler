import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-site-isolation-trials", "--window-size=1900,1000", "--lang=en-US,en", "--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const dataCrawlList = [
    {
      path: "meo-hay-facebook-zalo-youtube",
      tag: ["Mạng xã hội", "Mẹo hay Facebook Zalo Youtube"]
    },
    {
      path: "tin-hoc-van-phong",
      tag: ["Tin học văn phòng"]
    },
    {
      path: "phu-kien",
      tag: ["Phụ kiện"]
    },
    {
      path: "meo-huong-dan-su-dung-dong-ho",
      tag: ["Đồng hồ", "Mẹo hướng dẫn sử dụng dồng hồ"]
    },
  ];

  const dataCrawl = [dataCrawlList[0]];

  let listPage = [];

  for (let i = 0; i < dataCrawl.length; i++) {
    const itemPage = {
      url: "https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=10000&url=" + dataCrawl[i].path,
      tag: dataCrawl[i].tag,
    };
    listPage.push(itemPage);
  }

  const sourceCrawl = "dienmayxanh.com";
  const limitPage = listPage.length;
  let numberPage = 0;

  /**
   * Vòng lặp danh sách trang
   */
  //while (1) {
  try {
    console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");
    try {
      await page.goto(listPage[numberPage].url, {
        waitUntil: ["networkidle2"],
      });
    } catch (error) {
    }

    /**
     * Get danh sách bài viết
     *
     * @type {{url}[]}
     */
    const listPost = await page.evaluate((sourceCrawl) => {
      let links = document.querySelectorAll("a.linktitle");
      links = [...links];
      return links.map((link) => ({
        url: 'https://' + sourceCrawl + link.getAttribute("href"),
      }));
    }, sourceCrawl);


    let totalCrawled = 0; // tổng số bài đã crawl
    let numberPostCrawled = 0; // number bài đã crawl

    //let numberPost = listPost.length - 1 - Math.round(listPost.length / 1.2) - totalCrawled; // tính theo totalCrawled
    let numberPost = listPost.length - 1 - Math.round(listPost.length / 1.2);
    //numberPost = numberPost - (numberPost - numberPostCrawled); // tính theo numberPostCrawled
    let minPost = 0;

    /**
     * Lặp danh sách bài viết
     */
    while (1) {
      console.log('Number Post: \x1b[43m' + numberPost + ' \x1b[0m');
      console.log('\nCrawl Post: \x1b[32m' + listPost[numberPost].url + ' \x1b[0m');
      try {
        try {
          await page.goto(listPost[numberPost].url, {
            waitUntil: ["networkidle2"],
          });
        } catch (error) {
        }
        await page.waitForTimeout(3000);

        try {
          await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
          });
        } catch (error) {
        }
        await page.waitForTimeout(2000);

        try {
          await page.evaluate(() => {
            window.scrollTo(0, 0);
          });
        } catch (error) {
        }

        await page.waitForTimeout(4000);

        const elmTitle = ".article h1";
        const elmContent = ".bxcontentnews";
        const elmLink = ".bxcontentnews a";
        const elmImage = ".bxcontentnews img";
        const elmSortContent = ".bxcontentnews h2";
        const elmTagP = ".bxcontentnews > p";

        try {
          await page.waitForSelector(elmTitle);
          await page.waitForSelector(elmContent);
        } catch (error) {
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
        }
        //end: replace src image

        //start: thay để nội dung ngắn h2 thành strong
        try {
          await page.$eval(elmSortContent, (elm) => {
            if (elm) {
              elm.outerHTML = '<p><strong>' + elm.textContent + '</strong></p>'
            }
          });
        } catch (error) {
        }
        //end: replace sort content

        //start: remove trash
        const elmTrash = [
          'iframe', '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
          'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
          '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', '.btn__noibat',
          '.generate-productbox', '.generate-gallery', '.mce-preview-object', '.mce-object-iframe', 'p iframe'
        ];

        try {
          await page.evaluate((elmTrash) => {
            elmTrash.forEach((item) => {
              try {
                let queryTrash = document.querySelectorAll(item);
                queryTrash.forEach((elm) => {
                  elm.remove();
                });
              } catch (error) {
              }
            });
          }, elmTrash);
        } catch (error) {
        }
        //end: remove trash

        //start: remove trash tag a
        const listTrashTag = [
          'điện máy xanh', 'Điện máy XANH', 'Điện máy xanh', 'Điện Máy Xanh', 'ĐIỆN MÁY XANH',
          'Mọi thắc mắc vui lòng để lại câu hỏi ngay bên dưới để Điện máy XANH hỗ trợ cho bạn nhé'
        ];

        try {
          await page.$$eval(
            elmLink,
            (elms, listTrashTag) => {
              elms = [...elms];
              return elms.forEach((elm) => {
                let content = elm.textContent?.toLowerCase();
                listTrashTag.forEach(itemTrash => {
                  if (
                    content.includes(itemTrash)
                  ) {
                    elm.remove();
                  }
                });
              });
            },
            listTrashTag
          );
        } catch (error) {
        }
        //end: remove trash tag a

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
        }
        //end: replace src image

        //start: add internal link
        try {
          data.tag = await page.$$eval(elmTagP, (elms, data) => {
            const dataInternalLink = [
              {
                name: ' Hướng dẫn ',
                url: process.env.HOST_DOMAIN + '/kien-thuc'
              },
              {
                name: ' Kiến thức ',
                url: process.env.HOST_DOMAIN + '/kien-thuc'
              },
              {
                name: ' Bluetooth ',
                url: process.env.HOST_DOMAIN + '/bluetooth'
              },
              {
                name: ' Windows 11 ',
                url: process.env.HOST_DOMAIN + '/tag/windows-11'
              },
              {
                name: ' Windows 10 ',
                url: process.env.HOST_DOMAIN + '/tag/windows-10'
              },
              {
                name: ' Windows 8.1 ',
                url: process.env.HOST_DOMAIN + '/windows-81'
              },
              {
                name: ' Windows 7 ',
                url: process.env.HOST_DOMAIN + '/windows-7'
              },
              {
                name: ' Google Chrome ',
                url: process.env.HOST_DOMAIN + '/tag/google-chrome'
              },
              {
                name: ' Microsoft Edge ',
                url: process.env.HOST_DOMAIN + '/tag/microsoft-edge'
              },
              {
                name: ' Firefox ',
                url: process.env.HOST_DOMAIN + '/tag/firefox'
              },
              {
                name: ' Cốc Cốc ',
                url: process.env.HOST_DOMAIN + '/tag/coc-coc'
              },
              {
                name: ' Laptop ',
                url: process.env.HOST_DOMAIN + '/laptop'
              },
              {
                name: ' iPhone 5',
                url: process.env.HOST_DOMAIN + '/tag/iphone-5'
              },
              {
                name: ' iPhone 6',
                url: process.env.HOST_DOMAIN + '/tag/iphone-6'
              },
              {
                name: ' iPhone 7',
                url: process.env.HOST_DOMAIN + '/tag/iphone-7'
              },
              {
                name: ' iPhone 8',
                url: process.env.HOST_DOMAIN + '/tag/iphone-8'
              },
              {
                name: ' iPhone 9',
                url: process.env.HOST_DOMAIN + '/tag/iphone-10'
              },
              {
                name: ' iPhone 11',
                url: process.env.HOST_DOMAIN + '/tag/iphone-11'
              },
              {
                name: ' iPhone 12',
                url: process.env.HOST_DOMAIN + '/tag/iphone-12'
              },
              {
                name: ' iPhone 13',
                url: process.env.HOST_DOMAIN + '/tag/iphone-13'
              },
              {
                name: ' iPhone 14',
                url: process.env.HOST_DOMAIN + '/tag/iphone-14'
              },
              {
                name: ' iPhone 15',
                url: process.env.HOST_DOMAIN + '/tag/iphone-15'
              },
              {
                name: ' iCloud ',
                url: process.env.HOST_DOMAIN + '/tag/icloud'
              },
              {
                name: ' Instagram ',
                url: process.env.HOST_DOMAIN + '/tag/instagram'
              },
              {
                name: ' Facebook ',
                url: process.env.HOST_DOMAIN + '/tag/facebook'
              },
              {
                name: ' Zalo ',
                url: process.env.HOST_DOMAIN + '/tag/zalo'
              },
              {
                name: ' MacBook ',
                url: process.env.HOST_DOMAIN + '/macbook'
              },
              {
                name: ' Android ',
                url: process.env.HOST_DOMAIN + '/android'
              },
              {
                name: ' iOS 5',
                url: process.env.HOST_DOMAIN + '/ios-5'
              },
              {
                name: ' iOS 6',
                url: process.env.HOST_DOMAIN + '/ios-6'
              },
              {
                name: ' iOS 7',
                url: process.env.HOST_DOMAIN + '/ios-7'
              },
              {
                name: ' iOS 8',
                url: process.env.HOST_DOMAIN + '/ios-8'
              },
              {
                name: ' iOS 9',
                url: process.env.HOST_DOMAIN + '/ios-9'
              },
              {
                name: ' iOS 10',
                url: process.env.HOST_DOMAIN + '/ios-10'
              },
              {
                name: ' iOS 11',
                url: process.env.HOST_DOMAIN + '/ios-11'
              },
              {
                name: ' iOS 12',
                url: process.env.HOST_DOMAIN + '/ios-12'
              },
              {
                name: ' iOS 13',
                url: process.env.HOST_DOMAIN + '/ios-13'
              },
              {
                name: ' iOS 14',
                url: process.env.HOST_DOMAIN + '/ios-14'
              },
              {
                name: ' iOS 15',
                url: process.env.HOST_DOMAIN + '/ios-15'
              },
              {
                name: ' Smartphone ',
                url: process.env.HOST_DOMAIN + '/smartphone'
              },
              {
                name: ' Apple Watch ',
                url: process.env.HOST_DOMAIN + '/apple-watch'
              },
              {
                name: ' thiết bị thông minh ',
                url: process.env.HOST_DOMAIN + '/tag/thiet-bi-thong-minh'
              },
              {
                name: ' mắt kính ',
                url: process.env.HOST_DOMAIN + '/tag/mat-kinh'
              },
              {
                name: ' đồng hồ ',
                url: process.env.HOST_DOMAIN + '/tag/dong-ho'
              },
              {
                name: ' phụ kiện ',
                url: process.env.HOST_DOMAIN + '/tag/phu-kien'
              },
              {
                name: ' máy ảnh ',
                url: process.env.HOST_DOMAIN + '/tag/may-anh'
              },
              {
                name: ' tin học văn phòng ',
                url: process.env.HOST_DOMAIN + '/tag/tin-hoc-van-phong'
              },
              {
                name: ' mạng xã hội ',
                url: process.env.HOST_DOMAIN + '/tag/mang-xa-hoi'
              },
              {
                name: ' máy in ',
                url: process.env.HOST_DOMAIN + '/tag/may-in'
              },
              {
                name: ' thiết bị ngoại vi ',
                url: process.env.HOST_DOMAIN + '/tag/thiet-bi-ngoai-vi'
              },
              {
                name: ' đầu kỹ thuật số ',
                url: process.env.HOST_DOMAIN + '/tag/dau-ky-thuat-so'
              },
              {
                name: ' máy tính bảng ',
                url: process.env.HOST_DOMAIN + '/tag/may-tinh-bang'
              },
              {
                name: ' iPad ',
                url: process.env.HOST_DOMAIN + '/tag/may-tinh-bang'
              },
              {
                name: ' âm thanh ',
                url: process.env.HOST_DOMAIN + '/tag/am-thanh'
              },
              {
                name: ' tivi ',
                url: process.env.HOST_DOMAIN + '/tag/tivi'
              },
              {
                name: ' Command line ',
                url: process.env.HOST_DOMAIN + '/tag/command-line'
              },
              {
                name: ' điện thoại ',
                url: process.env.HOST_DOMAIN + '/tag/dien-thoai'
              },
              {
                name: ' Onedrive ',
                url: process.env.HOST_DOMAIN + '/tag/onedrive'
              },
              {
                name: ' Terminal ',
                url: process.env.HOST_DOMAIN + '/tag/terminal'
              },
              {
                name: ' Ubuntu ',
                url: process.env.HOST_DOMAIN + '/tag/ubuntu'
              },
              {
                name: ' Vmware ',
                url: process.env.HOST_DOMAIN + '/tag/vmware'
              },
              {
                name: ' Excel ',
                url: process.env.HOST_DOMAIN + '/tag/excel'
              },
              {
                name: ' Word ',
                url: process.env.HOST_DOMAIN + '/tag/word'
              },
              {
                name: ' Apple ',
                url: process.env.HOST_DOMAIN + '/apple'
              },
            ];
            let countInternal = 0;
            if (countInternal <= 1) {
              dataInternalLink.forEach((dataInternal) => {
                let BreakException = {};
                let addInternal = true;
                if (addInternal) {
                  try {
                    elms.forEach((item, key) => {
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
                            data.tag = [...data.tag, (dataInternal.name.trim().charAt(0).toUpperCase() + dataInternal.name.trim().slice(1))];
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
          }, data);
        } catch (error) {
        }
        //end: add internal link

        await page.waitForTimeout(2000);
        data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
        data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

        const lengthTitle = data.title.length;
        //const lengthDescription = 145 - lengthTitle;
        const lengthDescription = 150;

        //thêm seo tag description
        data.seo_tag_description = data.title;
        try {
          if (lengthDescription > 0) {
            /*data.seo_tag_description + '. ' + */
            data.seo_tag_description = await page.$$eval(elmContent, (elm, lengthDescription) => {
              return elm[0].textContent.slice(0, Number(lengthDescription)).trim() + "..."
            }, lengthDescription);
          }
        } catch (error) {
        }

        //start: replace Tên trang
        const listTrashText = [
          'Điện máy XANH',
          'Điện máy xanh',
          'Điện Máy Xanh',
          'DienmayXANH.com',
          'Dienmay.com',
          'Điện Máy XANH'
        ]

        listTrashText.forEach((item) => {
          data.content = data.content.replaceAll(item, "KungFuCongNghe.Com");
        });
        //end: replace Tên trang

        // fs.writeFileSync('data.json', JSON.stringify(data));
        // await page.waitForTimeout(1000 * 1000)

        /**
         * Save data
         */
        if (data.content.length > 0) {

          // Thêm lời kết KungFuCongNghe
          data.content = '<strong>' + data.title + '. </strong> ' +
            data.content + '<p>Vậy là bạn đã cùng KungFuCongNghe.Com tìm hiểu cách thực hiện. Chúc bạn thành công nhé!</p>';

          /**
           * dùng cho trường hợp auto save images
           */
          data.content = data.content.replaceAll('\\', '\\\\');

          await saveData(data);

          console.log('\n\x1b[32mDONE: ' + data.title + ' \x1b[0m');
          console.log('URL: ' + page.url() + ' \n');
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
      }
    }
  } catch (error) {
  }

  /**
   * Finish
   */
  /*if (numberPage >= limitPage) {
      console.log("\n************* !!! FINISH ALL !!!! ************* \n");
      break;
  }*/
  //}

  console.log("\n************* !!! FINISH ALL !!!! ************* \n");

  await browser.close();
})();

async function saveData(data) {
  try {
    await axios
      .post(process.env.HOST_API, data)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log("\n ---  \n ERROR SAVE DATABASE \n ---  \n ");
        console.log(error.response.data);
      });
  } catch (error) {
  }
}
