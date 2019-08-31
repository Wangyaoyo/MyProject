## 博客前端

学习要点：

- 项目介绍
- 理解javascript库
- 创建基础库

#### 1、模拟博客中前端的那些效果

#### 2、创建基础库

获取节点最常用的方法：

创建一个base.js：

```js
var Base = {
    getId : function(id){
        return document.getElementById(id);
    };
    getName : function(name){
    	return document.getElementByName(name);
	};
	getTagName : function(tag){
    	return document.getElementByTagName(tag);
	};
};
```

前台调用代码：

```js
window.onload = function(){
	alert(Base.getId('box').innerHTML);
    alert(Base.getName('sex')[0].value);
    alert(Base.getTagName('p')[0].innerHTML);
};
```

为保证兼容性，采用UTF-8编码格式。