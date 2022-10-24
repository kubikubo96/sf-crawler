export const LIST_CRAWL = [
  {
    url: 'https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=2000&url=',
    source: "dienmayxanh.com",
    elmLinkPost: "a.linktitle",
    typeLinkPost: 'path',
    elmTitle: ".article h1",
    elmContent: ".bxcontentnews",
    elmLink: ".bxcontentnews a",
    elmImage: ".bxcontentnews img",
    elmSortContent: ".bxcontentnews h2",
    elmTagP: ".bxcontentnews > p",
    elmTagQuote: ".bxcontentnews > blockquote",
    elmTagFigure: ".bxcontentnews > figure",
    data: [
      {
        path: "huong-dan-su-dung-laptop",
        tag: ["Laptop"],
      },
      {
        path: "huong-dan-su-dung",
        tag: ["Điện thoại", "Hướng dẫn sự dụng điện thoại"],
      },
      {
        path: "loi-ti-vi-thuong-gap",
        tag: ["Tivi", "Lỗi tivi thường gặp"]
      },
      {
        path: "tin-cong-nghe-dien-thoai",
        tag: ["Điện thoại", "Tin công nghệ điện thoại"]
      },
      {
        path: "tin-cong-nghe-laptop",
        tag: ["Laptop", "Tin công nghệ laptop"]
      },
      {
        path: "huong-dan-su-dung-laptop",
        tag: ["Laptop", "Hướng dẫn sử dụng laptop"]
      },
      {
        path: "huong-dan-su-dung-may-tinh-bang",
        tag: ["Máy tính bảng", "Hướng dẫn sử dụng máy tính bảng"]
      },
      // {
      //   path: "meo-hay-facebook-zalo-youtube",
      //   tag: ["Mạng xã hội", "Mẹo hay Facebook Zalo Youtube"]
      // },
      // {
      //   path: "tin-hoc-van-phong",
      //   tag: ["Tin học văn phòng"]
      // },
      // {
      //   path: "phu-kien",
      //   tag: ["Phụ kiện"]
      // },
      // {
      //   path: "thuong-hieu-dong-ho",
      //   tag: ["Đồng hồ", "Thương hiệu đồng hồ"]
      // },
      // {
      //   path: "meo-huong-dan-su-dung-dong-ho",
      //   tag: ["Đồng hồ", "Mẹo hướng dẫn sử dụng dồng hồ"]
      // },
      // {
      //   path: "thuat-ngu-dong-ho",
      //   tag: ["Đồng hồ", "Thuật ngữ đồng hồ"]
      // },
      // {
      //   path: "phan-biet-dong-ho-that-gia",
      //   tag: ["Đồng hồ", "Phân biệt đồng hồ thật giả"]
      // },
      // {
      //   path: "thuong-hieu-mat-kinh",
      //   tag: ["Mắt kính", "Thương hiệu mắt kính"]
      // },
      // {
      //   path: "thiet-bi-thong-minh-phong-ngu",
      //   tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng ngủ"]
      // },
      // {
      //   path: "thiet-bi-thong-minh-phong-khach",
      //   tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng khách"]
      // }, {
      //   path: "thiet-bi-thong-minh-nha-bep",
      //   tag: ["Thiết bị thông minh", "Thiết bị thông minh nhà bếp"]
      // },
      // {
      //   path: "thiet-bi-thong-minh-khac",
      //   tag: ["Thiết bị thông minh", "Thiết bị thông minh khác"]
      // },
    ],
  },
  /*{
    url: 'https://www.bachhoaxanh.com/kinh-nghiem-hay/aj/Category/ListNews?pageSize=50',
    pageIndex: 5,
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
        path: "2087",
        tag: ["Món ngon mỗi ngày", "Đặc sản vùng miền"],
      },
      {
        path: "2090",
        tag: ["Món ngon mỗi ngày", "Địa điểm ăn uống"],
      },
      {
        path: "2102",
        tag: ["Món ngon mỗi ngày", "Chế độ ăn uống"],
      },
      {
        path: "2109",
        tag: ["Mẹo vặt cuộc sống", "Mẹo vặt gia đình"],
      },
      {
        path: "2110",
        tag: ["Mẹo vặt cuộc sống", "Mẹo vặt bếp núc"],
      },
      {
        path: "2111",
        tag: ["Mẹo vặt cuộc sống", "Mẹo làm đẹp"],
      },
      {
        path: "2112",
        tag: ["Mẹo vặt cuộc sống", "Mẹo chi tiêu"],
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
      {
        path: "2103",
        tag: ["Sống khỏe", "Sống xanh"],
      },
      {
        path: "2348",
        tag: ["Sống khỏe", "Mẹ và bé"],
      },
      {
        path: "2094",
        tag: ["Làm đẹp", "Thời trang"],
      },
      {
        path: "2095",
        tag: ["Làm đẹp", "Dưỡng da"],
      },
      {
        path: "2096",
        tag: ["Làm đẹp", "Trang điểm"],
      },
      {
        path: "2111",
        tag: ["Làm đẹp", "Mẹo làm đẹp"],
      },
      {
        path: "2089",
        tag: ["Ăn gì chơi gì", "Địa điểm du lịch"],
      },
      {
        path: "2090",
        tag: ["Ăn gì chơi gì", "Địa điểm ăn uống"],
      },
      {
        path: "2091",
        tag: ["Ăn gì chơi gì", "Phim hay"],
      },
      {
        path: "2092",
        tag: ["Ăn gì chơi gì", "Nhạc hay"],
      },
    ],
  },*/
  /*{
    url: 'https://fptshop.com.vn/api-data/tin-tuc/News/GetListNews/thu-thuat?numberRecord=1000&page=1',
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
  },*/
];

export const DATA_ELEMENT_INTERNAL_POST = [
  ".bxcontentnews > p",
  ".bxcontentnews > p > strong",

  ".boxcontent > p",
  ".boxcontent > p > strong",

  ".content-post-details > p",
  ".content-post-details > p > strong",

  ".content-detail > p",
  ".content-detail > p > strong",

  ".entry-content > p",
  ".entry-content > p > strong",
];

export const LIST_TRASH_LINK = [
  'điện máy xanh',
  'bách hóa xanh',
  'Điện máy XANH',
  'Bách hóa XANH',
  'Điện máy xanh',
  'Bách hóa xanh',
  'Điện Máy Xanh',
  'Bách Hóa Xanh',
  'ĐIỆN MÁY XANH',
  'BÁCH HÓA XANH',
  'Bách hoá XANH',
  'Bách hoá XANH',
  'Mọi thắc mắc vui lòng để lại câu hỏi ngay bên dưới để Điện máy XANH hỗ trợ cho bạn nhé',
  'Đọc thêm bài viết',
  'Tham khảo thêm',
  '>> Tham khảo:',
  '<a href="" target="_blank"></a>',
  'Xem clip Tiktok',
  'Tìm hiểu chi tiết',
];

export const LIST_TRASH_P = [
  'Xem thêm bài viết',
  'xem thêm bài viết',
  'học lập trình phân tích dữ liệu FUNiX',
  'Xem thêm bài viết liên quan',
  'Đọc bài viết',
  'Đọc bài viết:',
  '>> Xem thêm bài viết liên quan:',
  'Xem thêm bài viết liên quan',
  'bạn có thể tham khảo khóa học tại FUNiX',
  'Đăng ký tư vấn khóa học ngay',
  'Học lập trình phân tích dữ liệu tại FUNiX',
  'Tìm hiểu ngay',
  'Xem thêm chuỗi bài viết liên quan',
  'Nếu bạn đang có nhu cầu tìm hiểu khóa học lập trình phân tích dữ liệu',
  'Đọc thêm bài viết',
  'phân tích dữ liệu tại FUNiX',
  'Tìm hiểu khóa học kỹ sư dữ liệu',
  'Nếu bạn đang cần tìm hiểu khóa học lập trình phân tích dữ liệu',
  'Tham khảo thêm',
  'Tham khảo thêm:',
  'Xem clip Tiktok cách làm lagu pate sườn non:',
  'Mua đồ trang điểm tại Bách hoá XANH để luôn rạng rỡ mỗi ngày:',
  'Lương Thuận – Tổng hợp',
  'Lợi ích khi học lập trình Python tại FUNiX',
  'tại Bách hóa XANH',
  'tại Bách hoá XANH',
  '<a href="" target="_blank"></a>',
  'Xem clip Tiktok',
  "Xem thêm:",
  'Tìm hiểu chi tiết',
];

export const TRASH_AUTHOR = [
  'Điện máy XANH',
  'Bách hóa XANH',
  'Điện máy xanh',
  'Bách hóa xanh',
  'Điện Máy Xanh',
  'Bách Hóa Xanh',
  'DienmayXANH.com',
  'BachhoaXANH.com',
  'Dienmay.com',
  'Bachhoa.com',
  'Điện Máy XANH',
  'Bách Hóa XANH',
  'Bách hoá XANH',
  'Nguyễn Cúc',
  'FUNiX',
  'FPT Shop',
];

export const TRASH_TEXT = [
  '<a href="" target="_blank"></a>'
];

export const ELM_TRASH = [
  'iframe', '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
  'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
  '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', '.btn__noibat',
  '.generate-productbox', '.generate-gallery', '.mce-preview-object', '.mce-object-iframe', 'p iframe', '.top-news', 'ins', 'box_above',
  '.adbro-sm', '.adbro-xs', 'adbro-bottom', '.mys-wrapper', '.adbro-satellite', '.adbro-animated', '.ez-toc-container', '.newscare',
  '#attachment_60985', '.kk-star-ratings', 'ul > li > a', '.ez-toc-title', '#player', '.html5-video-container', '.bxindexknh', 'tiktok',
  'productbox', '.ad-even', 'p.title > b', '.hiddenbxindex', '.tiktokEmbed0', '.hidden', '.post__user', '#post__list',

];

export const ELM_TRASH_PARENT = [
  'ul > li > a',
];