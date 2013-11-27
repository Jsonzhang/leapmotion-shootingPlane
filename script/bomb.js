//新建炸弹对象
			
			
//-----------用于炸弹的对象-------------------
//写一个构造方法
var flybomb=function(){
	this.lastFlyTime = 0;
}
//在圆形中写入方法
flybomb.prototype={
	execute:function(sprite,context,time){
		//检测动画是否开始运行(时间)
		if(this.lastFlyTime!==0 && !sprite.beGot && !gameovering){
			//更新飞机的位置 top坐标
			sprite.top= sprite.top + sprite.moveY/1000*(time-this.lastFlyTime);
			if(sprite.top > context.canvas.height){
				sprite.visible=false;
			}
		}
		//记录每次动画的最后一次时间
		this.lastFlyTime=time;
	}
}


//---------------用于爆炸的行为对象------------------------

//构造方法
var Bombing=function(){
	//记录最后一次时间
	this.lastEnemyBombTime=0;
}

//对象圆形
Bombing.prototype={
	execute:function(sprite,context,time){
		sprite.painter.advance();
		//轮播每一个图片
	/*	if(sprite.beGot){
			sprite.painter.advance();
			this.lastEnemyBombTime=time;
		}*/
	}
}


function createbomb(basespeed){
	var bombcome=[
			{x:451,y:0,w:24,h:49},
			{x:451,y:0,w:24,h:49},
			{x:451,y:0,w:24,h:49},
			{x:451,y:0,w:24,h:49},
			{x:485,y:0,w:26,h:51},
			{x:485,y:0,w:26,h:51},
			{x:485,y:0,w:26,h:51},
			{x:485,y:0,w:26,h:51},
			{x:522,y:0,w:32,h:55},
			{x:522,y:0,w:32,h:55},
			{x:522,y:0,w:32,h:55},
			{x:522,y:0,w:32,h:55},
			{x:561,y:0,w:40,h:59},
			{x:561,y:0,w:40,h:59},
			{x:561,y:0,w:40,h:59},
			{x:561,y:0,w:40,h:59},
			{x:607,y:0,w:48,h:62},
			{x:607,y:0,w:48,h:62},
			{x:607,y:0,w:48,h:62},
			{x:607,y:0,w:48,h:62}
		];

	var bombOption={w:22,h:49,moveY:basespeed}
	
	//实例化精灵对象
	var bomb=new Sprite("bomb",new SpritePainter('img/sprite.png',bombcome),[new Bombing(),new flybomb()]);
	//属性初始化
	bomb.left=Math.floor(Math.random()*canvas.width)-bomb.width;
	bomb.top=-bombOption.h;
	bomb.width=bombOption.w;
	bomb.height=bombOption.h;
	bomb.moveY=bombOption.moveY;
	bomb.beGot = false;
	//返回精灵对象
	return bomb;
}


