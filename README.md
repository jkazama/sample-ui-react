sample-ui-react
---

### はじめに

[Material-UI](http://www.material-ui.com) / [React.js](https://facebook.github.io/react/) / [Redux](https://github.com/reactjs/redux) を元にしたプロジェクト Web リソース ( HTML / CSS / JS ) です。 SPA ( Single Page Application ) モデルを前提としています。  

サンプル確認用の API サーバとして [sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate) を期待します。

`※ライブラリではなく上記ライブラリを用いた単純な実装サンプルです。`

> Flux 風な Redux を利用していますが、純粋な Flux サンプルとは異なる点に注意してください

#### ビルド/テスト稼働環境構築

ビルドは [Node.js](http://nodejs.jp/) + [Webpack](https://webpack.github.io/) + [Gulp](http://gulpjs.com/) + [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) で行います。以下の手順でインストールしてください。

1. Node.js の[公式サイト](http://nodejs.jp/)からインストーラをダウンロードしてインストール。
1. 「 `npm install -g gulp` 」 を実行して Gulp をインストール。
    - Mac ユーザは 「 `sudo npm install -g gulp` 」 で。
1. 「 `npm install -g yarn` 」を実行して Yarn をインストール。
    - Mac ユーザは 「 `sudo npm install -g yarn` 」 で。
    - インストール作業を npm 経由で直接実行する場合は不要です
1. コンソールで本ディレクトリ直下へ移動後、「 `yarn` 」を実行して `package.json` 内のライブラリをインストール
    - Yarn を利用しない時は 「 `npm install` 」 を実行。
    - node-sass あたりでビルドに失敗した場合は、 「 `npm uninstall node-sass` 」 を実行してから再度試してみてください。

### 動作確認

動作確認は以下の手順で行ってください。

1. clone した [sample-boot-hibernate](https://github.com/jkazama/sample-boot-hibernate) を起動する。
    - 起動方法は該当サイトの解説を参照
    - application.yml の `extension.security.auth.enabled` を true にして起動すればログイン機能の確認も可能
1. コンソールで本ディレクトリ直下へ移動し、 「 `gulp` 」 を実行
    - 確認用のブラウザが自動的に起動する。うまく起動しなかったときは 「 http://localhost:3000 」 へアクセス

### 開発の流れ

基本的にテンプレート ( .pug / .scss / .js ( Babel ) ) を Web リソース ( .html / .css / .js ) へ Gulp / Webpack でリアルタイム変換させながら開発をしていきます。  
動作確認は Gulp で独自に Web サーバを立ち上げた後、ブラウザ上で行います。  

#### 各種テンプレートファイルの解説

- [Pug](https://github.com/pugjs/pug)
    - HTML を生成するテンプレートツール。公式サイト TOP にある簡素な記法が特徴。
- [Sass (SCSS)](http://sass-lang.com/)
    - CSS 表記を拡張するツール。変数や mixin 、ネスト表記などが利用可能。
- [Babel](https://babeljs.io/)
    - ES201x 用の Polyfill 。 ES5 でも ES201x 風に記述が可能。

#### 各種テンプレートファイルの変更監視 / Web サーバ起動

+ コンソールで本ディレクトリ直下へ移動し、 「 `gulp` 」 を実行

### 配布用ビルドの流れ

配布リソース生成の流れは開発時と同様ですが、監視の必要が無いことと、配布リソースに対する minify や revison の付与などを行う必要があるため、別タスク （ build-prod ） で実行します。

#### 配布用 Web リソースのビルド / リリース

+ コンソールで本ディレクトリ直下へ移動し、 「 `gulp build-prod` 」 を実行
+ `public` ディレクトリ直下に出力されたファイルをリリース先のディレクトリへコピー

### ポリシー

- JS / CSS の外部ライブラリは npm で管理する
    - ビルド時は vendor.bundle.js へ分割
- プロジェクト固有の JS は Webpack を利用して生成する
- React / Redux はとりあえず以下の方針で
    - ページ遷移周りは react-router / react-router-redux を利用
    - React / Redux の Component 向けにサポートクラスを用意 ( see /js/platform/redux-support.js )
    - Redux Actions 概念をサポートクラスで簡易に ( see /js/platform/redux-action-support.js )
    - グローバルなステートで管理するのは横断的に保持したいもののみに限定
        - 入力や検索結果などの揮発性高いものはローカルなステートで
    - ページルートは container 配下へ配置
        - コンポーネントを進めていく時は component or container のサブディレクトリを掘る感じで
    - スタイル指定は theme.js へ集約
        - material-ui だとクラスベースの指定が負けそうなのでベタに指定

#### ディレクトリ構成

ディレクトリ構成については以下を参照してください。

```
gulpfile.babel.js                    … gulp configuration
package.json                         … npm dependency
yarn.lock                            … yarn semantic versioning
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
  html                               … html template files [Pug]
  js
    actions                          … redux actions
    api                              … server acccess api
    constants
    container                        … redux container component
    platform
      - plain.js                     … simple js library
      - react-support.js             … project react support
      - redux-support.js             … project redux support
      - redux-action-support.js      … project redux actions support
    reducer                          … redux reducer
    - main.js                        … SPA entry
    - routes.js                      … SPA routing
    - theme.js                       … material ui style
  static                             … static resources (.png/.ico/robots.txt etc)
```

※ gulp コマンドを実行して変更監視を有効にしておくと、 source 配下のリソースを修正した際にリアルタイムで public 直下のファイルが更新されていきます。

### 依存ライブラリ

| ライブラリ               | バージョン | 用途/追加理由 |
| ----------------------- | -------- | ------------- |
| `react`　　　　　　　　　  | 16.2.+    | アプリケーションの UI 機能を提供 |
| `react-dom`　　　　　　　  | 16.2.+    | アプリケーションの UI 機能 ( DOM ) を提供 |
| `react-router-dom`        | 4.2.+    | React.js の SPA ルーティングサポート |
| `react-tap-event-plugin`  | 3.0.+    | タップ操作のサポート |
| `redux`                   | 3.7.+     | Flux 風な状態/イベント概念をサポート |
| `react-router-redux`      | 5.0.+     | Redux の状態モデルに対応した react-router |
| `material-ui`             | 0.18.+    | マテリアルデザインな UI ライブラリ |
| `lodash` 　　　　　　　　  | 4.17.+    | 汎用ユーティリティライブラリ |
| `dateformat`　　　　　　   | 3.0.+    | 日時ライブラリ |
| `superagent`              | 3.8.+    | HTTP 連携ライブラリ |

### License

本サンプルのライセンスはコード含めて全て *MIT License* です。  
プロジェクト立ち上げ時のベース実装サンプルとして気軽にご利用ください。
