### 匿名函数和闭包

####1、匿名函数

将匿名函数赋值给变量

```java
var box = function (){return 'yaoxxx';};  //将匿名函数赋值给变量
alert(box());
```

自我执行

```java
(匿名函数)();
var box = (function(){alert('Lee');})();
alert((function(){return 'Lee';})());
```

传参

```java
(function(arg){alert(arg);})(100);
```

函数里放函数(闭包)

```java
function box(){
    return function(){
        return 'yaoxxx';
    };
}
//alert(box()());与以下两条语句功能相同
var b = box();
alert(b());
```

#### 2、闭包

优点也是缺点：会将局部变量驻留在内存中，避免使用全局变量。

```java
function box(){
    var age = 100;
    return function(){
        age++;
        return age;
    }
}
var b=box();
alert(b());      //101
alert(b()); 	//102
alert(b());		//103
b = null;		//解除引用，等待垃圾回收器回收
```

#### 循环中匿名函数取值问题

```java
function box(){
    var arr = [];
    for(var i = 0;i<5;i++){
        arr[i] = (function(num){               //匿名函数下再做一个匿名函数
            return function(){
                return num;
            }
        })(i);
    }
    return arr;
}

var b = box();
for(var i = 0; i<b.length; i++){
    alert(b[i]());                           //这里通过b[i]()函数调用即可
}
```

#### this对象的用法：闭包在运行时指向window

```java
var User = 'The window';
var box = {
    user：'The Box',
    getUser:function(){
        //1.var that = this;
        return function(){
            //2.下行改成return that.box;
            return this.user;
        }
    }
};
box.getUser();                      //返回The window
//解决：1.对象冒充(冒充box)
alert(box.getUser().call(box));
//1.2处,如代码所示
```

#### 内存泄漏

 IE中匿名函数中引用不能及时销毁，需要手动释放，即赋值为null

#### 模仿块级作用域(比如for,if)：包含自我执行的匿名函数，可以实现私有作用域

```java
function box(){
    (function(){
        for(var i=0; i<5; i++){
            alert(i);
        }
    })();
    alert(i);           //这里就访问不到i了
}
box();
```

#### 实现全局的私有作用域(封装  )：自动销毁，无需null

```java
(function(){                //自我执行
    var b = 100;
    alert(b);
})();
```

#### 模仿面向对象中的类：1实现私有属性和公共接口

```java
function Box(){
    var age = 22;
    function run(){
        return '运行中...';
    }
    this.getAge = function (){
      return  age + run(); 
    };
}
var box = new Box();
box.getAge();
```

#### 2.私有变量

```java
fuction Box(value){
    var box = value;
    this.getBox = function(){
        return box;
    };
    this.setBox = function(value){
      	box = value;
    };
}
var box = new Box('WY');
alert(box.getBox());
box.setBox('YY');
alert(box.getBox());
```

#### 3.共享变量:匿名函数内部为全局作用域

```java
(function(){
    var user = '';
    Box = function(value){
      user = value;  
    };
    Box.prototype.getUser = function(){
      return user;  
    };
    Box.prototype.setUser = function(value){
      user = value;   
    }
})();
```

#### 单例模式：字面量的声明就是一种单例模式。



