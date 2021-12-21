var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState=0;
var allPlayers;
var car1, car2;
var cars=[];
var car1Image, car2Image;
var track;
var fuels, fuelImage;
var coins, coinImage;
var obstacles, obstacle1Image, obstacle2Image;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Image= loadImage("assets/car1.png");
  car2Image=loadImage("assets/car2.png");
  track= loadImage("assets/track.jpg");
  fuelImage = loadImage("assets/fuel.png");
  coinImage = loadImage("assets/goldCoin.png");
  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");

  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount===2){
game.updateState(1);
  }
  if(gameState===1){
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
