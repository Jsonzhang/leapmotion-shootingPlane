//新建炸弹对象
			
			
//-----------用于炸弹的对象-------------------
//写一个构造方法
var bombing=function(){
	this.lastFlyTime=0;
}
//在圆形中写入方法
bombing.prototype={
	execute:function(sprite,context,time){
		//检测动画是否开始运行(时间)
		if(this.lastEnemyTime!==0){
			//更新飞机的位置 top坐标
			sprite.top=sprite.top+sprite.moveY/1000*(time-this.lastEnemyTime);
			
			if(sprite.top>context.canvas.height){
				sprite.visible=false;
			}
		}
		//记录每次动画的最后一次时间
		this.lastEnemyTime=time;
		
	}

}


//---------------用于爆炸的行为对象------------------------

//构造方法
var Bombing=function(){
	//记录最后一次时间
	this.lastEnemyBombTime=0;
	//每一个画面的时间
	this.cycle=300;
}

//对象圆形
Bombing.prototype={
	execute:function(sprite,context,time){
		//轮播每一个图片
		if(time-this.lastEnemyBombTime>this.cycle && sprite.hp==0){
			sprite.painter.advance();
			if(sprite.painter.cellIndex==sprite.painter.cells.length-1){
				sprite.visible=false;
			}
			//重新记录最后一次执行时间
			this.lastEnemyBombTime=time;
		}
	}
}
			
			
//使用工厂模式来创建敌机(可以创建三种飞机的函数)
/**
参数:name  smallEnemy小飞机  middleEnemy中飞机  bigEnemy大飞机
*/
function createbomb(){
	//小飞机的信息
	var bombcome=[
			{x:660,y:433,w:37,h:66},//正常飞行
			{x:418,y:731,w:37,h:66}				
		];

	var bombOption={w:110,h:170,moveY:70+Math.floor(Math.random()*200)}
	
	//实例化精灵对象
	var bomb=new Sprite("bomb",new SpritePainter('img/gameArts.png',cells),[new bombing()]);
	//属性初始化
	bomb.left=Math.floor(Math.random()*canvas.width)-bomb.width;
	bomb.top=-option.h;
	bomb.width=option.w;
	bomb.height=option.h;
	bomb.moveY=option.moveY;
	//返回精灵对象
	return bomb;
}


