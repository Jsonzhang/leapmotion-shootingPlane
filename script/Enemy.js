//新建飞机行为对象
			
			
//-----------用于飞行的对象-------------------
//写一个构造方法
var EnemyFly=function(){
	//用于记录时间的成员属性
	this.lastEnemyFlyTime=0;
}
//在圆形中写入方法
EnemyFly.prototype={
	execute:function(sprite,context,time){
		//检测动画是否开始运行(时间)
		if(this.lastEnemyFlyTime!==0 && !gameovering){
			//更新飞机的位置 top坐标
			sprite.top=sprite.top+sprite.moveY/1000*(time-this.lastEnemyFlyTime);
			sprite.left=sprite.left-sprite.moveX/1000*(time-this.lastEnemyFlyTime);
			//判断当前飞机的位置是否飞出屏幕，如果已经离开屏幕  隐藏
			if(sprite.top>context.canvas.height || sprite.left < 0){
				sprite.visible=false;
				sprite.beHit = false;
			}	
		}
		//记录每次动画的最后一次时间
		this.lastEnemyFlyTime=time;
	},
	update: function(sprite,context,time){
		sprite.left=sprite.left + sprite.moveX/1000*(time-this.lastEnemyFlyTime);
	}
}


//---------------用于爆炸的行为对象------------------------
//构造方法
var EnemyBomb=function(){
	//记录最后一次时间
	this.lastEnemyBombTime=0;
	//每一个画面的时间
	this.cycle=300;
}

//对象圆形
EnemyBomb.prototype={
	execute:function(sprite,context,time){
		//轮播每一个图片
		sprite.painter.advance();
		if(time-this.lastEnemyBombTime > this.cycle && sprite.hp == 0){
			//更新当前绘图使用的图片
			sprite.dying = true;
			if(sprite.sound){
				sprite.sound.play();
			}
			sprite.painter.advance();
			//判断 如果当前飞机死亡hp=0 且爆炸效果播放完毕 删除该飞机
			// if(sprite.painter.cellIndex==sprite.painter.cells.length-1){
				sprite.visible=false;
			// }
			//重新记录最后一次执行时间
			this.lastEnemyBombTime=time;
		}
	}
}
			
			
//使用工厂模式来创建敌机(可以创建三种飞机的函数)
/**
参数:name  smallEnemy小飞机  middleEnemy中飞机  bigEnemy大飞机
*/
function createEnemy(name,basespeed){
	//小飞机的信息
	var smallCells=[
			{x:19,y:192,w:30,h:34}//正常飞行
		];
	//小飞机的配置
	var smallOption={w:30,h:34,moveY:basespeed,moveX:0,hp:1,score:500}
		
	//中飞机的信息
	var middleCells=[
			{x:29,y:251,w:33,h:26}//正常飞行
		];
	//中飞机的配置
	var middleOption={w:33,h:26,moveY:basespeed,moveX:0,hp:3,score:3000}
	
	var carCells=[
			{x:0,y:0,w:90,h:166}//正常飞行
		];
		
	var carOption={w:90,h:166,moveY:basespeed + 100 + Math.floor(Math.random()*200),moveX:0,hp:7,score:10000}

	

	var dogCells=[
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:483,y:107,w:48,h:45},
		{x:483,y:107,w:48,h:45},
		{x:483,y:107,w:48,h:45},
		{x:483,y:107,w:48,h:45},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:421,y:105,w:54,h:47},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:537,y:104,w:57,h:49},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45},
		{x:367,y:106,w:49,h:45}
	];
		
	//大飞机的配置
	var dogOption={w:49,h:45,moveY:basespeed,moveX:50,hp:7,score:7}
	//判断飞机使用的图片对象集合
	if(name=='roadblock'){
		var cells=smallCells;
		var option=smallOption;
	}else if(name=='roadblock2'){
		var cells=middleCells;
		var option=middleOption;
	}else if(name=='dog'){
		var cells=dogCells;
		var option=dogOption;
	}else{
		var cells=carCells;
		var option=carOption;
	}
	//实例化精灵对象
	var Enemy=new Sprite(name,new SpritePainter('img/sprite.png',cells),[new EnemyFly(),new EnemyBomb()]);
	//属性初始化
	Enemy.left = 50 + Math.floor(Math.random()*(canvas.width - 110  - option.w));
	if(name=="dog"){
		Enemy.left = canvas.width - 50  - Enemy.width/2;
	}
	Enemy.top=-option.h;
	Enemy.width=option.w;
	Enemy.height=option.h;
	Enemy.moveY=option.moveY;
	Enemy.hp=option.hp;//气血属性
	Enemy.score=option.score;//积分属性
	Enemy.dying = false;
	Enemy.sound = document.createElement("video");
	Enemy.sound.src = "sound/enemy1_down.mp3";
	Enemy.beHit = true;
	Enemy.moveX = option.moveX;
	Enemy.sty = "emery";
	//返回精灵对象
	return Enemy;
}


