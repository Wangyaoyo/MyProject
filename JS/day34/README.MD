## 博客前端：封装库-连缀

学习要点：

- 连缀介绍
- 改写库对象

#### 一、连缀

就是一句话同时设置一个或多个节点以上的操作，比如：

```js
$().getId('box').css('color','red').html('标题').click(function(){alert('hello')});
```

#### 二、改写库对象

为了实现操作连缀，就需要改写var Base = {}这种写法，这样我们就无法在它的原型中添加方法，就需要使用函数式对象写法：

```html
<body>
    <div id="box">box</div>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
</body>
```

```js
/*专门用于返回一个对象*/
var $ = function () {
    return new Base();
}
/*获取一个base对象*/
function Base(){
    this.elements = [];
    //通过id获取节点
    this.getId = function (id) {
        this.elements.push(document.getElementById(id));
        return this;
    };

    //通过标签名获取节点
    this.getTag = function(tag){
        var tags = document.getElementsByTagName(tag);
        for (var i = 0;i<tags.length;i++){
            this.elements.push(tags[i]);
        }
        return this;
    };
}
/*设置css属性*/
Base.prototype.css = function(attr,value){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style[attr] = value;
    }
    return this;
};
/*修改文本内容*/
Base.prototype.html = function(text){
  for(var i = 0;i<this.elements.length;i++){
      this.elements[i].innerHTML = text;
  }
  return this;
};
/*添加事件*/
Base.prototype.click = function(fn){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
};
window.onload = function () {
    $().getId('box').css('color','red').css('backgroundColor','black').html('div');
    $().getTag('p').css('backgroundColor','green').html('haha这是一个p标签').click(function () {
        alert('aaa');
    });
}
```

