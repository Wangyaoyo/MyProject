## 事件绑定及深入

学习要点：

- 传统事件绑定的问题
- W3C事件处理函数
- IE事件处理函数
- 事件对象的其他补充

#### 1、传统事件绑定的问题

##### 问题一：覆盖：一个事件处理触发两次事件时，后面的会把前面的覆盖

解决：  

```js
window.onload = function(){
    alert('执行本事件');
};
if(typeof window.onload == 'function'){        //判断之前是否有window.onload
    var saved = null;             //一个保存器
    saved = window.onload;        //保存之前的window.onload
}
window.onclick = function(){
    if(saved) saved();        //saved()相当于window.onload = function(){///}
    alert('执行本事件');
};
```

##### 问题二：事件切换器

#### 2、W3C事件处理函数

所有DOM节点都包含的两个方法：添加事件和删除事件的操作：addEventListener()和removeEventListener()。并且都接收三个参数：事件名、函数、冒泡或捕获的布尔值（true：捕获，false：冒泡）

```js
window.addEventListener('load',function(){alert('添加事件监听器')},false);
```

优点：1、不需要自己定义了；

 	    2、可以屏蔽相同的函数；

​	    3、可以设置冒泡和捕获。（true和false）
```html
<style>
    .red{
        width: 100px;
        height: 100px;
        background-color: red;
    }
    .blue{
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>
<body>
    <div class="red" id="box">DIV</div>
</body>
```

```js
window.addEventListener('load',function (){
    var box = document.getElementById('box');
    box.addEventListener('click',function(){
        alert('切换之前...');
    },false);
    box.addEventListener('click',toblue,false);
},false);

function toblue() {
    //alert(this);            //HTMLDIVElement
    this.className='blue';
    this.removeEventListener('click',toblue,false);
    this.addEventListener('click',tored,false);
}
function tored() {
    this.className='red';
    this.removeEventListener('click',tored,false);
    this.addEventListener('click',toblue,false);
} 
```
  #### 3、IE事件处理函数（不常用）

IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()，都接收相同的参数：事件名称和函数。

区别：

- IE不支持捕获，只支持冒泡
- 不能屏蔽重复的函数
- IE中的this指向window而不是DOM对象
- 在传统事件上，IE无法接收event对象，但用了attachEvent却可以。

注意：这两个方法只能运行在IE低版本上，不常用，淘汰。

```js
window.attachEvent('onload',function(){
    alert('加载之前、、、');
   var box=document.getElementById('box');
    box.attachEvent('onclick',toblue);
});
function toblue(){
    var that = window.event.srcElement;
    that.className='blue';
    that.detachEvent('onclick',toblue);
    that.attachEvent('onclick',tored);
}
function tored(){
    var that = window.event.srcElement;
    that.className = 'red';
    that.detachEvent('onclick',tored);
    that.attachEvent('onclick',toblue);
}
```

存在兼容W3C和IE的问题：

#### 4、事件对象的其他补充

#####1、relatedTarget：W3C的这个属性可以在mouseover和mouseout事件中获取从哪里移入和从哪里移出的DOM对象，对应IE的fromElement 和 toElement

```js
evt.relatedTarget;
```

#####2、阻止默认行为：比如屏蔽一个链接的跳转行为

```js
//法1：W3C:preventDefault
link.onclick = function(evt){
	evt.preventDefault();
}
//法2：IE:returnValue的值为false
link.onclick = function(){
	window.event.returnValue=false;
}
```

兼容W3C和IE：

```js
function preDef(evt){
    var e = evt || window.event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;
    }
}
```

##### 3、卸载事件beforeunload,可以在离开本页的时候给出相应的提示

```js
window.addEvent(window,'beforeunload',function(evt){
   preDef(evt); 
});
```

##### 4、鼠标滚轮mousewheel和DOMMouseScoll，用于获取鼠标上下滚轮的距离

