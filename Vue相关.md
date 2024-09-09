# Vue复习
## install方法
在 Vue.js 中，install 是一个用来安装插件的方法。当我们需要将一个插件作为全局组件、指令、原型方法或者添加一些其它功能时，可以使用 install 方法。

install 方法是一个静态方法，它是在插件对象上定义的，并且需要在调用 Vue.use() 安装插件时被调用。

插件开发者通过在插件对象上定义 install 方法，可以在其中添加插件的功能、注册全局组件或者添加全局指令。

install 方法接受两个参数：
- Vue：Vue 构造函数，可以使用该参数来进行全局扩展或注册组件、指令等。
- options（可选）：一个可选的选项对象，可以用来传递插件的配置参数。
下面是一个示例，展示如何定义和使用 install 方法：
```javascript
// 定义插件对象
const MyPlugin = {};

// 定义插件的 install 方法
MyPlugin.install = function (Vue, options) {
  // 可以在这里添加插件的功能

  // 注册全局组件
  Vue.component('my-component', MyComponent);
  
  // 添加全局指令
  Vue.directive('my-directive', {
    // ...
  });

  // 还可以扩展 Vue 的原型
  Vue.prototype.$myMethod = function () {
    // ...
  };
};

// 使用插件
Vue.use(MyPlugin, { option1: value1, option2: value2 });

```
## Vue.component
Vue.component 是 Vue.js 提供的一个全局方法，用于注册全局组件。通过调用 Vue.component 方法，我们可以在应用程序中全局注册组件，然后在任何地方使用这些组件。

Vue.component 接受两个参数：组件名称和组件选项对象。

组件名称是一个字符串，用于表示组件在模板中的自定义标签名。例如，如果我们将组件名称设置为 "my-component"，那么该组件在模板中的使用方式就是 <my-component></my-component>。

组件选项对象包含了组件的配置信息，其中最重要的是模板、数据、生命周期钩子函数以及其他选项。在组件选项对象中，我们可以定义组件的各种属性、方法和生命周期钩子，来描述组件的行为和外观。

以下是一个示例，演示了如何使用 Vue.component 注册一个全局组件：
```javascript
// 定义组件选项对象
const MyComponent = {
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello, World!'
    };
  }
};

// 注册全局组件
Vue.component('my-component', MyComponent);

```
在上述示例中，我们首先定义了一个组件选项对象 MyComponent，其中包含了一个简单的模板和一个数据属性 message。

然后，我们通过调用 Vue.component 方法，将组件注册为全局组件。第一个参数是组件名称，这里是 "my-component"；第二个参数是组件选项对象，即 MyComponent。

这样，在整个应用程序的任何地方，我们都可以使用 <my-component></my-component> 标签来引用这个全局注册的组件，并且该组件会渲染出相应的模板内容。

## Vue API
- 
## 风格指南
- 组件名保持多个单词，这样可以避免和未来的HTML标签冲突。公司风格倾向小写单词-隔开，或者两个首字母大写的单词
- 组件的data必须是个函数，return {a:1}
- 提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。例如：
```javascript
props: {
  status: String
}

// 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```
- 总是使用key配合v-for使用
- 避免v-for和v-if同级一起使用，因为v-for的优先级更高。要使用请置v-if于父标签上。例子：
```javascript
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

- 为组件样式设置作用域

对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。

不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 scoped attribute。（然而还是得用scoped）
- 私有Property名

使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，就始终为插件、混入等不考虑作为对外公共 API 的自定义私有 property 使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)。例子：
```javascript
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```
- 组件文件，只要存在拼接的构建系统，那么就把它单独变成一个文件。
- 单文件组件文件名的大小写，单词的话，要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
- 自闭和组件，自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。例如：
```javascript
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>

<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

- 多个attribute元素，多个 attribute 的元素应该分多行撰写，每个 attribute 一行。比如：
```javascript
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>

<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

- 简单的计算属性，应该把复杂的计算属性分割成多个简单的property。例如：
```javascript
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}

// 而不是
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```
- 带引号的attribute值，非空 HTML attribute 值应该始终带引号 (单引号或双引号，以 JS 中未使用的为准)。例如：
```javascript
<input type="text">

<AppSidebar :style="{ width: sidebarWidth + 'px' }">

```

### Vue动态样式
```javascript
:class="[row.priority.includes('紧急') ? 'exgency' : '']"
```
