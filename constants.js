export const LIST_CRAWL = [
  /*{
    url: 'https://www.dienmayxanh.com/kinh-nghiem-hay/aj/CategoryV2/LoadNewsNext?hotSorting=true&pageIndex=0&pageSize=2000&url=',
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
  },*/
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
    elmTagDiv: ".boxcontent > div",
    data: [
      // {
      //   path: "2086",
      //   tag: ["Đời sống", "Món ngon mỗi ngày"],
      // },
      // {
      //   path: "2110",
      //   tag: ["Đời sống", "Món ngon mỗi ngày"],
      // },
      // {
      //   path: "2109",
      //   tag: ["Đời sống", "Mẹo vặt"],
      // },
      // {
      //   path: "2110",
      //   tag: ["Đời sống", "Mẹo vặt"],
      // },
      // {
      //   path: "2111",
      //   tag: ["Đời sống", "Mẹo vặt"],
      // },
      // {
      //   path: "2102",
      //   tag: ["Đời sống", "Sống khỏe"],
      // },
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
        pageIndex: 50,
      },
      {
        path: "tin-cong-nghe",
        tag: ["Tin tức", "Tin công nghệ"],
        pageIndex: 5,
      },
      {
        path: "thu-thuat",
        tag: ["Thợ công nghệ"],
        pageIndex: 15,
      },
    ],
  },
  /*{
    url: 'https://didongviet.vn/dchannel/thu-thuat/page/',
    pageIndex: 50,
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
  },*/
];

export const DATA_TAG_PUBLISH = [
  'tag',
  'tho-cong-nghe',
  'huong-dan',
  'doi-song',
  'tin-tuc',
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
  'Mời bạn xem ngay',
  'Xem thêm sản phẩm',
  'Xem thêm',
  'Mời bạn xem qua',
  'Cloud Server',
  'Có thể bạn quan tâm',
  'Đăng ký dùng thử miễn phí',
  'Bài viết được tham khảo',
  'Theo BizFly Cloud',
  'Di Động Việt',
  'DI ĐỘNG VIỆT',
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
  'Xem thêm',
  'Tìm hiểu chi tiết',
  'Mời bạn xem ngay',
  'Xem thêm sản phẩm',
  'Mời bạn xem qua',
  'Cloud Server',
  'Có thể bạn quan tâm',
  'Đăng ký dùng thử miễn phí',
  'Bài viết được tham khảo',
  'Cloud Server – Giải pháp đám mây giúp vận hành website ổn định, nhanh chóng',
  'Cloud Server - Giải pháp đám mây giúp vận hành website ổn định, nhanh chóng',
  'là nhà cung cấp dịch vụ điện toán đám mây với chi phí thấp, được vận hành bởi VCCorp',
  'BizFly Cloud là một trong 4 doanh nghiệp',
  'DÙNG THỬ MIỄN PHÍ',
  'Độc giả quan tâm đến các giải pháp của BizFly Cloud',
  'Theo BizFly Cloud',
  'Di Động Việt',
  'DI ĐỘNG VIỆT',
];

export const LIST_TRASH_DIV = [
  'Theo BizFly Cloud',
  'Cloud Server – Giải pháp đám mây giúp vận hành website ổn định, nhanh chóng',
  'Cloud Server - Giải pháp đám mây giúp vận hành website ổn định, nhanh chóng',
  'là nhà cung cấp dịch vụ điện toán đám mây với chi phí thấp, được vận hành bởi VCCorp',
  'BizFly Cloud là một trong 4 doanh nghiệp',
  'DÙNG THỬ MIỄN PHÍ',
  'Độc giả quan tâm đến các giải pháp của BizFly Cloud',
  'VCCloud chính thức đổi tên thành BizFly Cloud',
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
  'Bizfly Cloud',
  'hệ thống Di Động Việt',
  'Di Động Việt',
];

export const TRASH_TEXT = [
  '<a href="" target="_blank"></a>',
  'Xem thêm:',
];

export const ELM_TRASH = [
  'iframe', '.top-news', '.adsbygoogle', '.adsense', '.in-article', '.adszone', '.adstopimage', '.adsviewed', '.generate-promotion-products',
  'div.toc', 'iframe.lazy', '.bannerAdNews', '.clrindexknh', '.bxindexknh', '#QuickViewId', '.owl-carousel', '.infobox', '.TitleBoxSp',
  '.HideBox', '.generate-promotion-products', '.wrap_relate', '.interested', '.tags', '.comment', '.fh3menu', '.btn__noibat',
  '.generate-productbox', '.generate-gallery', '.mce-preview-object', '.mce-object-iframe', 'p iframe', '.top-news', 'ins', 'box_above',
  '.adbro-sm', '.adbro-xs', 'adbro-bottom', '.mys-wrapper', '.adbro-satellite', '.adbro-animated', '.ez-toc-container', '.newscare',
  '#attachment_60985', '.kk-star-ratings', '.ez-toc-title', '#player', '.html5-video-container', '.bxindexknh', 'tiktok', '.tlt',
  'productbox', '.ad-even', 'p.title > b', '.hiddenbxindex', '.tiktokEmbed0', '.hidden', '.post__user', '#post__list', '.boxpromote',
  '.td-post-sharing', '.td-post-sharing-bottom', '.td-with-like', '.detail-content .metas', '.breadcrumb',
  '.page-title-content', '.tagcloud', 'nav#ftwp-contents', 'button#ftwp-trigger', '.box-comments', '.post-tags', '.meta-post',
  '.kk-star-ratings', 'p.has-text-align-right', '.wp-block-separator', '.placeholder-dproduct', '.infoprod'

];

export const ELM_UL = [
  '.box-desc ul',
];

export const ELM_TRASH_PARENT = [
  // {elm: '.detail-content div > a > img', parent: 'div', source: 'bizflycloud.vn'},
];