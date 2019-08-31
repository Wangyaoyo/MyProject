/*
* 1、支持统一元素的同一事件可以绑定多个监听函数
*/
window.onload = function () {
    var btn = document.getElementById('btn');
    //1与2解决了1、同时绑定多个函数2、标准event
    // 未解决：1无法删除事件  2无法顺序执行  3IE的现代事件存在内存泄漏问题
    //2、多次注册同一函数被忽略(封装跨浏览器删除事件)
    // addEvent(btn,'click',fn);
    //removeEvent(btn,'click',fn);
    // addEvent(btn,'click',fn);
    // addEvent(btn,'click',fn);

    //封装传统的事件绑定，解决了IE无法顺序执行的问题
    // addEvent(btn,'click',fn1);
    // addEvent(btn,'click',fn2);
    // addEvent(btn,'click',fn3);
    // removeEvent(btn,'click',fn1);
    //为解决this传递问题：我们需要使用匿名函数+传递函数参数的方式来解决：
    // var a = document.getElementById('a');
    //取消默认行为（链接的跳转）
    // addEvent(a,'click',function (e) {
    //     e.preventDefault();
    // });
    //取消冒泡
    addEvent(btn,'click',function (e) {
        e.stopPropagation();
        alert('btn');
    });
    addEvent(document,'click',function (e) {
        alert('document');
    });
}
function fn1(e) {
    document.getElementById('s').innerHTML += '1';
    document.getElementById('s').innerHTML += this.value;
}
function fn2(e) {
    document.getElementById('s').innerHTML += '2';
    document.getElementById('s').innerHTML += this.value;
}
function fn3(e) {
    document.getElementById('s').innerHTML += '3';
    document.getElementById('s').innerHTML += this.value;
}