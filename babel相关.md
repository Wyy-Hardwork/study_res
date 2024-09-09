## Babel
### 概括
Babel 是一个广泛使用的 JavaScript 编译器，用于将新版本的 JavaScript 代码转换为向后兼容的旧版本。它是一个开源工具，可以帮助开发者在不同的环境中使用最新的 JavaScript 特性，同时保持跨浏览器和跨平台的兼容性。

以下是一些关键的特点和功能：

语法转换：Babel 可以将使用最新 ECMAScript 标准定义的语法转换为向后兼容的版本，使其可以运行在不支持这些语法的环境中。例如，它可以将 ES6 的箭头函数、模板字符串等转换为 ES5 的函数表达式和字符串拼接。

插件系统：Babel 的插件系统允许开发者根据自己的需求进行定制。你可以选择安装和配置各种插件，以实现特定的转换或功能。例如，你可以使用插件来转换 JSX、处理装饰器语法或进行类型检查。

Polyfill 支持：Babel 提供了对新的 JavaScript API 和全局对象的兼容性支持。通过使用相应的 polyfill，可以在旧版本的浏览器中模拟这些新功能。这样，开发者可以在不同环境中使用最新的 API，而无需担心兼容性问题。

智能缓存：Babel 支持智能缓存，可以根据文件内容进行缓存，以提高编译速度。这意味着只有在文件发生更改时才需要重新编译，从而节省了开发时间。

命令行工具和构建工具集成：Babel 提供了命令行工具和与其他构建工具（如 webpack、Gulp）的集成，使其可以无缝地与现有的工作流程集成。开发者可以轻松地配置和使用 Babel，以满足项目的需求。

总之，Babel 是一个强大的 JavaScript 编译器，可以帮助开发者在不同的环境中使用最新的 JavaScript 特性，并保持向后兼容性。它的灵活性和可定制性使其成为现代 JavaScript 开发中的重要工具。

## 在自建项目中尝试使用antd 1.7
1. 新建babel.config.js文件，位置和webpack同级
```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "lib",
        style: "css",
      },
    ],
  ],
}
```
2. 安装相关依赖
```javascript
core-js babel-plugin-import less-loader ant-design-vue@1.7
```
列举一部分重要的

3. webpack也需要配置
```javascript
           {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
```
4. main.js文件中按需引入即可，例如
```javascript
import {Button} from 'ant-design-vue'

Vue.use(Button)
```
5. 蚂蚁的一般是\<a-button>的形式，大概是这样。


