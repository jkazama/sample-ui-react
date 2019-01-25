const root = {
  src:   `${__dirname}/source`,
  dist:  `${__dirname}/public`,
  tmp:   `${__dirname}/tmp`
}

const paths = {
  src: {
    root: `${root.src}`,
    html: `${root.src}/html`,
    js:   `${root.src}/js`,
    css:  `${root.src}/css`,
    static: `${root.src}/static`
  },
  dist: {
    root: `${root.dist}`,
    js:   `${root.dist}/js`,
    css:  `${root.dist}/css`
  },
  node: {
    modules: `${__dirname}/node_modules`
  }
}
const resource = {
  src: {
    pug: `${paths.src.html}/**/*.pug`,
    webpack: {
      babel: `${paths.src.js}/**/*.(js|jsx)`
    },
    sass:   `${paths.src.css}/**/*.s+(a|c)ss`,
    static: `${paths.src.static}/**/*`
  },
  vendor: {
    js: ['lodash', 'dateformat', 'react', 'react-dom', 'react-redux', 'redux', 'react-router', '@material-ui/core']
  }
}

import gulp from 'gulp'
import gulpLoaderPlugins from 'gulp-load-plugins'
import del from 'del'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import runSequence from 'run-sequence'
import browserSyncTool from 'browser-sync'
import RevAll from 'gulp-rev-all'

const $ = gulpLoaderPlugins()
const browserSync = browserSyncTool.create()

let production = false

// build and watch for developer
gulp.task('default', ['build', 'server'])

//## build for developer
gulp.task('build', (callback) =>
  runSequence('clean', ['build:pug', 'build:sass', 'build:static', 'build:webpack'], callback)
)

//## build production
gulp.task('build-prod', (callback) => 
  runSequence('production', 'build', 'revision', callback)
)

// clean dist
gulp.task('clean', () =>
  del.sync([`${paths.dist.root}/*`, `!${paths.dist.root}/.git*`], { force: true })
)

// production option
gulp.task('production', () => production = true )

// support Resource Revision
gulp.task('revision', (callback) =>
  runSequence('revision:clean', 'revision:append', 'clean', 'revision:copy', 'revision:clean', callback)
)

// compile Webpack [ ES201x(Babel) / Vue -> SPA(main.js) ]
gulp.task('build:webpack', () => {
  process.env.NODE_ENV = production ? 'production' : 'development'
  const plugins = [
    new webpack.ProvidePlugin({ jQuery: "jquery", $: "jquery" }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  ]
  return gulp.src(resource.src.webpack.babel)
    .pipe($.plumber())
    .pipe(webpackStream({
      mode: process.env.NODE_ENV,
      devtool: production ? false : '#source-map',
      entry: {
        main: `${paths.src.js}/main.js`,
        vendor: resource.vendor.js
      },
      output: { filename: '[name].bundle.js' },
      optimization: {
        splitChunks: { name: 'vendor', chunks: 'initial' },
        noEmitOnErrors: true,
      },
      watch: !production,
      module: {
        rules: [
          { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
        ]
      },
      resolve: {
        modules: [paths.src.js, 'node_modules'],
        extensions: ['*', '.js', ".jsx"],
        alias: {
          constants: `${paths.src.js}/constants`,
        }
      },
      plugins: plugins
     }, webpack))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())  
})

// compile Pug -> HTML
gulp.task('build:pug', () => {
  return gulp.src(resource.src.pug)
    .pipe($.plumber())
    .pipe($.pug())
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.stream())  
})

// compile Sass -> CSS
gulp.task('build:sass', () => {
  return gulp.src(resource.src.sass)
    .pipe($.plumber())
    .pipe($.concat('style.css'))
    .pipe($.sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
})

// copy Static Resource
gulp.task('build:static', () => {
  return gulp.src(resource.src.static)
    .pipe(gulp.dest(paths.dist.root))
})

// run Development Web Server (BrowserSync) [localhost:3000]
gulp.task('server', () => {
  browserSync.init({
    server: {baseDir: paths.dist.root},
    notify: false
  })
  // watch for source
  gulp.watch(resource.src.pug,   ['build:pug'])
  gulp.watch(resource.src.sass,   ['build:sass'])
  gulp.watch(resource.src.static, ['build:static'])
})

// append Resource Revision
gulp.task('revision:clean', () =>
  del.sync([root.tmp], { force: true })
)

gulp.task('revision:append', () => {
  return gulp.src(`${paths.dist.root}/**/*`)
    .pipe(RevAll.revision({dontRenameFile: [/^\/favicon.ico$/g, '.html']}))
    .pipe(gulp.dest(root.tmp))
})

gulp.task('revision:copy', () => {
  return gulp.src(`${root.tmp}/**/*`)
    .pipe(gulp.dest(paths.dist.root))
})
