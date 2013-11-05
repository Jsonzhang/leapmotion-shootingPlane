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
		if(time-this.lastPlaneBombTime > this.cycle && sprite.hp==0){
			//更新当前绘图使用的图片
			
			sprite.painter.advance();
			//重新记录最后一次执行时间
			this.lastPlaneBombTime=time;
		}
	
	}
}
		
//创建我方飞机
function createPlane(){
	//我方飞机的图像信息
	var cells=[
		{x:432,y:0,w:66,h:82},
		{x:432,y:246,w:66,h:84},
		{x:432,y:82,w:66,h:84},
		{x:432,y:164,w:66,h:84}
	];
	//我方飞机的配置
	var option={hp:1,w:66,h:84};
	//创建我方飞机
	var plane=new Sprite('plane',new SpritePainter('img/gameArts.png',cells),[new PlaneBomb()]);
	//初始化设置
	console.log(option.w,option.h);
	plane.hp=option.hp;
	plane.left=(canvas.width - option.w)/2;
	plane.top=canvas.height - option.h;
	plane.width=option.w;
	plane.height=option.h;
	
	return plane;
}
