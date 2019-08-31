/*
if (confirm('请选择...')) {
    alert('您按了确定按钮');
}else{
    alert('您按了取消按钮');
}
var a=prompt('请输入一个数字',0);
alert(a);
// print();
find();
defaultStatus = 'yaoxxx-----';
status ='xxx';

var baidu = open('http://www.baidu.com');
baidu.alert('Lee');

document.onclick = function(){
    window.opener.document.write('子窗口让我输出一行字！');
};

window.onload = function(){
    var table = document.createElement('table');
    table.border = 1;
    table.width = 300;

    var caption = document.createElement('caption');
    table.appendChild(caption);
    caption.innerHTML = '人员表';

    var thead = document.createElement('thead');
    table.appendChild(thead);
    var tr = document.createElement('tr');
    thead.appendChild(tr);
    var th = document.createElement('th');
    tr.appendChild(th);
    //th.innerHTML = 'one';
    var thtext = document.createTextNode('Text');
    th.appendChild(thtext); 

    document.body.appendChild(table);
}
window.onload = function(){
    var table = document.getElementByTagName('table')[0];
    table.caption.innerHTML;           //获取caption

    table.tHead;
    table.tBodies;

    table.rows.length;
    table.tBodies[0].rows.length;           //表体的行数

    table.tBodies[0].rows[0].cells.length;  //第一行的单元格数目

    table.tBodies[0].rows[1].cells[1].innerHTML;  //第二行第二个单元格内容
    
    table.deleteCaption();                    //删除标题
    table.deleteTHead();                      //删除头
    table.tBodies[0].deleteRow(0);            //删除行
    table.tBodies[0].rows[0].deleteCell(0);   //删除单元格
}

*/
window.onload = function(){
    // alert(document.implementation.hasFeature('StyleSheets','2.0'));
    var link = document.getElementsByTagName('link')[0];
    // alert(link);
    // var sheet = link.sheet || link.style.sheet; 
    // alert(sheet);
    // alert(sheet.href);
    // alert(sheet.media);
    // alert(sheet.title);
    // alert(sheet.deleteRule(0));
    // sheet.insertRule('body{background-color:red}',0);

    var sheet = document.styleSheets[0];
    alert(sheet);
    var rules = sheet.cssRules || sheet.rules ;
    alert(rules);
    var rule = rules[0];
    alert(rule);
    alert(rule.cssText);
}

