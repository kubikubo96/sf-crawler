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

export function oneWhileSpace(string) {
  return string.replace(/\s\s+/g, ' ');
}

export function timestamps() {
  return new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
}

export function handleListPage() {

  let dataCrawl = LIST_CRAWL;
  if (process.env.HOST_PRODUCT === '1') {
    dataCrawl = LIST_CRAWL_BOT;
  }

  let listPage = [];
  for (let i = 0; i < dataCrawl.length; i++) {
    let dataDefault = {...dataCrawl[i]};

    switch (dataCrawl[i].source) {
      case 'dienmayxanh.com':
        listPage = listPageTypeB(listPage, dataCrawl[i], dataDefault);
        break;
      case 'bachhoaxanh.com':
        listPage = listPageTypeC(listPage, dataCrawl[i], dataDefault);
        break;
      case 'fptshop.com.vn':
        listPage = [...listPage, dataDefault];
        break;
      case 'bizflycloud.vn':
        listPage = listPageTypeD(listPage, dataCrawl[i], dataDefault);
        break;
      case 'didongviet.vn':
        listPage = listPageTypeE(listPage, dataCrawl[i], dataDefault);
        break;
    }
  }

  return listPage;
}

export function checkTitleTrue(title) {
  const trashTitle = [
    '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012',
    '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022',
    'ĐTCL', 'DTCL', 'Bách hóa XANH', 'Bách Hóa XANH', '4G', '5G',
    'Mobifone', 'mobifone', 'Viettel', 'viettel', 'VinaPhone', 'SIM', 'eSIM', 'Vietnamobile',
  ];

  let check = true;

  trashTitle.forEach((item) => {
    if (title.includes(item)) {
      check = false;
    }
  });

  return check;
}

export function listPageTypeA(listPage, ItemI, dataDefault) {
  for (let j = ItemI.max; j >= 1; j--) {
    let temp = {...dataDefault};
    temp.url = ItemI.url + j;
    temp.tag = ItemI.tag;
    listPage.push(temp);
  }
  return listPage;
}

export function listPageTypeB(listPage, itemI, dataDefault) {
  for (let j = itemI.data.length - 1; j >= 0; j--) {
    let temp = {...dataDefault};
    temp.url = itemI.url + itemI.data[j].path;
    temp.tag = itemI.data[j].tag;
    listPage.push(temp);
  }
  return listPage;
}

export function listPageTypeC(listPage, itemI, dataDefault) {
  for (let i = itemI.data.length - 1; i >= 0; i--) {
    for (let j = itemI.pageIndex; j >= 0; j--) {
      let temp = {...dataDefault};
      temp.url = itemI.url + "&cateId=" + itemI.data[i].path + "&pageIndex=" + j;
      temp.tag = itemI.data[i].tag;
      listPage.push(temp);
    }
  }
  return listPage;
}

export function listPageTypeD(listPage, itemI, dataDefault) {
  for (let i = itemI.data.length - 1; i >= 0; i--) {
    for (let j = itemI.data[i].pageIndex; j >= 1; j--) {
      let temp = {...dataDefault};
      temp.url = itemI.url + itemI.data[i].path + "/trang-" + j + '.htm';
      temp.tag = itemI.data[i].tag;
      listPage.push(temp);
    }
  }
  return listPage;
}

export function listPageTypeE(listPage, itemI, dataDefault) {
  for (let j = itemI.pageIndex; j >= 1; j--) {
    let temp = {...dataDefault};
    temp.url = itemI.url + j;
    temp.tag = itemI.tag;
    listPage.push(temp);
  }
  return listPage;
}