## 函数
#### 学习要点：
- #####三种声明方式：1.普通函数；2.变量初始化；3.new运算符
- #####函数传递的两种方式
- #####函数内部的两个对象：arguments和this
- #####每个函数都包含的属性：length和prototype:apply()及call()

####一、函数的声明
```java
//1.普通函数声明
function box1(num1,num2){
    return num1+num2;
}
alert(box1(1,2));
//2.使用变量初始化函数
var box2 = function(num1,num2){
    return num1+num2;
};
alert(box2(1,2));
//3.使用new运算符的构造函数来声明函数(不推荐)
var box3 = new Function('num1','num2','return num1+num2');
alert(box3(1,2));
alert(typeof box3);       //function
```

####二、函数的传递
#####区别：1.将函数名与参数当做参数 2.将函数本身作为参数传递
```java
//函数可以传递函数(与变量一样，函数名可以当做参数运算)
function box(sum,num){
    return sum+num;
}
function sum(num){
    return num+10;
}
var result = box(sum(10),10);
alert(result);

//把函数本身作为参数传递，而不是函数结果
function sum(num){
    return num+10;
}
function box(sum,num){
    return sum(num);
}
alert(box(sum,10));
```


#####三、函数内部的两个对象：arguments和this
#####1.arguments.callee();表示调用函数本身
```java
function box(num){
    if(num <=1){
        return 1;
    }else{
        return num*arguments.callee(num-1);
    }
}
alert(box(3));
```
#####2.window是一个对象，JS里最大的对象，全局状态下，this就是window
#####this在对象中代表对象，在全局下代表window，在函数中也代表window
#####四、每个函数都包含的属性：length和prototype
#####length:表示希望接收的参数个数
#####prototype下还有两个方法：call()和apply()
#####apply(this,[参数1，参数2])冒充另一个函数，其中this表示window作用域,[]表示传递的参数，名字必须对应一致------>简化：apply(this,arguments)
```java
function box(num1,num2){
    return num1+num2;
}
function sun(num1,num2){
    return box.apply(this,[num1,num2]);
}
alert(sun(12,13));
```
#####call()与apply()区别：传参的方式不同call(this,参数1，参数2)，甚至无需传参
#####真正作用：扩展(改变)作用域:访问不同作用域下的相同属性
```java
//全局下的属性
var color = '红色';
//对象内的属性
var box = {
    color:'蓝色'
};
//通过this.color调用
function sayColor(){
    alert(this.color);
}
// sayColor();          //红色
sayColor.call(box);     //蓝色
sayColor.call(this);    //红色
sayColor.call(window);  //红色
```
#####用call实现无耦合调用三种作用域
