# less学习记录
### 初窥门径
Less 相对于 CSS，除了提供变量声明功能外，还提供了一系列其他的功能和特性。下面是 Less 相对于纯 CSS 的一些功能扩展：
- 变量声明：Less 允许你在样式文件中定义和使用变量，这样可以方便地重复使用和修改样式值。
- 嵌套规则：Less 允许你在样式文件中使用嵌套规则，使样式层级更清晰，并减少选择器的重复书写。
- 运算操作：Less 支持数值、颜色等数据类型的运算操作，使得样式的计算更加灵活和强大。
- 混合（Mixin）：混合是一种方式，允许你定义可复用的样式块，并在需要的地方进行引用。这类似于函数，可以减少样式的冗余。
- 导入（Import）：Less 支持通过 @import 导入其他 Less 文件，使得样式的管理和组织更加方便。
- 注释：Less 支持单行注释 // 和多行注释 /* */，可以在样式文件中添加注释进行说明和文档。
- 函数：Less 提供了一些内置函数，用于处理颜色、字符串、数值等操作，可以增加样式表达的能力。
- 条件语句：Less 提供了条件语句，例如 if 和 else，可以根据条件来动态生成样式。
### 变量
```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```
设置变量
### 混入
```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```
在其他类中复用写过的样式，.bordered该类的属性现在将同时出现在#menu a和中.post a
### 嵌套
```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```
这种重复级联在less优化👇
```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```
代码简洁多了，模仿了HTML结构
