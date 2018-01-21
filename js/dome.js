/*
* @Author: Administrator
* @Date:   2018-01-19 15:50:27
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-19 17:35:55
*/
//var aa="123"
//console.log(aa);//控制台出现
//当前页面加载时
window.onload=function(){
 	/* 当点击按钮时消失 */
 	//先获取
 	let button=document.getElementsByClassName("button");
 	button[0].onclick=function(){
	//alert("这是一个按钮");
	var city=document.getElementsByClassName("city");
	console.log(city);
	city[0].style.display="none";
 }
 var pos=document.getElementsByClassName("pos");
     pos[0].onclick=function(){
     	var city=document.getElementsByClassName("city");
	    console.log(city);
	     city[0].style.display="block";
     }
}
//引入远程数据
//关于城市
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType: "jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
	}
})
//关于天气
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType: "jsonp",
	method:"get",
	success:function(obj){
		var weather=obj.data;
		console.log(weather.current_temperature);
	}
})
//alert//弹出
////1.当整个页面加载完成时，才可对页面操作window.load
///2.获取元素document.getElementsByClassName("");最好输出看是否正确
///3.添加事件函数
///4.进行样式操作