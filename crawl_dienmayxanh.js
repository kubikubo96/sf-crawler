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
            path: "huong-dan-su-dung-laptop",
            tag: ["Laptop"],
        },
        {
            path: "huong-dan-su-dung",
            tag: ["Điện thoại"],
        },
        {
            path: "phan-chieu-hinh-anh-tivi",
            tag: ["Tivi"]
        },
        {
            path: "dieu-khien-tivi-bang-dien-thoai",
            tag: ["Tivi", "Điện thoại"]
        },
        {
            path: "ket-noi-dien-thoai-voi-tivi",
            tag: ["Tivi", "Điện thoại"]
        },
        {
            path: "ket-noi-laptop-voi-tivi",
            tag: ["Tivi", "Laptop"]
        },
        {
            path: "ket-noi-tivi-voi-dan-am-thanh",
            tag: ["Tivi", "Âm thanh"]
        },
        {
            path: "ket-noi-may-tinh-bang-voi-tivi",
            tag: ["Tivi", "Máy tính bảng"]
        },
        {
            path: "ket-noi-tivi-voi-dau-thu-ky-thuat-so",
            tag: ["Tivi", "Đầu kỹ thuật số"]
        },
        {
            path: "ket-noi-tivi-voi-thiet-bi-ngoai-vi",
            tag: ["Tivi", "Thiết bị ngoại vi"]
        },
        {
            path: "cach-su-dung-tivi-mobell",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-samsung",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-sony",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-lg",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-toshiba",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-panasonic",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-tcl",
            tag: ["Tivi"]
        },
        {
            path: "loi-ti-vi-thuong-gap",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-sharp",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-philips",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-skyworth",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-vtb",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-tivi-asanzo",
            tag: ["Tivi"]
        },
        {
            path: "cach-su-dung-chung-tivi",
            tag: ["Tivi"]
        }, {
            path: "tivi-man-hinh-cong",
            tag: ["Tivi"]
        },
        {
            path: "cong-nghe-hinh-anh-am-thanh",
            tag: ["Tivi"]
        },
        {
            path: "tinh-nang-ket-noi-tivi",
            tag: ["Tivi"]
        },
        {
            path: "cong-nghe-tivi-moi",
            tag: ["Tivi"]
        },
        {
            path: "tu-van-mua-dan-may",
            tag: ["Âm thanh"]
        },
        {
            path: "tin-cong-nghe-dien-thoai",
            tag: ["Điện thoại"]
        },
        {
            path: "tu-van-chon-mua-dien-thoai",
            tag: ["Điện thoại"]
        },
        {
            path: "danh-gia-san-pham",
            tag: ["Điện thoại"]
        },
        {
            path: "tin-cong-nghe-laptop",
            tag: ["Laptop"]
        },
        {
            path: "danh-gia-san-pham-laptop",
            tag: ["Laptop"]
        },
        {
            path: "huong-dan-su-dung-laptop",
            tag: ["Laptop"]
        },
        {
            path: "danh-gia-san-pham-may-tinh-bang",
            tag: ["Máy tính bảng"]
        }, {
            path: "huong-dan-su-dung-may-tinh-bang",
            tag: ["Máy tính bảng"]
        },
        {
            path: "danh-gia-san-pham-pc-may-in",
            tag: ["Máy in"]
        },
        {
            path: "huong-dan-su-dung-pc-may-in",
            tag: ["Máy in"]
        },
        {
            path: "meo-hay-facebook-zalo-youtube",
            tag: ["Mạng xã hội"]
        },
        {
            path: "tin-hoc-van-phong",
            tag: ["Tin học văn phòng"]
        },
        {
            path: "tu-van-mua-may-anh",
            tag: ["Máy ảnh"]
        },
        {
            path: "phu-kien",
            tag: ["Phụ kiện"]
        },
        {
            path: "thuong-hieu-dong-ho",
            tag: ["Đồng hồ"]
        },
        {
            path: "meo-huong-dan-su-dung-dong-ho",
            tag: ["Đồng hồ"]
        },
        {
            path: "thuat-ngu-dong-ho",
            tag: ["Đồng hồ"]
        },
        {
            path: "phan-biet-dong-ho-that-gia",
            tag: ["Đồng hồ"]
        },
        {
            path: "tu-van-chon-mua-mat-kinh",
            tag: ["Mắt kính"]
        },
        {
            path: "thuong-hieu-mat-kinh",
            tag: ["Mắt kính"]
        },
        {
            path: "thiet-bi-thong-minh-phong-ngu",
            tag: ["Thiết bị thông minh"]
        },
        {
            path: "thiet-bi-thong-minh-phong-khach",
            tag: ["Thiết bị thông minh"]
        }, {
            path: "thiet-bi-thong-minh-nha-bep",
            tag: ["Thiết bị thông minh"]
        },
        {
            path: "thiet-bi-thong-minh-khac",
            tag: ["Thiết bị thông minh"]
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
                    url: 'https://' + sourceCrawl + link.getAttribute("href"),
                }));
            }, sourceCrawl);


            let numberPost = listPost.length - 1;
            let minPost = 0;

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
                } catch (error) {
                    console.log(error)
                }
                try {
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

                //start: replace sort content
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
                    await page.$$eval(elmTagP, (elms, data) => {
                        const dataInternalLink = [
                            {
                                name: 'Hướng dẫn',
                                url: 'https://kungfucongnghe.com/kien-thuc'
                            },
                            {
                                name: 'Kiến thức',
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
                                name: ' Iphone ',
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
                                name: ' Macbook ',
                                url: 'https://kungfucongnghe.com/macbook'
                            },
                            {
                                name: ' smartphone ',
                                url: 'https://kungfucongnghe.com/smartphone'
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
                            elms.forEach((item) => {
                                dataInternalLink.forEach((dataInternal) => {
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
                                            data.tag = [...data.tag, dataInternal.name.trim()];
                                            countInternal++;
                                        }
                                    }
                                })
                            })
                        }
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
                    data.content = '<strong>' + data.title + '. </strong> ' +
                        data.content + '<p>Vậy là bạn đã cùng KungFuCongNghe.Com tìm hiểu cách thực hiện. Chúc bạn thành công nhé!</p>';

                    /**
                     * dùng cho trường hợp auto save images
                     */
                    data.content = data.content.replaceAll('\\', '\\\\');

                    await saveData(data);

                    console.log('\n \x1b[32m DONE: ' + data.title + ' \x1b[0m \n');
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
