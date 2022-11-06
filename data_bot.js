export const LIST_CRAWL_BOT = [
  {
    url: 'https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=5&url=',
    source: "dienmayxanh.com",
    elmLinkPost: "a.linktitle",
    typeLinkPost: 'path',
    elmTitle: ".article h1",
    elmContent: ".bxcontentnews",
    elmLink: ".bxcontentnews a",
    elmImage: ".bxcontentnews img",
    elmH1: ".bxcontentnews h1",
    elmH2: ".bxcontentnews h2",
    elmTagP: ".bxcontentnews > p",
    elmTagQuote: ".bxcontentnews > blockquote",
    elmTagFigure: ".bxcontentnews > figure",
    elmTagDiv: ".bxcontentnews > div",
    data: [
      {
        path: "huong-dan-su-dung-laptop",
        tag: ["Thợ công nghệ", "Laptop"],
      },
      {
        path: "huong-dan-su-dung",
        tag: ["Thợ công nghệ", "Điện thoại"],
      },
      {
        path: "huong-dan-su-dung-laptop",
        tag: ["Thợ công nghệ", "Laptop"]
      },
      {
        path: "huong-dan-su-dung-may-tinh-bang",
        tag: ["Thợ công nghệ", "Máy tính bảng"]
      },
      {
        path: "meo-hay-facebook-zalo-youtube",
        tag: ["Hướng dẫn", "Mạng xã hội"]
      },
      {
        path: "tin-hoc-van-phong",
        tag: ["Hướng dẫn", "Tin học văn phòng"]
      },
      {
        path: "thuat-ngu-dong-ho",
        tag: ["Hướng dẫn", "Thuật ngữ đồng hồ"]
      },
    ],
  },
  {
    url: 'https://www.bachhoaxanh.com/kinh-nghiem-hay/aj/Category/ListNews?pageSize=5',
    pageIndex: 0,
    source: "bachhoaxanh.com",
    elmLinkPost: "li.news > a",
    typeLinkPost: 'path',
    elmTitle: ".boxcontent h1.titlearticle",
    elmContent: ".boxcontent",
    elmLink: ".boxcontent a",
    elmImage: ".boxcontent img",
    elmH1: ".boxcontent h1",
    elmH2: ".boxcontent h2",
    elmTagP: ".boxcontent > p",
    elmTagQuote: ".boxcontent > blockquote",
    elmTagFigure: ".boxcontent > figure",
    elmTagDiv: ".boxcontent > div",
    data: [
      {
        path: "2086",
        tag: ["Đời sống", "Món ngon mỗi ngày"],
      },
      {
        path: "2110",
        tag: ["Đời sống", "Món ngon mỗi ngày"],
      },
      {
        path: "2109",
        tag: ["Đời sống", "Mẹo vặt"],
      },
      {
        path: "2111",
        tag: ["Đời sống", "Mẹo vặt"],
      },
      {
        path: "2102",
        tag: ["Đời sống", "Sống khỏe"],
      },
      {
        path: "2094",
        tag: ["Đời sống", "Làm đẹp"],
      },
      {
        path: "2095",
        tag: ["Đời sống", "Làm đẹp"],
      },
      {
        path: "2089",
        tag: ["Đời sống", "Ăn gì chơi gì"],
      },
      {
        path: "2090",
        tag: ["Đời sống", "Ăn gì chơi gì"],
      },
    ]
  },
  {
    url: 'https://fptshop.com.vn/api-data/tin-tuc/News/GetListNews/thu-thuat?numberRecord=10&page=1',
    method: 'POST',
    tag: ["Hướng dẫn"],
    source: "fptshop.com.vn",
    elmLinkPost: ".news-section .news__item > a",
    typeLinkPost: 'path',
    elmTitle: ".post-wrap h1.post__title",
    elmDescription: ".post-wrap h2.post__des",
    elmContent: ".post__content",
    elmLink: ".post__content a",
    elmImage: ".post__content img",
    elmH1: ".post__content h1",
    elmH2: ".post__content h2",
    elmTagP: ".post__content > p",
    elmTagQuote: ".post__content > blockquote",
    elmTagFigure: ".post__content > figure",
    elmTagDiv: ".post__content > div",
  },
  {
    url: 'https://bizflycloud.vn/tin-tuc/',
    source: "bizflycloud.vn",
    elmLinkPost: ".main-content .post-title a",
    typeLinkPost: 'path',
    elmTitle: ".detail-content h1.page-title-content",
    elmContent: ".detail-content",
    elmLink: ".detail-content a",
    elmImage: ".detail-content img",
    elmH1: ".detail-content h1",
    elmH2: ".detail-content h2",
    elmTagP: ".detail-content > p",
    elmTagQuote: ".detail-content > blockquote",
    elmTagFigure: ".detail-content > figure",
    elmTagDiv: ".detail-content > div",
    data: [
      {
        path: "kien-thuc-co-ban",
        tag: ["Thợ công nghệ"],
        pageIndex: 1,
      },
      {
        path: "thu-thuat",
        tag: ["Thợ công nghệ"],
        pageIndex: 1,
      },
    ],
  },
];