////// INITIALISING VARIABLES
// INITIALISE PLAYER VARIABLES
let player;
let playerSprite;
let playerSpeed = 5;

// INITIALISE TILEMAP VARIABLES
let tileMap = []; // creates an empty 1 dimensional array to be developed in later code to make a tile map
let tilesX = 10; // a variable to store the amount of columns in the tile map
let tilesY = 10; // a variable to store the amount of rows in the tile map
let tileSize = 50; // a variable to store the amount of pixels in each tile
let textures = [];


//// LEVEL DATA OBJECTS

let level0 = {
   graphicsMap: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  
    [1, 0, 0, 0, 0, 0, 0, 2, 3, 2], // 0
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 1  X
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2  
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // 3  V
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0], // 4  A
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5  L
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6  U
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 7  E
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8  S
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0]  // 9
  ],

   tileRules: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  
    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1], // 0
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 1  X
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2  
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // 3  V
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0], // 4  A
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5  L
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6  U
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 7  E
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8  S
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0]  // 9
  ],
  //// RULES
  // 0 = free to walk on
  // 1 = obstacle/can't walk on
  // 2 = transition tile

  startTileX: 8,
  startTileY: 5 // starttiles for the player

}

let level1 = {
  graphicsMap: [
  //         2nd VALUE (x)  
  //    0  1  2  3  4  5  6  7  8  9
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 2 
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 3
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 4
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 3], // 5
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 6
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 7
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 8
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 9
  ],

  tileRules: [
  //         2nd VALUE (x)  
  //   0  1  2  3  4  5  6  7  8  9
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 2 
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 3
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4  1st VALUE (y)
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 2], // 5
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 7
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 9
  ],

  startTileX: 1, //Sets X tile to start player on
  startTileY: 5  //Sets Y tile to start player on
}

let level2 = {

  graphicsMap: [ 
  //              2nd Value (x)
  //   0  1  2  3  4  5  6  7  8  9 
      [2, 3, 2, 2, 2, 2, 2, 2, 2, 2], // 0
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 1
      [2, 4, 2, 4, 4, 4, 4, 4, 4, 2], // 2
      [2, 4, 4, 4, 4, 4, 4, 2, 4, 2], // 3
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 4    1st Value (y)
      [2, 4, 2, 4, 4, 4, 4, 4, 4, 2], // 5
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 6
      [2, 4, 4, 4, 4, 4, 2, 2, 4, 2], // 7
      [2, 4, 4, 4, 4, 4, 4, 4, 4, 2], // 8
      [2, 2, 3, 2, 2, 2, 2, 2, 2, 2]  // 9
  ],

  tileRules: [ 
  //              2nd Value (x)
  //   0  1  2  3  4  5  6  7  8  9 
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1], // 0
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 2
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1], // 3
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1], // 4    1st Value (y)
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 5
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 1], // 7
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
      [1, 1, 2, 1, 1, 1, 1, 1, 1, 1]  // 9
  ],

  startTileX: 2, //Sets X tile to start player on
  startTileY: 8  //Sets Y tile to start player on
}

//// LEVEL CONTROL VARIABLES
let levels = [level0, level1, level2];
let currentLevel = 0;
let graphicsMap;
let tileRules;
let count;
let countMax = 30;

function setup() {
  createCanvas(500, 500); // creates a canvas big enough for the tile map

  loadLevel();

  // create player
  player = new Player(playerSprite, 3, 3, tileSize, tileRules);
}

function loadLevel() {
  graphicsMap = levels[currentLevel].graphicsMap;
  tileRules = levels[currentLevel].tileRules;

  let tileID = 0; // initialises the tile IDs to 0 so that it can increment each time one is created


  // creates tiles
  for (let tileX = 0; tileX < tilesX; tileX++) { // from the first tile to the last tile on the first row (tiles 1 to 10)
    tileMap[tileX] = []; // creates an array within the exisiting array to create a 2 dimensional array like a grid
    for (let tileY = 0; tileY < tilesY; tileY++) { // starts second for loop
      // set the texture for the tile
      let texture = graphicsMap[tileY][tileX];

      tileMap[tileX][tileY] = new Tile(textures[texture], tileX, tileY, tileSize, tileID); // creates new tile

      tileID++;
    }
  }
}

function preload() {
  // tilemap textures
  textures[0] = loadImage("images/woodFloor.jpg");
  textures[1] = loadImage("images/stone.png");
  textures[2] = loadImage("images/wall_50x.png");
  textures[3] = loadImage("images/door.png");
  textures[4] = loadImage("images/void_50x.png");

  // player
  playerSprite = loadImage("images/character.png");

}

function draw() {
  background(0);

  // loops through all tiles wach time draw() is called
  for (let tileX = 0; tileX < tilesX; tileX++) {
    for (let tileY = 0; tileY < tilesY; tileY++) {
      tileMap[tileX][tileY].display();
      tileMap[tileX][tileY].debugGrid(); // runs debug() for each tile
    }
  }  

  player.display();
  player.setDirection();
  player.move();

  if (player.transition) {
    if (count === countMax) player.transition = false;
    else count++;
  }
}

class Player {
  constructor(sprite, startX, startY, tileSize, tileRules) {
    // player sprites
    this.sprite = sprite;

    // tile position data
    this.tileX = startX;
    this.tileY = startY;

    // pixel position data
    this.xPos = startX * tileSize; // refers to the pixel position
    this.yPos = startY * tileSize; // in relation to the canvas

    // direction player wants to move
    this.dirX = 0;
    this.dirY = 0;

    // player's target pixel position
    this.tx = this.xPos;
    this.ty = this.yPos;

    // movement
    this.isMoving = false;
    this.speed = 5;

    // tile data
    this.tileSize = tileSize;
    this.tileRules = tileRules;
    this.transition = false;
  }

  display() {
    image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize);
} 

  setDirection() {
    let up = 87; // w
    let down = 83; // s
    let left = 65; // a
    let right = 68; // d
    
    if (!this.isMoving) {

      if (keyIsDown(up)) {
        this.dirX = 0;
        this.dirY = -1;
      }

      if (keyIsDown(down)) {
        this.dirX = 0;
        this.dirY = 1;
      }

      if (keyIsDown(left)) {
        this.dirX = -1;
        this.dirY = 0;
      }

      if (keyIsDown(right)) {
        this.dirX = 1;
        this.dirY = 0;
      }

      this.checkTargetTile();
    }
  }

  checkTargetTile() {
    if (this.transition) {
      this.dirX = 0;
      this.dirY = 0;
    }


    // calculate position of current tile
    this.tileX = Math.floor(this.xPos / this.tileSize);
    this.tileY = Math.floor(this.yPos / this.tileSize);

    // calculate position of next tile
    let nextTileX = this.tileX + this.dirX;
    let nextTileY = this.tileY + this.dirY;

    // check if the next tile is in bounds of the tilemap
    if (nextTileX >= 0 && // left bound
        nextTileX < tilesX && // right bound
        nextTileY >= 0 && // top bound
        nextTileY < tilesY) { // bottom bound

          if (tileRules[nextTileY][nextTileX] === 2) {
            currentLevel++;

            if (currentLevel >= levels.length) currentLevel = 0;

            // loads the next level in our levels array
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          }
          // check if the next tile is walkable or not
          else if (tileRules[nextTileY][nextTileX] != 1) { // if it's not (!=) the tile you can't walk on
            // set tx and ty
            this.tx =  nextTileX * tileSize;
            this.ty = nextTileY * tileSize;

            // set this.isMoving to a true so that the player can move
            this.isMoving = true;
          }
      }
  }

  move() {
    // this will be called every frame as it is in the draw loop
    if (this.isMoving) {
      this.xPos += this.speed * this.dirX;
      this.yPos += this.speed * this.dirY;

      // checks if the player has reached ttheir target tile
      if (this.xPos === this.tx && this.yPos === this.ty) { // checks if the values arethe same
        // when they reach their tile then stop moving and reset the variables
        this.isMoving = false;
        this.dirX = 0;
        this.dirY = 0;
      }
    }
  }

  setPlayerPosition() {
    this.tileX = levels[currentLevel].startTileX;
    this.tileY = levels[currentLevel].startTileY;
    this.xPos = levels[currentLevel].startTileX * tileSize;
    this.yPos = levels[currentLevel].startTileY * tileSize;
    //this.dirX = 0;
    //this.dirY = 0;
  }

}

class Tile {
  constructor(texture, tileX, tileY, tileSize, tileID) {
    this.texture = texture; //  
    this.tileX = tileX; // refers to the pixel position of
    this.tileY = tileY; // the tile in our tileMap grid
    this.xPos = tileX * tileSize; // refers to the pixel position
    this.yPos = tileY * tileSize; // in relation to the canvas
    this.tileSize = tileSize;
    this.tileID = tileID;
  }

  debugGrid() {
    let xPadding = 2;
    let yCoordinatePadding = 8;
    let yIDPadding = 18;

    strokeWeight(1);
    stroke(0);
    fill(255, 255, 0);

    textSize(8);
    text("X: " + this.tileX + "Y: " + this.tileY, this.xPos + xPadding, this.yPos + yCoordinatePadding);

    textSize(10);
    text("ID: " + this.tileID, this.xPos + xPadding, this.yPos + yIDPadding);

    noFill();
    stroke(255, 255, 0);
    rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
  }

  displayMessage() {
    let xPadding = 2;
    let yPadding = 40;

    strokeWeight(1);
    stroke(0);
    fill(255);
    textSize(10);

    text("Accessed!", this.xPos + xPadding, this.yPos + yPadding);
  }

  display() { 
    noStroke();
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
  }
}