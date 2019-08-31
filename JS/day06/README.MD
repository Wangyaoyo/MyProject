### 函数
#####学习要点：
- 函数声明
- return返回值
- arguments对象

#####函数声明
注意：函数本身没有运行功能，需要被调用

```java
function box(){
	alert('我只有被调用才可以执行')；
}
box();
```

#####return函数
除了必要时返回数据，还有一个功能是退出函数
```java
function box(){
	return '我只有被调用才可以执行';
}1
```

#####arguments对象
- 可以不写形参，默认被放到arguments对象数组中

```java
function box(){
	return arguments[0]+'|'+arguments[1]+'|';
}
box('王XX',22)
```

- 属性length：动态的累加

```java
function box(){
	var sum = 0;
	for(var i = 0; i < arguments.length; i++){
    	sum += arguments[i];
    }
}
box(2,3,55,76);
```

==**注意**== ：函数不具备重载功能，重名函数会默认后面覆盖前面的函数
