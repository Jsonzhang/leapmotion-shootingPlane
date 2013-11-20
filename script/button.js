var createbutton  = function(name){
	var cells = [{x:0,y:0,w:200,h:100}],
		options = {left:500,top:500};
	var button = new Sprite(name,new SpritePainter("img/begin.png",cells),[new buttonIcon()]);

	button.left = options.left;
	button.top = options.top;
	return button;
}


var buttonIcon = function(){
	this.lastEnemyFlyTime=0;
};


buttonIcon.prototype = {
	execute:function(sprite,context,time){
		//检测动画是否开始运行(时间)
		//记录每次动画的最后一次时间
		this.lastEnemyFlyTime=time;
	}
}