import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";
//import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-site-isolation-trials", "--window-size=1900,1000", "--lang=en-US,en", "--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    const listPage = [];
    const startPage = 1;
    const endPage = 2;
    for (let i = endPage; i >= startPage; i--) {
        const itemPage = {
            url: "https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?url=huong-dan-su-dung-laptop&hotSorting=true&pageSize=200&pageIndex=" + i,
            tag: ["Laptop"],
        };
        listPage.push(itemPage);
    }

    const sourceCrawl = "https://www.dienmayxanh.com";
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

            /**
             * Get danh sách bài viết
             *
             * @type {{url}[]}
             */
            const listPost = await page.evaluate((sourceCrawl) => {
                let links = document.querySelectorAll("a.linktitle");
                links = [...links];
                return links.map((link) => ({
                    url: sourceCrawl + link.getAttribute("href"),
                }));
            }, sourceCrawl);


            const limitPost = listPost.length;
            let numberPost = 0;

            /**
             * Lặp danh sách bài viết
             */
            while (1) {
                try {
                    await page.goto(listPost[numberPost].url, {
                        waitUntil: ["networkidle2"],
                    });
                } catch (error) {
                    console.log(error)
                }
                await page.waitForTimeout(2000);

                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await page.waitForTimeout(2000);

                const elmTitle = ".article h1";
                const elmContent = ".bxcontentnews";
                const elmLink = ".bxcontentnews a";
                const elmImage = ".bxcontentnews img";
                await page.waitForSelector(elmTitle);
                await page.waitForSelector(elmContent);

                //Khởi tạo Data
                const data = {
                    title: "",
                    content: "",
                    source: "",
                    url_crawl: page.url(),
                    tag: listPage[numberPage].tag,
                    seo_tag_description: "",
                };

                //start: remove trash
                const elmTrash = [
                    '.asset-content > p > strong', '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed',
                    'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
                    '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', ''

                ];

                await page.evaluate((elmTrash) => {
                    elmTrash.forEach((item) => {
                        try {
                            let queryTrash = document.querySelectorAll(item);
                            queryTrash.forEach((elm) => {
                                elm.remove();
                            });
                        } catch (error) {
                            console.log(error)
                        }
                    });
                }, elmTrash);
                //end: remove trash

                //start: remove trash tag a
                const listTrashTagA = [
                    'Điện máy XANH',
                    'Điện máy xanh',
                    'Điện Máy Xanh',
                ];
                try {
                    await page.$$eval(
                        elmLink,
                        (elms, listTrashTagA) => {
                            elms = [...elms];
                            return elms.forEach((elm) => {
                                let contentA = elm.textContent;
                                listTrashTagA.forEach(itemTrash => {
                                    if (
                                        contentA.includes(itemTrash)
                                    ) {
                                        elm.remove();
                                    }
                                });
                            });
                        },
                        listTrashTagA
                    );
                } catch (error) {
                    console.log(error)
                }
                //end: remove trash tag a

                //start: convert link thành text cho link crawl
                try {
                    await page.$$eval(
                        elmLink,
                        (elms, sourceCrawl) => {
                            elms = [...elms];
                            return elms.map((elm) => {
                                if (elm.href.search(sourceCrawl) !== -1) {
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
                                elm.src = elm.src.replace("..", sourceCrawl);
                            });
                        },
                        sourceCrawl
                    );
                } catch (error) {
                    console.log(error)
                }
                //end: replace src image

                data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
                data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

                const lengthTitle = data.title.length;
                const lengthDescription = 135 - lengthTitle;

                data.seo_tag_description = data.title;
                if (lengthDescription > 0) {
                    data.seo_tag_description = data.seo_tag_description + '. ' + await page.$$eval(elmContent, (elm, lengthDescription) => {
                        return elm[0].textContent.slice(0, Number(lengthDescription)) + "..."
                    }, lengthDescription);
                }

                //start: remove trash text
                const listTrashText = [
                    'Chúc các bạn thành công. Mọi thắc mắc vui lòng để lại câu hỏi ngay bên dưới để Điện máy XANH hỗ trợ cho bạn nhé.',
                    'Siêu thị Điện máy XANH',
                ]

                listTrashText.forEach((item) => {
                    data.content = data.content.replaceAll(item, "");
                });
                //end: remove trash text

                //fs.writeFileSync('data.json', JSON.stringify(data));

                await page.waitForTimeout(1000 * 1000)

                /**
                 * Save data
                 */
                if (data.content.length > 0) {
                    data.content = data.content + '<p>Vậy là bạn đã cùng KungFuCongNghe.Com tìm hiểu cách thực hiện. Chúc bạn thành công nhé!</p>';
                    console.log(data.title + "\n");
                    //await saveData(data);
                }
                numberPost = numberPost + 1;
                /**
                 * Done 1 page
                 */
                if (numberPost >= limitPost) {
                    numberPage = numberPage + 1;
                    console.log("\n -- DONE 1 PAGE -- \n");
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }

        /**
         * Finish
         */
        if (numberPage >= limitPage) {
            console.log("\n************* !!! FINISH ALL !!!! ************* \n");
            break;
        }
    }

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
        console.log(error)
    }
}
