## Buse组件库
### 安装
```javascript
"@bangdao/buse-components":"^0.2.9",
```

### 内容一览
- 带有分页的表格
- 在分页表格的基础上增加查询筛选器
- 弹窗
- 对表格增加操作配置
- 增删查改

### 参数一览
- main.js进行全局注册
```javascript
import { BuseCrud } from '@bangdao/buse-components'
Vue.prototype.getDicts = getDicts;
```
- title 表格标题
- loading 默认false，写在data
- filterOption() 筛选配置，写在computed
- tablePage:{} 页数据，写在data
- tableColumn:[] 表格列 写在data
- tableData:[] 表数据 写在data
- modalConfig() 弹窗 写在computed
- modalCancelHandler() 弹窗取消事件 写在methods
- modalSubmit() 弹窗提交事件 methods
- modalConfirmHandler() 弹窗确认事件 methods（保存草稿？）
- deleteRowHandler() methods
- loadData() methods,点击筛选的搜索按钮触发
- rowAdd() 新增按钮 methods
### 书接上文，data里的一些相关参数
- params : this.params 似乎是固定写法，用于接收筛选后点搜索的参数，如果在params填入值而非空字符串，就会出现默认值。
- config:[{},{}] 里面可以加筛选项，每个对象算一种；config:{titile:'名字',filed:'给后端参数',element:'a-input/a-select/所有类似a-antd的框'第三个可以不写，默认a-input}，如果选下拉框，用props:{options:[{label:'你好',value:'val'}]} 来配置选项，config内每个对象代表一个筛选框。最后记得在params内把config参数写里面undefined。
- tablePage 对象内的pageSize每次由后端传入。

### modalConfig()配置
- 一些按钮如新增，操作列的编辑、删除等，都通过布尔值在这里显示或隐藏
- 操作界面，新增和编辑都显示这里面的，可以增加表单验证rules；表单验证详情见antd的FormModel配置项。
```javascript
    modalConfig() {
      return {
        formConfig: [
          {
            field: 'name',
            title: '操作名字',
            // element: 'a-range-picker'
            rules:[{required:true,message:'必须输入名字'}]
          },
        ],
        menuTitle: '操作',//列名
        addBtn: true,//外面的增加按钮
        delBtn: false,//删除按钮
        viewBtn: true,//查看
        editBtn: true,//编辑
      };
    },
```
### 自定义操作列，以及自定义弹窗
- 参考文档crud属性文档-自定义操作类型(ICustomOperationTypes)
### @handleCreate配置
- 对于新增按钮的配置
```javascript
    rowAdd() {
      this.$refs.crud.switchModalView(true, 'ADD');
    },
    //配合@handleCreate="rowAdd"
```
- state:true（打开弹窗）false(关闭弹窗)operationType:操作类型名称，包括默认的 ADD,DELETE,UPDATE,VIEW 以及自定的 ICustomOperationTypes 中的 typeName row:需要传递给弹窗的数据信息，以便在自定义插槽中获取配合使用。 打开弹窗:this.$refs.crud.switchModalView(true,operationType,{...row}); 关闭弹窗：this.$refs.crud.switchModalView(false)
### @modalConfirm
- 确认按钮触发事件
```javascript
    modalConfirmHandler(params) {
      if (params.crudOperationType == 'update') {
        console.log('编辑成功');
      } else if (params.crudOperationType == 'add') {
        console.log('添加成功');
      }
    },
```
- 无论新增还是保存编辑都会触发，区分的方式在于params参数里面的curdOperationType字符串内容。(add/update)

### vxe对后端传入数字转换成字符串
- 用于tableColumn，比如：
```javascript
{ type: 'checkbox' },//用于变成checkbox行
{
    field:'gender',
    title:'性别',
    formatter({cellValue}){
        if(cellValue == 1){
            return '男'
        }
        else{
            return '女'
        }
    }
}
```
- 查看按钮内也有对应的格式化，不用的话后端传入1，就会显示1，也要向上面那样转化一下。

previewFormatter
```javascript
    modalConfig() {
      //弹窗类配置
      return {
        formConfig: [
         {
            field: 'from',
            title: '客户来源',
            previewFormatter: (cellValue) => {
              if (cellValue == 1) {
                return '东土大唐';
              } else {
                return cellValue;
              }
            },
          },
        ]
      }
    }
```
### 删除@deleteRowHandler
- 在可以设置删除是否弹出二次确认窗口
- delConfirmObj可以配二次确认窗口的文本
```javascript
modalconfig(){
    return{
        delConfirm:true
        delConfirmObj:{
            okText:'确定删除？',
            cancelText:'取消',
            title:'确定要删除该项数据吗?'
        }
  }
  }
```
### formLayoutConfig表单整体布局配置
### IDynamicConfig表单单项布局配置
- formConfirm内部对象，再加上itemProps:{}用于获取独特的样式;
colProps也是
### slot记得要在element里面激活
### buse组件crud/config/index有源码，可以改。
### 栅格系统，24去除x参数，结果是多少，一行有多少。
### antd表单验证rules
-链接 https://www.jianshu.com/p/a9faaaa4e9b2

### 踩坑小记录
- 对于自定义插槽，提示词在标签内使用:placeholder="['请输入访客名称']"
- 弹窗使用自定义插槽时，无法把输入框对数据提交，请在template标签使用slot-space = {params}来把父组件参数传入。备注：组件不能使用#命名，要用slot=""，不然会和slot-space冲突报错（说法有误，这种是借用父组件的参数，你应该在modalConfig()的return里面加上params）；顺便slot-space = xxx，xxx是自定义的变量，xxx.params.name 可用于获取到弹窗输入框的数据。这里的params是固定写法，不能改。
- slot = 'menu' 这个插槽不需要定义就有，处于操作列，直接在html标签里面写template就行。可以加一点样式变成自定义的操作