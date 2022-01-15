class Game {
  constructor() {
    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.isCarMoving =false;
  }

  start() {
    if(gameState===0){
      form = new Form();
      form.display();
      player = new Player();
      player.getCount();
    }
    car1=createSprite(200, 120, 50, 50);
    car1.addImage(car1Image);
    car1.scale=0.09;
    car2=createSprite(400, 120, 50, 50);
    car2.addImage(car2Image);
    car2.scale=0.09;
    cars=[car1,car2];
    fuels=new Group();
    coins=new Group();

    this.addSprites(fuels, 4, fuelImage, 0.02);
    this.addSprites(coins, 10, coinImage, 0.08);

    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image }
      
    ];

    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.05, obstaclesPositions);
  }
  getState(){
    var stateRef=database.ref("gameState");
    stateRef.on("value",(data)=>{
      gameState=data.val();
    })
  }

  updateState(count){
    
    var stateRef=database.ref("/");
    stateRef.update({
      gameState: count
    })

  }
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY=player.positionY+10;
      player.updatePlayer();
      this.isCarMoving = true;
    }
    if(keyIsDown(LEFT_ARROW)&& player.positionX > width/2 - 100){
      console.log("left");
      player.positionX=player.positionX-10;
      player.updatePlayer();
      this.isCarMoving = true;
    }

      if(keyIsDown(RIGHT_ARROW)&& player.positionX < width/2 + 100){
        console.log("right");
        player.positionX=player.positionX+10;
        player.updatePlayer();
        this.isCarMoving= true;
      }
  }
  play(){
    this.handleElements();
    Player.getAllPlayers();
    //console.log(allPlayers);
    if(allPlayers !== undefined){
      image(track, 0, -height*5, width, height*6);
      player.getCarsAtEnd();

      this.handlePlayerControls();
      this.showLeaderboard();
      this.showFuelBar();
      this.showLifeBar();

      var x = 0;
      var y = 0;
      var index = 0;
      const finishLine = height*6-100;
      for(var plr in allPlayers){
        //console.log(allPlayers[plr].name);
        index = index+1;
        
        x=allPlayers[plr].positionX;
        if(x===0){
          if(index===1){
            x=width/2-100;
          
          } else{
            x=width/2+100;
          }
        }
        y=height-allPlayers[plr].positionY;
        cars[index-1].position.x=x;
        cars[index-1].position.y=y;
        //console.log(cars);
        if(index===player.id){
          player.positionX = x;          
          player.updatePlayer();
          camera.position.x = x;
          camera.position.y = y;
          fill("yellow");
          ellipse(x,y,100,100);
          this.handleFuel(index);
          this.handleCoin(index);
          
          
        }
      }
      if(player.positionY > finishLine){
        gameState = 2;
        player.rank = player.rank + 1;
        Player.updateCarsAtEnd(player.rank);
        player.updatePlayer();
      }
    }
    
    drawSprites();
  }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, position=[]){
    for(var i = 0; i<numberOfSprites; i++){
      if(position.length > 0){
        var x = position[i].x;
        var y = position[i].y;
        spriteImage = position[i].image;
      }else{
        var x=random(width/2 - 200, width/2 +200);
        var y=random(-height*2, height-400);
      }
      
      var sprite = createSprite(x, y, 50, 50);
      sprite.addImage(spriteImage);
      sprite.scale=scale;
      spriteGroup.add(sprite);
    }
  }
  handleFuel(index){
    cars[index-1].overlap(fuels,(collector, collected)=>{
      player.fuel=185;
      collected.remove();
    })

    if(player.fuel > 0 && this.isCarMoving){
      player.fuel = player.fuel -0.3;
    }

    if(player.fuel  <= 0){
      gameState = 0;
      this.gameOver();
    }
  }
  handleCoin(index){
    cars[index-1].overlap(coins,(collector, collected)=>{
      player.score = player.score+1;
      collected.remove();
    })
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    
    
    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  end(){

  }
  showFuelBar(){   
    image(fuelImage, player.positionX - 130, height - player.positionY - 100, 25, 25);
    push();
    fill("white");
    rect(player.positionX-100, height - player.positionY-100,185,20);    
    fill("green");
    rect(player.positionX-100, height - player.positionY-100, player.fuel, 20);
    noStroke();
    pop();
  }

  showLifeBar(){
    image(fuelImage, player.positionX - 130, height - player.positionY - 150, 25, 25);
    push();
    fill("white");
    rect(player.positionX-100, height - player.positionY-150,185,20);    
    fill("red");
    rect(player.positionX-100, height - player.positionY-150, player.life, 20);
    noStroke();
    pop();
  }

  gameOver(){
    console.log("game over");
  }
  
}

