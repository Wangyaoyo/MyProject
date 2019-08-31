/*前台调用*/
var $ = function () {
    return new Base();
}

/*基础库*/
function Base(){
    this.elements = [];
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
window.onload = function () {
    //设置并获取html
    // $().getId('box').html('div');
    // alert($().getId('box').html());

    //设置并获取css
    // alert($().getId('box').css('color'));
    // $().getId('box').css('color','red');

    //通过class获取
    //alert($().getClass('red').getElement(2).css('color','blue'));
    /*$().getTag('p').css('backgroundColor','green').html('haha这是一个p标签').click(function () {
        alert('aaa');
    });*/

    //将element设置成私有
    // $().getId('box').css('color','red');
    // $().getId('pox').css('color','blue');

    //添加和移除class的css样式
    $().getId('box').addClass('r').addClass('f').removeClass('r');
}
