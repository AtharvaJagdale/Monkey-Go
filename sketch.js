var PLAY=1
 var END=0
 var gameState=PLAY
var monkey 
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var Survivaltime=0
var bananaEaten=0
var Ground;
function preload(){
  
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
 
  monkey=createSprite(70,430,30,30)
  monkey.addAnimation("run",monkey_running)
  monkey.scale=0.15
  
  
  
  
  Ground=createSprite(300,500,600,10)
  Ground.x=Ground.width/2
  
  
 obstacleGroup=new Group();
  bananaGroup=new Group();
}


function draw() {
background("skyblue")
 drawSprites(); 
  console.log(mouseX+":"+mouseY) 
  
  
  
  monkey.collide(Ground)
  monkey.setCollider("circle",0,0,250)
  textSize(20)
  fill("black")
  text("Survival time:  "+Survivaltime,420,100)
  text("Banana Eaten:  "+bananaEaten,100,100)
  if(Ground.x<300){
    Ground.x=300
    Ground.y=500
  }
  if(gameState===PLAY){
    
    Survivaltime=Survivaltime+Math.round(getFrameRate()/60)
    if(keyDown("space") && monkey.y>448){
    monkey.velocityY=-15}
    monkey.velocityY=monkey.velocityY+0.8 
    Ground.velocityX=-(7+3*Survivaltime/100)
  obstacles();
  spawnBanana();
    if(monkey.isTouching(obstacleGroup)){
      gameState=END
    }
if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach();
  bananaEaten++
}
  
  }
  else if (gameState===END){
    Ground.velocityX=0
    banana.velocityX=0
    obstacle.velocity=0
    bananaGroup.setlifetimeEach=-1
    obstacleGroup.setlifetimeEach=-1
  }
  
  
  
  
}

function obstacles(){
  if(frameCount%80===0){
    obstacle=createSprite(512,485,20,20)
    obstacle.addImage(obstacleImg)
    obstacle.scale=0.15
    obstacle.velocityX=-7
    obstacle.lifetime=80
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1
    obstacleGroup.add(obstacle)
  
  
  }
}
 
function spawnBanana(){
  if(frameCount%80===0){
  banana=createSprite(430,400,10,10)
  banana.y=Math.round(random(350,450))
  banana.addImage(bananaImg)
  banana.scale=0.1
    banana.velocityX=-5
    banana.lifetime=80
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1
    bananaGroup.add(banana)
    }
  
}




