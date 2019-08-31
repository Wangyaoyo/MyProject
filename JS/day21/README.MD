## DOM元素尺寸和位置

学习要点：

- 获取元素CSS大小
- 获取元素实际大小
- 获取元素周边大小

#### 1、获取元素CSS大小

#####1、通过style内联获取元素大小

```js
var box = document.getElementById('box');
box.style.width;
box.style.height;
```

#####2、通过计算获取元素大小

```js
var style = window.getComputedStyle ? window.getComputedStyle(box,null) : null || box.currentStyle;
style.width;
style.height;
```

#####3、通过CSSStyleSheet对象中的cssRules属性获取元素大小(只能获取内联和链接，不能获取行内和计算后的样式)

```js
var sheet = document.styleSheet[0];      //获取link或者style
var rule = (sheet.cssRules || sheet.rules)[0];
rule.style.width;
rule.style.height;
```

**总结：**以上方法只能获取元素的CSS大小（某属性的值）均不能获取元素实际大小

#### 2、获取元素实际大小

#####1、clientWidth和clientHeight

可以获取元素可视区的大小，可以得到元素内容及内边距所占据的大小

```js
box.clientWidth;                //200（默认是px单位）
box.clientHeight;
```

举个栗子：

1、增加边框 ，无变化

2、增加外边距 ，无变化

3、增加内边距 ，最终值为原本大小加上内边距的大小

4、增加滚动条  ，最终值等于原本大小减去滚动条的大小

##### 2、scrollWidth和scollHeight                 //200

获取滚动内容的元素大小

##### 3、offsetWidth和offsetHeight（兼容：比较好用）

可以返回实际大小，包含边框、内边距和滚动条

举个栗子：

1、增加边框，最终值加上边框大小

2、增加内边距，最终值加上内边距大小

3、增加外边距，无变化

4、增加滚动条，无变化，不会减小

<u>PS</u>：对于元素大小的获取，一般是块级并且设置了CSS大小的元素较为方便，如果是内联或者没有设置大小的元素就尤为麻烦，建议使用时注意。

#### 3、获取元素周边大小 

##### 1、clientLeft和clientTop（border）

可以获取设置了左边框和上边框宽度，不提供Right和Bottom

##### 2、offsetLeft和offsetTop

可以获取当前元素相对于父元素的位置（父元素设置成position:absolute）

box.offsetLeft;                                //border之间的距离

box.offsetTop;

##### 3、scrollTop和scrollLeft

可以获取滚动条被隐藏的区域大小（是指拖到某个位置的高度）

box.scrollTop;        //获取滚动内容上方的位置

box.scrollLeft;        //获取滚动内容左方的位置

让滚动条回到起始位置：

```js
function ScrollStart(element){
    if(element.scrollTop != 0)
        element.scrollTop = 0;
}
```

