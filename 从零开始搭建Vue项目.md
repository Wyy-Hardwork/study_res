## 使用Web逐一手动搭建Vue项目
1. 安装依赖，如vue、element-ui、aixos、less等
2. 安装webpack webpack-cli -D，用于打包文件
3. 安装loader，比如vue-loader、vue-template-compiler、less-loader 、css-loader、style-loader、babel-loader、@babel/core、@bable/preset-env，都有用，缺一不可。
4. 以下是我的webpack搭建vue项目的配置： 
```javascript
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
module.exports={
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: [
                  'vue-loader',
                ],
            },
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.m?js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: 'asset',
                //小于10kb图片转base64
                parser:{
                    dataUrlCondition:{
                        maxSize:10*1024 //10kb
                    }
                },
                generator: {
                    //输出的图片路径/名称(哈希 拓展名 )
                    filename: 'static/images/[hash:10][ext][query]'
                }
              },
              {
                test: /\.(woff2?|ttf)/,
                //asset针对图片
                type: 'asset/resource',
                generator: {
                    //输出的图片路径/名称(哈希 拓展名 )
                    filename: 'static/media/[hash:10][ext][query]'
                }
              }
        ],
    },
    plugins:[
        new VueLoaderPlugin(),
    ],
    mode:'production'
}
```
5. 以下是main.js默认的入口配置
```javascript
import Vue from 'vue';
import App from './App.vue'

new Vue({
    el:'#app',
    render:(h)=>{
        return h(App)   
    }
})
```