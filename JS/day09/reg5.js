/*
//1.检查邮政编码
var str = '224000';       //必须是6位必须是数字，第一位不能为0
var pattern = /[1-9][0-9]{5}/;
alert(pattern.test(str));



//3 删除多余空格
var str = '123 345  12';
var pattern = /\s/g;
alert(str.replace(pattern,''));

//4.1删除首尾空格(首尾分开匹配)繁琐
var str = '        123 345  12         ';
var pattern = /^\s+/;
var result = str.replace(pattern,'');
pattern = /\s+$/;
result = result.replace(pattern,'');
alert('|'+result+'|');

//4.2非贪婪模式去除首尾空格
var str = '     123  45        ';
var pattern = /^\s+(.+?)\s+$/;
alert('|'+pattern.exec(str)[1]+'|');


//4.3分组模式去除首尾空格
var str = '     123  45        ';
var pattern = /^\s+(.+?)\s+$/;
alert(str.replace(pattern,'$1'));

//5.电子邮件验证
var str = 'yaoxxx@xxx.com';        //@不需要转义吗？
var pattern = /^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/;
alert(pattern.test(str));

*/
//2.检查文件压缩包
var str = '213.rar';        //字母数字下划线，zip/gz/rar/7z
var pattern = /^[\w]+\.(zip|gz|rar)$/;   //选择符必须必须用分组符号包括起来
alert(pattern.exec(str));