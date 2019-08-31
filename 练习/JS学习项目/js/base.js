/*返回base对象函数*/
var $ = function (_this) {
    return new Base(_this);
};

/*基础库*/
function Base(args){
    this.elements = [];
    if(typeof args == 'string'){
        //Css模拟
        if(args.indexOf(' ') != -1){
            var elements = args.split(' ');      //节点拆开保存在elements数组里
            var childElement = [];              //存放临时节点的数组，解决被覆盖的问题
            var node = [];                     //用来存放父节点
            for(var i=0; i<elements.length;i++){
                if (node.length == 0){
                    node.push(document);
                }
                switch (elements[i].charAt(0)){
                    case '#':
                        childElement = [];           //清理掉临时节点，让父节点失效，子节点有效
                        childElement.push(this.getId(elements[i].substring(1)));
                        node = childElement;        //保存父节点，childElement要清理，故创建子节点
                        break;
                    case '.':
                        childElement = [];
                        for(var j = 0;j<node.length;j++){
                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for (var k = 0;k<temps.length;k++){
                                childElement.push(temps[k]);
                            }
                        }
                        node = childElement;
                        break;
                    default:
                        childElement = [];
                        for(var j = 0;j<node.length;j++){
                            var temps = this.getTag(elements[i],node[j]);
                            for (var k = 0;k<temps.length;k++){
                                childElement.push(temps[k]);
                            }
                        }
                        node = childElement;
                }
            }
            this.elements = childElement;
        }else {
            //封装CSS选择器:find模拟
            switch (args.charAt(0)){
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTag(args);
            }
        }
    }else if(typeof args == 'object'){
        if (args != undefined){   //_this是一个对象，undefined也是一个对象，typeof将与'undefined'比较
            this.elements[0]=args;
        }
    }else if(typeof args == 'function'){
        this.ready(args);
    }
};

//在DOM加载完之后执行
Base.prototype.ready = function(fn){
    addDomLoaded(fn);
}
//设置CSS选择器子节点
Base.prototype.find = function(str){
    var childElement = [];
    for (var i = 0;i<this.elements.length;i++){
        switch (str.charAt(0)){
            case '#':
                childElement.push(document.getId(str.substring(1)));
                break;
            case '.':
                //思路：找到所有的元素，意义比较是否是根据class查找的元素
                /*var clazz = this.getElementsByTagName('*');
                for (var j = 0; j<clazz.length;j++){
                    if (str.substring(1) == clazz[j].className)
                        childElement.push(clazz[j]);
                }*/
                var temps = this.getClass(str.substring(1),this.elements[i]);
                for (var j = 0; j<temps.length; j++){
                    childElement.push(temps[j]);
                }
                break;
            default:
                //父级可以通过getElementByTagName来获取子元素
                /*var tags = this.elements[i].getElementsByTagName(str);
                for (var j = 0; j<tags.length;j++){
                    childElement.push(tags[j]);
                }*/
                var temps = this.getTag(str,this.elements[i]);
                for (var j = 0; j<temps.length; j++){
                    childElement.push(temps[j]);
                }
        }
    }
    this.elements = childElement;
    return this;
};

//通过id获取节点
Base.prototype.getId = function (id) {
    // this.elements.push(document.getElementById(id));
    return document.getElementById(id);
};
//通过CLASS获取节点
Base.prototype.getClass = function(className,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for(var i = 0;i<all.length;i++){
        // if(all[i].className == className){
        if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
            temps.push(all[i]);
        }
    }
    return temps;
};
//通过标签名获取节点
Base.prototype.getTag = function(tag,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for (var i = 0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
};
//获取节点数组中的某一个并且返回节点对象
Base.prototype.ge = function(num){
    return this.elements[num];
};

//获取首个节点对象并返回这个节点对象
Base.prototype.first = function(){
    return this.elements[0];
};

//获取末个节点对象并返回这个节点对象
Base.prototype.last = function(){
    return this.elements[this.elements.length - 1];
};

//返回某一个节点并且返回这个节点对象??????
Base.prototype.eq = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};

/*获取某组节点的数量*/
Base.prototype.length = function(){
    return this.elements.length;
};

/*获取某一节点的属性*/
Base.prototype.attr = function(attr,value){
    for (var i = 0;i<this.elements.length;i++){
        if(arguments.length == 1){
            return this.elements[i].getAttribute(attr);
        }else if(arguments.length == 2){
            this.elements[i].setAttribute(attr,value);
        }
    }
    return this;
};

/*获取某一个节点在当前节点组中是第几个索引*/
Base.prototype.index = function(){
    //得到当前节点的父节点
    var children = this.elements[0].parentNode.children;
    for(var i = 0; i < children.length; i++){
        if(this.elements[0] == children[i]){
            return i
        }
    }
}

/*设置节点元素的透明度*/
Base.prototype.opacity = function (num) {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].style.opacity = num / 100;
        this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
    }
    return this;
};
//获取当前节点的下一个元素节点
Base.prototype.next = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i].nextSibling;
        if (this.elements[i] == null) throw new Error('找不到下一个同级元素节点！');
        if (this.elements[i].nodeType == 3) this.next();
    }
    return this;
};

//获取当前节点的上一个元素节点
Base.prototype.prev = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i].previousSibling;
        if (this.elements[i] == null) throw new Error('找不到上一个同级元素节点！');
        if (this.elements[i].nodeType == 3) this.prev();
    }
    return this;
}

/*设置css属性*/
Base.prototype.css = function(attr,value){
    for (var i = 0;i<this.elements.length;i++){
        if(arguments.length == 1){
            return getStyle(this.elements[i],attr);
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
/*设置innerText*/
Base.prototype.Text = function(text){
    for(var i = 0;i<this.elements.length;i++){
        if (arguments.length == 0){
            return this.getInnerText(this.elements[i]);
        }
        this.setInnerText(this.elements[i],text);
    }
    return this;
};

/*跨浏览器获取innerText*/
Base.prototype.getInnerText = function(element){
    return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
};

/*跨浏览器设置innerText*/
Base.prototype.setInnerText = function(element,text){
    if(typeof element.textContent == 'string') {
        element.textContent = text;
    }else {
        element.innerText = text;
    }
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
        if(!hasClass(this.elements[i],className)){
            this.elements[i].className +=' '+ className;
        }
    }
    return this;
};
//移除class样式
Base.prototype.removeClass = function(className){
    for(var i = 0;i<this.elements.length;i++){
        if(hasClass(this.elements[i],className)){
            this.elements[i].className =this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
        }
    }
    return this;
};
//鼠标的移入移出事件
Base.prototype.hover = function(over,out){
    for (var i = 0;i<this.elements.length;i++){
        // this.elements[i].onmouseover = over;
        // this.elements[i].onmouseout = out;
        addEvent(this.elements[i],'mouseover',over);
        addEvent(this.elements[i],'mouseout',out);
    }
    return this;
};
//设置物体居中
Base.prototype.center = function(width,height){
    var top = (getInner().height-height)/2;
    var left = (getInner().width-width)/2;
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
};
//触发浏览器窗口事件
Base.prototype.resize = function(fn){
    for (var i = 0;i<this.elements.length;i++){
        var element = this.elements[i];
        addEvent(window,'resize',function () {
            fn();
            //计算宽度和高度，让浏览器窗口缩放时目标物体也能在缩放的范围之内
            if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth){
                element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
            }
            if (element.offsetTop > getInner().height + getScroll().top - element.offsetHeight){
                element.style.top = getInner().height + getScroll().top  - element.offsetHeight + 'px';
            }
        });
    }
    return this;
};
//锁屏功能
Base.prototype.lock = function(){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style.width = getInner().width + getScroll().left + 'px';
        this.elements[i].style.height = getInner().height + getScroll().top + 'px';
        this.elements[i].style.display = 'block';
        //滚动条
        document.body.style.overflow = 'hidden';
    }
    return this;
};
//取消锁屏功能
Base.prototype.unlock = function(){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    return this;
};
//添加link规则
Base.prototype.addRule = function (num,selectorText,cssText,position){
    var sheet = document.styleSheets[num];
    insertRule(sheet,selectorText,cssText,position);
    return this;
};
//移除link规则
Base.prototype.delete = function(num,index){
    var sheet = document.styleSheets[num];
    insertRule(sheet,index);
    return this;
};

//元素的显示
Base.prototype.show = function(){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
};

//元素的隐藏
Base.prototype.hide = function(){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
};
//设置动画(属性，增量，停止点，时间)left:左为负值target比本身小，右反之；top:上为正类似
Base.prototype.animate = function(
    // attr,start,step,target,t
        obj  ){
    for (var i = 0;i<this.elements.length;i++){
        // this.elements[i]每次循环不认识了
        var elm = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
            obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
                obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

        var start = obj['start'] != undefined ? obj['start'] :
            attr == 'opacity' ? parseFloat(getStyle(elm,attr))*100 : parseInt(getStyle(elm, attr));//可选

        var t = obj['t'] != undefined ? obj['t'] : 50;             //可选，默认50毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 10;      //可选，增量为10像素

        var speed = obj['speed'] != undefined ? obj['speed'] : 6; //缓冲值
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer'; //可选，0表示匀速
        //接收多组键值对
        var mul = obj['mul'];
        //增量和目标量两种方案
        var alter = obj['alter'];
        var target = obj['target'];
        if (alter != undefined && target == undefined) { //增量有值，目标量无值
            target = alter + start;
        } else if (alter == undefined && target == undefined && mul == undefined) { //增量和目标量都无值
            throw new Error('alter 增量或者 target 目标量必须传递一个！');
        }

        if(start > target){
            step = -step;
        }

        if(attr=="opacity"){
            elm.style.opacity = parseInt(start)/100;
            elm.style.filter = "alpha(opacity="+parseInt(start)+")";
        }else {
            // elm.style[attr] = start + "px";
        }

        //如果是单个动画
        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }
        //解决多次触发速度累加的问题
        clearInterval(elm.timer);
        elm.timer = setInterval(function () {
            //标志位：了解多个动画是否全部执行完毕
            var flag = true;

            for (var i in mul) {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ?
                    'opacity' : i != undefined ? i : 'left';
                target = mul[i];

                //缓冲
                if (type == 'buffer') {
                    var step = attr == 'opacity' ? (target - parseFloat(getStyle(elm, attr)) * 100)/speed :
                        (target - parseInt(getStyle(elm, attr)))/speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }
                if (attr == 'opacity') {
                    //判断target的位置来决定移动的方向，无需增量的正负
                    if (step == 0){
                        setOpcity();
                    }else if(step > 0 && Math.abs(parseFloat(getStyle(elm, attr))*100 - target) <= step){
                        setOpcity();
                    }else if(step < 0 && (parseInt(getStyle(elm, attr))*100 - target) <= Math.abs(step)) {
                        setOpcity();
                    }else{
                        var temp = parseFloat(getStyle(elm,attr)) * 100;
                        elm.style.opacity = parseInt(temp+step)/100 ;
                        elm.style.filter = 'alpha(opacity=' +parseInt(temp+step)+')';
                    }
                    if(parseInt(target) != parseInt(parseFloat(getStyle(elm,attr))*100))
                        flag = false;
                }else {
                    //判断target的位置来决定移动的方向，无需增量的正负
                    if (step == 0){
                        setTarget();
                    }
                    else if(step > 0 && Math.abs(parseInt(getStyle(elm, attr)) - target) <= step){
                        setTarget();
                    }else if(step < 0 && (parseInt(getStyle(elm, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    }else{
                        elm.style[attr] = parseInt(getStyle(elm, attr)) + step + 'px';
                    }

                    if(parseInt(target) != parseInt(getStyle(elm,attr))) flag = false;
                }
            }
            if(flag){
                //清理定时器和执行列队动画
                clearInterval(elm.timer);
                if(obj.fn) obj.fn();
            }
        },t);
        function setTarget() {
            elm.style[attr] = target + 'px';
        }

        function setOpcity() {
            elm.style.opacity = parseInt(target) /100;
            elm.style.filter = 'alpha(opacity=' +parseInt(target)+')';
        }
    }
    return this;
};

/* 切换 */
Base.prototype.toggle = function(){
    for (var i = 0;i<this.elements.length;i++){
        /*一个自我执行的闭包函数*/
        (function (element,args) {
            var count = 0;
            addEvent(element,'click',function () {
                //求余运算，一直在0~count-1之间循环
                args[count++ % args.length].call(this);
            });
        })(this.elements[i],arguments);
    }
    return this;
};

/*设置事件发生器*/
Base.prototype.bind = function(event,fn){
    for (var i = 0;i<this.elements.length;i++){
        addEvent(this.elements[i],event,fn);
    }
    return this;
};
/*设置表单字段元素*/
Base.prototype.form = function(name){
    for (var i = 0;i<this.elements.length;i++){
        this.elements[i] = this.elements[i][name];
    }
    return this;
};

/*设置表单字段内容获取*/
Base.prototype.value = function(text){
    for(var i = 0;i<this.elements.length;i++){
        if (arguments.length == 0){
            return this.elements[i].value;
        }
        this.elements[i].value = text;
    }
    return this;
};
//插件入口,不是特别常用，减少加载的容量
Base.prototype.extend = function (name,fn) {
    Base.prototype[name] = fn;
};


