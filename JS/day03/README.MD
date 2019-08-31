#### 1个操作符和6种数据类型
- typeof操作符
  返回如下字符串：
```java
//可以操作变量也可以操作字面量
alert(typeof '王XX');
```

##### Undefined
- 值为undefined，未经初始化的变量的值，在定义变量时，一定要给变量赋值

##### Null
- 值为null,表示一个空对象引用，但typeof null会返回object
- 初始化为null是为了保存对象
- alert(undefined == null)  //true
- alert(undefined === null)  //false
- alert(typeof undefined == typeof null)  //false

##### Boolean
- true和false两个值
- 显式转换Boolean(变量名)
- 转换规则：
#### Number
- 包括两种类型：整型和浮点型
- 整型
   - 十进制字面量：var box = 100;
   - 八进制字面量，前导必须为0,八进制序列0-7,无效时解析为十进制
   - 十六进制字面量，前两位必须是0x，序列0-9，A-F
- 浮点类型
   - 数值中必须包含一个小数点，且小数点后至少有一位数字，前不能加0
   - 科学计数法表示:  4.12e9
   - 不要做精确判断
   - 最大值：Number.MAX_VALUE 超出为Infinity 即Number.POSITIVE_INFINITY  最小值：Number.MIN_VALUE  超出为-Infinity 即Number.NEGATIVE_INFINITY
   - 用isFinity(数值)的返回值true/false判断是否超过范围
- 转换：为浮点数分配的内存空间是整型的两倍，故ECMA自动将可以转换的浮点数转换成整型
- NaN 一个值
   - isNaN(数值) 判断是否为NaN
   - isNaN(NaN) true
   - isNaN(可以转换成Number的任何值)  false
   - isNaN(true)   false  转换为1
   - isNaN()也适用于对象,先调用valueOf(),确定是否可以转换成数值，不能则调用toString方法，再次测试能否转换成数值。
   ```java
   var box={};
   alert(isNaN(box));   //true
   var box1={
   		toString:function(){
        	return '123';
        }
   };
   alert(isNaN(box1));   //false
   ```
- 非数值转换成数值：Number()、parseInt()、parseFloat();Number()用于任何类型的转换，后两个专门用于字符串转换。
- Number()
   - 对于只包含数字的字符串，默认转换为10进制
   - 只包含浮点型的字符串，默认去掉前面的0和后面的0
   - 空字符串，返回0
   - 不是纯数字，返回NaN
   - 是对象的话，与上面的isNaN雷同，通过toString方法转换
- parseInt()
   - 只能转换字符串
   - 默认从前面开始解析，遇到字母则NaN，数字则解析到不是数字为止
   - 识别八进制以及十六进制的转换
- parse( , )：第二个参数为进制数2/8/16，此时前导可去掉 
- parseFloat()
   - 不认识十六进制
   - 只认一个小数点
   - 去掉前后导
   
#### String
- 由双引号和单引号保存均可，不穿插使用就可以，ECMA都可以解析。
- 包含特殊的字符字面量

- ECMA中字符串不能改变，只能重新创建然后重新指向
- toString()
   - 无需传参
   - 只有进制可以传参，toString(8)八进制输出
   - 若转型前不知道是否为null或者undefined，可以调用转型函数String(变量名)，它能将任何类型的值转换为字符串。

#### Object
- 初始化
   - 1.var box = null;
   - 2.var box = {};
   - 3.var box = new Object();  //通过new创建一个对象，可以通过构造函数传递任意类型参数
- 可以和普通变量运算
   ```java
   var box = new Object(2);
   var age = box + 100;
   alert(age);  //102
   ```
- 通过new来创建其他类型的对象String、Number,但实际是数值对象。