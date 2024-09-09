# Vue查漏补缺
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

动态绑定多个值-vue3
```js
// 如果你有像这样的一个包含多个 attribute 的 JavaScript 对象：
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
// 通过不带参数的 v-bind，你可以将它们绑定到单个元素上：(这里就没办法省略成冒号了)
<div v-bind="objectOfAttrs"></div>
```

- 模版语法仅支持单一表达式，简单的分辨方法就是能否正确写在*return*后面
- 绑定在表达式中的方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用，比如改变数据或触发异步操作。简单思考一下，绑定的值如果是被自己异步触发，会不会导致无限循环？难怪没在这里用过async await
### 受限的全局访问
- 模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性。然而，你也可以自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。
- 动态参数值的限制​
动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。如:id = "null"
- 如果你需要传入一个复杂的动态参数，我们推荐使用计算属性替换复杂的表达式，也是 Vue 最基础的概念之一.
- 当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：
```js
<a :[someAttr]="value"> ... </a>
// 上面的例子将会在 DOM 内嵌模板中被转换为 :[someattr]。如果你的组件拥有 “someAttr” 属性而非 “someattr”，这段代码将不会工作。单文件组件内的模板不受此限制。
```
## 模版语法
- 要在组件模板中访问 ref，请从组件的 setup() 函数中声明并返回它们：
```js
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}
```
- 注意，在模板中使用 ref 时，我们不需要附加 .value。为了方便起见，当在模板中使用时，ref 会自动解包 (有一些注意事项)。虽然加value也无所谓
1. 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。在下面的例子中，count 和 object 是顶级属性，但 object.id 不是：
```js
const count = ref(0)
const object = { id: ref(1) }
```

- 对于更复杂的逻辑，我们可以在*同一作用域内*声明更改 ref 的函数，并将它们作为方法与状态一起公开：
```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}
```
- 顺带一提setup语法糖
```js
<script setup>
//import引入的内容
import { getToday } from './utils'  
// 变量
const msg = 'Hello!'
// 函数
function log() {
  console.log(msg)
}
</script>
​
//在template中直接使用声明的变量、函数以及import引入的内容
<template>
  <div @click="log">{{ msg }}</div>
   <p>{{getToday()}}</p>
</template>
```
- script setup 语法糖里面的代码会被编译成组件 setup() 函数的内容，不需要通过return暴露 声明的变量、函数以及import引入的内容，即可在 template 使用，并且不需要写export default{}
 script setup 语法糖里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的  script  只在组件被首次引入的时候执行一次不同， script setup 中的代码会在每次组件实例被创建的时候执行

## 深层响应性
Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。

Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：
```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```
非原始值将通过 reactive() 转换为响应式代理，该函数将在后面讨论。

也可以通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

- 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API：
```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

### reactive()
还有另一种声明响应式状态的方式，即使用 reactive() API。与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性：
```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```
在模板中使用：
```html
<button @click="state.count++">
  {{ state.count }}
</button>
```
reactive() 将深层地转换对象：当访问嵌套对象时，它们也会被 reactive() 包装。当 ref 的值是一个对象时，ref() 也会在内部调用它。与浅层 ref 类似，这里也有一个 shallowReactive() API 可以选择退出深层响应性。

## Reactive Proxy vs. Original
- 值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的：
```js
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```
只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是 仅使用你声明对象的代理版本。（这里改raw是没用的）

- 为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身：
```js
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```
### reactive() 的局限性
reactive() API 有一些局限性：

1. 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

2. 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：
```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })
```
3. 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：
```js
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```
### 额外的 ref 解包细节
- 一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：（简单来说，ref被reactive指向的时候，不需要value也可以正常改动，就像写到了模板里面一样）
```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```
1. 首先，通过 const count = ref(0) 创建了一个响应式引用 count，其初始值为 0。
2. 接着，通过 reactive 创建了一个响应式对象 state，其中包含一个名为 count 的属性，这个属性的值是之前创建的 count 引用。
3. 打印 state.count，输出结果为 0，因为 state.count 指向的是 count.value，即引用 count 的值。
将 state.count 的值设置为 1，实际上是修改了 count.value 的值为 1。
4. 打印 count.value，结果为 1，因为 count 的值已经被修改为 1。
5. 创建了一个新的响应式引用 otherCount，初始值为 2。
将 state.count 的值设置为 otherCount，此时 state.count 指向了 otherCount。
6. 打印 state.count，输出结果为 2，因为 state.count 现在指向 otherCount 的值。
7. 由于之前 state.count 已经不再指向 count，因此最后打印 count.value 仍然为 1，没有发生变化。
综上所述，最后 count.value 为 1 的原因是因为在第4步中将 state.count 的值设置为 1 时实际上是修改了 count.value 的值，后续的操作没有改变这个值，所以最终输出为 1。

*备注：只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。*

- 数组和集合的注意事项（解包，貌似看起来不在顶层都需要）

与 reactive 对象不同的是，当 ref 作为*响应式数组*或*原生集合类型(如 Map)* 中的元素被访问时，它不会被解包：
```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```
- 在模板中解包的注意事项

在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

在下面的例子中，count 和 object 是顶级属性，但 object.id 不是：
```js
const count = ref(0)  
const object = { id: ref(1) } 
```
```js
{{ count + 1 }} //因此，这个表达式按预期工作
{{ object.id + 1 }} //这个不会 ————》改为{{object.id.value+1}}就可以了。
//如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包，因此以下内容将渲染为 {{ object.id }}
//{{object.id}}可以正常显示为1
```

## 计算属性
```js
// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
```
我们在这里定义了一个计算属性 publishedBooksMessage。*computed() 方法期望接收一个 getter 函数*（这里就是function做不到的地方了，也是computed响应式的原因），返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过 publishedBooksMessage.value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。

Vue 的计算属性会自动追踪响应式依赖。它会检测到 publishedBooksMessage 依赖于 author.books，所以当 author.books 改变时，任何依赖于 publishedBooksMessage 的绑定都会同时更新。
### 计算属性缓存 vs 方法
若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于*计算属性值会基于其响应式依赖被缓存*。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 author.books 不改变，无论多少次访问 publishedBooksMessage 都会立即返回先前的计算结果，而不用重复执行 getter 函数。

这也解释了为什么下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖：
```js
const now = computed(() => Date.now())
```
相比之下，*方法调用总是会在重渲染发生时再次执行函数*。

为什么需要缓存呢？想象一下我们有一个非常耗性能的计算属性 list，需要循环一个巨大的数组并做许多计算逻辑，并且可能也有其他计算属性依赖于 list。没有缓存的话，我们会重复执行非常多次 list 的 getter，然而这实际上没有必要！如果你确定不需要缓存，那么也可以使用方法调用。
### 可写计算属性
计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：
```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```
现在当你再运行 fullName.value = 'John Doe' 时，setter 会被调用而 firstName 和 lastName 会随之更新。

- *Getter 不应有副作用​*
计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用侦听器根据其他响应式状态的变更来创建副作用。

- *避免直接修改计算属性值​*
从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

## 绑定 HTML class
### 绑定对象
- 我们可以给 :class (v-bind:class 的缩写) 传递一个对象来动态切换 class：
```js
<div :class="{ active: isActive }"></div>
// 上面的语法表示 active 是否存在取决于数据属性 isActive 的真假值。
```
- 你可以在对象中写多个字段来操作多个 class。此外，:class 指令也可以和一般的 class attribute 共存。举例来说，下面这样的状态：
```js
const isActive = ref(true)
const hasError = ref(false)
```
配合
```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

<!-- 渲染的结果会是： -->
<div class="static active"></div>
```
绑定的对象并不一定需要写成内联字面量的形式，也可以直接绑定一个对象：
```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```
```html
<div :class="classObject"></div>
<!-- 计算属性也可以。考虑到单独控制开关，还是单个ref好控制 -->
```
### 绑定数组
- 我们可以给 :class 绑定一个数组来渲染多个 CSS class：
```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```
```html
<div :class="[activeClass, errorClass]"></div>

<!-- 渲染的结果是： -->
<div class="active text-danger"></div>

<!-- 如果你也想在数组中有条件地渲染某个 class，你可以使用三元表达式： -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

### 在组件上使用
- 对于只有一个根元素的组件，当你使用了 class attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并。

举例来说，如果你声明了一个组件名叫 MyComponent，模板如下：
```html
<!-- 子组件模板 -->
<p class="foo bar">Hi!</p>

<!-- 在使用时添加一些 class： -->
<!-- 在使用组件时 -->
<MyComponent class="baz boo" />

<!-- 渲染出的 HTML 为： -->
<p class="foo bar baz boo">Hi!</p>
```

- 如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs 属性来实现指定：
```html
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<MyComponent class="baz" />

<!-- 这将被渲染为： -->
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

### style也支持，功能和上面一样，就不说了

## v-if
- v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。
```html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
<!-- 一个 v-else 元素必须跟在一个 v-if 或者 v-else-if 元素后面，否则它将不会被识别。 -->
```

### template 上的 v-if
- 因为 v-if 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 <template> 元素上使用 v-if，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 <template> 元素。
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<!-- 还有个v-show -->
<!-- 不同之处在于 v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。

v-show 不支持在 <template> 元素上使用，也不能和 v-else 搭配使用。 -->
```
### v-if vs. v-show
1. v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

2. v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

3. 相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

4. 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

## 列表渲染
index是第二个可选参数，非必须
### v-for 与对象
- 你也可以使用 v-for 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 *Object.keys()* (实际测试一下，应该是Object.value()吧)的返回值来决定。

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```
```html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>

<!-- 可以通过提供第二个参数表示属性名 (例如 key)： -->
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>

<!-- 第三个参数表示位置索引： -->
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```
### 在 v-for 里使用范围值
- v-for 可以直接接受一个整数值。在这种用例中，会将该模板基于 1...n 的取值范围重复多次。
```html
<span v-for="n in 10">{{ n }}</span>
<!-- 注意此处 n 的初值是从 1 开始而非 0。 -->
```
### v-for和v-if的合体
当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名：
```html
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```
在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读)：
```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

### 通过 key 管理状态
- Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

**由于vue源码中判断一个虚拟DOM节点是否可复用，是指就地复用的是那些没有变化的元素，取决于tag与key两个条件，两个都相同，得以复用；两个都不同，不复用**

- key与diff算法
key属性是如何解决问题的，它的原理是什么？

**虚拟DOM的diff算法**

核心是基于两个简单的假设：

1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。
基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。

**关于Vdom算法对一点探究**
diff算法的两个核心：
- 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
- 同一层级的一组节点，他们可以通过唯一的key进行区分。

**diff算法的复杂度**
- 比较两棵虚拟DOM树的差异是Virtual DOM算法最核心的部分，这也是所谓的 VirtualDOM的diff 算法。两个树的完全的diff 算法是一个时间复杂度为O(n^3)的问题。
- 但是在前端当中，你很少会跨越层级地移动DOM元素。所diff算法只会对同一个层级的元素进行对比。下面的div只会和同一层级的div对比，第二层级的只会跟第二层级对比。这样算法复杂度就可以达到O(n)。

比如--我们希望可以在B和C之间加一个F

Diff算法默认执行起来是这样的：

老的Vdom树的该层上有6个节点，新的Vdom树上有7个类型相同的节点，那么就依次复用真实DOM树该层上的对应的前6个节点，在最后再新建一个节点，赋予之前节点E的属性。
即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？
所以我们需要使用key来给每个节点做一个唯一标识，这样vue会把他们当做是不同的节点，因此不会复用，diff算法会直接创建新的节点，并插入正确的位置

- 为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute：
```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>

<!-- 当你使用 <template v-for> 时，key 应该被放置在这个 <template> 容器上： -->
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```
推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。

key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。不要用对象作为 v-for 的 key。关于 key attribute 的更多用途细节，请参阅 key API 文档。

### 数组变化侦测
- 变更方法
Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

push()
pop()
shift()
unshift()
splice()
sort()
reverse()

### 替换一个数组
变更方法，顾名思义，就是会对调用它们的原数组进行变更。相对地，也有一些不可变 (immutable) 方法，例如 filter()，concat() 和 slice()，这些都不会更改原数组，而总是返回一个新数组。当遇到的是非变更方法时，我们需要将旧的数组替换为新的：
```js
// `items` 是一个数组的 ref
items.value = items.value.filter((item) => item.message.match(/Foo/))
// 你可能认为这将导致 Vue 丢弃现有的 DOM 并重新渲染整个列表——幸运的是，情况并非如此。Vue 实现了一些巧妙的方法来最大化对 DOM 元素的重用，因此用另一个包含部分重叠对象的数组来做替换，仍会是一种非常高效的操作。
```

### 展示过滤或排序后的结果
有时，我们希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的*计算属性*。
```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
// 筛选能被2整除的数字，形成新数组
```

- 在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：

## 事件处理
### 监听事件
- 方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 event.target.tagName 访问到该 DOM 元素。

- 模板编译器会通过检查 v-on 的值是否是合法的 JavaScript 标识符或属性访问路径来断定是何种形式的事件处理器。举例来说，foo、foo.bar 和 foo['bar'] *前者固定属性名，后者可以动态属性名*会被视为方法事件处理器 **调用函数**，而 foo() 和 count++ 会被视为内联事件处理器**内部执行**。

### 在内联处理器中调用方法
除了直接绑定方法名，你还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件：
```js
function say(message) {
  alert(message)
}
```
```html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

### 在内联事件处理器中访问事件参数​
- 有时我们需要在内联事件处理器中访问*原生 DOM 事件*。你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数：
```vue
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```
```js
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

### 事件修饰符
在处理事件时调用 event.preventDefault() 或 event.stopPropagation() 是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。
```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

```

### 按键
```js
Vue 为一些常用的按键提供了别名：

.enter
.tab
.delete (捕获“Delete”和“Backspace”两个按键)
.esc
.space
.up
.down
.left
.right
系统按键修饰符​
你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。

.ctrl
.alt
.shift
.meta
```
比如
```html
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```
甚至鼠标点击，都可以监控

## 表单输入绑定
- 在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手动连接值绑定和更改事件监听器可能会很麻烦：
```html
<input
  :value="text"
  @input="event => text = event.target.value">
```
v-model 指令帮我们简化了这一步骤：
```html
<input v-model="text">
```
1. 文本类型的 <input> 和 <textarea> 元素会绑定 value property 并侦听 *input 事件*；
2. <input type="checkbox"> 和 <input type="radio"> 会绑定 checked property 并侦听 *change 事件* ；
3. <select> 会绑定 value property 并侦听 *change 事件*。

**v-model 会忽略任何表单元素上初始的 value、checked 或 selected attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。你应该在 JavaScript 中使用响应式系统的 API来声明该初始值。**

### 选择器选项
```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```
v-model 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，selected 会被设为该对象字面量值 { number: 123 }。

### 修饰符
- 默认情况下，v-model 会在每次 *input* 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 *change* 事件后更新数据：
```html
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```
- 如果你想让用户输入自动转换为数字，你可以在 v-model 后添加 .number 修饰符来管理输入：
```html
<input v-model.number="age" />
<!-- 如果该值无法被 parseFloat() 处理，那么将返回原始值。

number 修饰符会在输入框有 type="number" 时自动启用。 -->
```
- 如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加 .trim 修饰符：
```html
<input v-model.trim="msg" />
<!-- 这个也许在返回空字符串时候有用？ -->
```

## 生命周期钩子
### 注册周期钩子
- 举例来说，onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：
```js
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```
当调用 onMounted 时，Vue 会自动将回调函数注册到当前*正被初始化*的组件实例上。这意味着这些钩子应当在组件初始化时被同步注册。例如，请不要这样做：
```js
setTimeout(() => {
  onMounted(() => {
    // 异步注册时当前组件实例已丢失
    // 这将不会正常工作
  })
}, 100)
```
- 注意这并不意味着对 onMounted 的调用必须放在 setup() 或 <script setup> 内的词法上下文中。onMounted() 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自 setup() 就可以。
<img src="https://cn.vuejs.org/assets/lifecycle_zh-CN.FtDDVyNA.png">?

### 计算属性
- 计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

在组合式 API 中，我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数：
```js
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
```

### 侦听数据源类型
watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：
```js
// 看起来就是一个响应式数据，搭配一个箭头函数回调，俩参数
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

- 注意，你不能直接侦听响应式对象的属性值，例如:
```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```
这里需要用一个返回该属性的 getter 函数：
```js
// 提供一个 getter 函数
watch(
  () => obj.count, //这种写法叫做响应式引用，也称为副作用函数。这种写法可以触发Proxy的getter，而watch就是监听这个点的
  (count) => {
    console.log(`count is: ${count}`)
  }
)

// 对于ref为什么可以直接写，那是因为内部存在解包
// watch(() => count.value, (newValue, oldValue) => {
  // ...
// });
// 不过gpt否认了模板字符串内解包和watch内的ref的副作用函数是用一种方式实现的。
```
- 触发 Proxy 的 getter
**当你在 watch 中使用 () => state.count 形式的函数时，这个函数的执行会导致访问 state.count。这个访问操作会被 Proxy 拦截（触发 getter），从而让 Vue 的响应式系统知道这次属性访问行为。这样，当 state.count 属性的值发生变化时（触发 setter），Vue 的响应式系统就能够追踪到这一变化，并通知相关的副作用（如 watch 回调函数）执行。**
*个人理解是，先触发了副作用函数-》响应式系统发现了state.count是响应式数据(不应该本来就是?)*

- 知乎关于reactive需要副作用函数的解答：
Vue3 中使用 watch 监听 reactive 对象的属性变化时，使用函数返回属性的方式是为了保证 watch 的表现更加可预测和稳定。

当你直接将 reactive 对象的属性传给 watch 方法时，watch 方法会立即读取该属性的值并保存下来。如果 reactive 对象的属性值发生改变，watch 方法并不会知道该变量的值已经发生改变，因为它保存的是该变量的快照。

通过使用函数返回属性的方式，watch 方法每次都会重新读取该属性的值。这样，watch 方法就能够随着 reactive 对象的属性值的改变而实时得知该属性的最新值。

因此，使用函数返回属性的方式更加可靠和安全，是在 Vue3 中监听 reactive 对象属性变化的推荐方式。

## 模板引用
- 虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要直接访问底层 DOM 元素。要实现这一点，我们可以使用特殊的 ref attribute：
```html
<input ref="input">
```
- ref 是一个特殊的 attribute，和 v-for 章节中提到的 key 类似。它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时将焦点设置到一个 input 元素上，或在一个元素上初始化一个第三方库。
### 访问模板引用
为了通过组合式 API 获得该模板引用，我们需要声明一个匹配模板 ref attribute 值的 ref：
```html
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
注意，你只可以在组件挂载后才能访问模板引用。如果你想在模板中的表达式上访问 input，在初次渲染时会是 null。这是因为在初次渲染前这个元素还不存在呢！

如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 null 的情况

### v-for 中的模板引用
- 当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：
```html
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```
应该注意的是，ref 数组并不保证与源数组相同的顺序。

### 函数模板引用
除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，*会在每次组件更新时都被调用*。该函数会收到元素引用作为其第一个参数
```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```
注意我们这里需要使用*动态的 :ref* 绑定才能够传入一个函数。当绑定的*元素被卸载时*，函数也会被调用一次，此时的 *el 参数会是 null*。你当然也可以绑定一个组件方法而不是内联函数。

### 组件上的 ref
**大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。**

有一个例外的情况，使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：
```html
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```
## 组件
每一个组件都维护着自己的状态，是不同的 count。这是因为每当你使用一个组件，就创建了一个新的实例。

？ DOM 内模板解析
### 传递 props
Props 是一种特别的 attributes，你可以在组件上声明注册。要传递给博客文章组件一个标题，我们必须在组件的 props 列表上声明它。这里要用到 defineProps 宏：
```html
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```
如果你没有使用 <script setup>，props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数被传入：
```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```