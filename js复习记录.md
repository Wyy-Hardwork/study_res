# Javascript
记录一下有提升的js
### Array.prototype.reduce(callback(accumulator,currentValue),initial)
- reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
- 第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始，再简单点说就是多了个值）。
- callback()为数组每个值执行函数，最后一个返回值将会作为reduce()的返回值。
- accumulator：上一次callback()的返回值，第一次如果initial有值则为计算结果，没有就arr[0]
- currentValue：当前元素值，第一次如果initial有值则arr[0]，没有就arr[1]

### Arr其他一些方法
#### find
*find 方法用于查找数组中满足条件的第一个元素，并返回其值。如果找到匹配的元素，则 find 方法会立即停止搜索并返回该元素的值；如果没有找到，则返回 undefined。*
```js
// 单个元素以布尔值为判断标准，是否找出。最终返回第一个符合要求参数，没找到返回undefined
// array.find(callback[, thisArg])
// callback 函数：用来测试每个元素的函数，接收三个参数：
// element：当前正在处理的元素。
// index（可选）：当前处理元素的索引。
// array（可选）：调用 find 方法的数组。
// thisArg（可选）：执行 callback 函数时的 this 值。
```
#### some
*some 方法用于测试数组中是否至少有一个元素满足条件。它会遍历数组，对每个元素执行提供的测试函数，直到找到一个使测试函数返回 true 的元素，然后立即返回 true。如果没有找到这样的元素，则返回 false。*
```js
// 最终返回一个布尔值，类似find找到第一个元素就返回元素，这个返回true，没找到返回false
```

