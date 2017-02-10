sample-ui-react
---

### はじめに

[BootStrap](http://getbootstrap.com/) / [React.js](https://facebook.github.io/react/) を元にしたプロジェクト Web リソース ( HTML / CSS / JS ) です。 SPA ( Single Page Application ) モデルを前提としています。  

サンプル確認用の API サーバとして [sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate) を期待します。

`※ライブラリではなく上記ライブラリを用いた単純な実装サンプルです。`

#### ビルド/テスト稼働環境構築

ビルドは [Node.js](http://nodejs.jp/) + [Webpack](https://webpack.github.io/) + [Gulp](http://gulpjs.com/) で行います。以下の手順でインストールしてください。

1. Node.js の[公式サイト](http://nodejs.jp/)からインストーラをダウンロードしてインストール。
1. 「 `npm install -g gulp` 」 を実行して Gulp をインストール。
    - Mac ユーザは 「 `sudo npm install -g gulp` 」 で。
1. コンソールで本ディレクトリ直下へ移動後、 「 `npm install` 」 を実行して Gulp ライブラリをインストール。
    - node-sass あたりでビルドに失敗した場合は、 「 `npm uninstall node-sass` 」 を実行してから再度試してみてください。

### 動作確認

動作確認は以下の手順で行ってください。

1. clone した [sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate) を起動する。
    - 起動方法は該当サイトの解説を参照
    - application.yml の `extension.security.auth.enabled` を true にして起動すればログイン機能の確認も可能
1. コンソールで本ディレクトリ直下へ移動し、 「 `gulp` 」 を実行
    - 確認用のブラウザが自動的に起動する。うまく起動しなかったときは 「 http://localhost:3000 」 へアクセス

### 開発の流れ

基本的にテンプレート ( .pug / .scss / .js ( ES6 ) ) を Web リソース ( .html / .css / .js ) へ Gulp / Webpack でリアルタイム変換させながら開発をしていきます。  
動作確認は Gulp で独自に Web サーバを立ち上げた後、ブラウザ上で行います。  

#### 各種テンプレートファイルの解説

- [Pug](https://github.com/pugjs/pug)
    - HTML を生成するテンプレートツール。公式サイト TOP にある簡素な記法が特徴。
- [Sass (SCSS)](http://sass-lang.com/)
    - CSS 表記を拡張するツール。変数や mixin 、ネスト表記などが利用可能。
- [ES6 with Babel](https://babeljs.io/)
    - ES6 用の Polyfill 。 ES5 でも ES6 風に記述が可能。

#### 各種テンプレートファイルの変更監視 / Web サーバ起動

+ コンソールで本ディレクトリ直下へ移動し、 「 `gulp` 」 を実行

### 配布用ビルドの流れ

配布リソース生成の流れは開発時と同様ですが、監視の必要が無いことと、配布リソースに対する minify や revison の付与などを行う必要があるため、別タスク （ build-prod ） で実行します。

#### 配布用 Web リソースのビルド / リリース

+ コンソールで本ディレクトリ直下へ移動し、 「 `gulp build-prod` 」 を実行
+ `public` ディレクトリ直下に出力されたファイルをリリース先のディレクトリへコピー

### ポリシー

- JS / CSS の外部ライブラリは npm で管理する
    - jQuery や Bootstrap 等、グローバルスコープの汚染を許容するものはビルド済みリソースをそのまま流用する
- プロジェクト固有の JS は Webpack を利用して生成する
    - グローバルスコープの汚染を許容せずにモジュールベースで開発する
- React は Flux のアーキテクチャを参考に実装する
    - ページ遷移周りは react-router を利用
    - React コンポーネントは ES6 のクラスベースで実装 ( see /js/platform/react.js )
    - Flux は Facebook のサンプルを参考にしつつ実装 ( see /js/platform/react-flux.js )
    - いくつか代表的な UI パーツは準備 ( see /js/platform/react-ui.js )
    - Flux の良い実装が出てきたら自作せずにそちらを利用する

#### ディレクトリ構成

ディレクトリ構成については以下を参照してください。

```
gulpfile.babel.js                    … gulp configuration
package.json                         … npm dependency
public                               … deploy resources (auto generate)
  css
    - style.css                      … from source/css
  fonts                              … icon font
  js
    - bundle.js                      … from source/js (by Webpack)
    - vendor.bundle.js               … from vendor dist resource
  index.html                         … from source/html
source
  css                                … css template files  [SCSS]
  html                               … html template files [Jade]
  js
    actions                          … flux actionCreators
    components                       … react component
    constants
    dispatcher                       … flux dispatcher
    platform
      - plain.js                     … simple js library
      - react-flux.js                … react flux implementation (simple)
      - react-ui.js                  … react ui parts
      - react.js                     … project react extension
    stores                           … flux store
    - app.js                         … root page
    - main.js                        … SPA entry
    - routes.js                      … SPA routing
  static                             … static resources (.png/.ico/robots.txt etc)
```

※ gulp コマンドを実行して変更監視を有効にしておくと、 source 配下のリソースを修正した際にリアルタイムで public 直下のファイルが更新されていきます。

### 依存ライブラリ

| ライブラリ               | バージョン | 用途/追加理由 |
| ----------------------- | -------- | ------------- |
| `superagent`             | 2.3.+    | HTTP 連携ライブラリ |
| `react`　　　　　　　　　  | 15.4.+    | アプリケーションの UI 機能を提供 |
| `react-dom`　　　　　　　  | 15.4.+    | アプリケーションの UI 機能 ( DOM ) を提供 |
| `react-router`           | 3.0.+    | React.js の SPA ルーティングサポート |
| `react-mixin`             | 3.0.+    | Reactクラス利用時のMixin拡張 |
| `wolfy87-eventemitter`   | 5.1.+     | イベント連携ライブラリ |
| `flux`                   | 3.1.+     | Facebook Flux ライブラリ |
| `lodash` 　　　　　　　　  | 4.17.+    | 汎用ユーティリティライブラリ |
| `dateformat`　　　　　　  | 2.0.+    | 日時ライブラリ |
| `jquery`                 | 3.1.+     | DOM 操作サポート |
| `bootstrap-sass`         | 3.3.+    | CSS フレームワーク |
| `fontawesome`            | 4.6.+    | フォントアイコンライブラリ |

### License

本サンプルのライセンスはコード含めて全て *MIT License* です。  
プロジェクト立ち上げ時のベース実装サンプルとして気軽にご利用ください。
