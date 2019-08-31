#### npm入门学习

nodejs以包的形式组织程序模块，包：就是包含文件内容符合规范package.json文件的目录或归档文件。

- package.json

  ```js
  {
      "name":"my-project",
      "version":"0.1.0",
      "dependencies":{
   		"grunt":"~0.4.1",
           ///插件名和版本
       } 
  }
  ```

- 包的定义和npm都围绕着package.json展开，它用来存放模块的名称、版本，作者，机构，模块入口，依赖项等信息。

```js
npm init /* 在当前工作目录下以用户引导的方式创建一个全新的package.json文件 */
npm help json  /* 打开帮助文档，根据实际项目需求自行初始化package.json的项目即可 */
name  //表示模块名称
main  //必选，模块入口文件相对路径
description   //表示模块功能描述
engines   //依赖的node版本
respository   //源码托管地址
version  //表示模块的版本号 由主版本号.副版本号.补丁版本号构成
```

```js
1.1.1         //表示精确下载安装1.1.1
1.0.1-1.1.1   //表示版本范围是这个范围
~1.1.1        //表示尽量采用靠近1.1.1版本的包，可用范围1.1.1-0到1.1.x-x
~1.1          //1.1.x-x
~1 			 //1.x.x-x
^1.1.1 		 //1.1.1到1.x.x-x
^0.1.1		 //1.1.1到1.1.x-x
两个版本选择器之间：空格代表and关系，||代表or关系
```

- 配置信息

  ```js
  //查看部分配置信息
  npm config ls
  //查看所有配置信息
  npm config ls -l
  //修改配置信息的三种方式
  //1 直接修改配置文件.npmrc文件（没有可以新建）
  //2 通过命令修改
  npm config set "config" "config-value"
  npm config set registry http://registry.npm.taobao.org/
  npm config set proxy http://proxy.com:8081/
  //3 通过追加命令:比如-registry="registry-uri"等命令可选项临时配置
  npm install grunt -registry=http://registry.npm.taobao.org/
  ```

- 包的种类

  - 全局包：无法在项目中通过require导入依赖包
  - 本地包：在项目中通过require导入依赖包，供项目使用

  ```js
  //比如讲grunt-cli安装到全局时，则可在cli中输入grunt调用了
  npm install -g grunt-cli
  //在cmd或shell中直接调用
  grunt
  ```

  通过：npm root  -g  和npm root   可以分别查看全局和本地包的安装的绝对路径，本地依赖包会存放在当前项目根目录下的node——modules目录下

- 包的搜索

  ```js
  //搜索依赖包:显示版本号、描述、作者、时间
  npm search "package-name"
  //查看依赖包的package.json信息
  npm view "vue-cli"
  //查看包的依赖关系
  npm view vue-cli dependencies
  //查看包的源文件地址
  npm view vue-cli respository.url
  //查看包所依赖的node版本号
  npm view vue-cli engines
  //查看本地包信息
  npm list
  //查看全局依赖包
  npm list -g
  //查看本地依赖包是不是最新版
  npm outdated vue-cli
  ```

- 安装包

  ```js
  //本地
  npm install vue-cli
  //全局
  npm install -g vue-cli 
  //安装特定版本
  npm install vue-cli @ version
  ```

- 卸载包

  ```js
  //卸载本地
  npm uninstall vue-cli
  //全局
  npm uninstall -g vue-cli 
  ```

- 更新包

  ```js
  //更新本地
  npm update vue-cli
  //更新全局
  npm update -g vue-cli
  ```

- 发布包

  ```js
  //注册一个registry账号:根据引导输入账号、密码和邮箱地址
  npm adduser
  //登录registry账号:登录信息会保存在客户端
  npm login
  //发布项目
  npm publish
  ```

  项目也有.npmignore文件，优先于gitignore使用，并且内置设定了一些文件必须被删除。

  [npm入门文档](https://segmentfault.com/a/1190000005799797)