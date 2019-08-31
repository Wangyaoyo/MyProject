/*前台调用*/
var $ = function (_this) {
    return new Base(_this);
}

/*基础库*/
function Base(_this){
    this.elements = [];
    if(_this != undefined){
        this.elements[0]=_this;
    }
}
//通过id获取节点
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this;
};
//通过CLASS获取节点
Base.prototype.getClass = function(className){
    var all = document.getElementsByTagName('*');
    for(var i = 0;i<all.length;i++){
        if(all[i].className == className){
            this.elements.push(all[i]);
        }
    }
    return this;
}
//获取节点数组中的某一个
Base.prototype.getElement = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//通过标签名获取节点
Base.prototype.getTag = function(tag){
    var tags = document.getElementsByTagName(tag);
    for (var i = 0;i<tags.length;i++){
        this.elements.push(tags[i]);
    }
    return this;
};
/*设置css属性*/
Base.prototype.css = function(attr,value){
    for (var i = 0;i<this.elements.length;i++){
        if(arguments.length == 1){
            //window.getComputedStyle(元素，伪类)；不是伪类就写null
            if(typeof window.getComputedStyle != "undefined"){//W3C
                return window.getComputedStyle(this.elements[i],null)[attr];
            }else if(typeof this.elements[i].currentStyle != "undefined"){//IE
                return this.elements[i].currentStyle[attr];
            }
            return this.elements[i].style[attr];
        }
        this.elements[i].style[attr] = value;
    }
    return this;
};
/*设置innerHTML*/
Base.prototype.html = function(text){
    for(var i = 0;i<this.elements.length;i++){
        if (arguments.length == 0){
            return this.elements[i].innerHTML;
        }
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
//添加class样式
Base.prototype.addClass = function (className){
    for(var i = 0; i<this.elements.length; i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className +=' '+ className;
        }
    }
    return this;
}
//移除class样式
Base.prototype.removeClass = function(className){
    for(var i = 0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className =this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
        }
    }
    return this;
}
//鼠标的移入移出事件
Base.prototype.hover = function(over,out){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
};

window.onload = function () {
    $().getClass('menber').hover(function () {
        $(this).css('color','red');
        $().getTag('ul').css('display','block');
    },function () {
        $(this).css('color','black');
        $().getTag('ul').css('display','none');
    });
}
