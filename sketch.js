var PLAY=1;
var END;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0; 
var ground;
var gameState;
var survivalTime =0;



function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;

  ground = createSprite(10,375,800,50);
  ground.x=ground.width/2
  ground.shapeColor="black";
  

  
  FoodGroup=new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
createCanvas(400,400);
background("white");
  
  monkey.collide(ground);
   
  stroke("white");
  textSize(20);
  fill("black");
 
    
  
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score= score+1;
  }  
  if(PLAY==1){
 
    if(keyDown("space")&& monkey.x<300){
    monkey.velocityY=-12;
  }
  
    if(monkey.y<120){
    monkey.velocityY=12;
  }    
    bananas();
  obstacles();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    PLAY=0;
  }
  
  if(PLAY==0){
    FoodGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.lifetime=-1
      
    if(monkey.y<315){
      monkey.y=300;
      monkey.collide(ground);
    }
  }
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,200,30);
  
 console.log(frameCount);
  drawSprites();
}

function bananas(){
  if(World.frameCount%80==0){
    banana = createSprite(500,120,20,20);
    banana.velocityX=-5;
    banana.addImage(bananaImage);
    banana.scale=0.1
    
    banana.y=Math.round(random(120,200));
    FoodGroup.add(banana);
    FoodGroup.lifetime=100;
  }
}
 
function obstacles(){
 if(World.frameCount%120==0){ 
  obstacle = createSprite(500,325,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-10;
  
  obstacleGroup.add(obstacle); 
   
}
}


