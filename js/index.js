/*
* @Author: Administrator
* @Date:   2018-01-20 08:54:41
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 16:45:40
*/
//引入远程数据
//关于城市的信息
var city;
var tianqi;
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
	}
})
//获取天气信息
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})
//页面加载函数
window.onload=function(){
	update();
	//页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	//点击城市出现详情页
     pos.onclick=function(){
	     cityBox.style.display="block";
     }
     //点击城市详情，跳转首页，出现该城市情况
     var BOX=$(".city .citys .con .box");
     for(let i in BOX){
     BOX[i].onclick=function(){
	     var chengshi=this.innerHTML;
	     Ajax(chengshi);
     }
     }
     //搜索部分
     var searchBox=document.getElementsByClassName("searchBox")[0];
     var button=document.getElementsByClassName("button")[0];
     var text;
     searchBox.onfocus=function(){
     	button.innerHTML="确认";
     	text=searchBox.value;
     }
     button.onclick=function(){
     var neirong=button.innerHTML;
     if(neirong=="取消"){
     	var city3=document.getElementsByClassName("city")[0];
     	city3.style.display="none";
     }else{
     	for(let i in city){
     		for(let j in city[i]){
     			if(text==j){
     				Ajax(text);
     				return;
     			}else{
     				alert("没有此城市天气信息");
     				return;
     			}
     		}
     	}
     }
	 }
}
//获取城市主页
function Ajax(str){
$.ajax({
	url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
})
}
//获取数据函数
function update(){
	//当前城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;
	//当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;
	//当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	//当前天气
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;
	//当前风的方向
	var wind_drection=document.getElementsByClassName("wind_der")[0];
	wind_drection.innerHTML=tianqi.weather.wind_direction;
	//当前风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";
	//今天最高温度
	var dat_high_temperature=document.getElementsByClassName("height")[0];
	dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°";
	//今天最低温度
	var dat_low_temperature=document.getElementsByClassName("lower")[0];
	dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°";
	//明天最高温度
	var tomorrow_high_temperature=document.getElementsByClassName("theight")[0];
	tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";
	//明天最低温度
	var tomorrow_low_temperature=document.getElementsByClassName("tlower")[0];
	tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";
	//今天天气
	var day_condition=document.getElementsByClassName("con")[0];
	day_condition.innerHTML=tianqi.weather.day_condition;
	//明天天气
	var tomorrow_condition=document.getElementsByClassName("tcon")[0];
	tomorrow_condition.innerHTML=tianqi.weather.tomorrow_condition;
	//今天图标
	var today_icon=document.getElementsByClassName("conpic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id
}.png")`;
	//明天图标
	var tomorrow_icon=document.getElementsByClassName("tconpic")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id
}.png")`;


	//获取每小时天气情况
	
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){
		var box1=document.createElement("div");
		box1.className="box";
		
		var time=document.createElement("div");
		time.className="time";
		box1.appendChild(time);
		time.innerHTML=hourlyArr[i].hour+":00";

		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		timeTem.innerHTML=hourlyArr[i].temperature+"°";
		box1.appendChild(timeTem);

		wrap.appendChild(box1);
	}
//未来15天
var dayArr=tianqi.weather.forecast_list;
	var wrap1=document.getElementsByClassName("wrap1")[0];
	for(let i in dayArr){

		var box2=document.createElement("div");
		box2.className="box2";
		
		var time1=document.createElement("div");
		time1.className="time1";
		box2.appendChild(time1);
		time1.innerHTML=dayArr[i].date;

		var weather1=document.createElement("div");
		weather1.className="weather1";
		box2.appendChild(weather1);
		weather1.innerHTML=dayArr[i].condition;

		var icon1=document.createElement("div");
		icon1.className="icon1";
		box2.appendChild(icon1);
		icon1.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

		var high=document.createElement("div");
		high.className="high";
		box2.appendChild(high);
		high.innerHTML=dayArr[i].high_temperature;

		var low=document.createElement("div");
		low.className="low";
		box2.appendChild(low);
		low.innerHTML=dayArr[i].low_temperature;

		var cloud=document.createElement("div");
		cloud.className="cloud";
		box2.appendChild(cloud);
		cloud.innerHTML=dayArr[i].wind_direction;

		var degree=document.createElement("div");
		degree.className="degree";
		box2.appendChild(degree);
		degree.innerHTML=dayArr[i].wind_level+"级";
		
		wrap1.appendChild(box2);
	}
	//关于城市
	var city1=document.getElementsByClassName("city")[0];
	// console.log(city1);
	for(let i in city){
		var citys=document.createElement("div");
		citys.className="citys";
		
		var title=document.createElement("div");
		title.className="title";
		citys.appendChild(title);
		title.innerHTML=i;

		var con=document.createElement("div");
		con.className="con";
		
		for(let j in city[i]){
		var box=document.createElement("div");
		box.className="box";
		box.innerHTML=j;
		con.appendChild(box);
		}
		citys.appendChild(con);
		city1.appendChild(citys);
	}
}