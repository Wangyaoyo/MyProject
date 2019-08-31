/*var pattern = /goo\sgle/;           //\s表示空格匹配
var str = 'goo gle';
alert(pattern.test(str));

var pattern = /google\b/;           //\b匹配是否到达边界
var str = 'google';
alert(pattern.test(str));

var pattern = /google|baidu|taobao/;           //\b匹配是否到达边界
var str = 'google';                            //true
var str = 'This is baidu';                             //true
alert(pattern.test(str));

var pattern = /google{4,8}/;           //匹配e4-8次
var str = 'googleeeeee';
alert(pattern.test(str));

var pattern = /(google){4,8}/;           //匹配google4-8次，分组的作用
var str = 'googlegooglegooglegoogle';
alert(pattern.test(str));

var pattern = /8(.*)8/;           
var str = '8google8';
pattern.test(str)
alert(RegExp.$1);           //输出google表示获取模式中第一个分组对应的匹配字符串

var pattern = /8(.*)8/;
var str = 'It is 8what we want strong8!';
pattern.test(str);                                              //$1获取第一个分组匹配到的字符串
document.write(str.replace(pattern,'<strong>$1</strong>'));     //document.write()可以将括号中的内容显示在网页上

var pattern = /(.*)\s(.*)/;
var str = 'hello world';
document.write(str.replace(pattern,'$2 $1'));          //位置交换

var pattern = /[a-z]+/;                      //贪婪模式：匹配所有字符
var str = 'helloworld';
document.write(str.replace(pattern,'1'));    //1

var pattern = /[a-z]+?/;                     //惰性模式：只匹配上了一个字符
var str = 'helloworld';
document.write(str.replace(pattern,'1'));    //1elloword

var pattern = /[a-z]+/g;                     //全局下的贪婪：匹配所有字符
var str = 'helloworld';
document.write(str.replace(pattern,'1'));    //1

var pattern = /[a-z]+?/g;                     //全局下的惰性：匹配一个字符
var str = 'helloworld';
document.write(str.replace(pattern,'1'));    //1111111111每一个字符都被替换成了1

var pattern = /8(.*)8/;                                        //使用了贪婪
var str = '8google88google88google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));    //匹配到了所有，均被加粗

var pattern = /8(.*?)8/g;                                       //1.禁用贪婪
var str = '8google8 8google8 8google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));    
//google google google

var pattern = /8([^8].*?)8/g;                                   //2.禁用贪婪
var str = '8google8 8google8 8google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));    
//google google google

*/


/*
//使用分组的exec返回数组的方式
var pattern = /^([a-z]+)\s([0-9]{4})$/;
var str = 'google 2012';
var a = pattern.exec(str);          //返回匹配到的数组
alert(a.length);               //3
alert(a[0]);                   //返回匹配到的整个字符串
alert(a[1]);                   //返回匹配到的第一个分组的字符串
alert(a[2]);                   //返回匹配到的第二个分组的字符串

var pattern = /(\d+)([a-z])/;       //捕获性分组，所有的分组都捕获返回
var str = '123abc';
alert(pattern.exec(str));
//a[0]返回123a
//a[1]返回123
//a[2]返回a

var pattern = /(\d+)(?:[a-z])/;      //非捕获性分组，在不需要捕获的分组加上？：
var str = '123abc';
alert(pattern.exec(str));
//a[0]返回123a
//a[1]返回123

//嵌套分组   一般不用
var pattern = /(a?(b?(c?)))/;
var str = 'abc';
alert(pattern.exec(str));
//第一步：a[0],整个匹配到的字符串abc
//第二步：a[1],匹配第一个分组(a?(b?(c?))),abc
//第二步：a[2],匹配第二个分组(b?(c?)),bc
//第三步：a[3],匹配第三个分组(c?),c

var pattern = /goo(?=gle)/;        //前瞻性匹配：goo后面必须是gle才会返回goo,注意返回值是goo,不是gle
//var str = 'goobb';   //null
var str = 'google';
alert(pattern.exec(str));

var pattern = /\[/;
var str = '[';
alert(pattern.exec(str));

var pattern = /^\d+/gm;            //要开启换行模式，否则只能替换第一个数字
var str = '1.baidu\n2.google\n3.bing';
alert(str.replace(pattern,'#'));

*/

