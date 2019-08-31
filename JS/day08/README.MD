## 时间与日期

#####学习要点：

- Date类型
- 通用的方法
- 格式化方法
- 组件方法

#### parse和UTC
```java
//创建一个日期对象，参数可用来指定时间
var Date = new Date();
alert(Date.parse('4/12/2018'));     //第一种写法：'月/日/年'  返回一个毫秒数
alert(Date.parse());                //不传参，返回NaN

var box = new Date('wdss243')       //乱写的日期返回无效的日期

var box = new Date('May25,2017')    //第二种写法

var box = new Date('The Apr 12 2007 22:22:22 GMT+0800');   //第三种写法

var box = new Date('Junuary 32,2007');         //不报错，会将多出来的累加到下一个月
```

```java
//必须传入年份和月份
alert(Date.UTC());
//返回毫秒数
alert(Date.UTC(2007,10));
//UTC世界协调时间，按照他的区域基准计算：Fri Nov 16 2007 01:22:45 GMT+0800
var box = new Date(Date.UTC(2007,10,15,17,22,45,15));
//返回本地时间
var box = new Date(2007,10,15,17,22,45,15);
```

## 时间与日期（下）

```java
var box = new Date(2017,11,6,13,45,45);
alert(box);                                    //东八区格式
alert('toString'+box.toString());              //东八区格式

alert('toLocaleString'+box.toLocaleString());  //本地化格式，更好看懂
alert(box.valueOf());              //返回毫秒数
```

##### 以上常用的是.toLocaleString(),返回本地格式

```java
var box = new Date(2017,11,6,13,45,45);
alert(box.toDateString());            //Wed Dec 06 2017
alert(box.toTimeString());            //13:45:45 GMT+0800(中国标准时间)

alert(box.toLocaleDateString());      //2017/12/16
alert(box.toLocaleTimeString());      //下午1:45:45

alert(box.toUTCString());            //世界统一时间，8个小时时差
```

##### 以上常用的是.toLocaleDateString()和toLocaleTimeString(),返回本地格式的日期和时间

### 组件时间

```java
//组件时间
var box = new Date(2017,11,6,13,45,45);
alert(box.getTime());          //毫秒数
//年
alert(box.getFullYear());       //2017
box.setFullYear(2019);
alert(box.getFullYear());       //2019
```

```java
var box = new Date(2017,11,6,13,45,45);
//月
alert(box.getMonth());        //与视频中不同的是，无需+1
box.setMonth(5);
alert(box.getMonth());*/

var box1 = new Date();        //不传参数，即当前时间
alert(box1.getMonth()+1);       //月份时要+1才是当前月份
```

##### 注意不传参数时月份默认从0开始，要+1

```java
//UTC功能
var box = new Date(2017,11,6,13,45,45);
alert(box.getUTCFullYear());       //均无差异
alert(box.getUTCHours());          //-8，会有8个小时时差
```

```java
var box = new Date(2017,11,6,13,45,45);
alert(box.getTimezoneOffset());    //返回本地时间与UTC时间相差的分钟数-480=-8*60

var box = new Date();
alert(box.getFullYear()+'-'+box.getMonth()+'-'+box.getDate()+'  '+box.getHours()+':'+box.getMinutes()+':'+box.getSeconds());
```

##### 以上除了getTimezoneOffset之外都具有UTC功能