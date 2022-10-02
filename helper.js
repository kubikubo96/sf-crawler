import {LIST_CRAWL} from "./constants.js";

export function handleListPage() {
    let listPage = [];
    for (let i = 0; i < LIST_CRAWL.length; i++) {
        switch (LIST_CRAWL[i].source) {
            case 'dienmayxanh.com':
                listPage = listPageDienMayXanh(listPage, LIST_CRAWL[i]);
                break;
            case 'funix.edu.vn':
                listPage = listPageFunix(listPage, LIST_CRAWL[i]);
        }
    }

    return listPage;
}

export function listPageDienMayXanh(listPage, itemI) {
    for (let j = 0; j < itemI.data.length; j++) {
        const temp = {
            url: itemI.url + itemI.data[j].path,
            tag: itemI.data[j].tag,
            source: itemI.source,
            elmLinkPost: itemI.elmLinkPost,
            typeLinkPost: itemI.typeLinkPost,
            elmTitle: itemI.elmTitle,
            elmContent: itemI.elmContent,
            elmLink: itemI.elmLink,
            elmImage: itemI.elmImage,
            elmSortContent: itemI.elmSortContent,
            elmTagP: itemI.elmTagP,
            elmTagQuote: itemI.elmTagQuote,
            elmTagFigure: itemI.elmTagFigure,
        };
        listPage.push(temp);
    }
    return listPage;
}

export function listPageFunix(listPage, ItemI) {
    for (let j = 1; j < ItemI.max; j++) {
        const temp = {
            url: ItemI.url + j,
            tag: ItemI.tag,
            source: ItemI.source,
            elmLinkPost: ItemI.elmLinkPost,
            typeLinkPost: ItemI.typeLinkPost,
            elmTitle: ItemI.elmTitle,
            elmContent: ItemI.elmContent,
            elmLink: ItemI.elmLink,
            elmImage: ItemI.elmImage,
            elmSortContent: ItemI.elmSortContent,
            elmTagP: ItemI.elmTagP,
            elmTagQuote: ItemI.elmTagQuote,
            elmTagFigure: ItemI.elmTagFigure,
        };
        listPage.push(temp);
    }
    return listPage;
}