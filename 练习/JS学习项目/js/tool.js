
/*
* 浏览器加载的顺序：
* 1、HTML解析完毕
* 2、脚本和样式加载完毕
* 3、脚本在文档内解析并执行
* 4、HTML DOM文档完全构造起来
* 5、图片和外部内容加载
* 6、网页完成加载
*/

//浏览器检测
(function (){
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
                (s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    if(/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d]+)/[1]);
})();

//DOM加载
//最终形态：
function addDomLoaded(fn) {
    var isReady = false;
    var timer = null;
    function doReady(){
        if (timer) clearInterval(timer);
        if(isReady) return;
        isReady = true;
        fn();
    }
    if ((sys.webkit && sys.webkit < 525) || (sys.opera && sys.opera < 9) ||
        (sys.firefox && sys.firefox < 3))
    {
        timer = setInterval(function () {
            if (document && document.getElementById && document.getElementsByTagName && document.body && document.documentElement){
                doReady();
            }
        },1);
    } else if (document.addEventListener) {//W3C
        addEvent(document, 'DOMContentLoaded', function () {
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    }
    else if (sys.ie && sys.ie < 9) {//IE
        var timer = null;
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll('left');
                doReady();
            } catch (e) {};
        },1);
    }
}
//跨浏览器获取视口大小
function getInner(){
    if(typeof window.innerWidth != 'undefined'){
        return {
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else {
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}

//跨浏览器获取style
function  getStyle(element,attr) {
    var value;
    //window.getComputedStyle(元素，伪类)；不是伪类就写null
    if(typeof window.getComputedStyle != "undefined"){//W3C
        value = window.getComputedStyle(element,null)[attr];
    }else if(typeof element.currentStyle != "undefined"){//IE
        value = element.currentStyle[attr];
    }
    return value;
}

//判断class是否存在
function hasClass(element,className) {
    return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position) {
    if(typeof sheet.insertRule != 'undefined'){
        sheet.insertRule(selectorText+'{'+cssText+'}',position);
    }else if (typeof sheet.addRule != 'undefined'){
        sheet.addRule(selectorText,cssText,position);
    }
};

//跨浏览器移除link规则
function deleteRule(sheet,index) {
    if(typeof sheet.insertRule != 'undefined'){
        sheet.deleteRule(index);
    }else if (typeof sheet.addRule != 'undefined'){
        sheet.removeRule(index);
    }
}

/*
//获取event
function  getEvent(e) {
    return window.event || e;
}

//阻止默认行为
function  preDef(event) {
    var e = getEvent(event);
    if(typeof e.preventDefault() != "undefined"){
        e.preventDefault();
    }else {
        e.returnValue = false;
    }
}
*/
//跨浏览器添加事件绑定
function addEvent(obj,type,fn) {
    if(typeof obj.addEventListener != 'undefined'){//W3C
        obj.addEventListener(type,fn,false);
    }else{//IE
        /*手动封装IE的事件绑定（解决IE不能顺序执行事件函数的问题）*/
        //创建一个存放事件的哈希表（散列表）
        if(!obj.events) obj.events = {};
        //第一次执行时执行
        if(!obj.events[type]){
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //判断obj对象是否有onclick方法，有就把第一次的事件处理函数先存储到第一个位置上
            if (obj['on'+type]) {
                obj.events[type][0] = fn;
                document.getElementById('s').innerHTML += '0';
            }
        }else{
            //同一个注册函数不添加到计数器中
            if(addEvent.equal(obj.events[type],fn) == true)
                return false;
        }
        //第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj['on'+type] = addEvent.exec;
    }
}
//为每一个事件分配一个计数器，全局变量
addEvent.ID = 1;

//执行事件处理函数（解决传递传递this的问题）
addEvent.exec = function (event) {
    var e = event || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es){
        es[i].call(this,e);
    }
};

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;
}

//IE阻止默认行为
addEvent.fixEvent.stopPropagation = function(){
    this.cancelBubble = true;
}
//IE取消冒泡
addEvent.fixEvent.preventDefault = function(){
    this.returnValue = false;
}
//同一个注册函数进行屏蔽（解决IE不能屏蔽相同函数的输出问题）
addEvent.equal = function (es,fn) {
    for (var i in es){
        if(es[i] == fn) return true;
    }
    return false;
};
//跨浏览器删除事件绑定
function removeEvent(obj,type,fn) {
    if(typeof obj.removeEventListener != 'undefined'){//W3C
        obj.removeEventListener(type,fn,false);
    }else {
        //存在再删除
        if (obj.events){
            for (var i in obj.events[type]) {
                if (obj.events[type][i] == fn) {
                    delete obj.events[type][i];
                }
            }
        }
    }
}

//删除左右空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,'');
}

//滚动条清零
function scrollTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}


//跨浏览器让js在DOM加载完毕（而不是图片等）之后执行:版本1
/*function addDomLoaded(fn) {
  if(document.addEventListener){
      //Wsc
    addEvent(document,'DOMContentLoaded',function () {
      fn();
      //删除事件
      removeEvent(document,'DOMContentLoaded',arguments.callee);
    });
  }else{
      //IE
      var timer = null;
      timer = setInterval(function () {
        try{
            //doscroll作为最外层元素是判断DOM是否完整的标志，一旦成功执行就调用fn
            document.documentElement.doScroll('left');
            var box = document.getElementById('box');
            fn();
        }catch (e) {
        }
      });
  }
}*/

/* 跨浏览器获取滚动条位置 */
function getScroll() {
    return{
        top:document.documentElement.scrollTop || document.body.scrollTop,
        left:document.documentElement.scrollLeft || document.body.scollLeft
    }
}
/*获取某一个元素到最外层顶点的位置*/
function offsetTop(element) {
    //返回表示当前元素上边缘距离offsetParent返回元素的距离的数值，单位是像素。
    var top = element.offsetTop;
    var parent = element.offsetParent;
    while (parent != null){
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}
/*判断一个值是否存在数组中*/
function inArray(array,value) {
    for(var i in array){
        if(array[i] === value)   return true;
    }
    return false;
}