#### 是否改变原数组的常用方法归纳

1、改变原数组的：

- posh、pop、shift、unshift
- sort、reverse
- splice、

2、不改变原数组的：

- concat、join
- slice

slice和splice的区别：

splice(i,j,'a')删除、添加元素，splice和slice的作用是不同的，splice会直接对数组进行修改。从i开始删j个，并将a插入到i处。

slice（start,end）从某个已有的数组返回选定的元素，从start位开始返回到end，如果是负数，表示从大户组尾部进行计算，该方法不会修改原数组，而是返回一个子数组。

