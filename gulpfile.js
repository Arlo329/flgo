const {src, dest, series, parallel, watch} = require('gulp')
const gulpWebserver = require("gulp-webserver")
const proxy = require('http-proxy-middleware')
const webpackStream = require('webpack-stream')
const path = require('path')

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
                    
                    }
                ]
            }
        }))
        .pipe(dest('./dev/scripts'))
}

function packCSS(){

}

function clear(){

}

function watcher(){

}

exports.default = series(parallel(copyLibs,copyImages,copyIcons,packJS),copyHtml,webServer)
