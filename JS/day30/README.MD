## XPath

学习要点：

- IE中的XPath
- W3C中的XPath
- XPath跨浏览器兼容

XPath是一种节点查找手段。

#### 1、ie中的xpath

在 IE8 及之前的浏览器，XPath 是采用内置基于 ActiveX 的 XML DOM 文档对象实现的。 在每一个节点上提供了两个方法：selectSingleNode()和 selectNodes() 

```js
var user = xmlDom.selectSingleNode('root/user'); //得到第一个 user 节点
alert(user.xml); //查看 xml 序列
alert(user.tagName); //节点元素名
alert(user.firstChild.nodeValue); //节点内的值
```

上下文节点：我们通过 xmlDom 这个对象实例调用方法，而 xmlDom 这个对象实例其 实就是一个上下文节点，这个节点指针指向的是根，也 