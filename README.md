# TOPページ（別リポジトリ用）

## 公開のしかた（GitHub Pages）
1. GitHubで新しいリポジトリを作る。名前を「ユーザー名.github.io」にすると、https://ユーザー名.github.io/ がそのままTOPページになる
2. このフォルダの中身を、リポジトリの一番上に置いてpushする
3. Settings → Pages → Source を「Deploy from a branch」、Branch を「main」「/(root)」にする
   （ビルドは不要。ブログのような Actions の設定は要りません）

## 書き換えるのは config.js だけ
- 名前・サークル名・キャッチコピー・自己紹介・作品・リンクは全部 config.js に書く
- url が空の項目は、自動で表示されない（リンクが無い作品は、押せないカードになる）
- 画像は images/ に置く
    images/logo.png       ヘッダーのロゴ（無ければ名前の文字）
    images/icon.png       「私について」の丸いアイコン（無ければ頭文字）
    images/works/〇〇.jpg  作品カードの画像（16:9で表示）

## ブログとつなぐ
- config.js の blog に、ブログのURLを入れる
    blog: "https://ユーザー名.github.io/ブログのリポジトリ名/"
  → 「雑記」の欄に、ブログの最新記事（既定は3件）が自動で出る。記事を書くたびに、こちらも自動で更新される
  → test や private が名前に入った記事は出ない
- ブログ側の blog.js の SITE.home に、このTOPページのURLを入れると、ブログのロゴを押したときにTOPへ戻れる

## 作品ページ（home.html）とつなぐ
- 作品ページを別のリポジトリで公開したら、そのURLを config.js の works の url に入れる
