## 流程控制语句
- 单行语句
- 复合语句，又称代码块，一对括号为一个复合语句，当做一条单行语句处理

```java
{
    var height=200;
    var width=300;
}
```

- 1.if语句
- if()中的内容自动转换成布尔值
- 2.swich语句

#### for-in语句：精准的迭代语句，用来枚举对象的属性

```java
var box = {
	'name' : 'WY',
    'age' : 22.
    'height' : 180
}
for(var x in box){
	alert(x);
}
```

#### break与continue的区别

- break:退出循环
- continue：退出当前循环，回到循环初始

#### with语句：将代码中的作用域设置到一个特定的对象中

```java
var box = {             //创建一个对象
	'name' : 'WY',
    'age' : 22.
    'height' : 180
}
//常规写法
var n=name;
    var a=age;
    var h=height;
with(box){
	var n=name;       //这里的name相当于box.name
    var a=age;		  //省略了box对象名
    var h=height;
}
```