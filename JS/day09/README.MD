## 正则表达式（上）
####学习要点
- #####创建方式
- #####参数的意义
- #####匹配的方法

#####作用：用来验证输入客户端的输入数据，客户端的验证，可以节约大量的服务器端的系统资源
 #### 创建正则的两种方式
##### 方式一：new关键字
```java
var reg = new RegExp('Box');    //第一个参数是模式字符串
alert(reg);                    //输出/Box/是正则表达式的字面量表示法
var reg = new RegExp('Box','gi');    //第二个参数可选：模式修饰符
```
#####模式匹配的可选参数

|参数|含义|
|---|---|
|i|忽略大小写|
|g|全局匹配|
|m|多行匹配|
##### 方式二：字面量方式

```java
var pattern = /Box/ig;          
var str = 'box';
alert(pattern.test(str));
```
#### 匹配正则表达式的方法
##### RegExp对象的方法
|方法|功能|
|---|---|
|test|在字符串中测试模式匹配，返回true或者false|
|exec|在字符串中执行匹配搜索，返回结果数组|

##### test()用法
```java
var pattern = new RegExp('Box');    //模式
var str = 'box';                   //字符串
alert(pattern.test(str));          //返回的是false,因为大小写不一致

var pattern = new RegExp('Box','i');
var str = 'box';
alert(pattern.test(str));            //忽略大小写就返回true

alert(/Box/i.test('box'));        //一句话匹配

var pattern = /Box/i;
var str = 'This is a box';
alert(pattern.test(str));         //是字符串==所做不到的
```
##### exec()用法
```java
var pattern = /Box/i;
var str = 'box';
alert(pattern.exec(str));           //匹配到返回匹配到的数组
var str1 = 'sss';
alert(pattern.exec(str1));          //匹配不到返回null
alert(typeof pattern.exec(str));    //返回的是Object
```
### 正则表达式

#### 学习要点

- String对象中的正则方法
- RegExp的静态属性
- RegExp的实例属性

#### String对象中的正则表达式方法

| 方法                         | 含义                              |
| ---------------------------- | --------------------------------- |
| match(pattern)               | 返回pattern中的子串或null         |
| replace(pattern,replacement) | 用replacement替换pattern          |
| search(pattern)              | 返回字符串中pattern开始位置       |
| split(pattern)               | 返回字符串按指定pattern拆分的数组 |

```java
//作用：将匹配的字符串组合成数组返回
/*var pattern = /Box/i;
var str = 'This is a Box!That is a Box！';
alert(str.match(pattern));*/
```

```java
//返回第一个匹配的位置，无需g全局
/*var pattern = /Box/i;
var str = 'This is a box!That is a Box!';
alert(str.search(pattern));*/
```

```java
//返回替换后的字符串，与是否全局有关,只有替换，是两个参数
/*var pattern = /Box/g;
var str = 'This is a Box! That is a Box！';
alert(str.replace(pattern,'Tom'));*/
```

```java
//把一个字符串用正则表达式拆分成数组
var pattern = /Box/i;
var str = 'This is a Box!That is a Box！';
alert(str.split(pattern));           //返回分割后的数组This is a ,!Thatis a ,!
alert(str.split(pattern).length);    //长度为3

var pattern = /!/i;
var str = 'This is a Box!That is a Box!';
alert(str.split(pattern));         //输出This is a Box,That is a Box,
alert(str.split(pattern).length);  //长度为3
```

#### RegExp对象的静态属性

| 属性         | 短名 | 含义                                         |
| ------------ | ---- | -------------------------------------------- |
| input        | $_   | 当前被匹配的字符串                           |
| lastMatch    | $&   | 最后一个匹配字符串                           |
| lastParen    | $+   | 最后一对圆括号内的匹配子串                   |
| leftContext  | $`   | 最后一次匹配前的子串                         |
| multiline    | $*   | 用于指定是否所有表达式都用于多行匹配的布尔值 |
| rightContext | $'   | 在上次匹配之后的子串                         |

##### 使用：

```java
var pattern = /Bo(x)/gi;
var str = 'hello Box！';
pattern.test(str);               //静态属性，必须先执行，才有效
alert(RegExp.input);             //hello Box!
alert(RegExp.lastMatch);         //Box
alert(RegExp.leftContext);       //hello
alert(RegExp.rightContext);      //!
alert(RegExp.multiline);         //undefined
alert(RegExp.lastParen);         //x
alert(RegExp['$_']);
```

#### RegExp的实例属性

| 属性       | 含义                                   |
| ---------- | -------------------------------------- |
| global     | Boolean值，表示g是否已设置             |
| ignoreCase | Boolean值，表示i是否已设置             |
| lastIndex  | 整数，代表下次匹配将从哪里字符位置开始 |
| multiline  | Boolean值，表示m是否已设置             |
| source     | 正则表达式的源字符串形式               |

##### 使用：

```java
var pattern = /Box/igm;
var str = 'hello box!';
alert(pattern.global);              //true
alert(pattern.ignoreCase);          //true
pattern.test(str);
alert(pattern.lastIndex);           //9
alert(pattern.multiline);           //true
alert(pattern.source);              //Box
```

## 正则表达式

#### 学习要点：

- 获取控制

正则表达式元字符包含特殊含义：可以控制匹配模式的方式

|元字符/元符号|匹配情况|
|-----|-----|
|.|匹配除换行符外的任意字符|
|[a-z]|匹配括号中的字符集中的任意字符|
|[^a-z]|不在括号中的字符集中的字符|
|\d|匹配数字|
|\D|匹配非数字|
|\w|匹配字母数字以及下划线|
|\W|匹配非字母非数字以及非下划线|

##### 空白字符

| 元字符/元符号 | 匹配情况     |
| ------------- | ------------ |
| \0            | 匹配null字符 |
| \b            | 匹配空格字符 |
| \f            | 匹配进制字符 |
|\n|换行符|
|\r|回车字符|
|\s|空白字符、空格、制表符和换行符|
|\S|匹配非空白字符|

##### 锚字符

| 元字符/元符号 | 匹配情况 |
| ------------- | -------- |
| ^             | 行首匹配 |
| $             | 行尾匹配 |

##### 重复字符

| 元字符/元符号 | 匹配情况          |
| ------------- | ----------------- |
| x?            | 匹配0个或多个x    |
| x*            | 0个1个或多个      |
| x+            | 1个或多个         |
| (xyz)+        | 至少匹配一个(xyz) |
| x{m,n}        | 最少m个，最多n个x |
| x{m}          | 匹配m个           |

## 正则表达式

#### 记录字符

| 元字符/元符号 | 匹配情况               |
| ------------- | ---------------------- |
| (string)      | 用于反向引用的分组     |
| \1或$1        | 匹配第一个分组中的内容 |
| \2或$2        | 匹配第二个分组中的内容 |
| \3或$3        | 匹配第三个分组中的内容 |

#### \s、\b、{n,m}、|、()的用法

```java
var pattern = /goo\sgle/;           //\s表示空格匹配
var str = 'goo gle';
alert(pattern.test(str));

var pattern = /google\b/;           //\b匹配是否到达边界
var str = 'google';
alert(pattern.test(str));

var pattern = /google|baidu|taobao/;
var str = 'google';
var str = 'This is baidu';
alert(pattern.test(str));            //true

var pattern = /google{4,8}/;         //匹配e4-8次
var str = 'googleeeeee';
alert(pattern.test(str));

var pattern = /(google){4,8}/;       //匹配google4-8次，分组的作用
var str = 'googlegooglegooglegoogle';
alert(pattern.test(str));
```

#### $1获取匹配到的内容

```java
var pattern = /8(.*)8/;
var str = '8google8';
pattern.test(str)
alert(RegExp.$1);         //输出google表示获取模式中第一个分组对应的匹配字符串

var pattern = /8(.*)8/;
var str = 'It is 8what we want strong8!';
pattern.test(str);        //$1获取第一个分组匹配到的字符串
document.write(str.replace(pattern,'<strong>$1</strong>'));     //document.write()可以将括号中的内容显示在网页上

var pattern = /(.*)\s(.*)/;
var str = 'hello world';
document.write(str.replace(pattern,'$2 $1'));  //位置交换
```

#### 贪婪和惰性

| 贪婪  | 惰性   |
| ----- | ------ |
| +     | +?     |
| ?     | ??     |
| *     | *?     |
| {n}   | {n}?   |
| {n,}  | {n,}?  |
| {n,m} | {n,m}? |

```java
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

var pattern = /8(.*)8/;                       //使用了贪婪
var str = '8google88google88google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));//匹配到了所有，均被加粗
```

#### 禁用贪婪的两种方式1.？2.[ ^前一个字符]

```java
var pattern = /8(.*?)8/g;                      //1.禁用贪婪
var str = '8google8 8google8 8google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));    
//google google google

var pattern = /8([^8].*?)8/g;                  //2.禁用贪婪
var str = '8google8 8google8 8google8';
document.write(str.replace(pattern,'<strong>$1</strong>'));    
//google google google
```

#### 使用exec返回数组

- 使用分组的exec返回数组的方式

```java
var pattern = /^([a-z]+)\s([0-9]{4})$/;
var str = 'google 2012';
var a = pattern.exec(str);          //返回匹配到的数组
alert(a.length);               //3
alert(a[0]);                   //返回匹配到的整个字符串
alert(a[1]);                   //返回匹配到的第一个分组的字符串
alert(a[2]);                   //返回匹配到的第二个分组的字符串
```

- 捕获性分组

```java
var pattern = /(\d+)([a-z])/;       //捕获性分组，所有的分组都捕获返回
var str = '123abc';
alert(pattern.exec(str));
//a[0]返回123a
//a[1]返回123
//a[2]返回a
```

- 非捕获性分组(?:)

```java
var pattern = /(\d+)(?:[a-z])/;      //非捕获性分组，在不需要捕获的分组加上？：
var str = '123abc';
alert(pattern.exec(str));
//a[0]返回123a
//a[1]返回123
```

- 嵌套分组

```java
//嵌套分组   一般不用
var pattern = /(a?(b?(c?)))/;
var str = 'abc';
alert(pattern.exec(str));
//第一步：a[0],整个匹配到的字符串abc
//第二步：a[1],匹配第一个分组(a?(b?(c?))),abc
//第二步：a[2],匹配第二个分组(b?(c?)),bc
//第三步：a[3],匹配第三个分组(c?),c
```

- 前瞻匹配

```java
var pattern = /goo(?=gle)/;        //前瞻性匹配：goo后面必须是gle才会返回goo,注意返回值是goo,不是gle
//var str = 'goobb';              //null
var str = 'google';
alert(pattern.exec(str));
```

- 特殊字符的匹配

```java
var pattern = /\[/;
var str = '[';
alert(pattern.exec(str));
var pattern = /^\d+/gm;            //要开启换行模式，否则只能替换第一个数字
var str = '1.baidu\n2.google\n3.bing';
alert(str.replace(pattern,'#'));
```

##### 正则的简单运用

```java
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

//2.检查文件压缩包
var str = '213.rar';        //字母数字下划线，zip/gz/rar/7z
var pattern = /^[\w]+\.(zip|gz|rar)$/;   //选择符必须必须用分组符号包括起来
alert(pattern.exec(str));
```