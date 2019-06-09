// tools
const path = require('path')
const gulpDel = require('del')

// gulp
const {src, dest, series, parallel, watch} = require('gulp')

// webservere
const gulpWebserver = require("gulp-webserver")
const proxy = require('http-proxy-middleware')

// js
const webpackStream = require('webpack-stream')

// sass
const gulpSass = require('gulp-sass')


function copyHtml(){
    return src('./*.html')
        .pipe(dest('./dev'))
}

function copyLibs(){
    return src('./src/libs/**/*')
        .pipe(dest('./dev/libs'))
}

function copyImages(){
    return src('./src/images/**/*')
        .pipe(dest('./dev/images'))
}

function copyIcons(){
    return src('./src/icons/**/*')
        .pipe(dest('./dev/icons'))
}

function webServer(){
    return src('./dev')
        .pipe(gulpWebserver({
             port:8000,
             livereload:true,
             open:true,
             middleware:[
                 proxy('/api',{
                     target:"http://flgo.cuishifeng.cn/index.php?r=index/ajaxnew&page=1",
                     changeOrigin:true,
                     pathRewrite:{'^/api':''}
                 })
             ]
        }))
}

function packJS(){
    return src('./src/**/*')
        .pipe(webpackStream({
            mode:'development',
            entry:{
                app:'./src/app.js',
            },
            output:{
                filename:'[name].js',
                path:path.resolve(__dirname,'./dev')
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
        .pipe(dest('./dev/scripts'))
}

function packCSS(){
    return src('./src/styles/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(dest('./dev/styles'))
}

function clear(target){
    return function(){
        return gulpDel(target)
    }
}

function watcher(){
    // libs 的监听
    watch('./src/libs/**/*',series(clear('./dev/libs'),copyLibs))
    // images 的监听
    watch('./src/images/**/*',series(clear('./dev/libs'),copyImages))
    // iconsfont 的监听
    watch('./src/icons/**/*',series(clear('./dev/icons'),copyIcons))
    // hmtl文件的监听
    watch('./*.html',series(clear('./dev/*.html'),copyHtml))
    // sass文件的监听
    watch('./src/styles/**/*',series(clear('./dev/styles'),packCSS))
    // js文件的监听
    watch(['./src/**/*.js','./src/views/*.html','!src/libs/**/*'],series(packJS))
}

exports.default = series(parallel(copyLibs,copyImages,copyIcons,packJS,packCSS),copyHtml,webServer,watcher)
