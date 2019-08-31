## 动态加载脚本和样式

学习要点：

- 元素位置
- 动态脚本
- 动态样式

#### 1、元素位置

补充方 法：getBoundingClientRect()，返回一个矩形对象，包含四个属性，left、top、right、bottom。分别表示元素各边和页面上边和左边的距离。

```js
var box = document.getElementById('box');
//元素上边距离页面上边的距离
box.getBouondingClientRect().top;
//元素右边距离页面上边的距离
box.getBoundingClientRect().right;
//元素左边距离页面左边的距离
box.getBoundignClientRect().left;
//元素下边距离页面左 边的距离
box.getBoundingClientRect().bottom;
```

存在兼容性问题：

#### 2、动态脚本

在适时的时候加载相应的脚本（js文件）：

```js
//加载某个js文件<script type='text/javascript' src='somejs.js'></script>
var flag = true;
if(flag){
    loadScript('somejs.js');          //设置标志位操作DOM去执行代码
}
```

```js
function loadScript(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
```

加载相应的js代码：

```js
var script = document.createElement('script');
script.type = 'text/javascript';
//IE不兼容  改为script.text = "alert("yaoxxx")";
var text = document.createTextNode('alert("yaoxxx")');       
script.appendChild(text);
docuement.getElementsByTagName('head')[0].appendChild(script);

```

####3、动态样式（style标签和link标签）

```js
//动态执行link
var flag = true;
if(flag){
    loadStyle('style.css');
}
function loadStyle(url){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}
//动态执行style
var flag = true;
if(flag){
    var style = document.createElement('style');
    style.type = 'text/css';
    //var box = document.createTextNode('#box{background-color:red}');
    //style.appendChild(box);    IE不支持，故用下面的写法
    docuemnt.getElementsByTagName('head')[0].appendChild(style);
    insertRule(document.styleSheet[0],'#box','background-color:red',0);
}

function insertRule(sheet,selectorText,cssText,position){
    //如果不是IE
    if(sheet.insertRule){
        sheet.insertRule(selectorText + '{'+cssText+'}',position);
    }//如果是IE
    else if(sheet.addRule){
        sheet.addRule(selectorText,cssText,position);
    }
}
```

