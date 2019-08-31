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

