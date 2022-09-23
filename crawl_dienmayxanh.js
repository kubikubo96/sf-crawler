import puppeteer from "puppeteer";
import axios from "axios";
import "dotenv/config";

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
            }

            const listPost = await page.evaluate((sourceCrawl) => {
                let links = document.querySelectorAll("a.linktitle");
                links = [...links];
                return links.map((link) => ({
                    url: sourceCrawl + link.getAttribute("href"),
                }));
            }, sourceCrawl);

            console.log(listPost);
            await page.waitForTimeout(1000 * 1000)

            const limitPost = listPost.length;
            let numberPost = 0;

            /**
             * While list post
             */
            while (1) {
                try {
                    await page.goto(listPost[numberPost].url, {
                        waitUntil: ["networkidle2"],
                    });
                } catch (error) {
                }
                await page.waitForTimeout(5000);

                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await page.waitForTimeout(5000);

                const elmTitle = ".block-info h1";
                const elmContent = ".news-block .asset-content";
                const elmLink = ".news-block .asset-content a";
                await page.waitForSelector(elmTitle);
                await page.waitForSelector(elmContent);

                const data = {
                    title: "",
                    content: "",
                    source: '<p></p><p style="text-align: right;color: #909090;font-style: italic;"><strong>Nguồn: </strong> ' + sourceCrawl + " </p>",
                    url_crawl: page.url(),
                    tag: listPage[numberPage].tag,
                    seo_tag_description: "",
                };

                //start: remove trash
                try {
                    await page.$$eval(".asset-content > p > strong", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".top-news", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".adsbygoogle", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".adsense", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".in-article", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".adszone", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".adstopimage", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(".adsviewed", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval("div.toc", (elms) => {
                        elms = [...elms];
                        return elms.map((elm) => {
                            elm.remove();
                        });
                    });
                } catch (error) {
                }

                try {
                    await page.$$eval(
                        elmLink,
                        (elms) => {
                            elms = [...elms];
                            return elms.map((elm, sourceCrawl) => {
                                if (elm.href.indexOf("http") !== -1 || elm.href.indexOf(sourceCrawl) !== -1) {
                                    elm.outerHTML = elm.textContent;
                                }
                            });
                        },
                        sourceCrawl
                    );
                } catch (error) {
                }

                try {
                    await page.$$eval("iframe.lazy", (elms) => {
                        return elms.map((elm) => {
                            elms = [...elms];
                            elm.remove();
                        });
                    });
                } catch (error) {
                }
                //start: remove trash

                //start: replace src iamge
                await page.waitForTimeout(5000);
                try {
                    await page.$$eval(
                        ".asset-content .__wimage img",
                        (elms, sourceCrawl) => {
                            return elms.forEach((elm) => {
                                elms = [...elms];
                                elm.src = elm.src.replace("..", sourceCrawl);
                            });
                        },
                        sourceCrawl
                    );
                } catch (error) {
                }
                //end: replace src iamge

                data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
                data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);
                data.seo_tag_description = await page.$$eval(elmContent, (elm) => elm[0].textContent.slice(0, 137) + "...");

                /**
                 * Save data
                 */
                if (data.content.length > 0) {
                    console.log(data.title + "\n");
                    saveData(data);
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
    }
}
