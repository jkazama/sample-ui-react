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
    - Windows ユーザは 「 npm install --msvs_version=2013 」 。理由は後述

---

標準で利用想定の [BrowserSync](http://www.browsersync.io/) は LiveReload よりも同期が早く開発生産性に大きく寄与しますが、 Windows ユーザの場合は [Python2.7](https://www.python.org/) と [Visual Studio 2013 Update N](https://www.visualstudio.com/downloads/download-visual-studio-vs) のインストールが必須となります。  
*※ `Express 2013 for Desktop` を推奨します。 ( 手元で試したところ `Community 2015` では正しく動きませんでした ) *

### 動作確認

動作確認は以下の手順で行ってください。

1. clone した [sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate) を起動する。
    - 起動方法は該当サイトの解説を参照
    - application.yml の `extension.security.auth.enabled` を true にして起動すればログイン機能の確認も可能
1. コンソールで本ディレクトリ直下へ移動し、 「 `gulp` 」 を実行
    - 確認用のブラウザが自動的に起動する。うまく起動しなかったときは 「 http://localhost:3000 」 へアクセス
    - 画面が白く表示されてしまう時はブラウザの更新を押してみてください
        - webpack のビルドが間に合っていない可能性が高いため

### 開発の流れ

基本的にテンプレート ( .jade / .scss / .js ( ES6 ) ) を Web リソース ( .html / .css / .js ) へ Gulp / Webpack でリアルタイム変換させながら開発をしていきます。  
動作確認は Gulp で独自に Web サーバを立ち上げた後、ブラウザ上で行います。  

#### 各種テンプレートファイルの解説

- [Jade](http://jade-lang.com/)
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
    - bundler.js                     … from source/js (by Webpack)
    - vendor.js                      … from vendor dist resource
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
| `superagent`              | 1.7.+    | HTTP 連携ライブラリ |
| `react`　　　　　　　　　　　　　　  | 0.14.+    | アプリケーションの UI 機能を提供 |
| `react-dom`　　　　　　　　　　  | 0.14.+    | アプリケーションの UI 機能 ( DOM ) を提供 |
| `react-router`           | 0.13.+    | React.js の SPA ルーティングサポート |
| `react-mixin`             | 3.0.+    | Reactクラス利用時のMixin拡張 |
| `wolfy87-eventemitter`   | 4.3.+     | イベント連携ライブラリ |
| `flux`                   | 2.1.+     | Facebook Flux ライブラリ |
| `lodash` 　　　　　　　　　　　　  | 4.6.+    | 汎用ユーティリティライブラリ |
| `dateformat`　　　　　　　　　  | 1.0.+    | 日時ライブラリ |
| `jquery`                | 2.2.+     | DOM 操作サポート |
| `bootstrap-sass`         | 3.3.+    | CSS フレームワーク |
| `fontawesome`             | 4.5.+    | フォントアイコンライブラリ |

### License

本サンプルのライセンスはコード含めて全て *MIT License* です。  
プロジェクト立ち上げ時のベース実装サンプルとして気軽にご利用ください。
