const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const startGameBtn = document.querySelector('#startgamebtn');
const modelUI = document.querySelector('#modelUI');
// const remodelUI = document.querySelector('#remodelUI');
const pointID = document.querySelector('#pointID');



//Charactor////////////////////////////////////////////////////////////////////////
class Charactor{
    constructor(x, y, width, height, vx, vy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;

    }
    draw(){
        context.fillStyle = 'Green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.draw();
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }
}



let cx = 200;
let cy = 500;
let cv = 0.5;
let cvx = 0;
let cvy = 0;

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
   if(event.keyCode == 38){             // Up Arrow
        charactor.vx = 0;
        charactor.vy = -cv;
   } else if (event.keyCode == 39){     // right arrow
        charactor.vx = cv;
        charactor.vy = 0;
   } else if (event.keyCode == 40){     //down arrow
        charactor.vx = 0;
        charactor.vy = cv;
   } else if (event.keyCode == 37){     //left arrow
        charactor.vx = -cv;
        charactor.vy = 0;
   } else if(event.keyCode == 32){      //space
        charactor.vx = 0;
        charactor.vy = 0;
   } else {

        return;
   }
}

function barrier(x,y){
    if(x <= 5){
        charactor.vx = charactor.vx + cv;
    } else if (x >= 390){
        charactor.vx = charactor.vx - cv;
    } else if (y <= 5){
        charactor.vy = charactor.vy + cv;
    } else if (y >= 590){
        charactor.vy = charactor.vy - cv;
    }
}

let charactor = new Charactor (cx, cy, 15, 15, cvx, cvy);

function charactorVelocity(){
    cx = cx + cvx;
    cy = cy + cvy;
    console.log(cy, "hello" ,cvy);
}


//Obstacle////////////////////////////////////////////////////////////////////////

class Obstacle{
    constructor(x, y, width, height, velocity){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
    }
    draw(){
        context.fillStyle = 'Red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.draw();
        this.y = this.y + this.velocity;
    }
}


function obstacleArray(){
    let rx;
    let rw; 
    let rm = Math.floor(Math.random()*2);
    if(rm == 1){              //normal
        rx = Math.floor(Math.random()*4);
        if(rx == 0){
            rw = (Math.floor(Math.random()*3) + 1) * 100;
        } else if (rx == 1){
            rw = (Math.floor(Math.random()*3) + 1) * 100;
        } else if (rx == 2){
            rw = (Math.floor(Math.random()*2) + 1) * 100;
        } else {
            rw = (Math.floor(Math.random()*1) + 2) * 100;
        }
    } else if(rm == 0){       //inverted
        rx = Math.floor(Math.random()*4);
        if(rx == 0){
            rw = 0;
        } else if (rx == 1){
            rw = -(Math.floor(Math.random()*1) + 1) * 100;
        } else if (rx == 2){
            rw = -(Math.floor(Math.random()*2) + 1) * 100;
        } else {
            rw = -(Math.floor(Math.random()*3) + 1) * 100;
        }
    } 
    return {rx, rw, rm};
}



const obstacles = [];

function spawnObstacle(){
    setInterval(
        function(){
        let array = obstacleArray();
        const x = array.rx * 100;
        const y = 0;
        const w = array.rw;
        const h = 15;
        const v = 0.4;
        obstacles.push(new Obstacle(x, y, w, h, v));
        }, 2000);
}

//Scorr Counter/////////////////////////////////////////////
let score = 0;

function scoreCounter(){
    setInterval(score = score + 1, 1000);
    return score;
}

let animation;
let currentScore;

function animate(){ 
    animation = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    charactor.update();
    barrier(charactor.x, charactor.y);
    currentScore = scoreCounter();

    obstacles.forEach(function(obstacle)
        {
            obstacle.update();
            //currentScore = scoreCounter();
            //console.log(currentScore);
            if(charactor.x > obstacle.x + obstacle.width || charactor.x + charactor.width < obstacle.x ||charactor.y > obstacle.y + obstacle.height || charactor.y + charactor.height < obstacle.y){
                //console.log("All good boss");
            } else {
                cancelAnimationFrame(animation);
                modelUI.style.display = 'flex';
                pointID.innerHTML = currentScore;
                console.log(currentScore);
            }
        });
    
}

startGameBtn.addEventListener('click', 
    function(){
    startGame();
    modelUI.style.display = 'none';
});

function startGame(){
    spawnObstacle();
    animate();
}
