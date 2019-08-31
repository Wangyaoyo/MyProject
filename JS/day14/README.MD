## 面向对象与原型

#### 学习要点：

- ##### 学习条件

- ##### 创建对象

- ##### 原型

- ##### 继承

#### 二、创建对象

#####工厂模式创建对象解决了创建对象代码重复的问题：

```java
function createObject(name,age){        
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.run = function(){
        return this.name+this.age+'运行中...';
    };
    return obj;                        //返回对象的引用  
}
var box1 = createObject('W',22);
var box2 = createObject('W',25);
alert(box2.run());
```

#####但instanceof时无法识别他们是哪个对象的实例。  改进：使用构造函数

```java
function Box(name,age){
    this.name = name;
    this.age = age;
    this.run = function(){
        return this.name + this.age + '运行呢...';
    };
}
var box = new Box('wy',22);
alert(box.run());
alert(box instanceof Box);    //true
```

##### 对象冒充调用：但终究不是它的类型

```java
//对象冒充，拿取Box的构造函数
var box1 = new Object();
Box.call(box1,'yy',25);
alert(box1.run());
alert(box1 instanceof Box);    //false
```

##### 两个实例化的属性相等，但方法的引用不等

```java
var box1 = new Object('wy',22);
var box2 = new Object('wy',22);
alert(box1.name == box2.name);        //true
alert(box1.run() == box2.run());      //true：加括号表示返回的值
alert(box1.run == box2.run);          //false ：不加括号表示方法的引用地址
```

##### 如果想保证引用地址一致，可以将run()方法写在构造函数外面，即全局函数，但是没必要这样做

```java
function run(){
    return this.name + this.age + '运行中...';
}
```

#####导致新的问题是this在全局下代表window,不代表该对象，且内聚低，零散。

###三、原型对象

####1.构造函数创建方式

```java
function Box(){     //此处定义实例属性和实例方法
}
Box.prototype.name = 'yaoxxx';
Box.prototype.age = 100;
Box.prototype.run = function(){
    return this.name + this.age + '运行中...';
};

var box1 = new Box();
alert(box1.age);
alert(box1.run());          //正常输出
```

#####属性和方法的地址都一样

```java
var box1 = new Box();
var box2 = new Box();
alert(box1.age == box2.age);        //true
alert(box1.run == box2.run);        //true
```

#####—proto—是一个对象，访问不到，通过这个指针指向原型对象

#####constructor起到连接的作用

![](/原型模式.PNG)

##### 判断一个对象实例是否指向原型对象（只要实例化就是自动指向的）

```java
Box.prototype.isPrototypeOf(box1);      //true
```

##### 执行流程：

- 先查找构造函数里的属性和方法，如果有，返回
- 构造中没有，查找原型，如果有，返回

```java
box1.name = '实例';            //定义实例属性
delete box1.name;             //删除实例属性
delete Box.prototype.name;    //删除原型属性，不会这么用
```

##### 判断属性是否在实例中

```java
box1.hasOwnProperty(name);      //判断实例中是否存在属性  
```

##### 判断属性在两个中是否存在

```java
'name' in box1;                 //一个存在为true,均不存在false
```

##### 判断只有原型中有属性(结合以上)

```java
function isProperty(obj,property){
    return !obj.hasOwnProperty(property) && property in obj;
}
```

####2.字面量创建方式

#####构造器指向Object

```java
function Box(){};               //必须有构造
Box.prototype = {                //问题：字面量创建的方式使用constructor属性默认指向Object
    constructor : Box;          //使其强制指向Box
    name : 'yaoxxx',
    age : 22 ,
    run : function (){
        return this.name + this.age + '运行中...';
    }
};
var box = new Box();
alert(box.run());
```

##### 重写需谨慎（要重写就全部重写）

```java
Box.prototype = {    //重写其中一个属性
    age : 200        //就切断了原来的联系
};
var box = new Box();
box.run();           //报错：not a function
```

##### 查看某个类是否有某个方法

```java
Array.prototype.sort;           //会返回该方法
String.prototype.substring;
```

##### 为原型添加方法：不推荐，可能导致命名冲突，在代码量少时可以使用

```java
String.prototype.addstring = function(){
    return this + '被添加方法...';
};
var box = 'Lee';
alert(box.addstring());
```

#### 3.共享是优点也是缺点

```java
function Box(){}
Box.prototype = {
    constructor : Box,
    name : 'yaoxxx',
    age : 22,
    family : ['爸爸','妈妈','妹妹'],
    run : function(){
        return this.name + this.age + '运行中...';  
    }
};
```

问题1：共享属性值不可修改
问题2：引用类型值一旦修改所有用原型创建的对象该值都会被修改

故而提出组合构造模式+原型模式：解决了传参和共享

```java
function Box(name,age){			  			//保持独立部分，不共享
    this.name = name;
    this.age = age;
    this.family = ['爸爸','妈妈','妹妹'];
}
Box.prototype = function(){				//保持共享部分
    constructor : Box,
    run : function(){
      return this.name + this.age + '运行中...';  
    }
};
```

为解决封装性，提出动态原型模式

```java
function Box(name,age){			  		
    this.name = name;
    this.age = age;
    this.family = ['爸爸','妈妈','妹妹'];
    
    Box.prototype.run = function(){			
      return this.name + this.age + '运行中...';  
    };
}
```

问题在于每次调构造new都会执行一次原型

提出判断run的类型来约束它的执行次数

```java
if(typeof run != 'function'){//原型初始化}
```

如果以上还不能满足：寄生构造模式：工厂模式+构造函数模式

```java
function Box(name,age){                       //与工厂模式不同：类名createobj
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.run = function (){
        return this.name + this.age + '运行中...';
    };
    return obj;
}
```

稳妥构造函数与寄生构造函数不同点：不能用new

```java
var box = Box('你好',22);
```

### 四、继承

继承：通过原型链实现

```java
function Box(){
    this.name = 'Lee';
}
Box.prototype.name = 'Jack';
function Desk(){
    this.age = 100;
}
Desk.Prototype = new Box();          //子类的原型是父类的实例
var desk = new Desk();
alert(desk.name);                    //就近原则

alert(desk instanceof Object);       //子类型从属于它的超类
alert(desk instanceof Desk); 
alert(desk instanceof Box); 
```



