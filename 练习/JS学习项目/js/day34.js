/*window.onload = function () {
    // $('#box').css('color','orange');
    // $('.cl').css('color','blue');
    // $('div').find('p').css('color','green');
    // $('div').find('.c1').css('color','red');
    // $('div').find('p').css('color','red');
    //find实现的结果
    // $('#box').find('p').find('.a').css('color','blue');
    //升级语法
    $('#pox span').css('color','green');
};*/
//浏览器检测
(function () {
    window.sys = {};                                 //创建全局变量，一边外部访问保存浏览器信息对象
    var ua = navigator.userAgent.toLowerCase();     //得到浏览器信息字符串
    var s;                                          //浏览器信息数组，浏览器名称+版本
    if ((/msie ([\d.]+)/).test(ua)) { //判断 IE 浏览器
        s = ua.match(/msie ([\d.]+)/);
        sys.ie = s[1];
    }
    if ((/firefox\/([\d.]+)/).test(ua)) { //判断火狐浏览器
        s = ua.match(/firefox\/([\d.]+)/);
        sys.firefox = s[1];
    }
    if ((/chrome\/([\d.]+)/).test(ua)) { //判断谷歌浏览器
        s = ua.match(/chrome\/([\d.]+)/);
        sys.chrome = s[1];
    }
    if ((/opera.*version\/([\d.]+)/).test(ua)) { //判断 opera 浏览器
        s = ua.match(/opera.*version\/([\d.]+)/);
        sys.opera = s[1];
    }
    if ((/version\/([\d.]+).*safari/).test(ua)) { //判断 safari 浏览器
        s = ua.match(/version\/([\d.]+).*safari/);
        sys.safari = s[1];
    }
    alert(sys.chrome);
})();

//浏览器检测
/*
(function (){
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    alert(s);
})();*/
