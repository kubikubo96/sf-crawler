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
        path: "tu-van-chon-mua-dien-thoai",
        tag: ["Điện thoại", "Tư vấn chọn mua điện thoại"]
      },
      {
        path: "danh-gia-san-pham",
        tag: ["Điện thoại", "Đánh giá sản phẩm"]
      },
      {
        path: "tin-cong-nghe-laptop",
        tag: ["Laptop", "Tin công nghệ laptop"]
      },
      {
        path: "danh-gia-san-pham-laptop",
        tag: ["Laptop", "Đánh giá sản phẩm laptop"]
      },
      {
        path: "huong-dan-su-dung-laptop",
        tag: ["Laptop", "Hướng dẫn sử dụng laptop"]
      },
      {
        path: "danh-gia-san-pham-may-tinh-bang",
        tag: ["Máy tính bảng", "Đánh giá sản phẩm máy tính bảng"]
      }, {
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
      {
        path: "thuong-hieu-dong-ho",
        tag: ["Đồng hồ", "Thương hiệu đồng hồ"]
      },
      {
        path: "meo-huong-dan-su-dung-dong-ho",
        tag: ["Đồng hồ", "Mẹo hướng dẫn sử dụng dồng hồ"]
      },
      {
        path: "thuat-ngu-dong-ho",
        tag: ["Đồng hồ", "Thuật ngữ đồng hồ"]
      },
      {
        path: "phan-biet-dong-ho-that-gia",
        tag: ["Đồng hồ", "Phân biệt đồng hồ thật giả"]
      },
      {
        path: "tu-van-chon-mua-mat-kinh",
        tag: ["Mắt kính", "Tư vấn chọn mua mắt kính"]
      },
      {
        path: "thuong-hieu-mat-kinh",
        tag: ["Mắt kính", "Thương hiệu mắt kính"]
      },
      {
        path: "thiet-bi-thong-minh-phong-ngu",
        tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng ngủ"]
      },
      {
        path: "thiet-bi-thong-minh-phong-khach",
        tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng khách"]
      }, {
        path: "thiet-bi-thong-minh-nha-bep",
        tag: ["Thiết bị thông minh", "Thiết bị thông minh nhà bếp"]
      },
      {
        path: "thiet-bi-thong-minh-khac",
        tag: ["Thiết bị thông minh", "Thiết bị thông minh khác"]
      },
    ],
  },
  {
    url: 'https://www.bachhoaxanh.com/kinh-nghiem-hay/aj/Category/ListNews?pageSize=50',
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
  },
  {
    url: 'https://fptshop.com.vn/api-data/tin-tuc/News/GetListNews/thu-thuat?numberRecord=500&page=1',
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