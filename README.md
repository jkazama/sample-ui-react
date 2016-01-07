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
        - webpackのビルドが間に合っていない可能性が高いため

### 開発の流れ

基本的にテンプレート(.jade/.scss/.js(ES6))をWebリソース(.html/.css/.js)へGulp/Webpackでリアルタイム変換させながら開発をしていきます。
動作確認はGulpで独自にWebサーバを立ち上げた後、ブラウザ上で行います。  

#### 各種テンプレートファイルの解説

- [Jade](http://jade-lang.com/)
    - HTMLを生成するテンプレートツール。公式サイトTOPにある簡素な記法が特徴。
- [Sass (SCSS)](http://sass-lang.com/)
    - CSS表記を拡張するツール。変数やmixin、ネスト表記などが利用可能。
- [ES6 with Babel](https://babeljs.io/)
    - ES6用のPolyfill。ES5でもES6風に記述が可能。

#### 各種テンプレートファイルの変更監視 / Webサーバ起動

+ コンソールで本ディレクトリ直下へ移動し、「`gulp`」を実行

### 配布用ビルドの流れ

配布リソース生成の流れは開発時と同様ですが、監視の必要が無いことと、配布リソースに対するminifyやrevisonの付与などを行う必要があるため、別タスク（build-prod）で実行します。

#### 配布用Webリソースのビルド / リリース

+ コンソールで本ディレクトリ直下へ移動し、「`gulp build-prod`」を実行
+ `public`ディレクトリ直下に出力されたファイルをリリース先のディレクトリへコピー

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
    - Fluxの良い実装が出てきたら自作せずにそちらを利用する

#### ディレクトリ構成

ディレクトリ構成については以下を参照してください。

```
bower.json                           …　bowerが利用するライブラリ定義
gulpfile.coffee                      … gulp実行時に利用されるビルドファイル
package.json                         …　node.jsがgulp実行時に利用するライブラリ定義
public                               … 配布公開リソース(自動生成)
  css                                … CSS
    - style.css                      … source/css直下のリソース
  fonts                              …　アイコンフォント
  js                                 …　JavaScript(ES5)
    - bundler.js                     … source/js直下のリソース(Webpackで生成)
    - vendor.js                      … Bower経由の外部JSライブラリ
  index.html                         … source/html直下のリソース
source
  css                                … CSSテンプレートファイル(SCSS)
  html                               …　HTMLテンプレートファイル(Jade)
  js
    actions                          … Flux ActionCreators
    components                       … React Component
    constants
    dispatcher                       … Flux Dispatcher
    platform
      - plain.js                     … プロジェクト内ライブラリ(依存無)
      - react-flux.js                … Flux簡易実装
      - react-ui.js                  … UIパーツに特化した React Component
      - react.js                     … React Component のプロジェクト拡張
    stores                           … Flux Store
    templates                        … Jade to JSX
    - app.js                         … ルートページ定義
    - main.js                        … SPAにおけるEntryファイル
    - routes.js                      … SPAルーティング定義
  static                             … 画像等コンパイル不要な静的リソースファイル
```

※gulpコマンドを実行して変更監視を有効にしておくと、source配下のリソースを修正すると、リアルタイムでpublic直下のファイルが更新されていきます。

### 依存ライブラリ

| ライブラリ               | バージョン | 用途/追加理由 |
| ----------------------- | -------- | ------------- |
| `react`　　　　　　　　　　　　　　  | 0.14.+    | アプリケーションのUI機能を提供 |
| `react-router`           | 0.13.+    | React.jsのSPAルーティングサポート |
| `eventEmitter`           | 4.3.+     | イベント連携ライブラリ |
| `flux`                   | 2.1.+     | Facebook Fluxライブラリ |
| `lodash` 　　　　　　　　　　　　  | 3.10.+    | 汎用ユーティリティライブラリ |
| `moment` 　　　　　　　　　　　　  | 2.11.+    | 日時ライブラリ |
| `bootstrap-sass-official` | 3.3.+    | CSSフレームワーク |
| `bootstrap-datepicker`    | 1.4.+    | 日時入力ライブラリ |
| `fontawesome`             | 4.5.+    | フォントアイコンライブラリ |
| `superagent` [npm]        | 1.4.+    | HTTP連携ライブラリ |
| `react-mixin` [npm]       | 3.0.+    | Reactクラス利用時のMixin拡張 |

### License

本サンプルのライセンスはコード含めて全て*MIT License*です。  
プロジェクト立ち上げ時のベース実装サンプルとして気軽にご利用ください。
