## 对象和数组（上）
##### 学习要点：
- Object类型
- Array类型
- 对象中的方法

### Object类型
##### 对象两种创建方式及两种输出方式

```java
//new关键字创建对象
var box1 = new Object();
box1.name = '王XX';

//字面量创建对象（不调构造）
var box2 = {
	'name':'王XX',       //属性可以用字符串表示
    age:22
}

//输出方式
alert(box['name']);      //用数组的方式输出一定要加引号
alert(box.name);
```

##### 方法的创建

```java
var box = {
	name : '王XX'，
    run : function(){
    	return '123';
    }
};
alert(box.ren);       //无圆括号会打印代码
alert(box.run());     //有圆括号会打印返回值
delete box.name;      //删除属性用delete
```

```java
//字面量创建方式较为常用
var obj{
	name : 'WY',
    age : 22,
    height : 180
};
function print(obj){
	if(obj.name != undifined)  alert(obj.name);    //加判断
    if(obj.love != undefined)  alert(obj.love);
}
print(obj);
```

### Array类型
```java
var  arr = new Array();    //声明一个数组
alert(type.box);

var arr = new Array('王XX','22','女');  //创建一个数组
alert(arr[2]);

var arr = new Array(10);    //创建固定数目的数组，该参数必须是数字，且只能为一个参数
arr[3] = '王XX';
arr[5] = '女'; 

var arr = Array();        //该方式省略了new关键字

var box = [];            //字面量的方式创建数组

var box = ['wy',22];     //字面量的方式创建了数组并初始化
```

```java
//创建一个复杂数组
var box = [
	{
    name:'wy',
    age:22
    },
    [3,4,5,'陕西',new Object()],
    '计算机编程',
    neww Array(1,2,3)
];
alert(box[0].name);
```

## 对象和数组（下）

```java
//数组与对象都适用的方法
var box = ['wy','计算机编程',22];
alert(box.toString());
alert(box.valueOf());
alert(box.toLocaleString());  //返当地标准时间
```

#### pop()和push()

```java
//栈方法
box.push('女');
box.pop();              //移除的元素数组末尾的元素并返回

box.shift();           //移除数组开头一个元素并返回
box.unshift('陕西');   //给数组开头添加一个元素
```

```java
//重排序方法：reverse()和sort()
var box=[3,5,2,7,6,0,7];
//sort():从小到大排序
box.sort();
//reverse():逆向排序，会对引用进行操作,即改变数组
box.reverse();
```

##### concat()：基于当前数组创建一个新数组

##### slice()：获取指定区域的元素，返回新数组

##### splice()：对数组插入元素

```java
var box = ['wy',33,'计算机编程','女'];
var box1 = box.concat('通信');          //concat()返回新的数组

var box2 = box.slice(1,3);             //从第一个位置取到第三个位置
//删除功能
var box3 = box.splice(0,2);           //从第0个位置取(删除)两个
//插入功能
var box4 = box.splice(1,0,'陕西');    //从第一个位置插入元素0表示不删除
//替换功能
var box5 = box.splice(1,1,100);      //从第一个位置截取了一个加100，也就是替换
```