// tools
const path = require('path')

// gulp
const {src, dest, series, parallel} = require('gulp')

// 图片
const imagemin = require('gulp-imagemin')

// js
const webpackStream = require('webpack-stream')

// sass
const gulpSass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css');

// 版本管理
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

function copyHtml(){
    return src('./*.html')
        .pipe(dest('./dist'))
}

function copyLibs(){
    return src('./src/libs/**/*')
        .pipe(dest('./dist/libs'))
}

function copyImages(){
    return src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(dest('./dist/images'))
}

function copyIcons(){
    return src('./src/icons/**/*')
        .pipe(dest('./dist/icons'))
}

function packJS(){
    return src('./src/**/*')
        .pipe(webpackStream({
            mode:'production',
            entry:{
                app:'./src/app.js',
            },
            output:{
                filename:'[name].js',
                path:path.resolve(__dirname,'./dist')
            },
            module:{
                rules:[
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        use:{
                            loader:'babel-loader',
                            options:{
                                presets:['@babel/preset-env'],
                                plugins:['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test:/\.html$/,
                        loader:'string-loader'  
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(dest('./dist/scripts'))
        .pipe(rev.manifest())
        .pipe(dest('./rev/scripts'))
}

function packCSS(){
    return src('./src/styles/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(cleanCSS({compatibility:'ie8'}))
    .pipe(rev())
    .pipe(dest('./dist/styles'))
    .pipe(rev.manifest())
    .pipe(dest('./rev/styles'))
}

function revColl() {
    return src(['./rev/**/*.json', './dist/*.html'])
      .pipe(revCollector())
      .pipe(dest('./dist'))
  }

exports.default = series(parallel(copyLibs,copyImages,copyIcons,packJS,packCSS),copyHtml,revColl)
