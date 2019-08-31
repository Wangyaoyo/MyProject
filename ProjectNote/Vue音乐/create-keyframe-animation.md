## 动画中的js钩子函数(create-keyframe-animation)

- 定义：在transition标签中声明钩子函数，可以配合CSS动画animation/transform使用，也可以自定义使用方法

     ```html
<transition @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
            ></transition>
     ```

- 定义函数

```js
import animations from 'create-keyframe-animation'

method:{
    enter(el,done){
        /* 定义animation */
        let animation = {
            0:{
                
            },
            60:{
                
            },
            100:{
                
            }
        }
        /* 注册animation */
        animations.registerAnimation({
            name:'move',
            animation,
            presets:{
                duration:400    //持续时间
                easing:'linear' //过渡效果：线性
            }
        })
        /* 运行animation */
        animations.runAnimation(this.$refs.cdWrapper,'move',done)
    },
    /* enter在done后执行的函数 */
    afterEnter(){
        /* 销毁animation动画 */
		animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
    },
    leave(el,done){
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)    
    },
    afterLeave(){
         this.$refs.cdWrapper.style.transition = ''
         this.$refs.cdWrapper.style[transform] = ''  
    }
}
```

