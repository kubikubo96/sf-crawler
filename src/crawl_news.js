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
            web: 'dienmayxanh',
            path: "huong-dan-su-dung-laptop",
            tag: ["Laptop"],
        },
        {
            web: 'dienmayxanh',
            path: "thiet-bi-thong-minh-khac",
            tag: ["Thiết bị thông minh", "Thiết bị thông minh khác"]
        },
    ];

    const numberCrawl = 1;
    const dataCrawl = [dataCrawlList[numberCrawl]];

    let itemCrawl = {
        web: dataCrawl[numberCrawl].web,
        url: "https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=10000&url=" + dataCrawl[numberCrawl].path,
        tag: dataCrawl[numberCrawl].tag
    }

    const sourceCrawl = "dienmayxanh.com";
    let numberPage = 0;

    console.log("\n Url crawl: " + itemCrawl.url + "\n -------- \n");
    try {
        await page.goto(itemCrawl.url, {
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
            url: 'https://' + sourceCrawl + link.getAttribute("href"),
        }));
    }, sourceCrawl);


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
        try {
            try {
                await page.goto(listPost[numberPost].url, {
                    waitUntil: ["networkidle2"],
                });
            } catch (error) {
                console.log(error)
            }
            await page.waitForTimeout(3000);

            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(2000);
            await page.evaluate(() => {
                window.scrollTo(0, 0);
            });
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
                console.log(error)
            }

            //Khởi tạo Data
            const data = {
                title: "",
                content: "",
                source: "",
                url_crawl: page.url(),
                tag: itemCrawl.tag,
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
            try {
                await page.$eval(elmSortContent, (elm) => {
                    if (elm) {
                        elm.outerHTML = '<p><strong>' + elm.textContent + '</strong></p>'
                    }
                });
            } catch (error) {
                console.log(error)
            }
            //end: replace sort content

            //start: remove trash
            const elmTrash = [
                '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
                'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
                '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', '.btn__noibat',
                '.generate-productbox', '.generate-gallery'
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

            //start: add internal link
            try {
                data.tag = await page.$$eval(elmTagP, (elms, data) => {
                    const dataInternalLink = [
                        {
                            name: ' Hướng dẫn ',
                            url: 'https://kungfucongnghe.com/kien-thuc'
                        },
                        {
                            name: ' Kiến thức ',
                            url: 'https://kungfucongnghe.com/kien-thuc'
                        },
                        {
                            name: ' Bluetooth ',
                            url: 'https://kungfucongnghe.com/bluetooth'
                        },
                        {
                            name: ' Windows 11 ',
                            url: 'https://kungfucongnghe.com/tag/windows-11'
                        },
                        {
                            name: ' Windows 10 ',
                            url: 'https://kungfucongnghe.com/tag/windows-10'
                        },
                        {
                            name: ' Windows 8.1 ',
                            url: 'https://kungfucongnghe.com/windows-81'
                        },
                        {
                            name: ' Windows 7 ',
                            url: 'https://kungfucongnghe.com/windows-7'
                        },
                        {
                            name: ' Google Chrome ',
                            url: 'https://kungfucongnghe.com/tag/google-chrome'
                        },
                        {
                            name: ' Microsoft Edge ',
                            url: 'https://kungfucongnghe.com/tag/microsoft-edge'
                        },
                        {
                            name: ' Firefox ',
                            url: 'https://kungfucongnghe.com/tag/firefox'
                        },
                        {
                            name: ' Cốc Cốc ',
                            url: 'https://kungfucongnghe.com/tag/coc-coc'
                        },
                        {
                            name: ' Laptop ',
                            url: 'https://kungfucongnghe.com/laptop'
                        },
                        {
                            name: ' iPhone ',
                            url: 'https://kungfucongnghe.com/tag/iphone'
                        },
                        {
                            name: ' iCloud ',
                            url: 'https://kungfucongnghe.com/tag/icloud'
                        },
                        {
                            name: ' Instagram ',
                            url: 'https://kungfucongnghe.com/tag/instagram'
                        },
                        {
                            name: ' Facebook ',
                            url: 'https://kungfucongnghe.com/tag/facebook'
                        },
                        {
                            name: ' Zalo ',
                            url: 'https://kungfucongnghe.com/tag/zalo'
                        },
                        {
                            name: ' MacBook ',
                            url: 'https://kungfucongnghe.com/macbook'
                        },
                        {
                            name: ' Android ',
                            url: 'https://kungfucongnghe.com/android'
                        },
                        {
                            name: ' iOS ',
                            url: 'https://kungfucongnghe.com/ios'
                        },
                        {
                            name: ' Smartphone ',
                            url: 'https://kungfucongnghe.com/smartphone'
                        },
                        {
                            name: ' Apple Watch ',
                            url: 'https://kungfucongnghe.com/apple-watch'
                        },
                        {
                            name: ' thiết bị thông minh ',
                            url: 'https://kungfucongnghe.com/tag/thiet-bi-thong-minh'
                        },
                        {
                            name: ' mắt kính ',
                            url: 'https://kungfucongnghe.com/tag/mat-kinh'
                        },
                        {
                            name: ' đồng hồ ',
                            url: 'https://kungfucongnghe.com/tag/dong-ho'
                        },
                        {
                            name: ' phụ kiện ',
                            url: 'https://kungfucongnghe.com/tag/phu-kien'
                        },
                        {
                            name: ' máy ảnh ',
                            url: 'https://kungfucongnghe.com/tag/may-anh'
                        },
                        {
                            name: ' tin học văn phòng ',
                            url: 'https://kungfucongnghe.com/tag/tin-hoc-van-phong'
                        },
                        {
                            name: ' mạng xã hội ',
                            url: 'https://kungfucongnghe.com/tag/mang-xa-hoi'
                        },
                        {
                            name: ' máy in ',
                            url: 'https://kungfucongnghe.com/tag/may-in'
                        },
                        {
                            name: ' thiết bị ngoại vi ',
                            url: 'https://kungfucongnghe.com/tag/thiet-bi-ngoai-vi'
                        },
                        {
                            name: ' đầu kỹ thuật số ',
                            url: 'https://kungfucongnghe.com/tag/dau-ky-thuat-so'
                        },
                        {
                            name: ' máy tính bảng ',
                            url: 'https://kungfucongnghe.com/tag/may-tinh-bang'
                        },
                        {
                            name: ' iPad ',
                            url: 'https://kungfucongnghe.com/tag/may-tinh-bang'
                        },
                        {
                            name: ' âm thanh ',
                            url: 'https://kungfucongnghe.com/tag/am-thanh'
                        },
                        {
                            name: ' tivi ',
                            url: 'https://kungfucongnghe.com/tag/tivi'
                        },
                        {
                            name: ' Command line ',
                            url: 'https://kungfucongnghe.com/tag/command-line'
                        },
                        {
                            name: ' điện thoại ',
                            url: 'https://kungfucongnghe.com/tag/dien-thoai'
                        },
                        {
                            name: ' Onedrive ',
                            url: 'https://kungfucongnghe.com/tag/onedrive'
                        },
                        {
                            name: ' Terminal ',
                            url: 'https://kungfucongnghe.com/tag/terminal'
                        },
                        {
                            name: ' Ubuntu ',
                            url: 'https://kungfucongnghe.com/tag/ubuntu'
                        },
                        {
                            name: ' Vmware ',
                            url: 'https://kungfucongnghe.com/tag/vmware'
                        },
                        {
                            name: ' Excel ',
                            url: 'https://kungfucongnghe.com/tag/excel'
                        },
                        {
                            name: ' Word ',
                            url: 'https://kungfucongnghe.com/tag/word'
                        },
                        {
                            name: ' Apple ',
                            url: 'https://kungfucongnghe.com/apple'
                        },
                    ];
                    let countInternal = 0;
                    if (countInternal <= 1) {
                        dataInternalLink.forEach((dataInternal) => {
                            let BreakException = {};
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
                                                throw BreakException; //xử lý break forEach element
                                            }
                                        }
                                    }
                                })
                            } catch (e) {
                                if (e !== BreakException) throw e; //xử lý break forEach element
                            }
                        })
                    }
                    return data.tag;
                }, data);
            } catch (error) {
                console.log(error)
            }
            //end: add internal link

            await page.waitForTimeout(2000);
            data.title = await page.$$eval(elmTitle, (elm) => elm[0].textContent);
            data.content = await page.$$eval(elmContent, (elm) => elm[0].innerHTML);

            const lengthTitle = data.title.length;
            const lengthDescription = 145 - lengthTitle;

            //thêm seo tag description
            data.seo_tag_description = data.title;
            if (lengthDescription > 0) {
                data.seo_tag_description = data.seo_tag_description + '. ' + await page.$$eval(elmContent, (elm, lengthDescription) => {
                    return elm[0].textContent.slice(0, Number(lengthDescription)).trim() + "..."
                }, lengthDescription);
            }

            //start: replace Tên trang
            const listTrashText = [
                'Điện máy XANH',
                'Điện máy xanh',
                'Điện Máy Xanh',
                'DienmayXANH.com',
                "Dienmay.com"
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
                console.log("NUMBER POST:" + numberPost)
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
        console.log(error)
    }
}
