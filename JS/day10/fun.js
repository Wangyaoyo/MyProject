/*
一、
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

二、
//函数可以传递函数(与变量一样，函数名可以当做参数运算)
function box(sum,num){
    return sum+num;
}
function sum(num){
    return num+10;
}
var result = box(sum(10),10);
alert(result);

*/
//把函数本身作为参数传递，而不是函数结果
function sum(num){
    return num+10;
}
function box(sum,num){
    return sum(num);
}
alert(box(sum,10));