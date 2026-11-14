/* ★ ここだけ書き換えればOK（URLが空の項目は自動で表示されません） */
const SITE = {
  name: "オト",                         // 名前
  circle: "オトヒバ",                   // サークル名（トップの大きい文字にも使う）
  tagline: "無名のゆっくり実況者が主宰する個人サークルです",   // トップの一言
  logo: "images/logo.png",              // ヘッダーのロゴ画像（無ければ名前の文字が出る）
  icon: "images/icon.png",              // 「私について」のアイコン（無ければ頭文字の丸）

  blog: "https://0t0784.github.io/blog/",                             // ブログのURL 例: "https://ユーザー名.github.io/ブログのリポジトリ名/"（空なら雑記の欄は出ない）
  latest: 3,                            // 雑記に出す最新記事の数

  about: {
    lead: "知る人ぞ知るほどにも知られていないクリエイター",
    items: [                            // [項目, 内容] を好きなだけ
      ["名前", "オト（0to784）"],
      ["サークル", "オトヒバ"],
      ["活動", "作曲・プログラミングetc…"]
    ]
  },

  works: [                              // 作品・活動のカード（url が空なら押せないカードになる）
    {
      title: "牛屎院風土記 ～ Unknown Chronicles of Hidden Land.",
      desc: "東方Projectの二次創作を含む、2枚組のオリジナルサウンドトラック。",
      url: "",                          // 作品ページのURL（home.html を置いたサイト）
      img: "images/works/soundtrack.jpg",   // 16:9で表示される
      date: "2026.11.21",
      tags: ["音楽"]
    }
  ],

  links: [                              // リンク集（url が空なら出ない）
    { label: "X (Twitter)", url: "https://x.com/0to784" },
    { label: "YouTube",     url: "https://m.youtube.com/@0to784" },
    { label: "Mail",      url: "" }
  ],

  notice: "一部作品は東方Projectの二次創作です。無断転載はご遠慮ください。"
};
