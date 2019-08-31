/*
function box(num){
    if(num <= 1){
        return 1;
    }else{
        return num*box(num-1);
    }
}

function box(num){
    if(num <=1){
        return 1;
    }else{
        return num*arguments.callee(num-1);
    }
}
alert(box(3));

// var color = '红色';
window.color = '红色';
alert(this.color);

function box(num1,num2){
    return num1+num2;
}
function sun(num1,num2){
    return box.apply(this,[num1,num2]);
}
alert(sun(12,13));

function box(num1,num2){
    return num1+num2;
}
function sun(num1,num2){
    return box.call(this,num1,num2);
}
alert(sun(12,13));

var color = '红色';
var box = {
    color:'蓝色'
};
function sayColor(){
    alert(this.color);
}
// sayColor();          //红色
sayColor.call(box);     //蓝色
sayColor.call(window);  //红色
*/
