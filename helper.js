import {LIST_CRAWL} from "./constants.js";
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
    let listPage = [];
    for (let i = 0; i < LIST_CRAWL.length; i++) {
        let dataDefault = {
            source: LIST_CRAWL[i].source,
            elmLinkPost: LIST_CRAWL[i].elmLinkPost,
            typeLinkPost: LIST_CRAWL[i].typeLinkPost,
            elmTitle: LIST_CRAWL[i].elmTitle,
            elmContent: LIST_CRAWL[i].elmContent,
            elmLink: LIST_CRAWL[i].elmLink,
            elmImage: LIST_CRAWL[i].elmImage,
            elmSortContent: LIST_CRAWL[i].elmSortContent,
            elmTagP: LIST_CRAWL[i].elmTagP,
            elmTagQuote: LIST_CRAWL[i].elmTagQuote,
            elmTagFigure: LIST_CRAWL[i].elmTagFigure,
        };

        switch (LIST_CRAWL[i].source) {
            case 'dienmayxanh.com':
            case 'bachhoaxanh.com':
                listPage = listPageTypeA(listPage, LIST_CRAWL[i], dataDefault);
                break;
            case 'funix.edu.vn':
                listPage = listPageTypeB(listPage, LIST_CRAWL[i], dataDefault);
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