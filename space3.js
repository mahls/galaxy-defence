const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
var isSpacebarPressed = false; 
var isKeyUpPressed = false;
var isKeyDownPressed = false;
var isKeyLeftPressed = false;
var isKeyRightPressed = false;
var isGameStarted = false;
var level = 1;
var lastBulletTime = 0; // Time since the last bullet was fired
var bulletCooldown = 500; 
var level2 = false;

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

function Alien(paramPosX, paramPosY) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.velocity = 5;
    this.hits = 0; // Track the number of hits
    
    this.drawAlien = function() {
        var alien1 = new Image();
        alien1.src = 'alien1.png';
        ctx.drawImage(alien1, this.posX, this.posY, 43, 43);
    }

    this.moveAlien = function() {
        this.posX += this.velocity
        if (this.posX >= 550) { this.velocity = -5 }
        if (this.posX <= 50) { this.velocity = 5 }
    }

    this.moveDown = function() {
        this.posY += 0.5;
    }
}

function Alien2(paramPosX, paramPosY) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.velocity = 10;
    this.hits = 0; // Track the number of hits
    
    this.drawAlien2 = function() {
        var alien2 = new Image();
        alien2.src = 'alien2.png';
        ctx.drawImage(alien2, this.posX, this.posY, 43, 43);
    }

    this.moveAlien = function() {
        this.posX += this.velocity
        if (this.posX >= 550) { this.velocity = -5 }
        if (this.posX <= 50) { this.velocity = 5 }
    }

    this.moveDown = function() {
        this.posY += 0.5;
    }
}


function initLevelOne() {
    let vectorY = 25;
    let isStartLeft = true; // Flag to track starting position
    
    function createAlien() {
        let vectorX;
        if (isStartLeft) {
            vectorX = 100;
            isStartLeft = false;
        } else {
            vectorX = 500; // Adjust this value based on canvas width
            isStartLeft = true;
        }
        
        var alien = new Alien(vectorX, vectorY);
        levelOneArr.push(alien);
        
        // Check if all aliens are created
        if (levelOneArr.length < 10) { // Number of aliens you want to create
            setTimeout(createAlien, 500); // 500 milliseconds = 0.5 seconds
        }
    }

    createAlien();
}

function initLevelTwo() {
    level2 = true;
    levelOneArr = []; // Clear existing aliens from Level 1
    let vectorY = 25;
    let isStartLeft = true;

    function createAlien() {
        let vectorX;
        if (isStartLeft) {
            vectorX = 50;
            isStartLeft = false;
        } else {
            vectorX = 500; // Adjust this value based on canvas width
            isStartLeft = true;
        }
        
        var alien = new Alien(vectorX, vectorY);
        levelOneArr.push(alien);
        
        // Check if all aliens are created
        if (levelOneArr.length < 18) { // Number of aliens you want to create
            setTimeout(createAlien, 500); // 500 milliseconds = 0.5 seconds
        }
    }

    function createAlien2() {
        let vectorX;
        if (isStartLeft) {
            vectorX = 50;
            isStartLeft = false;
        } else {
            vectorX = 500; // Adjust this value based on canvas width
            isStartLeft = true;
        }
        
        var alien2 = new Alien2(vectorX, vectorY); // Create instance of Alien2
        levelOneArr.push(alien2); // Push Alien2 instance into levelOneArr
        
        // Check if all aliens are created
        if (levelOneArr.length < 18) { // Number of aliens you want to create
            setTimeout(createAlien2, 500); // 500 milliseconds = 0.5 seconds
        }
    }

    createAlien();
    createAlien2(); // Call createAlien2 to create instances of Alien2
}


function BlueBeam(paramPosX, paramPosY, angle) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.angle = angle;

    this.draw = function() {
        var beam = new Image();
        beam.src = 'bluebeam.png';
        ctx.save(); // Save the current transformation matrix
        ctx.translate(this.posX, this.posY); // Move the origin to the bullet's position
        ctx.rotate(this.angle); // Rotate the canvas
        ctx.drawImage(beam, -10, -15, 20, 30); // Draw the bullet
        ctx.restore(); // Restore the transformation matrix to prevent affecting other drawings
    };

    this.move = function() {
        this.posY -= 10; // Move the bullet upwards

        // Move the bullet diagonally based on the angle
        this.posX += Math.cos(this.angle) * 2; 
        this.posY += Math.sin(this.angle) * 2;
    };
}


function shootBlueBeam() {
    // Position adjustments for the blue beam to appear from the ship
    let centerBeamPosX = shipObj.posX + 21.5; // Center of the ship
    let beamPosY = shipObj.posY; // Top of the ship

    // Create a blue beam
    let blueBeam = new BlueBeam(centerBeamPosX, beamPosY, 0); // Center beam straight up

    blueBeamArr.push(blueBeam); // Push the blue beam into the blue beam array
}

let blueBeamArr = [];

function Shipbullet(paramPosX, paramPosY, angle) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.angle = angle;

    this.draw = function() {
        var beam = new Image();
        beam.src = 'redbeam.png';
        ctx.save(); // Save the current transformation matrix
        ctx.translate(this.posX, this.posY); // Move the origin to the bullet's position
        ctx.rotate(this.angle); // Rotate the canvas
        ctx.drawImage(beam, -10, -15, 20, 30); // Draw the bullet
        ctx.restore(); // Restore the transformation matrix to prevent affecting other drawings
    },

    this.move = function() {
        this.posY -= 10; // Move the bullet upwards

        // Move the bullet diagonally based on the angle
        this.posX += Math.cos(this.angle) * 2; 
        this.posY += Math.sin(this.angle) * 2;
    }
}

function shootBullets() {
    // Position adjustments for the bullets to appear from different sides of the ship
    let leftBulletPosX = shipObj.posX; // Left side of the ship
    let centerBulletPosX = shipObj.posX + 21.5; // Center of the ship
    let rightBulletPosX = shipObj.posX + 43; // Right side of the ship
    let bulletPosY = shipObj.posY; // Top of the ship

    // Create three red bullets with different starting positions
    let bullet1 = new Shipbullet(leftBulletPosX, bulletPosY, -Math.PI / 6); // Left bullet with angle
    let bullet2 = new Shipbullet(centerBulletPosX, bulletPosY, 0); // Center bullet straight up
    let bullet3 = new Shipbullet(rightBulletPosX, bulletPosY, Math.PI / 6); // Right bullet with angle

    bulletArr.push(bullet1, bullet2, bullet3); // Push all red bullets into the bullet array

    if (level2) {
        // If level2 is true, shoot blue beams as well
        let blueBeamPosX = shipObj.posX + 21.5; // Center of the ship for blue beam
        let blueBeamPosY = shipObj.posY; // Top of the ship for blue beam

        let blueBeam = new BlueBeam(blueBeamPosX, blueBeamPosY, 0); // Create a blue beam
        blueBeamArr.push(blueBeam); // Push the blue beam into the blue beam array
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
    if (e.keyCode == 32) { 
        isSpacebarPressed = true; 
        shootBullets();
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

function checkCollisionWithShip() {
    let shipTop = shipObj.posY;
    let shipBottom = shipObj.posY + 43; // Assuming ship height is 43
    let shipLeft = shipObj.posX;
    let shipRight = shipObj.posX + 43; // Assuming ship width is 43

    for (let i = 0; i < levelOneArr.length; i++) {
        let alien = levelOneArr[i];
        let alienTop = alien.posY;
        let alienBottom = alien.posY + 43; // Assuming alien height is 43
        let alienLeft = alien.posX;
        let alienRight = alien.posX + 43; // Assuming alien width is 43

        if (
            shipBottom >= alienTop &&
            shipTop <= alienBottom &&
            shipRight >= alienLeft &&
            shipLeft <= alienRight
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision detected
}
    
function gameloop(){
    var currentTime = Date.now();

    drawBackground();

    if (checkCollisionWithShip()) {
        // Game over condition: Ship collided with an alien
        console.log("Game over! Ship collided with an alien.");
        return; // Exit the game loop
    }

    if (levelOneArr.length === 0 && !isGameStarted) {
        console.log("Level 2 Started");
        isGameStarted = true; // Prevent reinitialization if already started
        initLevelTwo();
         // Initialize two
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

    levelOneArr.forEach((alien, index) => {
        if (alien instanceof Alien) {
            alien.drawAlien();
        } else if (alien instanceof Alien2) {
            alien.drawAlien2();
        }
        alien.moveAlien();
        alien.moveDown();

// Check for collision with each bullet
    bulletArr.forEach((bullet, bulletIndex) => {
    levelOneArr.forEach((alien, alienIndex) => {
        if (bullet.posX < alien.posX + 43 && bullet.posX + 20 > alien.posX &&
            bullet.posY < alien.posY + 43 && bullet.posY + 30 > alien.posY) {
            // Decrease the hits of the alien
            alien.hits++;
            // Remove the bullet
            bulletArr.splice(bulletIndex, 1);
            // Check if the alien has been hit 3 times
            if (alien.hits >= 3) {
                // Remove the alien
                levelOneArr.splice(alienIndex, 1);
            }
        }
    });
    });
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