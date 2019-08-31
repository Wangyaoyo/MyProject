$(function () {
    //个人中心
    $('#header .menber').hover(function () {
        $(this).css('color','red');
        $('#header ul').show().animate({
            t :30,
            step : 10,
            mul:{
                // o : 100,
                h : 120
            }
        });
    },function () {
        $(this).css('color','black');
        $('#header ul').show().animate({
            attr : 'o',
            start : 50 ,
            target : 0,
            t :30,
            step : 10,
            fn : function () {
                $('#header ul').hide();
            }
        });
    });

    var screen = $('#screen');

    //登录框
    //封装函数（注意：要设置html的宽高）
    var login = $('#login');
    //触发浏览器窗口事件该元素的改变
    login.center(350,250).resize(function () {
        //判断当前状态是否应该遮罩
        if(login.css('display') == 'block'){
            screen.lock();
        }else {
            screen.unlock();
        }
    });
    //解决淡出问题
    //点击关闭窗口消失
    $('#login .close').click(function () {
        login.css('display','none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });
    });
    //点击登录窗口展开
    $('#header .login').click(function () {
        login.center(350,250).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });


    //注册框
    //封装函数（注意：要设置html的宽高）
    var reg = $('#reg');
    //触发浏览器窗口事件该元素的改变
    reg.center(600,550).resize(function () {
        //判断当前状态是否应该遮罩
        if(reg.css('display') == 'block'){
            screen.lock();
        }else {
            screen.unlock();
        }
    });
    //点击关闭窗口消失
    $('#reg .close').click(function () {
        reg.css('display','none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });
    });

    //点击注册窗口展开
    $('#header .reg').click(function () {
        reg.center(600,550).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });


   //滑动导航
    $('#nav .about li').hover(function () {
        var target = $(this).first().offsetLeft;
        $('#nav .nav_bg').animate({
            attr : 'x',
            target : target +20,
            t : 30,
            step : 10,
            fn : function () {
                $('#nav .white').animate({
                   attr : 'x',
                   target:-target
                });
            }
        });
    },function () {
        $('#nav .nav_bg').animate({
            attr : 'x',
            target : 20,
            t : 30,
            step : 10,
            fn : function () {
                $('#nav .white').animate({
                    attr : 'x',
                    target:0
                });
            }
        });
    });

    //左侧菜单
    $('#sidebar h2').toggle(function () {
        $(this).next().animate({
            //高度和透明度的改变
            mul : {
                h:0,
                o:0
            }
        });
    },function () {
        $(this).next().animate({
            mul : {
                h:150,
                o:100
            }
        });
    });

    //拖拽
    login.drag([$('#login h2').first()]);
    reg.drag([$('#reg h2').first()]);

    //百度分享侧栏初始化位置
    $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
    /*addEvent(window,'scroll',function () {
        $('#share').css('top',getScoll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
    });*/
    $(window).bind('scroll',function () {
        /*延迟100毫秒执行：减少抖动*/
        setTimeout(function () {
            $('#share').animate({
                attr : 'y',
                target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2
            });
        },100);
    });
    //百度分享收缩功能
    $('#share').hover(function () {
        $(this).animate({
            attr : 'x',
            target : 0
        });
    }, function () {
        $(this).animate({
            attr : 'x',
            target : -211
        });
    });

    /*初始化表单操作*/
    $('form').first().reset();

    /*表单验证*/
    $('form').form('user').bind('focus',function () {
       $('#reg .info_user').css('display','block');
       $('#reg .error_user').css('display','none');
       $('#reg .succ_user').css('display','none');
    }).bind('blur',function () {
        if(trim($(this).value()) == ''){
            $('#reg .info_user').css('display','none');
            $('#reg .error_user').css('display','none');
            $('#reg .succ_user').css('display','none');
        }else if(!check_user()){
            $('#reg .error_user').css('display','block');
            $('#reg .info_user').css('display','none');
            $('#reg .succ_user').css('display','none');
        }else {
            $('#reg .succ_user').css('display','block');
            $('#reg .error_user').css('display','none');
            $('#reg .info_user').css('display','none');
        }
    });

    function check_user(){
        if(/[\w]{2,20}/.test(trim($('form').form('user').value()))){
            return true;
        }
    }
    /*密码验证*/
    $('form').form('pass').bind('focus',function () {
        $('#reg .info_pass').css('display','block');
        $('#reg .error_pass').css('display','none');
        $('#reg .succ_pass').css('display','none');
    }).bind('blur',function () {
        if(trim($(this).value()) == ''){
            $('#reg .info_pass').css('display','none');
        }else {
            if (check_pass(this)) {
                $('#reg .info_pass').css('display', 'none');
                $('#reg .error_pass').css('display', 'none');
                $('#reg .succ_pass').css('display', 'block');
            } else {
                $('#reg .info_pass').css('display', 'none');
                $('#reg .error_pass').css('display', 'block');
                $('#reg .succ_pass').css('display', 'none');
            }
        }
    });
    /*密码强度验证*/
    $('form').form('pass').bind('keyup',function (){
        check_pass(this);
    });

    /*密码验证函数*/
    function check_pass() {
        var value = trim($('form').form('pass').value());
        var value_length = value.length;
        var code_length = 0;

        //第一个必需条件的验证6-20位之间
        if(value_length >= 6 && value_length <= 20){
            $('#reg .info_pass .q1').html('●').css('color', 'green');
        }else {
            $('#reg .info_pass .q1').html('○').css('color', '#666');
        }

        //第二个必需条件的验证，字母数字和非空字符，任意一个即可
        if(value_length > 0 && !/\s/.test(value)){
            $('#reg .info_pass .q2').html('●').css('color', 'green');
        }else {
            $('#reg .info_pass .q2').html('○').css('color', '#666');
        }
        //第三个必需条件的验证，大写字母、小写字母、数字、非空字符任意两种混拼即可
        if(/[\d]/.test(value)){
            code_length++;
        }
        if (/[a-z]/.test(value)) {
            code_length++;
        }
        if (/[A-Z]/.test(value)) {
            code_length++;
        }
        if (/[^\w]/.test(value)) {
            code_length++;
        }
        if (code_length >= 2) {
            $('#reg .info_pass .q3').html('●').css('color', 'green');
        } else {
            $('#reg .info_pass .q3').html('○').css('color', '#666');
        }
        //安全级别：高：大于等于10个字符，并且三种不同类别的字符混拼  中：8个  低：1个
        if (code_length >= 3 && value_length >= 10) {
            $('#reg .info_pass .s1').css('color', 'green');
            $('#reg .info_pass .s2').css('color', 'green');
            $('#reg .info_pass .s3').css('color', 'green');
            $('#reg .info_pass .s4').html('高').css('color', 'green');
        } else if (code_length >= 2 && value_length >= 8) {
            $('#reg .info_pass .s1').css('color', '#f60');
            $('#reg .info_pass .s2').css('color', '#f60');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html('中').css('color', '#f60');
        } else if (code_length >= 1) {
            $('#reg .info_pass .s1').css('color', 'maroon');
            $('#reg .info_pass .s2').css('color', '#ccc');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html('低').css('color', 'maroon');
        } else {
            $('#reg .info_pass .s1').css('color', '#ccc');
            $('#reg .info_pass .s2').css('color', '#ccc');
            $('#reg .info_pass .s3').css('color', '#ccc');
            $('#reg .info_pass .s4').html(' ').css('color', '#ccc');
        }
        if (value_length >= 6 && value_length <= 20 && code_length >= 2 && !/\s/.test(value)){
            return true;
        }else {
            return false;
        }
    }

    //密码回答
    $('form').form('notpass').bind('focus', function () {
        $('#reg .info_notpass').css('display', 'block');
        $('#reg .error_notpass').css('display', 'none');
        $('#reg .succ_notpass').css('display', 'none');
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_notpass').css('display', 'none');
        } else if (check_notpass()) {
            $('#reg .info_notpass').css('display', 'none');
            $('#reg .error_notpass').css('display', 'none');
            $('#reg .succ_notpass').css('display', 'block');
        } else {
            $('#reg .info_notpass').css('display', 'none');
            $('#reg .error_notpass').css('display', 'block');
            $('#reg .succ_notpass').css('display', 'none');
        }
    });

    function check_notpass(){
        if(trim($('form').form('pass').value()) == trim($('form').form('notpass').value())){
            return true;
        }else{
            return false;
        }
    }
    //回答
    $('form').form('ans').bind('focus', function () {
        $('#reg .info_ans').css('display', 'block');
        $('#reg .error_ans').css('display', 'none');
        $('#reg .succ_ans').css('display', 'none');
    }).bind('blur', function () {
        if (trim($(this).value()) == '') {
            $('#reg .info_ans').css('display', 'none');
        } else if (trim($(this).value()).length >= 2 && trim($(this).value()).length <= 32) {
            $('#reg .info_ans').css('display', 'none');
            $('#reg .error_ans').css('display', 'none');
            $('#reg .succ_ans').css('display', 'block');
        } else {
            $('#reg .info_ans').css('display', 'none');
            $('#reg .error_ans').css('display', 'block');
            $('#reg .succ_ans').css('display', 'none');
        }
    });

    //电子邮件
    $('form').form('email').bind('focus', function () {

        //补全界面
        $('#reg .all_email').css('display','block');

        $('#reg .info_email').css('display', 'block');
        $('#reg .error_email').css('display', 'none');
        $('#reg .succ_email').css('display', 'none');
    }).bind('blur', function () {
        $('#reg .all_email').css('display','none');
        if (trim($(this).value()) == '') {
            $('#reg .info_email').css('display', 'none');
        } else if (/^[\w-\.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))) {
            $('#reg .info_email').css('display', 'none');
            $('#reg .error_email').css('display', 'none');
            $('#reg .succ_email').css('display', 'block');
        } else {
            $('#reg .info_email').css('display', 'none');
            $('#reg .error_email').css('display', 'block');
            $('#reg .succ_email').css('display', 'none');
        }
    });

    //电子邮件补全系统鼠标移入移出效果
    $('#reg .all_email li').hover(function () {
        $(this).css('background','#e5edf2');
        $(this).css('color','#369');
    },function () {
        $(this).css('background','none');
        $(this).css('color','#666');
    });

    /*电子邮件补全系统键入*/
    $('form').form('email').bind('keyup',function (event) {
        var index = 0;

        if($(this).value().indexOf('@') == -1){
            $('#reg .all_email').css('display','block');
            $('#reg .all_email span').html(trim($(this).value()));
        }else{
            $('#reg .all_email').css('display','none');
        }

        $('#reg .all_email li').css('background','none');
        $('#reg .all_email li').css('color','#666');
        if(event.keyCode == 40){
            if(this.index == undefined || this.index >= ($('#reg .all_email li').length()-1)){
                this.index = 0;
            }else{
                this.index++;
            }
            $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
            $('#reg .all_email li').eq(this.index).css('color','#369');
        }
        if(event.keyCode == 38){
            if(this.index == undefined || this.index <= 0){
                this.index = $('#reg .all_email li').length()-1;
            }else{
                this.index--;
            }
            $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
            $('#reg .all_email li').eq(this.index).css('color','#369');
        }
        if(event.keyCode == 13){
            $(this).value($('#reg .all_email li').eq(this.index).Text());
            $('#reg .all_email').css('display','none');
            this.index = undefined;
        }
    });

    /*电子邮件不全系统点击获取*/
     $('#reg .all_email li').bind('mousedown',function () {
         $('form').form('email').value($(this).Text());
     });

     //年月日
    var year = $('form').form('year');
    var month = $('form').form('month');
    var day = $('form').form('day');

    var day30 = [4,6,9,11];
    var day31 = [1,3,5,7,8,10,12];
    //注入年
    for(var i = 1950;i <= 2018;i++){
        year.first().add(new Option(i,i),undefined);
    }
    //注入月
    for(var i = 1;i <= 12;i++){
        month.first().add(new Option(i,i),undefined);
    }

    //注入日
    year.bind('change',select_day);
    month.bind('change',select_day);
    function select_day() {
        if(month.value() != 0 && year.value() != 0){
            //清空之前的选项
            day.first().options.length = 1;

            //不确定的日
            var cur_day = 0;
            if(inArray(day31,parseInt(month.value()))){
                cur_day = 31;
            }else if(inArray(day30,parseInt(month.value()))){
                cur_day = 30;
            }else{
                if(parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 == 0 || parseInt(year.value()) % 400 == 0){
                    cur_day = 29;
                }else {
                    cur_day = 28;
                }
            }
            for(var i = 1;i <= cur_day;i++){
                day.first().add(new Option(i,i),undefined);
            }
        }else {
            //清空之前的选项
            day.first().options.length = 1;
        }
    }

    //备注
    $('form').form('ps').bind('keyup',check_ps).bind('paste',function () {
        //粘贴事件会在内容粘贴进去之前触发
        setTimeout(check_ps,50);
    });

    //清尾
    $('reg .ps .clean').click(function () {
        $('form').form('ps').value($('form').form('ps').value().substring(0,5));
        check_ps();
    });

    //备注字数验证
    function check_ps() {
        var num = 5 - $('form').form('ps').value().length ;
        if(num > 0){
            $('#reg .ps').eq(0).css('display','block');
            $('#reg .ps .num').eq(0).html(num);
            $('#reg .ps').eq(1).css('display','none');
        }else{
            $('#reg .ps').eq(0).css('display','none');
            $('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
            $('#reg .ps').eq(1).css('display','block');
        }
    }

    //提交
    $('form').form('sub').click(function () {
        var flag = true;
        if(!check_user()){
           flag = false;
           $('#reg .error_user').css('display','block');
        }
        if(!check_ps()){
            flag = false;
            $('#reg .error_pass').css('display','block');
        }
        if(!check_notpass()){
            flag = false;
            $('#reg .error_notpass').css('display','block');
        }
        $('form').first().submit();
    });

    /*轮播器初始化*/
    $('#banner img').opacity(0);
    $('#banner img').eq(0).opacity(100);
    $('#banner ul li').eq(0).css('color','#333');
    $('#banner strong').html($('#banner img').eq(0).attr('alt'));

    //轮播器坐标
    for (var i = 0; i < $('#banner img').length(); i ++) {
        $('#banner img').eq(i).css('top', 0 + (i * 150) + 'px');
    }

    //轮播器计数器
    var banner_index = 1;
    /*自动轮播器*/
    var banner_timer = setInterval(banner_fn,1000);

    //轮播器类别
    var banner_type = 2; //1 是透明度轮播，2 是上下滚动轮播

    /*手动轮播器*/
    $('#banner ul li').hover(function () {
        clearInterval(banner_timer);
        if ($(this).css('color') != 'rgb(51, 51, 51)') {
            banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        }
    },function () {
        banner_index = $(this).index() + 1;
        banner_timer = setInterval(banner_fn,1000);
    });

    function banner(obj, prev) {
        if (banner_type == 1) {
            $('#banner img').css('zIndex', 1);
            $('#banner ul li').css('color', '#999');
            $(obj).css('color', '#333');
            $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
            $('#banner img').eq(prev).animate({
                attr : 'o',
                target : 0,
                t : 30,
                step : 10
            });
            $('#banner img').eq($(obj).index()).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).css('top', 0).css('zIndex', 2);
        } else if (banner_type == 2) {
            $('#banner img').opacity(100);
            $('#banner img').css('zIndex', 1);
            $('#banner ul li').css('color', '#999');
            $(obj).css('color', '#333');
            $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
            $('#banner img').eq(prev).animate({
                attr : 'y',
                target : 150,
                t : 30,
                step : 10
            });
            $('#banner img').eq($(obj).index()).animate({
                attr : 'y',
                target : 0,
                t : 30,
                step : 10
            }).css('top', '-150px').css('zIndex', 2);
        }
    }

    function banner_fn() {
        if (banner_index >= $('#banner ul li').length()) banner_index = 0;
        banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ?
            $('#banner ul li').length() - 1 : banner_index - 1);
        banner_index++;
    }

    //问题1：当图片进入到可视区域的时候，将图片的xsrc的地址替换到src即可
    // $('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));

    //问题2：获取图片元素到最外层顶点的距离
    // alert(offsetTop($('.wait_load').first()));

    //问题3：获取页面可视区域的最低点的位置
    // alert(getInner().height + getScoll().top);

    /* 延迟加载 */
    var  wait_load = $('.wait_load');
    wait_load.opacity(0);

    $(window).bind('scroll',_wait_load);
    $(window).bind('resize',_wait_load);

    function _wait_load() {
        setTimeout(function () {
            for (var i = 0;i<wait_load.length(); i++){
                var _this = wait_load.ge(i);
                /*当页面高度+滚动条高度大于图片的高度时，将图片展示*/
                if(getInner().height + getScroll().top >= offsetTop(_this)){
                    $(_this).attr('src',$(_this).attr('xsrc')).animate({
                        attr : 'o',
                        target : 100,
                        t :30,
                        step : 10
                    });
                }
            }
        },100);
    }
    /*图片弹窗*/
    var photo_big = $('#photo_big');
    //触发浏览器窗口事件该元素的改变
    photo_big.center(620,511).resize(function () {
        //判断当前状态是否应该遮罩
        if(photo_big.css('display') == 'block'){
            screen.lock();
        }else {
            screen.unlock();
        }
    });
    $('#photo dl dt img').click(function () {
        photo_big.center(620,511).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    //点击关闭窗口消失
    $('#photo_big .close').click(function () {
        photo_big.css('display','none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function () {
                screen.unlock();
            }
        });
    });



});
