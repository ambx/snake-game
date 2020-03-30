const cvs= document.getElementById("snake");
const ctx= cvs.getContext("2d");

//unit  box
const box=32;

//load images
const ground= new Image();
ground.src="one/img/ground.png"

const foodImg= new Image();
foodImg.src= "one/img/food.png"

//load audio files
const dead= new Audio();
const eat= new Audio();
const up= new Audio();
const down= new Audio();
const right= new Audio();
const left= new Audio();

dead.src= "one/audio/dead.mp3";
eat.src="one/audio/eat.mp3";
up.src="one/audio/up.mp3";
down.src="one/audio/down.mp3";
right.src="one/audio/right.mp3";
left.src="one/audio/left.mp3";

//create snake initial position
var snake = [];
snake[0]=  {
    x: 9*box,
    y: 10*box
}

//create food 
var food ={
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box,
}

//score variable
var score= 0;
 
//snake controls
var d;
function direction(e){
    if(e.keyCode==37 && d!="RIGHT"){
        left.play();
        d="LEFT";
    }
    else if(e.keyCode==38 && d!="DOWN"){
        down.play();
        d="UP";
    }
    else if(e.keyCode==39 && d!="LEFT"){
        right.play();
        d="RIGHT";
    }
    else if(e.keyCode==40 && d!="UP"){
        down.play();
        d="DOWN";
    }
}

document.addEventListener("keydown",direction);

function collision(head,array){
    for (k=0; k<array.length; k++){
        if(array[k].x==head.x && array[k].y==head.y)
        return true;
    }
    return false;
}

//draw function
function  draw(){
    ctx.drawImage(ground,0,0);
    for (var i=0; i<snake.length; i++){
        ctx.fillStyle = (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y,box,box);

        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x, snake[i].y, box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y)

    //old head position
    var snakeX= snake[0].x;
    var snakeY=snake[0].y;

    //direction
    if(d=="LEFT") snakeX-=box;
    if(d=="UP") snakeY-=box;
    if(d=="RIGHT") snakeX+=box;
    if(d=="DOWN") snakeY+=box;

    //if snake eats food
    if(snakeX==food.x && snakeY==food.y){
        eat.play();
        score++;
        food ={
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box,
        }
    }
    else{
        //it continues to move
        snake.pop();
    }

    //add new head
    var newHead={
        x:snakeX,
        y:snakeY
    }

    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY> 17*box || collision(newHead,snake)){
        dead.play();
        clearInterval(game);
    }

    snake.unshift(newHead);

    //score board
    ctx.fillStyle = "white";
    ctx.font= "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}
var game = setInterval(draw, 100);