var box = new Date(2017,11,6,13,45,45);
/*alert(box);                                    //东八区格式
alert('toString'+box.toString());              //东八区格式
alert('toLocaleString'+box.toLocaleString());  //本地化格式，更好看懂
alert(box.valueOf());              //返回毫秒数*/

/*alert(box.toDateString());            //Wed Dec 06 2017
alert(box.toTimeString());            //13:45:45 GMT+0800(中国标准时间)

alert(box.toLocaleDateString());      //2017/12/16
alert(box.toLocaleTimeString());      //下午1:45:45

alert(box.toUTCString());            //世界统一时间，8个小时时差*/

//组件时间
// alert(box.getTime());          //毫秒数
//年
/*alert(box.getFullYear());     //2017
box.setFullYear(2019);
alert(box.getFullYear());    //2019*/
//月
/*alert(box.getMonth());        //与视频中不同的是，无需+1
box.setMonth(5);
alert(box.getMonth());*/

// var box1 = new Date();        //不传参数，即当前时间
// alert(box1.getMonth()+1);       //月份时要+1才是当前月份

//UTC功能
// alert(box.getUTCFullYear());       //均无差异
// alert(box.getUTCHours());          //-8，会有8个小时时差

// alert(box.getTimezoneOffset());    //返回本地时间与UTC时间相差的分钟数-480=-8*60
// var box = new Date();
alert(box.getFullYear()+'-'+box.getMonth()+'-'+box.getDate()+'  '+box.getHours()+':'+box.getMinutes()+':'+box.getSeconds());