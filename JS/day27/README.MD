## 错误处理与调试

学习要点：

- 浏览器错误报告
- 错误处理
- 错误事件
- 错误处理策略
- 调试技术
- 调试工具

####1、浏览器错误报告

各大浏览器中错误调试工具在什么位置：

火狐-->工具-->控制台.........

#### 2、如何处理错误事件 

```js
/*
* try-catch特点：
* 1、捕获错误信息
* 2、避免浏览器控制台报错
* 3、屏蔽错误，继续向下执行，若和下面的代码有关联就会继续出错
*/
try{
    window.asdfsd();
}catch(e){          //接收错误对象
    //alert(e);       //打印错误对象 此处打印：TypeError:window.asdfsd is not a function
    alert(e.name);   //Typeerror
    alert(e.message);//window.asdfsd is not a function（推荐使用的属性）
}finally{
    alert('必须被执行的部分');
}
```

#### 3、错误类型

基类Error，其他六种继承于它

```js
new Array(-3);      //RangeError:invalid array length 无效的数组长度
var box = a ;       //ReferenceError:a is not defined 未定义的变量
a$b;                //SyntaxError: missing ; before statement  语法错误
new 10;            //TypeError: 10 is not a constructor
eval(abc);         //不常见：evalError 表示全局函数eval()的使用方式与定义的不同时抛出
                   //URIError:不常见
```

通过判断类型自定义错误信息：

```js
try{
    new 10;
}catch (e) {
    if(e instanceof TypeError){
        alert('类型错误！');
    }else{
        alert('未知错误！');
    }
}
```

####4、错误处理策略

1 >  慎用try-catch语句（耗费系统资源）：

- 可以通过修改代码来排错的，不需要用try-catch  
- 浏览器兼容性问题，可以通过if语句判断的不用它

无法修改代码  的情况下，用try-catch比较有意义

2 >  抛出错误：当我们无法解决的情况下，就需要把错误报出：

throw new (...)Error("这里是错误信息！");

```js
try{
    new 10;
}catch(e){
    if(e instanceof TypeError)
    throw new TypeError('类型错误！new的时候，可能产生了错误！');
}
new 10;    // 浏览器自己会抛出错误
```

#### 5、调试技术

通过alert()

控制台：

```js
console.error('错误');
console.info('信息');
console.log('日志');
console.warn('警告');
```

设置断点并执行

- 单步进入：一步一步执行流程
- 单步跳过：跳到下一个函数快
- 单步退出：跳出执行到内部的函数
- 断续：继续执行代码
- 重新运行：重新单步调试

监控：

- 监控变量的变化
- 也可以新建监控表达式来查看自己关心的变量

