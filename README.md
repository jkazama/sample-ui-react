sample-ui-react
---

### はじめに

[BootStrap](http://getbootstrap.com/) / [React.js](https://facebook.github.io/react/) を元にしたプロジェクトWebリソース(HTML/CSS/JS)です。SPA(Single Page Application)モデルを前提としています。  

サンプル確認用のAPIサーバとして[sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate)を期待します。

`※ライブラリではなく上記ライブラリを用いた単純な実装サンプルです。`

#### ビルド/テスト稼働環境構築

ビルドは [Node.js](http://nodejs.jp/) + [Webpack](https://webpack.github.io/) + [Gulp](http://gulpjs.com/) で行います。以下の手順でインストールしてください。

1. Node.js の[公式サイト](http://nodejs.jp/)からインストーラをダウンロードしてインストール。
1. 「`npm install -g gulp`」を実行してGulpをインストール。
    - Macユーザは「`sudo npm install -g gulp`」で。
1. コンソールで本ディレクトリ直下へ移動後、「`npm install`」を実行してGulpライブラリをインストール。
    - Windowsユーザは「npm install --msvs_version=2013」。理由は後述
1. 「`gulp bower`」を実行してアプリケーションで利用する関連ライブラリをプリインストール。

---

標準で利用想定の[BrowserSync](http://www.browsersync.io/)はLiveReloadよりも同期が早く開発生産性に大きく寄与しますが、Windowsユーザの場合は[Python2.7](https://www.python.org/)と[Visual Studio 2013 Update N](https://www.visualstudio.com/downloads/download-visual-studio-vs)のインストールが必須となります。  
*※`Express 2013 for Desktop`を推奨します。(手元で試したところ`Community 2015`では正しく動きませんでした)*

### 動作確認

動作確認は以下の手順で行ってください。

1. cloneした[sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate)を起動する。
    - 起動方法は該当サイトの解説を参照
    - application.ymlの`extension.security.auth.enabled`をtrueにして起動すればログイン機能の確認も可能
1. コンソールで本ディレクトリ直下へ移動し、「`gulp`」を実行
    - 確認用のブラウザが自動的に起動する。うまく起動しなかったときは「http://localhost:3000」へアクセス
    - 画面が白く表示されてしまう時はブラウザの更新を押してみてください

### 開発の流れ

基本的にAltリソース(.jade/.scss/.js)をWebリソース(.html/.css/.js)へGulpでリアルタイム変換させながら開発をしていきます。
動作確認はGulpで独自にWebサーバを立ち上げた後、ブラウザ上で行います。  

#### Altリソースの解説

Altリソースの考え方や記法については以下を参照してください。

- [Jade](http://jade-lang.com/)
- [Sass (SCSS)](http://sass-lang.com/)
- [ES6 with Babel](https://babeljs.io/)

#### Altリソースの変更監視 / Webサーバ起動

+ コンソールで本ディレクトリ直下へ移動し、「`gulp`」を実行

### ポリシー

- JS/CSSの外部ライブラリはbowerで管理する
    - グローバルスコープの汚染を許容する
    - bowerが適切なサポートを提供していない時はpackage.json経由の管理(bundler.js側に展開)も許容
- プロジェクト固有のJSはWebpackを利用して生成する
    - グローバルスコープの汚染を許容せずにモジュールベースで開発する
    - 外部ライブラリのアクセスは従来通りグローバルな名前空間を用いる
- ReactはFluxのアーキテクチャを参考に実装する
    - ページ遷移周りはReactRouterを利用
    - ReactコンポーネントはES6のクラスベースで実装(see /js/platform/react.js)
    - FluxはFacebookのサンプルを参考にしつつ実装(see /js/platform/react-flux.js)
    - JSXはjade(templates)へ切り出してreact-jade経由で読込アプローチ(ここはベタ書きでも良いかも)
    - いくつか代表的なUIパーツは準備(see /js/platform/react-ui.js)

### TODO

- ドキュメント/コメント記載
