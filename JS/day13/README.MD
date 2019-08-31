## 内置对象：Global和Math.

####一、Global对象：不存在，所有在全局作用域定义的变量和函数，都是Global的属性和方法。它有一些内置的属性和方法

##### 1.URI编码方法：对链接进行编码，以便发送给浏览器。采用特殊的UTF-8编码替换所有无效字符，便于浏览器理解

##### encodeURIComponent(box)编码的更加彻底，故而更常用。

```java
var box = '//W王';
//编码
var a = encodeURI(box);            //  //W%E7%*E%8B
var b = encodeURIComponent(box);   //  %2F%2FW%E7%8E%8B 
//解码
alert(decodeURI(a));
alert(decodeURIComponent(a));
```

#####2.eval()方法：字符串解析器的作用，只接收一个参数，就是要执行的JS代码的字符串

```java
eval('var box = 100');
alert(box);
eval('function box(){return 123;}');
alert(box);
```

##### 注意：参数是一个字符串，eval()固然强大，但它具有安全性问题，不慎会导致代码注入。

##### 3.Global对象属性

##### 包含一些属性：undefined、NaN、Object、Array、Function

```java
alert(Array);                 //返回构造函数
```

##### 4.window对象

Global没办法访问，可以使用window对象来实现全局访问。

```java
alert(window.Array);         //同上
```

#### 二、Math对象

```java
Math.E;                   //2.718281828459045
Math.PI;                  //3.141592653589793

Math.min(1,3,4,5,6);      //1
Math.max(3,2,8,9,0);      //9

Math.ceil(23.4);          //24
Math.floor(23.5);         //23
Math.round(24.5);         //25

Math.random();                       //(0,1)之间的随机数
Math.floor(Math.random()*10+1);      //1-10之间

//实现固定值之间的随机数
function select(start,end){
    var total = end - start +1;
    return Math.floor(Math.random() * total + start);
}
select(5,10);

//其他方法
Math.abs(-5);        //求绝对值
Math.sqrt(9);        //求平方根
```





