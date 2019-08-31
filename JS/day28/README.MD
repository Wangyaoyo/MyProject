## Cookie与存储

学习要点：

- cookie
- cookie局限性
- 其他存储

它的意图：在本地的客户端的磁盘上以很小的文件形式保存数据。

#### 一、cookie

 ```js
alert(document.cookie);             //i18next=zh_CN
//向本地磁盘写入cookie
document.cookie='user=王XX';       //本地不存在域名，所以域就为空
alert(document.cookie);             //显示user=王XX

//加密cookie
document.cookie = 'user='+encodeURIComponent('王XX');
//解密输出
alert(decodeURIComponent(document.cookie));
 ```

cookie的生命周期不设置默认是会话结束，那么如何设置呢？

```js
var date = new Date();
date.setDate(date.getDate()+7);
alert(date);
//设置过期时间
document.cookie = 'user='+encodeURIComponent('王XX')+';expiress='+date;
```

删除cookie：

- 将当前时间调到cookie生命周期的后面

- ```js
  document.cookie = 'user='+encodeURIComponent('王XX')+';expiress='+new Date(0);
  ```

domain 用于限制只有设置的域名才可以访问，没有设置会默认限制为创建 cookie 的域名。 

```js
var domain = 'yc60.com'; 
document.cookie = "user= " + encodeURIComponent('王XX') + ";domain=" + domain; 
```

secure  指定必须通过https来通信访问：仅限加密连接，安全性更好

```js
document.cookie = 'user='+encodeURIComponent('王XX')+';secure'; 
```



创建cookie

```js
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; expires=' + expires;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
}
```

获取cookie

```js
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(
		document.cookie.substring(cookieStart + cookieName.length, 			cookieEnd));
		}
	return cookieValue;
}
```

删除cookie

```js
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}
```

失效天数

```js
function setCookieDate(day) {
	if (typeof day == 'number' && day > 0) {
		var date = new Date();
		date.setDate(date.getDate() + day);
	} else {
		throw new Error('传递的 day 必须是一个天数，必须比 0 大');
	}
	return date;
}
```

####二、cookie的局限性

1、每个特定域名下最多生成20个cookie，不同浏览器之间有所区别。

2、cookie最大大约4096字节（4k）,为保证兼容性，一般不超过4095字节

3、存储在客户端的文件，重要且敏感的数据不建议保存在cookie中，可能会被截获，不安全

#### 三、其他存储

IE存储：

Web存储：

sessionStorage 、localStorage 、globalStorage三种Web存储方式
localStorage已经取代globalStorage

```js
//通过方法存储和获取
sessionStorage.setItem('name','yaoxxx');
alert(sessionStorage.getItem('name'));

//通过属性存储和获取
sessionStorage.newitem = 'yao';
alert(sessionStorage.newitem);      //yaoxxx 关闭浏览器再打开为null

//删除三种（清缓存、关闭浏览器、remove方法）
sessionStorage.removeItem('name');
```

总结：这三个对象都是永久保存的，只有手工清理或者清除浏览器缓存方可失效。

​	    容量会根据浏览器不同而不同。