// Global values
var level = 1; //Start at level 1
var score = 0; //Score starts at 0
var minSpeed = 0.3; //minimum bug speed; increases every level
var minSpeed = 0.9; //maximum bug speed; increases every level

rowArray = [56, 139, 222]; // array of y values for each row of bug

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 230 * this.speed * dt; //determines speed
    //if bug hits edge of canvas it resets back to the begninning at different speed
    if (this.x > 505){
        this.x = -100;
        var row = rowArray[Math.floor(Math.random() * rowArray.length)];
        this.y = row;
        this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.w = 101;
    this.h = 171;
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

// resets Player to starting position
Player.prototype.resetPlayer = function(){
    this.x = 200;
    this.y = 400;
}
//determines where player can move on canvas
Player.prototype.update = function() {
    if (this.y < (this.h - 130)) {
        this.x = 200;
        this.y = 400;
    } else if (this.x < (this.w - 1)) {
        this.x = 0;
    } else if (this.x > (canvas.width - this.w)) {
        this.x = 400;
    } else if (this.y > (canvas.height - this.h)) {
        this.y = 400;
    }
};

//draws player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//determines how arrow keys move Player
Player.prototype.handleInput = function(key) {
    switch (key) {

        case 'left':
            this.x = this.x - 100;
            break;

        case 'right':
            this.x = this.x + 100;
            break;

        case 'up':
            this.y = this.y - 83;
            break;

        case 'down':
            this.y = this.y + 83;
            if (this.y > (canvas.height - this.h)) {};
            //this.y = 400;
            console.log(this.x,this.y);
            break;

        default:
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
/* Create a new Enemy for each row and set position & speed */
var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
enemy.x = -50;
enemy.y = rowArray[0];
enemy.speed = 1;
var enemy2 = new Enemy();
allEnemies.push(enemy2);
enemy2.x = 250;
enemy2.y = rowArray[1];
enemy2.speed = 1;
var enemy3 = new Enemy();
allEnemies.push(enemy3);
enemy3.x = -150;
enemy3.y = rowArray[2];
enemy3.speed = 1;

// Place the player object in a variable called player
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
