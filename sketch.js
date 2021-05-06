//Create variables here
var database;
var gameState=0;
var dog;
var dog1;
var foodok;
var dog2;
var foodstock;
var foodS;
var addone,feedone;
var lasttime;
var e;
var bedtime=1;
var hugary=0;
var playing=2;
var bathing = 3;
function preload()
{
  //load images here
  dog1=loadImage("dogImg.png");
  dog2=loadImage("dogImg1.png");
  garden1=loadImage("Garden.png");
  bedtime1=loadImage("BedRoom.png");
  washroomtime1=loadImage("WashRoom.png");
}

function setup() {
	createCanvas(500,800);
  dog=createSprite(250,600,30,30);
  dog.scale=0.7;
  dog.addImage(dog1);
  database=firebase.database();
 ref = database.ref("Food")
 ref.on("value",readStock)
 addone=createButton("addMilk");
 addone.position(450,200);
  addone.mousePressed(addfood);
  feedone=createButton("Feed Dog");
  feedone.position(600,200);
  feedone.mousePressed(feedDog)
  food=new Foodyes();
}


function draw() {  
  background("skyblue");
  gameStateref=database.ref('gameState');
  gameStateref.on("value",(data)=>{
    gameState=data.val();
  })
  feedref=database.ref('Feedtime');
  feedref.on("value",(data)=>{
    lasttime=data.val();
  })
  console.log(lasttime);
  currentTime=hour();
  if(currentTime==(lasttime+1))
  {
    update(2);
    food.gardentime();
  }
  else if(currentTime==(lasttime+2)){
    //cc
    update(1)
    food.bedroom();
  }
  else if(currentTime>(lasttime+2) && currentTime<=(lasttime+4))
  {
    update(3)
    food.washroomtime();
  }
  else{
    update(0);
    food.display();
  }
  if(gameState!=0){
    feedone.hide();
    addone.hide();
    dog.remove();
  }
  else{
    feedone.show();
    addone.show();
    dog.addImage(dog1);
  }
  // update(0);
  drawSprites();
  text("last feed: "+lasttime,200,100);
  // food.bedroom();
  
// text("ff"+gameState,100,100);
}
function readStock(data){
  foodS=data.val();
  console.log(foodS);
  food.updateFood(foodS); 
}
function addfood(){
  foodS=foodS+5;
  
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(dog1);
}
function feedDog(){
  dog.addImage(dog2);
  var currentstock = food.getFood();
  currentstock=currentstock-3;
  food.updateFood(currentstock);
  database.ref('/').update({
    Food:food.getFood(),
    Feedtime:hour()
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
