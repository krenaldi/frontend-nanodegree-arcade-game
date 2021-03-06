// Global values
var score = 0; //Score starts at 0
var level = 1; //Start at level 1
var minSpeed = 0.3; //minimum bug speed; increases every level
var maxSpeed = 0.9; //maximum bug speed; increases every level

var rowArray = [56, 139, 222]; // array of y values for each row of bug

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = rowArray[y];
    this.speed = 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 230 * this.speed * dt; //determines speed
    //if bug hits edge of canvas it resets back to the begninning at different speed
    if (this.x > 505) {
        this.x = -100;
        var row = rowArray[Math.floor(Math.random() * rowArray.length)];
        this.y = row;
        this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.w = 101;
    this.h = 171;
    this.x = 200;
    this.y = 388;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

// resets Player to starting position
Player.prototype.reset = function() {
    this.x = (ctx.canvas.width / 2) - (101 / 2);
    this.y = 388;
};

// this function is called when player dies by hitting a bug
Player.prototype.death = function() {
    //alert("You died. Click OK to continue.");
    player.reset();
    player.lives -= 1;
    document.getElementById("lives").innerHTML = player.lives;
    // pulls up a game over alert when lives equals 0
    if (player.lives === 0) {
        alert("GAME OVER! Refresh the page and click OK to play again.");
    }
};

//sets up collision detection & what happens when player reaches top row
Player.prototype.update = function(dt) {
    // detects collision on each row & runs playerDies function when collision occurs
    for (var i = 0; i < 2; i++) {
        if ((Math.floor(allEnemies[i].x) < this.x + 35) && (Math.floor(allEnemies[i].x) > this.x - 35) && Math.floor(allEnemies[i].y) == this.y) {
        player.death();
        }
    if (this.y == -27) 
        levelUp();
    }
};

//draws player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//determines how arrow keys move Player on the canvas
Player.prototype.handleInput = function(key) {
    switch (key) {

        case 'left':
            if (player.x <= 0) {
                player.x = 0;
            } else {
                player.x -= 101;
            }
            break;

        case 'right':
            if (player.x >= 400) {
                player.x = 404;
            } else {
                player.x += 101;
            }
            break;

        case 'up':
            if (player.y <= -22) {
                player.y = -27;
            } else {
                player.y -= 83;
            }
            break;

        case 'down':
            if (player.y >= 388) {
                player.y = 388;
            } else {
                player.y += 83;
            }
            break;

        default:
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
/* Create a new Enemy for each row and set position & speed */
var allEnemies = [];

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i));
}

// Place the player object in a variable called player
var player = new Player();
player.lives = 3; // player starts with 3 lives
player.score = 0; // player score starts with 0 score

// function is called each time the player reaches the water & goes to the next level
function levelUp() {
        level += 1;
        if (level == 25) {
            alert("CONGRATUALTIONS!!! You win! Refresh the page and click on OK to play again.");
        }
        score += 1;
        document.getElementById("level").innerHTML = level;
        document.getElementById("score").innerHTML = score;
        player.reset();
        minSpeed += 0.3;
        maxSpeed += 0.3;
    }
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