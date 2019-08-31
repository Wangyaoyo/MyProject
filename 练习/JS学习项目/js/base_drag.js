//拖拽功能
//拖拽流程1、先点下去2、在点下的物体被选中进行移动3、然后抬起鼠标，停止移动
//做成插件
$().extend('drag',function(tags){
    for (var i = 0;i<this.elements.length;i++){
        addEvent(this.elements[i],'mousedown',function (e) {
            //1、解决低版本火狐中空div无法拖动的问题，这是火狐的默认行为
            if(trim(this.innerHTML).length == 0){
                e.preventDefault();  //同时阻止了输入框的输入
            }
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;

            //自定义拖拽区域
            var flag = false;
            // alert(tags);    接收的节点
            for (var i = 0; i<tags.length; i++){
                if(e.target == tags[i]){
                    flag = true;    //只要有一个为true，就不再判断
                    break;
                }
            }

            //只让头部可以拖拽
            // console.log(e.target.tagName);
            if(flag){
                addEvent(document,'mousemove',move);
                addEvent(document,'mouseup',up);
            }else{
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
            }
            function move(e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;

                //不让左右超出浏览器窗口
                if (left < 0) {
                    left = 0;
                } else if (left > getInner().width - _this.offsetWidth) {
                    left = getInner().width - _this.offsetWidth;
                }
                //不让上下超出浏览器窗口
                if (top < 0) {
                    top = 0;
                } else if (top > getInner().height - _this.offsetHeight) {
                    top = getInner().height - _this.offsetHeight;
                }
                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
                //兼容IE鼠标移出失效的问题
                if(typeof _this.setCapture != "undefined"){
                    _this.setCapture();
                }
            }
            function up(){
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
                if(typeof _this.releaseCapture != "undefined"){
                    _this.releaseCapture();
                }
            }
        });
    }
    return this;
});