export const LIST_CRAWL = [
  // {
  //     url: 'https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=20&url=',
  //     source: "dienmayxanh.com",
  //     elmLinkPost: "a.linktitle",
  //     typeLinkPost: 'path',
  //     elmTitle: ".article h1",
  //     elmContent: ".bxcontentnews",
  //     elmLink: ".bxcontentnews a",
  //     elmImage: ".bxcontentnews img",
  //     elmSortContent: ".bxcontentnews h2",
  //     elmTagP: ".bxcontentnews > p",
  //     elmTagQuote: ".bxcontentnews > blockquote",
  //     elmTagFigure: ".bxcontentnews > figure",
  //     data: [
  //         {
  //             path: "huong-dan-su-dung-laptop",
  //             tag: ["Laptop"],
  //         },
  //         {
  //             path: "huong-dan-su-dung",
  //             tag: ["Điện thoại", "Hướng dẫn sự dụng điện thoại"],
  //         },
  //         {
  //             path: "loi-ti-vi-thuong-gap",
  //             tag: ["Tivi", "Lỗi tivi thường gặp"]
  //         },
  //         {
  //             path: "tin-cong-nghe-dien-thoai",
  //             tag: ["Điện thoại", "Tin công nghệ điện thoại"]
  //         },
  //         {
  //             path: "tu-van-chon-mua-dien-thoai",
  //             tag: ["Điện thoại", "Tư vấn chọn mua điện thoại"]
  //         },
  //         {
  //             path: "danh-gia-san-pham",
  //             tag: ["Điện thoại", "Đánh giá sản phẩm"]
  //         },
  //         {
  //             path: "tin-cong-nghe-laptop",
  //             tag: ["Laptop", "Tin công nghệ laptop"]
  //         },
  //         {
  //             path: "danh-gia-san-pham-laptop",
  //             tag: ["Laptop", "Đánh giá sản phẩm laptop"]
  //         },
  //         {
  //             path: "huong-dan-su-dung-laptop",
  //             tag: ["Laptop", "Hướng dẫn sử dụng laptop"]
  //         },
  //         {
  //             path: "danh-gia-san-pham-may-tinh-bang",
  //             tag: ["Máy tính bảng", "Đánh giá sản phẩm máy tính bảng"]
  //         }, {
  //             path: "huong-dan-su-dung-may-tinh-bang",
  //             tag: ["Máy tính bảng", "Hướng dẫn sử dụng máy tính bảng"]
  //         },
  //         {
  //             path: "meo-hay-facebook-zalo-youtube",
  //             tag: ["Mạng xã hội", "Mẹo hay Facebook Zalo Youtube"]
  //         },
  //         {
  //             path: "tin-hoc-van-phong",
  //             tag: ["Tin học văn phòng"]
  //         },
  //         {
  //             path: "phu-kien",
  //             tag: ["Phụ kiện"]
  //         },
  //         {
  //             path: "thuong-hieu-dong-ho",
  //             tag: ["Đồng hồ", "Thương hiệu đồng hồ"]
  //         },
  //         {
  //             path: "meo-huong-dan-su-dung-dong-ho",
  //             tag: ["Đồng hồ", "Mẹo hướng dẫn sử dụng dồng hồ"]
  //         },
  //         {
  //             path: "thuat-ngu-dong-ho",
  //             tag: ["Đồng hồ", "Thuật ngữ đồng hồ"]
  //         },
  //         {
  //             path: "phan-biet-dong-ho-that-gia",
  //             tag: ["Đồng hồ", "Phân biệt đồng hồ thật giả"]
  //         },
  //         {
  //             path: "tu-van-chon-mua-mat-kinh",
  //             tag: ["Mắt kính", "Tư vấn chọn mua mắt kính"]
  //         },
  //         {
  //             path: "thuong-hieu-mat-kinh",
  //             tag: ["Mắt kính", "Thương hiệu mắt kính"]
  //         },
  //         {
  //             path: "thiet-bi-thong-minh-phong-ngu",
  //             tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng ngủ"]
  //         },
  //         {
  //             path: "thiet-bi-thong-minh-phong-khach",
  //             tag: ["Thiết bị thông minh", "Thiết bị thông minh phòng khách"]
  //         }, {
  //             path: "thiet-bi-thong-minh-nha-bep",
  //             tag: ["Thiết bị thông minh", "Thiết bị thông minh nhà bếp"]
  //         },
  //         {
  //             path: "thiet-bi-thong-minh-khac",
  //             tag: ["Thiết bị thông minh", "Thiết bị thông minh khác"]
  //         },
  //     ],
  // },
  {
    url: 'https://www.bachhoaxanh.com/kinh-nghiem-hay/aj/Category/ListNews?pageIndex=0&pageSize=10&cateId=',
    source: "bachhoaxanh.com",
    elmLinkPost: "li.news > a",
    typeLinkPost: 'path',
    elmTitle: ".boxcontent h1.titlearticle",
    elmContent: ".boxcontent",
    elmLink: ".boxcontent a",
    elmImage: ".boxcontent img",
    elmSortContent: ".boxcontent h2",
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
  // {
  //     url: 'https://funix.edu.vn/chia-se-kien-thuc/page/',
  //     //max: 434,
  //     max: 20,
  //     tag: ['Chia sẽ kiến thức'],
  //     source: "funix.edu.vn",
  //     elmLinkPost: ".site-content .post-title a",
  //     typeLinkPost: 'full',
  //     elmTitle: ".content-post h1",
  //     elmContent: ".content-post-details",
  //     elmLink: ".content-post-details a",
  //     elmImage: ".content-post-details img",
  //     elmSortContent: ".content-post-details h2",
  //     elmTagP: ".content-post-details > p",
  //     elmTagQuote: ".content-post-details > blockquote",
  //     elmTagFigure: ".content-post-details > figure",
  // },
];

export const DATA_INTERNAL_POST = [
  {
    key_start: "xóa dữ liệu bảng tạm",
    space: 5,
    key_end: "Windows 11",
    url: "https://kungfucongnghe.com/cach-xoa-du-lieu-bang-tam-tren-windows-11-154609092022.htm",
  },
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

export const DATA_INTERNAL_TAG = [
  {
    name: ' Hướng dẫn ',
    url: 'https://kungfucongnghe.com/kien-thuc'
  },
  {
    name: ' Kiến thức ',
    url: 'https://kungfucongnghe.com/kien-thuc'
  },
  {
    name: ' Bluetooth ',
    url: 'https://kungfucongnghe.com/bluetooth'
  },
  {
    name: ' Windows 11 ',
    url: 'https://kungfucongnghe.com/tag/windows-11'
  },
  {
    name: ' Windows 10 ',
    url: 'https://kungfucongnghe.com/tag/windows-10'
  },
  {
    name: ' Windows 8.1 ',
    url: 'https://kungfucongnghe.com/windows-81'
  },
  {
    name: ' Windows 7 ',
    url: 'https://kungfucongnghe.com/windows-7'
  },
  {
    name: ' Google Chrome ',
    url: 'https://kungfucongnghe.com/tag/google-chrome'
  },
  {
    name: ' Microsoft Edge ',
    url: 'https://kungfucongnghe.com/tag/microsoft-edge'
  },
  {
    name: ' Firefox ',
    url: 'https://kungfucongnghe.com/tag/firefox'
  },
  {
    name: ' Cốc Cốc ',
    url: 'https://kungfucongnghe.com/tag/coc-coc'
  },
  {
    name: ' Laptop ',
    url: 'https://kungfucongnghe.com/laptop'
  },
  {
    name: ' iPhone 5',
    url: 'https://kungfucongnghe.com/tag/iphone-5'
  },
  {
    name: ' iPhone 6',
    url: 'https://kungfucongnghe.com/tag/iphone-6'
  },
  {
    name: ' iPhone 7',
    url: 'https://kungfucongnghe.com/tag/iphone-7'
  },
  {
    name: ' iPhone 8',
    url: 'https://kungfucongnghe.com/tag/iphone-8'
  },
  {
    name: ' iPhone 9',
    url: 'https://kungfucongnghe.com/tag/iphone-10'
  },
  {
    name: ' iPhone 11',
    url: 'https://kungfucongnghe.com/tag/iphone-11'
  },
  {
    name: ' iPhone 12',
    url: 'https://kungfucongnghe.com/tag/iphone-12'
  },
  {
    name: ' iPhone 13',
    url: 'https://kungfucongnghe.com/tag/iphone-13'
  },
  {
    name: ' iPhone 14',
    url: 'https://kungfucongnghe.com/tag/iphone-14'
  },
  {
    name: ' iPhone 15',
    url: 'https://kungfucongnghe.com/tag/iphone-15'
  },
  {
    name: ' iCloud ',
    url: 'https://kungfucongnghe.com/tag/icloud'
  },
  {
    name: ' Instagram ',
    url: 'https://kungfucongnghe.com/tag/instagram'
  },
  {
    name: ' Facebook ',
    url: 'https://kungfucongnghe.com/tag/facebook'
  },
  {
    name: ' Zalo ',
    url: 'https://kungfucongnghe.com/tag/zalo'
  },
  {
    name: ' MacBook ',
    url: 'https://kungfucongnghe.com/macbook'
  },
  {
    name: ' Android ',
    url: 'https://kungfucongnghe.com/android'
  },
  {
    name: ' iOS 5',
    url: 'https://kungfucongnghe.com/ios-5'
  },
  {
    name: ' iOS 6',
    url: 'https://kungfucongnghe.com/ios-6'
  },
  {
    name: ' iOS 7',
    url: 'https://kungfucongnghe.com/ios-7'
  },
  {
    name: ' iOS 8',
    url: 'https://kungfucongnghe.com/ios-8'
  },
  {
    name: ' iOS 9',
    url: 'https://kungfucongnghe.com/ios-9'
  },
  {
    name: ' iOS 10',
    url: 'https://kungfucongnghe.com/ios-10'
  },
  {
    name: ' iOS 11',
    url: 'https://kungfucongnghe.com/ios-11'
  },
  {
    name: ' iOS 12',
    url: 'https://kungfucongnghe.com/ios-12'
  },
  {
    name: ' iOS 13',
    url: 'https://kungfucongnghe.com/ios-13'
  },
  {
    name: ' iOS 14',
    url: 'https://kungfucongnghe.com/ios-14'
  },
  {
    name: ' iOS 15',
    url: 'https://kungfucongnghe.com/ios-15'
  },
  {
    name: ' iOS 16',
    url: 'https://kungfucongnghe.com/ios-16'
  },
  {
    name: ' iPhone 5',
    url: 'https://kungfucongnghe.com/iphone-5'
  },
  {
    name: ' iPhone 6',
    url: 'https://kungfucongnghe.com/iphone-6'
  },
  {
    name: ' iPhone 7',
    url: 'https://kungfucongnghe.com/iphone-7'
  },
  {
    name: ' iPhone 8',
    url: 'https://kungfucongnghe.com/iphone-8'
  },
  {
    name: ' iPhone 9',
    url: 'https://kungfucongnghe.com/iphone-9'
  },
  {
    name: ' iPhone 10',
    url: 'https://kungfucongnghe.com/iphone-10'
  },
  {
    name: ' iPhone 11',
    url: 'https://kungfucongnghe.com/iphone-11'
  },
  {
    name: ' iPhone 12',
    url: 'https://kungfucongnghe.com/iphone-12'
  },
  {
    name: ' iPhone 13',
    url: 'https://kungfucongnghe.com/iphone-13'
  },
  {
    name: ' iPhone 14',
    url: 'https://kungfucongnghe.com/iphone-14'
  },
  {
    name: ' iPhone 15',
    url: 'https://kungfucongnghe.com/iphone-15'
  },
  {
    name: ' iPhone 16',
    url: 'https://kungfucongnghe.com/iphone-16'
  },
  {
    name: ' Smartphone ',
    url: 'https://kungfucongnghe.com/smartphone'
  },
  {
    name: ' Apple Watch ',
    url: 'https://kungfucongnghe.com/apple-watch'
  },
  {
    name: ' thiết bị thông minh ',
    url: 'https://kungfucongnghe.com/tag/thiet-bi-thong-minh'
  },
  {
    name: ' mắt kính ',
    url: 'https://kungfucongnghe.com/tag/mat-kinh'
  },
  {
    name: ' đồng hồ ',
    url: 'https://kungfucongnghe.com/tag/dong-ho'
  },
  {
    name: ' phụ kiện ',
    url: 'https://kungfucongnghe.com/tag/phu-kien'
  },
  {
    name: ' máy ảnh ',
    url: 'https://kungfucongnghe.com/tag/may-anh'
  },
  {
    name: ' tin học văn phòng ',
    url: 'https://kungfucongnghe.com/tag/tin-hoc-van-phong'
  },
  {
    name: ' mạng xã hội ',
    url: 'https://kungfucongnghe.com/tag/mang-xa-hoi'
  },
  {
    name: ' máy in ',
    url: 'https://kungfucongnghe.com/tag/may-in'
  },
  {
    name: ' thiết bị ngoại vi ',
    url: 'https://kungfucongnghe.com/tag/thiet-bi-ngoai-vi'
  },
  {
    name: ' đầu kỹ thuật số ',
    url: 'https://kungfucongnghe.com/tag/dau-ky-thuat-so'
  },
  {
    name: ' máy tính bảng ',
    url: 'https://kungfucongnghe.com/tag/may-tinh-bang'
  },
  {
    name: ' iPad ',
    url: 'https://kungfucongnghe.com/tag/may-tinh-bang'
  },
  {
    name: ' âm thanh ',
    url: 'https://kungfucongnghe.com/tag/am-thanh'
  },
  {
    name: ' tivi ',
    url: 'https://kungfucongnghe.com/tag/tivi'
  },
  {
    name: ' Command line ',
    url: 'https://kungfucongnghe.com/tag/command-line'
  },
  {
    name: ' Onedrive ',
    url: 'https://kungfucongnghe.com/tag/onedrive'
  },
  {
    name: ' Terminal ',
    url: 'https://kungfucongnghe.com/tag/terminal'
  },
  {
    name: ' Ubuntu ',
    url: 'https://kungfucongnghe.com/tag/ubuntu'
  },
  {
    name: ' Vmware ',
    url: 'https://kungfucongnghe.com/tag/vmware'
  },
  {
    name: ' Excel ',
    url: 'https://kungfucongnghe.com/tag/excel'
  },
  {
    name: ' Word ',
    url: 'https://kungfucongnghe.com/tag/word'
  },
  {
    name: ' Apple ',
    url: 'https://kungfucongnghe.com/apple'
  },
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
  'Mọi thắc mắc vui lòng để lại câu hỏi ngay bên dưới để Điện máy XANH hỗ trợ cho bạn nhé',
  'Đọc thêm bài viết',
  'Tham khảo thêm',
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
  'Bachs Hóa XANH',
  'Nguyễn Cúc',

];

export const ELM_TRASH = [
  'iframe', '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
  'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
  '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '#hmenuid4', '.btn__noibat',
  '.generate-productbox', '.generate-gallery', '.mce-preview-object', '.mce-object-iframe', 'p iframe', '.top-news', 'ins', 'box_above',
  '.adbro-sm', '.adbro-xs', 'adbro-bottom', '.mys-wrapper', '.adbro-satellite', '.adbro-animated', '.ez-toc-container', '.newscare',
  '#attachment_60985', '.kk-star-ratings', 'ul > li > a', '.ez-toc-title', '#player', '.html5-video-container', '.bxindexknh', 'tiktok',
  'productbox'

];

export const ELM_TRASH_PARENT = [
  'ul > li > a',
];