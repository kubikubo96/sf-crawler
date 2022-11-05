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
    url: 'https://didongviet.vn/dchannel/thu-thuat/page/',
    pageIndex: 1,
    tag: ["Thợ công nghệ"],
    source: "didongviet.vn",
    elmLinkPost: ".post h3 a",
    typeLinkPost: 'full',
    elmTitle: ".article-title h1",
    elmContent: ".article-body",
    elmLink: "#ftwp-postcontent a",
    elmImage: "#ftwp-postcontent img",
    elmH1: "#ftwp-postcontent h1",
    elmH2: "#ftwp-postcontent h2",
    elmTagP: "#ftwp-postcontent > p",
    elmTagQuote: "#ftwp-postcontent > blockquote",
    elmTagFigure: "#ftwp-postcontent > figure",
    elmTagDiv: "#ftwp-postcontent > div",
  }
];