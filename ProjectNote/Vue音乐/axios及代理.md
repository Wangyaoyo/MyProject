## axios

**一个官方的AJAX库：从浏览器发送ajax请求，node.js发送http请求，且支持Promise**

#### 1.在webpack.dev.conf.js中的devServer配置后端代理

```js
/* 后端代理：配置路由 发起http请求 */
const axios = require('axios')
const express = require('express')
const app = express()
var apiRoutes = express.Router()

/* use是express调用中间件的方法，浏览器发出请求的时候，这部分函数才会启用，进行过滤，处理 */
/*中间件：middleware,处理http请求的函数，用来完成各种特定的任务 */
app.use('/api', apiRoutes)

before(apiRoutes) {
    /* 前面一定要补全api */
      apiRoutes.get('/api/getDiscList', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            /* 根据访问的网址限制做的一种伪装 */
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
            /* 错误信息会打印在命令行工具中 */
          console.log(e);
        })
      })
  }
```

#### 2.发起ajax请求到dev-server

```js
recommend.js
import axios from 'axios'
export function getDiscList(){
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axiox.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
```

#### 3.前台调用

```js
recommend.vue
import {getDiscList} from 'recommend.js'

_getDiscList(){
    getDiscList().then( (res) => {
        if(res.code === ERR_OK){
            this.discList = res.data.list
        }
    })
}
```

#### 4.express提供了四种req取参的方式

- req.body：不是nodejs提供，需要载入 body-parser 中间件才可以使用 req.body 
- req.query ： 包含  在路由中每个查询字符串参数属性的  对象

```js
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"
req.query.shoe.color
// => "blue"
req.query.shoe.type
// => "converse"
```

- req.params：包含映射到指定的路线“参数”属性的对象。

```js
// GET /user/tj
req.params.name               //多适用于restful风格url中的参数的解析
// => "tj"
```

- req.param() 被弃用

**req.params和req.query区别：**

```req.params包含路由参数（在URL的路径部分），而req.query包含URL的查询参数（在URL的？后的参数）```

#### 5. express的res.json([body])和 res.send([body]) 

- res.json： 以json的形式返回，即发送一个json的响应 会转换非对象null undefined

```js
res.json(null);
res.json({user:'tobi'});
res.status(500).json({error:'message'});
```

- res.send ：发送HTTP响应。body参数可以是一个Buffer对象，一个字符串，一个对象，或者一个数组。 

```js
res.send(new Buffer('whoop'));
res.send({some:'json'});
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```

#### 6. body-parser中间件

https://segmentfault.com/a/1190000004407008

- ```apiRoutes.use(bodyParser.urlencoded({extended:true}))```     

  ```js
   解析form表单提交的数据，即请求头包含Content-Type:application/x-www-form-urlencode
  /* 用来解析req.body的数据 解析成功覆盖原来的req.body,解析失败则为{} */
  /* extend选项用来配置使用querystring(false)或qs(true)来解析数据*/
  /* qs比querystring出色的地方在于可以解析多级嵌套的复杂对象（最多5级） */
  
  //示例：
  // 内建对象 querystring
  querystring.parse("info[name]=henry&info[age]=30&hobby[1]=sport&hobby[2]=coding") => 
    { 
      'info[name]': 'henry',
      'info[age]': '30',
      'hobby[1]': 'sport',
      'hobby[2]': 'coding'
    }
  
  // 第三方插件 qs
  qs.parse("info[name]=henry&info[age]=30&hobby[1]=sport&hobby[2]=coding") => 
    {
      info: {
        name: 'henry',
        age: '30'
      },
      hobby: [ 'sport', 'coding' ]
    }
  ```

- ```app.use(bodyParser.json());```      解析json数据格式

  