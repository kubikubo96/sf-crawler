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

  const listPage = [
    {
      url: "https://loigiaihay.com/soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-sieu-ngan-c632.html",
      class: "lop-6",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn văn siêu ngắn - KNTT",
      title: "soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-sieu-ngan-c632",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-chi-tiet-c630.html",
      class: "lop-6",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn văn chi tiết - KNTT",
      title: "soan-van-6-ket-noi-tri-thuc-voi-cuoc-song-chi-tiet-c630",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-chan-troi-sang-tao-sieu-ngan-c627.html",
      class: "lop-6",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn văn siêu ngắn - CTST",
      title: "soan-van-6-chan-troi-sang-tao-sieu-ngan-c627",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-chan-troi-sang-tao-chi-tiet-c629.html",
      class: "lop-6",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn văn chi tiết - KNTT",
      title: "soan-van-6-chan-troi-sang-tao-chi-tiet-c629",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-canh-dieu-sieu-ngan-c633.html",
      class: "lop-6",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn văn siêu ngắn - Cánh diều",
      title: "soan-van-6-canh-dieu-sieu-ngan-c633",
    },
    {
      url: "https://loigiaihay.com/soan-van-6-canh-dieu-chi-tiet-c635.html",
      class: "lop-6",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn văn chi tiết - Cánh diều",
      title: "soan-van-6-canh-dieu-chi-tiet-c635",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-chan-troi-sang-tao-friends-plus-c644.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "chan-troi-sang-tao",
      name: "Tiếng anh 6 - Friends plus",
      title: "tieng-anh-6-chan-troi-sang-tao-friends-plus-c644",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-ilearn-smart-world-c647.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Tiếng anh 6 - iLearn Smart World",
      title: "tieng-anh-6-ilearn-smart-world-c647.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-right-on-c649.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Giải tiếng Anh 6 Right on",
      title: "tieng-anh-6-right-on-c649",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-english-discovery-c648.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: " Giải tiếng Anh 6 English Discovery",
      title: "tieng-anh-6-english-discovery-c648.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-6-canh-dieu-explore-english-c646.html",
      class: "lop-6",
      category: "tieng-anh",
      book: "",
      name: "Tiếng anh 6 - Explore English",
      title: "tieng-anh-6-canh-dieu-explore-english-c646",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-ket-noi-tri-thuc-sieu-ngan-c830.html",
      class: "lop-7",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn siêu ngắn - Kết nối tri thức",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-ket-noi-tri-thuc-chi-tiet-c839.html",
      class: "lop-7",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn chi tiết - Kết nối tri thức",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-canh-dieu-sieu-ngan-c835.html",
      class: "lop-7",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn siêu ngắn - Cánh diều",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-canh-dieu-chi-tiet-c836.html",
      class: "lop-7",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn chi tiết - Cánh diều",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-chan-troi-sang-tao-sieu-ngan-c832.html",
      class: "lop-7",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn siêu ngắn - Chân trời sáng tạo",
      title: "",
    },
    {
      url: "https://loigiaihay.com/soan-van-7-chan-troi-sang-tao-chi-tiet-c843.html",
      class: "lop-7",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn chi tiết - Chân trời sáng tạo",
      title: "",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-7-ket-noi-tri-thuc-c807.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "ket-noi-tri-thuc",
      name: "SGK Toán - Kết nối tri thức",
      title: "sgk-toan-7-ket-noi-tri-thuc-c807",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-7-chan-troi-sang-tao-c808.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "chan-troi-sang-tao",
      name: "SGK Toán - Chân trời sáng tạo",
      title: "sgk-toan-7-chan-troi-sang-tao-c808.html",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-7-canh-dieu-c809.html",
      class: "lop-7",
      category: "toan-hoc",
      book: "canh-dieu",
      name: "SGK Toán - Cánh diều",
      title: "sgk-toan-7-canh-dieu-c809.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-7-global-success-c139.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Global Success",
      title: "tieng-anh-lop-7-global-success-c139",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-friends-plus-c866.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Friends plus",
      title: "tieng-anh-7-friends-plus-c866",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-ilearn-smart-world-c903.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - iLearn Smart World",
      title: "tieng-anh-7-ilearn-smart-world-c903",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-right-on-c916.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Right on",
      title: "tieng-anh-7-right-on-c916",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-7-english-discovery-c909.html",
      class: "lop-7",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - English Discovery",
      title: "tieng-anh-7-english-discovery-c909",
    },
    {
      url: "https://loigiaihay.com/soan-van-9-sieu-ngan-c441.html",
      class: "lop-9",
      category: "ngu-van",
      book: "",
      name: "Soạn văn siêu ngắn",
      title: "soan-van-9-sieu-ngan-c441",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-9-c36.html",
      class: "lop-9",
      category: "ngu-van",
      book: "",
      name: "Soạn văn chi tiết",
      title: "ngu-van-lop-9-c36.html",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-9-c76.html",
      class: "lop-9",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh lớp 9",
      title: "tieng-anh-lop-9-c76",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-9-moi-c141.html",
      class: "lop-9",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh lớp 9 mới",
      title: "tieng-anh-lop-9-moi-c141",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-kntt-sieu-ngan-c812.html",
      class: "lop-10",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn siêu ngắn - Kết nối tri thức",
      title: "soan-van-10-kntt-sieu-ngan-c812",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html",
      class: "lop-10",
      category: "ngu-van",
      book: "ket-noi-tri-thuc",
      name: "Soạn Văn chi tiết - Kết nối tri thức",
      title: "soan-van-10-ket-noi-tri-thuc-chi-tiet-c851",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-canh-dieu-sieu-ngan-c852.html",
      class: "lop-10",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn siêu ngắn - Cánh diều",
      title: "soan-van-10-canh-dieu-sieu-ngan-c852",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-canh-dieu-chi-tiet-c853.html",
      class: "lop-10",
      category: "ngu-van",
      book: "canh-dieu",
      name: "Soạn Văn chi tiết - Cánh diều",
      title: "soan-van-10-canh-dieu-chi-tiet-c853",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-chan-troi-sang-tao-sieu-ngan-c886.html",
      class: "lop-10",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn siêu ngắn - Chân trời sáng tạo",
      title: "soan-van-10-chan-troi-sang-tao-sieu-ngan-c886",
    },
    {
      url: "https://loigiaihay.com/soan-van-10-chan-troi-sang-tao-chi-tiet-c887.html",
      class: "lop-10",
      category: "ngu-van",
      book: "chan-troi-sang-tao",
      name: "Soạn Văn chi tiết - Chân trời sáng tạo",
      title: "soan-van-10-chan-troi-sang-tao-chi-tiet-c887",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-ket-noi-tri-thuc-c811.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "ket-noi-tri-thuc",
      name: "SGK Toán - Kết nối tri thức",
      title: "sgk-toan-10-ket-noi-tri-thuc-c811",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-chan-troi-sang-tao-c868.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "chan-troi-sang-tao",
      name: "SGK Toán - Chân trời sáng tạo",
      title: "sgk-toan-10-chan-troi-sang-tao-c868",
    },
    {
      url: "https://loigiaihay.com/sgk-toan-10-canh-dieu-c859.html",
      class: "lop-10",
      category: "toan-hoc",
      book: "canh-dieu",
      name: "SGK Toán - Cánh diều",
      title: "sgk-toan-10-canh-dieu-c859",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-global-success-c818.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Global Success",
      title: "tieng-anh-10-global-success-c818",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-friends-global-c867.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Friends plus",
      title: "tieng-anh-10-friends-global-c867",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-ilearn-smart-world-c934.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - iLearn Smart World",
      title: "tieng-anh-10-ilearn-smart-world-c934",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-english-discovery-c946.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - English Discovery",
      title: "tieng-anh-10-english-discovery-c946",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-bright-c1014.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Bright",
      title: "tieng-anh-10-bright-c1014",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-10-explore-new-worlds-c947.html",
      class: "lop-10",
      category: "tieng-anh",
      book: "",
      name: "Tiếng Anh - Explore New Worlds",
      title: "tieng-anh-10-explore-new-worlds-c947",
    },
    {
      url: "https://loigiaihay.com/soan-van-11-sieu-ngan-c215.html",
      class: "lop-11",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn siêu ngắn",
      title: "soan-van-11-sieu-ngan-c215",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-11-c38.html",
      class: "lop-11",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn chi tiết",
      title: "ngu-van-lop-11-c38",
    },
    {
      url: "https://loigiaihay.com/toan-lop-11-nang-cao-c202.html",
      class: "lop-11",
      category: "toan-hoc",
      book: "",
      name: "SGK Toán Nâng cao",
      title: "toan-lop-11-nang-cao-c202",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-11-c78.html",
      class: "lop-11",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh",
      title: "tieng-anh-lop-11-c78",
    },
    {
      url: "https://loigiaihay.com/tieng-anh-lop-11-moi-c142.html",
      class: "lop-11",
      category: "tieng-anh",
      book: "",
      name: "SGK Tiếng Anh mới",
      title: "tieng-anh-lop-11-moi-c142",
    },
    {
      url: "https://loigiaihay.com/soan-van-12-sieu-ngan-c214.html",
      class: "lop-12",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn siêu ngắn",
      title: "soan-van-12-sieu-ngan-c214",
    },
    {
      url: "https://loigiaihay.com/ngu-van-lop-12-c30.html",
      class: "lop-12",
      category: "ngu-van",
      book: "",
      name: "Soạn Văn chi tiết",
      title: "ngu-van-lop-12-c30",
    },
    {
      url: "https://loigiaihay.com/toan-lop-12-nang-cao-c201.html",
      class: "lop-12",
      category: "toan-hoc",
      book: "",
      name: "SGK Toán 12 nâng cao",
      title: "toan-lop-12-nang-cao-c201",
    },
  ];

  const limitPage = listPage.length;
  let numberPage = 0;

  let category_0 = [];
  let category_1 = [];
  let category_2 = [];

  /**
   * While list data
   */
  while (1) {
    try {
      console.log("\n Url page: " + listPage[numberPage].url + "\n -------- \n");
      try {
        await page.goto(listPage[numberPage].url, {
          waitUntil: ["networkidle2"],
        });
      } catch (error) {
        console.log(error);
      }

      category_0 = [
        {
          name: listPage[numberPage].name,
          title: listPage[numberPage].title,
          parent_title: "",
          class: listPage[numberPage].class,
          category: listPage[numberPage].category,
          book: listPage[numberPage].book,
          url_crawl: "",
          has_sub_category: 1,
          order: 1,
        },
      ];

      category_1 = await page.evaluate(
        (listPage, numberPage) => {
          let element = document.querySelectorAll(".box.clearfix.font-opensans-b > div div.subject-item > h2 > a > strong");
          element = [...element];

          let data = [];

          element.forEach((item) => {
            data.push({
              name: item.textContent.trim(),
              title: item.textContent.trim(),
              parent_title: listPage[numberPage].title,
              class: listPage[numberPage].class,
              category: listPage[numberPage].category,
              book: listPage[numberPage].book,
              url_crawl: "",
              has_sub_category: 1,
              order: 1,
            });
          });

          return data;
        },
        listPage,
        numberPage
      );

      category_2 = await page.evaluate(
        (listPage, numberPage) => {
          let element = document.querySelectorAll(".box.clearfix.font-opensans-b > div div.subject-item ul li a span");
          element = [...element];

          let data = [];

          element.forEach((item, index) => {
            data.push({
              name: item.textContent.trim(),
              title: item.textContent.trim(),
              parent_title: item.closest(".subject-item").querySelector("h2 > a > strong").textContent,
              class: listPage[numberPage].class,
              category: listPage[numberPage].category,
              book: listPage[numberPage].book,
              url_crawl: item.closest("a").href,
              has_sub_category: 1,
              order: index + 1,
            });
          });

          return data;
        },
        listPage,
        numberPage
      );

      /**
       * Save database
       */
      const data = {
        category_0: category_0,
        category_1: category_1,
        category_2: category_2,
      };

      saveData({ data: data });

      await page.waitForTimeout(5000);

      console.log("\n DONE: " + listPage[numberPage].url);

      numberPage = numberPage + 1;

      /**
       * Finish
       */
      if (numberPage >= limitPage) {
        console.log("\n************* !!! FINISH ALL !!!! ************* \n");
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  await browser.close();
})();

async function saveData(data) {
  try {
    await axios
      .post(process.env.HOST_API, data)
      .then(function (response) {})
      .catch(function (error) {
        console.log("LOCAL LOG: ERROR SAVE DATABASE");
        sendTele(error, data, "Error Saved Database");
      });
  } catch (error) {
    console.log("LOCAL LOG: ERROR SAVE DATABASE");
  }
}

async function sendTele(error, data_tpm = [], note = "", url = "", line = 0) {
  let html = "";
  html += "<b>[Error] : </b><code>" + JSON.stringify(error) + "</code> \n";
  html += "<b>[Message] : </b><code>" + note + "</code> \n";
  html += "<b>[URL] : </b><code>" + url + "</code> \n";
  html += "<b>[Line] : </b><code>" + line + "</code> \n";
  html += "<b>[Data] : </b><code>" + JSON.stringify(data_tpm) + "</code> \n";

  try {
    await axios
      .post(process.env.TELE_URL, {
        chat_id: process.env.TELE_CHAT_ID,
        text: html,
      })
      .then(function (response) {
        console.log("LOCAL LOG: ERROR SEND TELEGRAM");
      });
  } catch (error) {
    console.log("LOCAL LOG: ERROR SEND TELEGRAM");
  }
}
