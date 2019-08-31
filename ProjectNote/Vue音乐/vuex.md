### 组成：

- state ： 存放项目中多组件共享的状态

- mutations ： 存放更改state 里状态的方法
- getters ： 从state中派生出来的状态，比如将state中的某种状态进行过滤然后获取到新的状态
- actions ： 通过commit mutation 中的方法来改变状态，可以进行异步操作
- modules ： 将状态按模块划分，将store对象分割成多个子模块，使代码结构更加清晰

  
