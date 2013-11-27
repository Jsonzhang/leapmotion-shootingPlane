/**
	我方飞机
*/

//构造方法
var PlaneBomb=function(){
	//记录最后一次时间
	this.lastPlaneBombTime=0;
	//每一个画面的时间
	this.cycle=300;
}

//对象圆形
PlaneBomb.prototype={
	execute:function(sprite,context,time){
		//轮播每一个图片
		sprite.painter.advance();
		if(time-this.lastPlaneBombTime > this.cycle && sprite.hp==0){
			//更新当前绘图使用的图片
			
			//重新记录最后一次执行时间
			sprite.painter.cells = [
				{x:101,y:0,w:60,h:124},
				{x:101,y:0,w:60,h:124},
				{x:101,y:0,w:60,h:124},
				{x:101,y:0,w:60,h:124},
				{x:101,y:0,w:60,h:124},
				{x:101,y:0,w:60,h:124},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:166,y:0,w:60,h:124},
				{x:166,y:0,w:60,h:124},
				{x:166,y:0,w:60,h:124},
				{x:166,y:0,w:60,h:124},
				{x:166,y:0,w:60,h:124},
				{x:166,y:0,w:60,h:124},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:230,y:0,w:60,h:124},
				{x:230,y:0,w:60,h:124},
				{x:230,y:0,w:60,h:124},
				{x:230,y:0,w:60,h:124},
				{x:230,y:0,w:60,h:124},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:230,y:0,w:60,h:124},
				{x:230,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:999,y:999,w:1,h:1},
				{x:298,y:0,w:60,h:124}
			]
			this.lastPlaneBombTime=time;
			gameovering = true;
		}
	
	}
}

var Blinking=function(){}
Blinking.prototype= {
	execute : function(sprite,context,time){

	}
}


		
//创建我方飞机
function createPlane(){
	//我方飞机的图像信息
	var cells=[
		{x:101,y:0,w:60,h:124},
		{x:101,y:0,w:60,h:124},
		{x:101,y:0,w:60,h:124},
		{x:101,y:0,w:60,h:124},
		{x:101,y:0,w:60,h:124},
		{x:101,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:166,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:230,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124},
		{x:298,y:0,w:60,h:124}
	];
	var cellsright=[
		{x:101,y:133,w:60,h:124},
		{x:166,y:133,w:60,h:124},
		{x:230,y:133,w:60,h:124},
		{x:298,y:133,w:60,h:124}
	];
	//我方飞机的配置
	var option={hp:1,w:60,h:124};
	//创建我方飞机
	var plane=new Sprite('plane',new SpritePainter('img/sprite.png',cells),[new PlaneBomb()]);
	//初始化设置
	plane.hp=option.hp;
	plane.left=(canvas.width - option.w)/2;
	plane.top=canvas.height - option.h;
	plane.width=option.w;
	plane.height=option.h;
	
	return plane;
}
