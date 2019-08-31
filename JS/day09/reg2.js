// ###正则表达式
//String对象中的正则表达式方法
/*|方法|含义|
|---|---|
|match(pattern)|返回pattern中的子串或null|
|replace(pattern,replacement)|用replacement替换pattern|
|search(pattern)|返回字符串中pattern开始位置|
|split(pattern)|返回字符串按指定pattern拆分的数组|*/

//作用：将匹配的字符串组合成数组返回
/*var pattern = /Box/i;
var str = 'This is a Box!That is a Box！';
alert(str.match(pattern));*/

//返回第一个匹配的位置，无需g全局
/*var pattern = /Box/i;
var str = 'This is a box!That is a Box!';
alert(str.search(pattern));*/

//返回替换后的字符串，与是否全局有关,只有替换，是两个参数
/*var pattern = /Box/g;
var str = 'This is a Box! That is a Box！';
alert(str.replace(pattern,'Tom'));*/

//把一个字符串用正则表达式拆分成数组
/*var pattern = /Box/i;
var str = 'This is a Box!That is a Box！';
alert(str.split(pattern));           //返回分割后的数组This is a ,!Thatis a ,!
alert(str.split(pattern).length);    //长度为3

var pattern = /!/i;
var str = 'This is a Box!That is a Box!';
alert(str.split(pattern));         //输出This is a Box,That is a Box,
alert(str.split(pattern).length);  //长度为3
*/
//RegExp对象的静态属性
/*|属性|短名|含义|
|---|---|---|
|input|$_|当前被匹配的字符串|
|lastMatch|$&|最后一个匹配字符串|
|lastParen|$+|最后一对圆括号内的匹配子串|
|leftContext|$`|最后一次匹配前的子串|
|multiline|$*|用于指定是否所有表达式都用于多行匹配的布尔值|
|rightContext|$'|在上次匹配之后的子串|*/

// var pattern = /Bo(x)/gi;
// var str = 'hello Box！';
// pattern.test(str);               //静态属性，必须先执行，才有效
// alert(RegExp.input);             //hello Box!
// alert(RegExp.lastMatch);         //Box
// alert(RegExp.leftContext);       //hello
// alert(RegExp.rightContext);      //!
// alert(RegExp.multiline);         //undefined
// alert(RegExp.lastParen);         //x
// alert(RegExp['$_']);

//RegExp的实例属性
/*|属性|含义|
|---|---|
|global|Boolean值，表示g是否已设置|
|ignoreCase|Boolean值，表示i是否已设置|
|lastIndex|整数，代表下次匹配将从哪里字符位置开始|
|multiline|Boolean值，表示m是否已设置|
|source|正则表达式的源字符串形式|*/

var pattern = /Box/igm;
var str = 'hello box!';
alert(pattern.global);              //true
alert(pattern.ignoreCase);          //true
pattern.test(str);
alert(pattern.lastIndex);           //9
alert(pattern.multiline);           //true
alert(pattern.source);              //Box