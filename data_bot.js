export const LIST_CRAWL = [
  {
    url: 'https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=20&url=',
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
      {
        path: "meo-hay-facebook-zalo-youtube",
        tag: ["Mạng xã hội", "Mẹo hay Facebook Zalo Youtube"]
      },
      {
        path: "tin-hoc-van-phong",
        tag: ["Tin học văn phòng"]
      },
      {
        path: "phu-kien",
        tag: ["Phụ kiện"]
      },
    ],
  },
  // {
  //   url: 'https://www.bachhoaxanh.com/kinh-nghiem-hay/aj/Category/ListNews?pageIndex=0&pageSize=10&cateId=',
  //   source: "bachhoaxanh.com",
  //   elmLinkPost: "li.news > a",
  //   typeLinkPost: 'path',
  //   elmTitle: ".boxcontent h1.titlearticle",
  //   elmContent: ".boxcontent",
  //   elmLink: ".boxcontent a",
  //   elmImage: ".boxcontent img",
  //   elmSortContent: ".boxcontent h2",
  //   elmTagP: ".boxcontent > p",
  //   elmTagQuote: ".boxcontent > blockquote",
  //   elmTagFigure: ".boxcontent > figure",
  //   data: [
  //     {
  //       path: "2086",
  //       tag: ["Món ngon mỗi ngày", "Công thức nấu ăn"],
  //     },
  //     {
  //       path: "2110",
  //       tag: ["Món ngon mỗi ngày", "Mẹo vặt bếp núc"],
  //     },
  //     {
  //       path: "2087",
  //       tag: ["Món ngon mỗi ngày", "Đặc sản vùng miền"],
  //     },
  //     {
  //       path: "2090",
  //       tag: ["Món ngon mỗi ngày", "Địa điểm ăn uống"],
  //     },
  //     {
  //       path: "2102",
  //       tag: ["Món ngon mỗi ngày", "Chế độ ăn uống"],
  //     },
  //     {
  //       path: "2109",
  //       tag: ["Mẹo vặt cuộc sống", "Mẹo vặt gia đình"],
  //     },
  //     {
  //       path: "2110",
  //       tag: ["Mẹo vặt cuộc sống", "Mẹo vặt bếp núc"],
  //     },
  //     {
  //       path: "2111",
  //       tag: ["Mẹo vặt cuộc sống", "Mẹo làm đẹp"],
  //     },
  //     {
  //       path: "2112",
  //       tag: ["Mẹo vặt cuộc sống", "Mẹo chi tiêu"],
  //     },
  //     {
  //       path: "2113",
  //       tag: ["Mẹo vặt cuộc sống", "Phong thủy"],
  //     },
  //     {
  //       path: "2114",
  //       tag: ["Mẹo vặt cuộc sống", "Mẹo vặt công nghệ"],
  //     },
  //     {
  //       path: "2115",
  //       tag: ["Mẹo vặt cuộc sống", "Thông tin cần biết"],
  //     },
  //     {
  //       path: "2102",
  //       tag: ["Sống khỏe", "Chế độ ăn uống"],
  //     },
  //     {
  //       path: "2103",
  //       tag: ["Sống khỏe", "Sống xanh"],
  //     },
  //     {
  //       path: "2348",
  //       tag: ["Sống khỏe", "Mẹ và bé"],
  //     },
  //     {
  //       path: "2094",
  //       tag: ["Làm đẹp", "Thời trang"],
  //     },
  //     {
  //       path: "2095",
  //       tag: ["Làm đẹp", "Dưỡng da"],
  //     },
  //     {
  //       path: "2096",
  //       tag: ["Làm đẹp", "Trang điểm"],
  //     },
  //     {
  //       path: "2111",
  //       tag: ["Làm đẹp", "Mẹo làm đẹp"],
  //     },
  //     {
  //       path: "2089",
  //       tag: ["Ăn gì chơi gì", "Địa điểm du lịch"],
  //     },
  //     {
  //       path: "2090",
  //       tag: ["Ăn gì chơi gì", "Địa điểm ăn uống"],
  //     },
  //     {
  //       path: "2091",
  //       tag: ["Ăn gì chơi gì", "Phim hay"],
  //     },
  //     {
  //       path: "2092",
  //       tag: ["Ăn gì chơi gì", "Nhạc hay"],
  //     },
  //   ],
  // },
];