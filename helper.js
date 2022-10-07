import {LIST_CRAWL} from "./constants.js";
import {LIST_CRAWL_BOT} from "./data_bot.js";
import axios from "axios";

export async function saveData(data) {
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

export function handleListPage() {

  let dataCrawl = LIST_CRAWL;
  if (process.env.HOST_PRODUCT === '1') {
    dataCrawl = LIST_CRAWL_BOT;
  }

  let listPage = [];
  for (let i = 0; i < dataCrawl.length; i++) {
    let dataDefault = {
      source: dataCrawl[i].source,
      elmLinkPost: dataCrawl[i].elmLinkPost,
      typeLinkPost: dataCrawl[i].typeLinkPost,
      elmTitle: dataCrawl[i].elmTitle,
      elmContent: dataCrawl[i].elmContent,
      elmLink: dataCrawl[i].elmLink,
      elmImage: dataCrawl[i].elmImage,
      elmSortContent: dataCrawl[i].elmSortContent,
      elmTagP: dataCrawl[i].elmTagP,
      elmTagQuote: dataCrawl[i].elmTagQuote,
      elmTagFigure: dataCrawl[i].elmTagFigure,
    };

    switch (dataCrawl[i].source) {
      case 'dienmayxanh.com':
      case 'bachhoaxanh.com':
        listPage = listPageTypeA(listPage, dataCrawl[i], dataDefault);
        break;
    }
  }

  return listPage;
}

export function listPageTypeA(listPage, itemI, dataDefault) {
  for (let j = itemI.data.length - 1; j >= 0; j--) {
    let temp = {...dataDefault};
    temp.url = itemI.url + itemI.data[j].path;
    temp.tag = itemI.data[j].tag;
    listPage.push(temp);
  }
  return listPage;
}

export function listPageTypeB(listPage, ItemI, dataDefault) {
  for (let j = ItemI.max; j >= 1; j--) {
    let temp = {...dataDefault};
    temp.url = ItemI.url + j;
    temp.tag = ItemI.tag;
    listPage.push(temp);
  }
  return listPage;
}

export function oneWhileSpace(string) {
  return string.replace(/\s\s+/g, ' ');
}

export function timestamps() {
  return new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
}