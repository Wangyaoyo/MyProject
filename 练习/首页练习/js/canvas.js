window.onload = function () {
  var canvas = document.getElementById('cavs');
  /*创建context对象，是内建的html5对象，拥有多种绘制矩形、圆形、字符以及添加图像的方法*/
  var ctx = canvas.getContext('2d');

  /*  绘制坐标轴  */
  ctx.moveTo(10,10);
  ctx.lineWidth = "1";


  ctx.stroke();
};