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
        path: "loi-ti-vi-thuong-gap",
        tag: ["Thợ công nghệ", "Tivi"]
      },
      {
        path: "tin-cong-nghe-dien-thoai",
        tag: ["Tin tức", "Tin tức điện thoại"]
      },
      {
        path: "tin-cong-nghe-laptop",
        tag: ["Tin tức", "Tin tức Laptop"]
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
        path: "phu-kien",
        tag: ["Hướng dẫn", "Phụ kiện"]
      },
      {
        path: "thuong-hieu-dong-ho",
        tag: ["Tin tức", "Thương hiệu đồng hồ"]
      },
      {
        path: "meo-huong-dan-su-dung-dong-ho",
        tag: ["Hướng dẫn", "Mẹo hướng dẫn sử dụng dồng hồ"]
      },
      {
        path: "thuat-ngu-dong-ho",
        tag: ["Hướng dẫn", "Thuật ngữ đồng hồ"]
      },
      {
        path: "phan-biet-dong-ho-that-gia",
        tag: ["Hướng dẫn", "Phân biệt đồng hồ thật giả"]
      },
      {
        path: "thuong-hieu-mat-kinh",
        tag: ["Tin tức", "Thương hiệu mắt kính"]
      },
      {
        path: "thiet-bi-thong-minh-phong-ngu",
        tag: ["Hướng dẫn", "Thiết bị thông minh"]
      },
      {
        path: "thiet-bi-thong-minh-phong-khach",
        tag: ["Hướng dẫn", "Thiết bị thông minh"]
      }, {
        path: "thiet-bi-thong-minh-nha-bep",
        tag: ["Hướng dẫn", "Thiết bị thông minh"]
      },
      {
        path: "thiet-bi-thong-minh-khac",
        tag: ["Hướng dẫn", "Thiết bị thông minh"]
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
    data: [
      {
        path: "2086",
        tag: ["Món ngon mỗi ngày", "Công thức nấu ăn"],
      },
      {
        path: "2110",
        tag: ["Món ngon mỗi ngày", "Mẹo vặt bếp núc"],
      },
      {
        path: "2102",
        tag: ["Món ngon mỗi ngày", "Chế độ ăn uống"],
      },
      {
        path: "2111",
        tag: ["Mẹo vặt cuộc sống", "Mẹo làm đẹp"],
      },
      {
        path: "2113",
        tag: ["Mẹo vặt cuộc sống", "Phong thủy"],
      },
      {
        path: "2114",
        tag: ["Mẹo vặt cuộc sống", "Mẹo vặt công nghệ"],
      },
      {
        path: "2115",
        tag: ["Mẹo vặt cuộc sống", "Thông tin cần biết"],
      },
      {
        path: "2102",
        tag: ["Sống khỏe", "Chế độ ăn uống"],
      },
    ],
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
  },
];