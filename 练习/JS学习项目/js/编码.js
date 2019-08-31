/*1、设置10秒倒计时
window.onload = function () {
    var i = 10;
    var timer = setInterval(function(){
        if(i== -1){
            clearInterval(timer);
        }else{
            //会显示一串数字：document.write(i);
            document.body.innerHTML = i;
            --i;
        }
    },1000);
}*/

/*2、为一个文本框设置字数限制
function demo() {
    var textarea = document.getElementById('text');
    var text = textarea.value;
    var sp = document.getElementById('info');
    if(text.length>9){
        //注意：这里不能用innerHTML和innerText
        textarea.value = text.slice(0,10);
        sp.innerHTML = "还能输入0个字";
    }else{
        var num = 9-text.length;
        sp.innerHTML="还能输入"+num+"个字";
    }
}*/

/*3、实现多选框的全选、反选和不选
function All() {
    //注意函数的命名，不能与关键字保留字等冲突
    var checks = document.getElementsByTagName('input');
    for(var i = 0; i < checks.length; i++){
        checks[i].checked=true;
    }
}
function lla() {
    var checks = document.getElementsByTagName('input');
    for(var i = 0; i < checks.length; i++){
        if(checks[i].checked==false){
            checks[i].checked=true;
        }else {
            checks[i].checked=false;
        }
    }
}
function  no() {
    var checks = document.getElementsByTagName('input');
    for(var i = 0; i < checks.length; i++){
        checks[i].checked = false;
    }
}*/

/*4、模拟电量显示
function  demo() {
    var num = 0;
    var son = document.getElementById('son');
    var width = parseInt(document.getElementById('fa').style.width);
    var span = document.getElementById('span');
    var time = setInterval(function () {
        if(num > width){
            clearInterval(time);
        }else{
            son.style.width = num +'%';
            span.innerHTML = num + '%';
            num += width/100;
        }
    },250);
}*/

/*5、免费发送验证码倒计时
function demo(){
    var bu= document.getElementsByTagName('input')[0];
    var num = 5;
    var timer = setInterval(function () {
        if(num == -1){
            clearInterval(timer);
            bu.disabled = false;
            bu.value = '免费发送验证码';
        }else {
            bu.disabled = true;
            bu.value = '重新发送'+num;
            num--;
        }
    },1000);
}*/

/*6、下拉选择框的移入移出
function  toRightOne() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = 0; i < city.length; i ++) {
        if (fm.city[i].selected == true) {
            info.appendChild(city.options[i]);
        }
    }
}
function  toLeftOne() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = 0; i < info.length; i ++) {
        if (fm.info[i].selected == true) {
            city.appendChild(info.options[i]);
        }
    }
}
function  toRightAll() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = 0; i < city.length; i++) {
        info.appendChild(city.options[i--]);
    }
}
function  toLeftAll() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = 0; i < info.length; i++) {
        city.appendChild(info.options[i--]);
    }
}
/*
function  toRightAll() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = city.length-1; i > -1 ; i--) {
        info.appendChild(city.options[i]);
    }
}
function toLeftAll() {
    var fm= document.getElementById('f1');
    var city = fm.elements['city']; //第一个选择框
    var info = fm.elements['info']; //第二个选择框
    for (var i = info.length-1; i > -1 ; i--) {
        city.appendChild(info.options[i]);
    }
}*/
