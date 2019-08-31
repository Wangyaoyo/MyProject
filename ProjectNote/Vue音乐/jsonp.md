### 1. 用途和原理

JSONP ：动态创建Script，不是ajax请求，无同源策略限制，可以跨域，src指向服务器地址，实现跨域。地址中带callback=a 的参数，在返回的数据里用a包裹一段数据，在前端执行a这个方法在发请求之前注册a方法，就可以获取到数据了。

AJAX由于受同源影响，不允许进行跨域请求，而Script标签src属性中的链接却可以访问跨域的js脚本，利用这一特性，服务端不再返回JSON格式的数据，而是返回一段调用【某个函数的JS代码】，在src属性中进行调用，实现跨域。

### 2. 使用方法

#### 2.1 引入

​	在package.json文件中的dependencies下添加代码```"jsonp"："^0.2.1"```，执行```npm install```，重新运行项目```npm run dev```。

#### 2.2 封装

**jsonp.js文件**

```js
import originJSONP from 'jsonp'
export default function jsonp(url,data,option){
    url += (url.indexOf('?') < 0 : '?' : '&') + param(data)
    return new Promise((resolve,reject) => {
        originJSONP(url,option,(err, data) => {
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    }) 
}
function param(data){
    let url = ''
    for(var k in data){
        let value = data[k] !== 'undefined' ? data[k] ：''
        url += `&${k}=${encodeURIComponent(value)}`
    }
	//删除第一个&
	return url ？ URl.substring(1):''
}
```

#### 2.3 API调用

在src下创建api文件夹，用于储存api调用的js，config.js和recommend.js两个文件

**config.js**

```js
export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
 	outCharset: 'utf-8',
 	notice: 0,
 	format: 'jsonp'
}
export const options = {
    param：'jsonCallback'
}
export const ERR_OK = 0
```

**recommend.js**

```js
import {jsonp} from 'common/js/jsonp'
import {commonParams,options} from './config'
export function getRecommend(){
    //此处的url可以自行修改，本文是qq音乐链接
    const url = 'https://c.y.qq.com/musichall/fcgibin/fcg_yqqhomepagerecommend.fcg' 
    const data = Object.assign({}, commonParams,{
         platform: 'h5',
 		uin: 0,
 		needNewCode: 1
    })
    return jsonp(url,data,options);
}
```

#### 2.4 在vue文件中调用

**recommond.vue**

```js
import {getRecommonend} from 'api/recommond'
import {ERR_OK} from 'api/config'
export default {
    mounted(){
        _getRecommend();
    },
    methods:{
        _getRecommend(){
            getRecommend().then((res) => {
                if(res.code === ERR_OK){
                    console.log(res.data);
                }
            })
        }
    }
}
```


