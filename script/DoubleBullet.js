/**
子弹的文件
*/

//写一个构造方法  子弹飞行构造方法
var DoubleBulletFly=function(){
	//用于记录时间的成员属性
	this.lastDoubleBulletFlyTime=0;
}
//在圆形中写入方法
DoubleBulletFly.prototype={
	execute:function(sprite,context,time){
		//检测动画是否开始运行(时间)
		if(this.lastDoubleBulletFlyTime!==0){
			//更新飞机的位置 top坐标
			sprite.top=sprite.top+sprite.moveY/1000*(time-this.lastDoubleBulletFlyTime);
			//判断当前子弹的位置 如果出了页面顶部 自动标注为不显示
			if(sprite.top<0){
				sprite.visible=false;
			}
		}
		//记录每次动画的最后一次时间
		this.lastDoubleBulletFlyTime=time;
		
	}

}


//创建子弹对象函数
/**
	planeX  当前飞机的横坐标
	planeY  当前飞机的纵坐标
*/
function createDoubleBullet(planeX,planeY){
	//当前子弹的初始化属性
	var option={w:5,h:15,hp:1,moveY:-400,x:planeX,y:planeY};
	//当前子弹的图片资源
	var cells=[
			{x:0,y:729,w:33,h:14}];
	
	//创建一个子弹对象
	var DoubleBullet=new Sprite('DoubleBullet',new SpritePainter('img/gameArts.png',cells),[new DoubleBulletFly()]);
	
	//初始化子弹的属性
	DoubleBullet.left=option.x;
	DoubleBullet.top=option.y;
	DoubleBullet.width=option.w;
	DoubleBullet.height=option.h;
	DoubleBullet.moveY=option.moveY;
	DoubleBullet.hp=option.hp;
	
	return DoubleBullet;
	
	
}