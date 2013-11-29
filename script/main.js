
		 	var beHardGapTime = 10000; // 难度区分时间, 默认每十秒增加一次难度
		 	var smallEnemyTimeGap = 1000,
				middleEnemyTimeGap = 3000,
				bigEnemyTimeGap = 2000; // 三种飞机分别出现的间隔时间,默认每一秒出现三架小飞机,每五秒出现两架中飞机,每十秒出现一架大飞机; 这三个值会随难度变大而减小.
			var basespeed = 100; // 飞机的平均速度,在此基础上加随机数;这个值会随着难度变大而增大


			var successScoreArray = window.location.search.substring(1).split("&");
			var successScore = parseInt(successScoreArray[0]) || 50000;//成功的分数.
			var litterSuccessScore = parseInt(successScoreArray[1]) || 20000;//成功的分数2.

			var bombTimeGap = 10000; //默认导弹十秒出现一个



			var bombNum = 0;
			var bombTime = 0;

		 	var canvas=document.getElementById('canvas');
			var context=canvas.getContext('2d');
			var mouse = document.getElementsByClassName("mouse")[0];
			var controller = new Leap.Controller({enableGestures: true});


			var bgsound = document.createElement("video");
			bgsound.src="sound/game_music.mp3";
			var bullet = document.createElement("video");
			bullet.src="sound/bullet.mp3";
			var gameoverSound = document.createElement("video");
			gameoverSound.src="sound/game_over.mp3";
			var successSound = document.createElement("video");
			successSound.src = "sound/success.mp3";
			var bombSound = document.createElement("video");
			bombSound.src = "sound/use_bomb.mp3";
			var yixunSound = document.createElement("video");
			yixunSound.src = "sound/yixun.mp3";


			bgsound.loop= true;
			bgsound.play();
			var spriteImg = new Image();
				spriteImg.src='img/sprite.png';
			var backImg = new Image();
				backImg.src='img/bg.jpg';
			var qqtoyImg = new Image();
				qqtoyImg.src='img/qqtoy.png';
			canvas.onclick = function(){
				 //canvas.webkitRequestFullScreen();
			}
    
			var direction = "left";
			var leftCells = [
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
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124},
				{x:298,y:0,w:60,h:124}
			];
			var rightCells = [
				{x:101,y:133,w:60,h:124},
				{x:101,y:133,w:60,h:124},
				{x:101,y:133,w:60,h:124},
				{x:101,y:133,w:60,h:124},
				{x:101,y:133,w:60,h:124},
				{x:101,y:133,w:60,h:124},
				{x:166,y:133,w:60,h:124},
				{x:166,y:133,w:60,h:124},
				{x:166,y:133,w:60,h:124},
				{x:166,y:133,w:60,h:124},
				{x:166,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:230,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124},
				{x:298,y:133,w:60,h:124}
			]
			var bgSprite=new BgSprite({w:canvas.width,h:canvas.height,My:basespeed,url:'img/bg.png'});
			
		
	    	var pausedFrame = null;
	    	var latestFrame = null;
	    	var parseNow = false;
			var sprites=[];
			var plane=createPeople();

			sprites.push(plane);
					
			var smallEnemyTime=0;//记录最后一次小飞机出现的时间
			var middleEnemyTime=0;//记录最后一次中飞机出现的时间
			var bigEnemyTime=0;//记录最后一次大飞机出现的时间
			var bulletTime=0;
			var bombtimestamp = new Date();
			
			var score=0,
				targetX,
				gameover,
				success,
				litterSuccess,
				yixunGift,
				pointNow = 0;
			var controller = new Leap.Controller({enableGestures: true});
			var timestamp = 0; // 用于难度区分
			var gameovering = false;



			var QRcode = [
				{ 
					"name" :"Transshow 权尚 小胖子 创意礼品U盘 8G 银色" ,  
					"src" : "QRcode/1.png",
					"itemImg" : "item/1.png",
					"activityprice" : 29.9,
					"price": 34.9
				},
				{ 
					"name" :"kingston 金士顿 16GB Micro SDHC（高容量TF）Class4 存储卡" ,  
					"src" : "QRcode/2.png",
					"itemImg" : "item/2.png",
					"activityprice" : 59.9,
					"price": 64.9
				},
				{ 
					"name" :"Netgear 美国网件 WNR2000 300M 无线宽带路由器" , 
					"src" :  "QRcode/3.png",
					"itemImg" : "item/3.png",
					"activityprice" : 99,
					"price": 138
				},
				{ 
					"name" :"Targus 泰格斯 LegendIQ16＂电脑背包 TSB705AP 黑色" ,  
					"src" : "QRcode/4.png",
					"itemImg" : "item/4.png",
					"activityprice" : 159,
					"price": 234
				},
				{ 
					"name" :"倍斯特 强尼思BST-0109 移动电源 10000毫安 象牙白 礼盒装" , 
					"src" : "QRcode/5.png",
					"itemImg" : "item/5.png",
					"activityprice" : 59,
					"price": 99
				},
				{ 
					"name" :"维多利亚旅行者 V3002 时尚休闲商务休闲包 黑色" ,  
					"src" : "QRcode/6.png",
					"itemImg" : "item/6.png",
					"activityprice" : 38,
					"price": 59
				},
				{ 
					"name" :"IBM P2600 原装双肩电脑包 15英寸 黑色" ,  
					"src" : "QRcode/7.png",
					"itemImg" : "item/7.png",
					"activityprice" : 89,
					"price": 149
				},
				{ 
					"name" :"POVOS 奔腾 PB0271Q 旋转式剃须刀" ,  
					"src" : "QRcode/8.png",
					"itemImg" : "item/8.png",
					"activityprice" : 59,
					"price": 89
				},
				{ 
					"name" :"Netcore 磊科 NW710 300M 无线路由器" , 
					"src" :  "QRcode/9.png",
					"itemImg" : "item/9.png",
					"activityprice" : 46,
					"price": 55
				},
				{ 
					"name" :"TOTOLINK N300UM USB无线网卡" ,  
					"src" : "QRcode/10.png",
					"itemImg" : "item/10.png",
					"activityprice" : 29,
					"price": 49
				},
				{ 
					"name" :"Logitech 罗技 M185 无线鼠标 黑色" , 
					"src" :  "QRcode/11.png",
					"itemImg" : "item/11.png",
					"activityprice" : 65,
					"price": 69
				},
				{ 
					"name" :"APC 施耐德 P63-CNX702 防浪涌总控 6位插座 3米(918焦耳)" ,  
					"src" : "QRcode/12.png",
					"itemImg" : "item/12.png",
					"activityprice" : 49,
					"price": 99
				},
				{ 
					"name" :"HYUNDAI 现代 H11 便携式插卡迷你音箱 老人FM收音机唱戏机 晨练散步外放MP3播放小音箱 蓝色" ,  
					"src" : "QRcode/14.png",
					"itemImg" : "item/14.png",
					"activityprice" : 29,
					"price": 49
				},
				{ 
					"name" :"全网底价 Johnson 强生 婴儿牛奶沐浴露 1L + 婴儿牛奶沐浴露 300ml" ,  
					"src" : "QRcode/15.png",
					"itemImg" : "item/15.png",
					"activityprice" : 34.9,
					"price": 40
				},
				{ 
					"name" :"飞科 FH6255 恒温电吹风" ,  
					"src" : "QRcode/16.png",
					"itemImg" : "item/16.png",
					"activityprice" : 29,
					"price": 39
				},
				{ 
					"name" :"Canbo 康宝 电热水壶" , 
					"src" : "QRcode/17.png",
					"itemImg" : "item/17.png",
					"activityprice" : 29,
					"price": 49
				}
			]

			var QRcodeImg = new Image();
				yixunGift = QRcode[parseInt(Math.random()*QRcode.length)];
				QRcodeImg.src= yixunGift.itemImg;

		    controller.loop(function(frame) {
		        latestFrame = frame;
		        if(latestFrame.hands[0]){
		        		targetX = (latestFrame.hands[0].stabilizedPalmPosition[0] + 250) * (canvas.width+200) / 500;
		        		targetY =  (latestFrame.hands[0].stabilizedPalmPosition[2] + 250) * (canvas.height+200) / 500;
		        		if(targetX < 0 + plane.width/2  + 50 ){targetX = 0 + plane.width/2 + 50 }
		        		if(targetX > canvas.width - plane.width/2  - 50){targetX = canvas.width - plane.width/2 - 50}
		        		if(targetY < 0 + plane.height/2 ){targetY = 0 + plane.height/2}
		        		if(targetY > canvas.height - plane.height/2 ){targetY = canvas.height - plane.height/2}

						//console.log(latestFrame.hands[0].sphereCenter);
		        		point = {
		        			x : targetX,
		        			y : targetY
		        		}
		        		if(!gameovering){	
							plane.left=point.x-plane.width/2;
							plane.top=point.y-plane.height/2;
						}

						if(pointNow - latestFrame.hands[0].stabilizedPalmPosition[0] < 0){
							direction = "right";
						}else{
							direction = "left";
						}
						pointNow = latestFrame.hands[0].stabilizedPalmPosition[0];


		        }
		        if(latestFrame.pointables.length === 0 && bombNum > 0 &&  new Date() - bombtimestamp > 3000){
		        	bombtimestamp = new Date();
					for(var j=0;j<sprites.length;j++){
						//挑选不是子弹和我方飞机的对象(三种敌机)
						bombSound.play();
						if(sprites[j].name!='deliveryman'){
								sprites[j].hp = 0;
						}
					}
					bombNum -= 1 ;
		        }


		        if(gameover && latestFrame.pointables.length === 10){
		        	location.reload();
		        }
		    });
			

			
			function animate(time){

				if(direction === "right"){
					for(var pt = 0; pt < plane.painter.cells.length ; pt++){
						plane.painter.cells[pt].y = 133;
					}
				}else if(direction === "left"){
					for(var pt = 0; pt < plane.painter.cells.length ; pt++){
						plane.painter.cells[pt].y = 0;
					}
				}

				if(time-smallEnemyTime>smallEnemyTimeGap){
					sprites.push(createEnemy('roadblock',basespeed));
					sprites.push(createEnemy('roadblock2',basespeed));
					smallEnemyTime=time;	
				}
				score += 1;
				//添加中飞机
				if(time-middleEnemyTime> middleEnemyTimeGap){
					//添加中飞机
					//更新最后一次记录时间
					sprites.push(createEnemy('dog',basespeed));
					middleEnemyTime=time;
				}
				
				//添加大飞机
				if(time-bigEnemyTime> bigEnemyTimeGap){
					//添加中飞机
					sprites.push(createEnemy('car',basespeed));
					//更新最后一次记录时间
					bigEnemyTime=time;
				}
				
				
				if(time-bombTime > bombTimeGap){
					sprites.push(createbomb(basespeed));
					bombTime=time;
				}
				
				if(time - timestamp >  beHardGapTime){
					// basespeed += 20;
					if(smallEnemyTimeGap > 400){
						smallEnemyTimeGap -= 100;
					}
					if(middleEnemyTimeGap > 2000){
						middleEnemyTimeGap -= 500;
					}
					if(bigEnemyTimeGap > 4000){
						bigEnemyTimeGap -= 1000;
					}
					timestamp = time;
				}
				if(score >= successScore){
					success = true;
				}
				if(score >= litterSuccessScore){
					litterSuccess = true;
				}

				


				//更新当前背景的位置
				bgSprite.update(context,time);
				context.drawImage(backImg,0,0,1024,768,0,0,1024,768);
				//绘制背景
				bgSprite.paint(context);
				
				//循环遍历所有精灵对象 更新行为
				for(var i=0;i<sprites.length;i++){
					if(sprites[i].name == "deliveryman" &&  sprites[sprites.length-1].name !="deliveryman"){
						sprites[sprites.length-1] = sprites.splice(i,1)[0];
					}
					sprites[i].update(context,time);
					//判断是否有不可见的精灵对象
					if(sprites[i].visible==false){
						/*//在飞机对象删除之前把分数累加起来
						if(sprites[i].name!='bullet' && sprites[i].name!='deliveryman' && sprites[i].name!='bomb' && sprites[i].beHit){//判断是否是飞机
							score=score + sprites[i].score;
						}*/
						//删除不可见的对象
						sprites.splice(i,1);
					}	
				}
				//循环遍历所有精灵对象 绘制对象
				for(var i=0;i<sprites.length;i++){
					var leftvalue,topvalue;
					if(sprites[i].name=='deliveryman'){
						for(j=0;j<sprites.length;j++){
							if(sprites[j].name!='deliveryman'){
								leftvalue = sprites[i].left - sprites[j].left;
								if(leftvalue < 0){
									leftvalue = Math.abs(leftvalue) < sprites[i].width - 20 ? true : false;
								}else{
									leftvalue = Math.abs(leftvalue) < sprites[j].width - 20 ? true : false;
								}
								topvalue = sprites[i].top - sprites[j].top;
								if(topvalue < 0){
									topvalue = Math.abs(topvalue) < sprites[i].height - 20 ? true : false;
								}else{
									topvalue = Math.abs(topvalue) < sprites[j].height - 20 ? true : false;
								}

								if(leftvalue && topvalue && sprites[j].name === 'bomb' &&  !sprites[j].beGot){
									bombNum +=1;
									sprites[j].beGot = true;
									sprites[j].visible = false;
								}else if( leftvalue && topvalue && !sprites[j].dying){
									sprites[i].hp = 0 ;
									setTimeout(function(){
										gameover = true;
									}, 1000);
									// return false;
								}
							}
						}
					}
					if(sprites[i].name=='roadblock'){
						for(j=0;j<sprites.length;j++){
							if(sprites[j].name!='roadblock' && sprites[j].name != 'dog'){
								leftvalue = sprites[i].left - sprites[j].left;
								if(leftvalue < 0){
									leftvalue = Math.abs(leftvalue) < sprites[i].width - 20 ? true : false;
								}else{
									leftvalue = Math.abs(leftvalue) < sprites[j].width - 20 ? true : false;
								}
								topvalue = sprites[i].top - sprites[j].top;
								if(topvalue < 0){
									topvalue = Math.abs(topvalue) < sprites[i].height - 20 ? true : false;
								}else{
									topvalue = Math.abs(topvalue) < sprites[j].height - 20 ? true : false;
								}

								if( leftvalue && topvalue){
									sprites[i].painter.cells = createEnemy("roadblock2").painter.cells ;
								}
							}
						}
					}
					if(sprites[i].name=='dog'){
						for(j=0;j<sprites.length;j++){
							if(sprites[j].name != 'dog' && sprites[j].name != 'bomb' && sprites[j].name != 'deliveryman'){
								leftvalue = sprites[i].left - sprites[j].left;
								if(leftvalue < 0){
									leftvalue = Math.abs(leftvalue) < sprites[i].width - 20 ? true : false;
								}else{
									leftvalue = Math.abs(leftvalue) < sprites[j].width - 20 ? true : false;
								}
								topvalue = sprites[i].top - sprites[j].top;
								if(topvalue < 0){
									topvalue = Math.abs(topvalue) < sprites[i].height - 20 ? true : false;
								}else{
									topvalue = Math.abs(topvalue) < sprites[j].height - 20 ? true : false;
								}

								if( leftvalue && topvalue){
									sprites[i].moveX = 0 ;
									sprites[i].left += 17 ;
									sprites[i].painter.cells = [
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:537,y:104,w:57,h:49},
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
										{x:537,y:104,w:57,h:49},
										{x:537,y:104,w:57,h:49},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45},
										{x:367,y:106,w:49,h:45}
									];
								}
							}
						}
					}
					if(sprites[i].name=='roadblock'){
						for(j=0;j<sprites.length;j++){
							if(sprites[j].name =='roadblock2' || sprites[j].name =='roadblock' && i!=j){
								leftvalue = sprites[i].left - sprites[j].left;
								if(leftvalue < 0){
									leftvalue = Math.abs(leftvalue) < sprites[i].width - 20 ? true : false;
								}else{
									leftvalue = Math.abs(leftvalue) < sprites[j].width - 20 ? true : false;
								}
								topvalue = sprites[i].top - sprites[j].top;
								if(topvalue < 0){
									topvalue = Math.abs(topvalue) < sprites[i].height - 20 ? true : false;
								}else{
									topvalue = Math.abs(topvalue) < sprites[j].height - 20 ? true : false;
								}

								if( leftvalue && topvalue){
									sprites.splice(j,1) ;
								}
							}
						}
					}
					sprites[i].paint(context);
				}



				for(var bn = 0 ; bn < bombNum ; bn++){
					context.drawImage(spriteImg,365,192,41,45,bn * 45, canvas.height - 41 ,41,45);
				}
				
				
				
				context.font='30px kroeger0853cyr';
				context.verticalAlign='middle';
				context.fillText('Score: '+score,canvas.width - 300,50);
				
				//帧率计算
				//再次调用绘制动画方法

				if(gameover){
					if(litterSuccess){		
						bgsound.pause();
						yixunSound.play();
						context.rect( 0 , 0 , canvas.width , canvas.height);
						context.fillStyle="rgba(255, 255, 255, 0.7)";
						context.fill();
						// context.fillStyle="#000";
						// context.font='48px microsoft yahei';
						// context.fillText("易迅优惠码,赶快扫一下吧!",230,550);
						// context.fillStyle="#1c6ec6";
						// context.font='30px microsoft yahei';
						// wrapText(context,yixunGift.name,230,650,590,50);
						context.drawImage(spriteImg,0,370,553,410,100,150,553,410);
						context.drawImage(QRcodeImg,0,0,500,400,450,150,500,400);
						return false;
					}
					bgsound.pause();
					gameoverSound.play();
					context.rect(0,0,canvas.width,canvas.height);
					context.fillStyle="rgba(255, 255, 255, 0.5)";
					context.fill();
					context.fillStyle="rgba(0, 0, 0, 1)";
					context.font='80px Emulator';
					context.fillText("Game over",135,166);
					context.font='22px Emulator';
					context.fillText('Score: '+ score, 403 , 275);
					context.drawImage(spriteImg,662,0,285,360,369,317,285,360);
					return false;
				}else if(success){
					bgsound.pause();
					successSound.play();
					context.rect(0,0,canvas.width,canvas.height);
					context.fillStyle="rgba(255, 255, 255, 0.5)";
					context.fill();
					context.fillStyle="rgba(0, 0, 0, 1)";
					context.font='40px microsoft yahei';
					context.fillText("恭喜你赢得QQtoy一个!!!",canvas.width/2-220,canvas.height/2 - 100);
					context.drawImage(qqtoyImg,0,0,500,270,250, 300 ,500,270);
				}else{
					window.requestAnimationFrame(animate);
				}
			}
			
			window.requestAnimationFrame(animate);


			function wrapText(context, text, x, y, maxWidth, lineHeight) {
		        var words = text.split(' ');
		        var line = '';

		        for(var n = 0; n < words.length; n++) {
		          var testLine = line + words[n] + ' ';
		          var metrics = context.measureText(testLine);
		          var testWidth = metrics.width;
		          if (testWidth > maxWidth && n > 0) {
		            context.fillText(line, x, y);
		            line = words[n] + ' ';
		            y += lineHeight;
		          }
		          else {
		            line = testLine;
		          }
		        }
		        context.fillText(line, x, y);
		    }