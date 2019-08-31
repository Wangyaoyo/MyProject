/*var reg = new RegExp('Box');    //第一个参数是模式字符串
alert(reg);              //输出/Box/是正则表达式的字面量表示法
var reg = new RegExp('Box','gi');    //第二个参数可选：模式修饰符*/
// var pattern = /Box/ig;          //字面量方式：输出/Box/ig
// var str = 'box';
// alert(pattern.test(str));
// var pattern = new RegExp('Box');    //模式
// var str = 'box';                   //字符串
// alert(pattern.test(str));          //返回的是false,因为大小写不一致

// var pattern = new RegExp('Box','i');
// var str = 'box';
// alert(pattern.test(str));            //忽略大小写就返回true

// alert(/Box/i.test('box'));        //一句话匹配

// var pattern = /Box/i;
// var str = 'This is a box';
// alert(pattern.test(str));         //是字符串==所做不到的

var pattern = /Box/i;
var str = 'box';
alert(pattern.exec(str));           //匹配到返回匹配到的数组
var str1 = 'sss';                   
alert(pattern.exec(str1));          //匹配不到返回null
alert(typeof pattern.exec(str));    //返回的是Object