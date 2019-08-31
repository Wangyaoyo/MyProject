## 有关预处理器

### scoped

```js
<style scoped>
```

```js
<template>
    <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

**总结：scoped的渲染规则：**

1.给HTML的dom节点添加一个不重复的data属性(例如: data-v-5558831a)来唯一标识这个dom 元素

2.在每句css选择器的末尾(编译后生成的css语句)加一个当前组件的data属性选择器(例如：[data-v-5558831a])来私有化样式

### transform: translateY(-50%)

### css属性

https://blog.csdn.net/weinideai/article/details/3885444

概念（来源于网络）：

clientX 设置或获取鼠标指针位置相对于当前窗口的 x 坐标，其中客户区域不包括窗口自身的控件和滚动条。 
clientY 设置或获取鼠标指针位置相对于当前窗口的 y 坐标，其中客户区域不包括窗口自身的控件和滚动条。 
offsetX 设置或获取鼠标指针位置相对于触发事件的对象的 x 坐标。 
offsetY 设置或获取鼠标指针位置相对于触发事件的对象的 y 坐标。 
screenX 设置或获取获取鼠标指针位置相对于用户屏幕的 x 坐标。 
screenY 设置或获取鼠标指针位置相对于用户屏幕的 y 坐标。 
x 设置或获取鼠标指针位置相对于父文档的 x 像素坐标(亦即相对于当前窗口)。 

y 设置或获取鼠标指针位置相对于父文档的 y 像素坐标(亦即相对于当前窗口)。