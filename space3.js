const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
var isSpacebarPressed = false; 
var isKeyUpPressed = false;
var isKeyDownPressed = false;
var isKeyLeftPressed = false;
var isKeyRightPressed = false;
var isGameStarted = false;

function drawBackground(){      
    // ctx.rect(0, 0, 600, 600);
    // ctx.fillStyle = "rgb(24, 24, 24)";
    // ctx.fill();

    var space = new Image();
    space.src = 'galagabg.jpg';
    ctx.drawImage(space, 0, 0, 600, 600);

}

let shipObj = {

    posX: 250, 
    posY: 515,

    drawShip: function(){
        var img = new Image();
        img.src = 'spaceship3.2.png';
        ctx.drawImage(img, this.posX, this.posY, 43, 43 );
    }
}

levelOneArr = [];

function Alien(paramPosX, paramPosY){

    this.posX = paramPosX,
    this.posY = paramPosY,
    this.velocity = 5,

    this.drawAlien = function(){
        var alien1 = new Image();
        alien1.src = 'alien1.png';
        ctx.drawImage(alien1, this.posX, this.posY, 43, 43);
    }

    this.moveAlien = function(){
        this.posX += this.velocity
        if (this.posX >= 550){this.velocity = -5}
        if (this.posX <= 50) {this.velocity = 5}
    }

    this.moveDown = function(){
        this.posY += 0.5;
    }

}

function initLevelOne(){

    let vectorX = 100;
    let vectorY = 25;
    
    for(var i = 0; i < 12; i++){
        var alien = new Alien(vectorX += 50, vectorY += 0);
        levelOneArr.push(alien);
        // console.log(levelOneArr[i]);  
    }

}

function Shipbullet(paramPosX, paramPosY) {

    this.posX = paramPosX;
    this.posY = paramPosY;

    this.draw = function(){

        var beam = new Image();
        beam.src = 'redbeam.png';
        ctx.drawImage(beam, this.posX, this.posY, 20, 30);
    },

    this.move = function(){
        this.posY -= 10;
    }
}

let bulletArr = [];

function keyDownEvent(e){

    //up
    if(e.keyCode == 38){
        isKeyUpPressed = true;
    }
    //down
    else if(e.keyCode == 40){
        isKeyDownPressed = true;
    }
    //left
    else if(e.keyCode == 37){
        isKeyLeftPressed = true;
    }
    //right
    else if(e.keyCode == 39){
        isKeyRightPressed = true;
    }
    //shoot
    else if(e.keyCode == 32){ 
        isSpacebarPressed = true; 
    }
}

function keyUpEvent(e){

    //up
    if(e.keyCode == 38){
        isKeyUpPressed = false;
    }
    //down
    else if(e.keyCode == 40){
        isKeyDownPressed = false;
    }
    //left
    else if(e.keyCode == 37){
        isKeyLeftPressed = false;
    }
    //right
    else if(e.keyCode == 39){
        isKeyRightPressed = false;
    }
    //shoot
    else if(e.keyCode == 32){ 
        isSpacebarPressed = false; 
    }
}

// let alien1 = new Alien(50, 100);
// let alien2 = new Alien(200, 100);
    
function gameloop(){

    drawBackground();

    if(isSpacebarPressed == true){
        bulletposX = shipObj.posX+12.2;
        bulletposY = shipObj.posY-15;
        let bullet = new Shipbullet(bulletposX, bulletposY);
        bulletArr.push(bullet);
    }
    if(isKeyUpPressed == true){
        shipObj.posY -= 20;
    }
    if(isKeyDownPressed == true){
        shipObj.posY += 20;
    }
    if(isKeyLeftPressed == true){
        shipObj.posX -= 20;
    }
    if(isKeyRightPressed == true){
        shipObj.posX += 20;
    }
    
    shipObj.drawShip();

    for(var i = 0; i < bulletArr.length; i++){
        var bullet = bulletArr[i];
        bullet.move();
        bullet.draw();
    }

    levelOneArr.forEach(elem => {

        elem.drawAlien();
        elem.moveAlien();
        elem.moveDown();
      
    });

    setTimeout(gameloop, 30);
    
};

initLevelOne();
gameloop();

addEventListener('keydown', keyDownEvent);
addEventListener('keyup', keyUpEvent);

function showMenu(){
    document.getElementById("menu").classList.toggle("menushow");
}


//'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'