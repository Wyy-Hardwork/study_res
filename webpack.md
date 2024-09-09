# Webpack学习记录
### 初窥门径
- 导入可以省略js后缀名
- public存放恒久不变的资源，与src同级
- ES6模块化在浏览器是不被支持的，这里就需要webpack了
- npm init -y，输出包描述文件
- npm i webpack webpack-cli -D，开发时才使用的到打包工具，-D表示开发时使用的依赖，打包正式上线时不会用到；在配置项的dependencies可以找到。
```javascript
npx webpack --mode=development ./src/main.js
```
npx可以帮助临时地运行某个包的命令，避免全局安装之类的。
```javascript
npx webpack ./src/main.js --mode=production
```
这个是生产模式下的打包，目的和上一个代码一样，但是压缩了代码，提高了性能。
- 开发模式下webpack仅仅编译模块化语法，形如箭头函数之类的语法是不会编译的。
- 上述两行npx webpack代码都是在没有配置webpack.config的情况下执行的。
- 很多代码打包后都是经过运算的，这使得项目性能得以提升。
## webpack五大基本配置
- entry：指示Webpack打包的目标文件
- output：指示Webpack打包完文件输出到什么位置，如何命名等
- loader(加载器)：Webpack本身只能处理js、json等资源，其他资源需要借助loader才能解析
- plugins(插件)：拓展Webpack功能
- mode：主要分development和production两种模式。
### webpack.config.js配置
- 位置在根目录，与node_modules同级
- output配置对象的path需要绝对路径，可以利用node的path来辅助完成。 
```javascript
const path = require('path');
path: path.resolve(__dirname, 'dist')
```
- 配置妥善后执行npx webpack即可实现项目打包
- 由于webpack只能处理js，其他形如css的地方就要用到loader了。webpack-loader中文文档https://www.webpackjs.com/loaders
### loader中的各种处理(资源模块asset)
- Webpack5已经把file-loader和url-loader内置了
- 可以用内置loader把体积较小的图片转化为base64格式，以此减小请求数量
 ```javascript
  module: {
    rules: [
       {
        test: /\.(png|jpe?g|gif|webp|svg)/,
        type: 'asset',
        //小于10kb图片转base64
        //减少请求，但是体积会更大
        parser:{
            dataUrlCondition:{
                maxSize:10*1024 //10kb
            }
        },
        generator: {
            //输出的图片路径/名称(哈希 拓展名 )
            filename: 'static/images/[hash][ex[query]'
        }
        }
    ]
  },
 ```
- [hash:10]代表哈希值只取十位，自由设定，避免哈希值过长
- generator可以指定文件的输出路径已经文件名
- 在output配置clean:true可以避免重复打包时，需要手动删除旧的打包文件

### 在Webpack中阿里iconfont的使用
- 添加到项目后下载，将压缩包内iconfont.css文件以及其所需要的文件都加入到项目中，按教程操作即可。后续webpack中配置loader的generator来控制输出文件位置
- 在loader内，type: 'asset' 会根据文件大小自动选择转换方式，小文件会被转换为 Data URL，大文件会被保留为单独的文件(图片根据大小转base64)；而 type: 'asset/resource' 则始终将文件作为独立的资源输出到输出目录中(woff和ttf文件)。
- 以此类推，除了图片需要用到base64来减少请求次数，其他类型的文件都需要'asset/resource'来保证文件传输，善用test的正则来筛选文件，比如视频，docx等等。
