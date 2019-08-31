##基本包装类型
####学习要点：
- #####概述
- #####Boolean类型
- #####Number类型
- #####String类型

#####包装类型的作用：
```java
//不常用
var box = new String('Mr . yaoxxx');
box.name = 'yaoxxx';
box.age = function(){
	return 100;
};
alert(box);
alert(typeof box);                //Object
alert(box.substring(2));         //从第二个位置开始截取到最后，索引从0开始
alert(box.name);                 //自定义属性  有效
alert(box.age());                //自定义方法  有效
```

####Number类型

- #####var box = 1000;
|属性|描述|
|---|---|
|box.toString();       |        //转化为字符串|
|box.toLocaleString();  |       //1,000|
|box.toFixed(2);     |          //小数点后保留两位|
|box.toExponential();    |      //以指数形式表示并转化为字符串|
|box.toPrecision(2);  |      //根据传参来决定指数或者点数  |

####String类型
- #####String对象属性
|属性|描述|
|---|---|
|length|返回字符串的字符长度|
|constructor|返回创建String对象的函数|
|prototype|通过添加属性和方法扩展字符串定义|

- #####var box = 'Mr.yaoxxx';
|字符方法|描述|
|---|---|
|box.charAt(1);|返回指定下标的值|
|box.charCodeAt(4)|返回指定位置字符的ASC码|

- #####字符串操作方法
| 方法| 描述 |
|--------|--------|
|concat(str1,str2)|将字符串拼接|不改变原来的字符串
|slice(4,6)|从4到6前闭后开|不改变原来
|substring(4,6)|与slice()相同作用|不改变原来
|substr(4,6)|从4开始的6个字符|不改变原来
|slice(4)|同下
|substring(4)|从第四位开始的所有
|substr(4)|同上

- #####字符串位置方法
| 方法 | 描述 |
|--------|--------|
| indexOf(str,n)|从n开始搜索的第一个str的位置|
|lastIndexOf(str,n)|从n开始搜索的最后一个str的位置|
==均返回索引值，没有n这个参数的时候默认从0开始==
#####示例：
```java
//找到字符串中所有的'W'
var arr = [];
var x = box.indexOf('W');
while(x > -1){
    arr.push(x);
    x = box.indexOf('W',x+1);
}
alert(arr);
```
- 大小写转换方法
|方法|描述|
|--------|--------|
|toLowerCase(str)|将字符串全部被转换为小写|
|toUpperCase(str)|将字符串全部被转换为大写|
|toLocaleLowerCase(str)|将字符串全部被转换为小写,并且本地化|无区别
|toLocaleUpperCase(str)|将字符串全部被转换为大写，并且本地化|无区别
- 字符串的模式匹配(四个函数)
|方法|描述|
|---|---|
|String.fromCharCode(asc码)|静态方法，输出asc码对应字符|
|localeCompare(str1,str2)|比较两个字符串，并返回相应的值|  ？？？？？
```java
var box = 'Lee';
box.localeCompare('zoo');    //-1
box.localeCompare('aoo');    //1
1、相等，返回0
2、字符串在字母表中排在字符串参数之前，返回负数，-1
3、之后，返回正数，1
```
- 通过JS生成一个HTML标签
var box = '百度'；
box.link('www.baidu.com');  //<a href="www.baidu.com">百度</a>
box.bold();   //<b>百度</b>