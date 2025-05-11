////// INITIALISING VARIABLES
// INITIALISE PLAYER VARIABLES
let player;
let playerSprite;
let playerSpeed = 5;

// INITIALISE TILEMAP VARIABLES
let tileMap = []; // creates an empty 1 dimensional array to be developed in later code to make a tile map
let tilesX = 11; // a variable to store the amount of columns in the tile map
let tilesY = 11; // a variable to store the amount of rows in the tile map
let tileSize = 60; // a variable to store the amount of pixels in each tile
let textures = [];

// items and inventory
let invX = 670; // position to start where to draw the inventory
let invY = 0; // position to start where to draw the inventory

let allItems = {
  Locket: {
    name: "Locket",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  Paper: {
    name: "Crumpled Paper",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  StudyKey: {
    name: "Rusty Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  RoomKey: {
    name: "Silver Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  DoorKey: {
    name: "Gold Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  Teddy: {
    name: "Teddy Bear",
    img: null,
    isEquipped: false,
    opacity: 100
  }
}

// value on tilerules for where it is hidden
let itemTiles = {
  3: allItems.Paper,
  4: allItems.StudyKey,
  5: allItems.RoomKey,
  6: allItems.DoorKey,
  7: allItems.Teddy
}

// game state
let gameState = 1;

////// LEVEL DATA OBJECTS
//// RULES
// 0 = free to walk on
// 1 = obstacle/can't walk on
// 2 = transition tile
let entrance = {
   graphicsMap: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  10
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 0
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 1  X
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 2  
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 3  V
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 4  A
    [4, 4, 4, 3, 0, 0, 0, 3, 4, 4, 4], // 5  L
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 6  U
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 7  E
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 8  S
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4],  // 9
    [4, 4, 4, 2, 2, 3, 2, 2, 4, 4, 4]  // 10
  ],

   tileRules: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9, 10
    [0, 0, 0, 1, "k", "k", "k", 1, 0, 0, 0], // 0
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 1  X
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 2  
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 3  V
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 4  A
    [0, 0, 0, "s", 0, 0, 0, "lr", 0, 0, 0], // 5  L
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 6  U
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 7  E
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 6,
  startTileY: 5 // starttiles for the player
}

let livingRoom = {
  graphicsMap: [
  //         2nd VALUE (x)  
  // 0  1  2  3  4  5  6  7  8  9, 10 
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
    [4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4], // 1  X
    [4, 4, 2, 0, 0, 1, 1, 0, 0, 2, 4], // 2  
    [4, 4, 2, 0, 0, 0, 0, 0, 5, 2, 4], // 3  V
    [4, 4, 2, 0, 1, 0, 0, 0, 2, 2, 4], // 4  A
    [4, 4, 3, 0, 1, 0, 0, 0, 2, 2, 4], // 5  L
    [4, 4, 2, 0, 1, 0, 0, 0, 2, 2, 4], // 6  U
    [4, 4, 2, 0, 0, 0, 0, 0, 5, 2, 4], // 7  E
    [4, 4, 2, 0, 0, 1, 0, 0, 0, 2, 4], // 8  S
    [4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4],  // 9
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
  ],

  tileRules: [
  //         2nd VALUE (x)  
  //   0  1  2  3  4  5  6  7  8  9, 10
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1  X
      [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1], // 2  
      [1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 1], // 3  V
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], // 4  A
      [1, 0, "ent", 0, 1, 0, 0, 0, 1, 1, 1], // 5  L
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], // 6  U
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], // 7  E
      [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1], // 8  S
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  // 9
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 10
  ],

  startTileX: 3, //Sets X tile to start player on
  startTileY: 6  //Sets Y tile to start player on
}

let kitchen = {

  graphicsMap: [
    //         2nd VALUE (x)  
    // 0  1  2  3  4  5  6  7  8  9, 10
      [2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2], // 0
      [2, 1, 1, 5, 1, 5, 2, 0, 0, 0, 2], // 1  X
      [2, 1, 0, 0, 0, 0, 2, 0, 0, 0, 2], // 2  
      [2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3], // 3  V
      [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2], // 4  A
      [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2], // 5  L
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // 6  U
      [2, 0, 4, 4, 4, 0, 0, 0, 0, 0, 2], // 7  E
      [2, 0, 4, 4, 4, 0, 0, 0, 0, 0, 4], // 8  S
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],  // 9
      [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2]  // 10
    ],
  
    tileRules: [
    //         2nd VALUE (x)  
    //   0  1  2  3  4  5  6  7  8  9, 10
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // 1  X
        [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1], // 2  
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, "b"], // 3  V
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4  A
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 5  L
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6  U
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 7  E
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, "l"], // 8  S
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, "l"],  // 9
        [1, 1, 1, 1, 1, 1, 1, "ent", "ent", "ent", 1]  // 10
    ],

  startTileX: 9, //Sets X tile to start player on
  startTileY: 9  //Sets Y tile to start player on
}

let bathroom = {

  graphicsMap: [
    //         2nd VALUE (x)  
    // 0  1  2  3  4  5  6  7  8  9, 10
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1  X
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 2  
      [4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4], // 3  V
      [4, 4, 4, 2, 4, 4, 4, 1, 2, 4, 4], // 4  A
      [4, 4, 4, 3, 0, 0, 0, 0, 2, 4, 4], // 5  L
      [4, 4, 4, 2, 5, 0, 1, 0, 2, 4, 4], // 6  U
      [4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4], // 7  E
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 8  S
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 9
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
    ],
  
    tileRules: [
    //         2nd VALUE (x)  
    //   0  1  2  3  4  5  6  7  8  9, 10
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1  X
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 2  
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0], // 3  V
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // 4  A
        [0, 1, 1, "k", 0, 0, 0, 0, 1, 0, 1], // 5  L
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0], // 6  U
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0], // 7  E
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8  S
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 9
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 10
    ],

  startTileX: 4, //Sets X tile to start player on
  startTileY: 5  //Sets Y tile to start player on
}

let study = {
  graphicsMap: [
    //         2nd VALUE (x)  
    // 0  1  2  3  4  5  6  7  8  9, 10 
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
      [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4], // 1  X
      [4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 4], // 2  
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 4], // 3  V
      [4, 2, 0, 0, 0, 1, 0, 0, 0, 2, 4], // 4  A
      [4, 2, 0, 0, 1, 1, 1, 0, 0, 3, 4], // 5  L
      [4, 2, 0, 0, 1, 1, 1, 0, 0, 2, 4], // 6  U
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 4], // 7  E
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 4], // 8  S
      [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],  // 9
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
    ],
  
    tileRules: [
    //         2nd VALUE (x)  
    //   0  1  2  3  4  5  6  7  8  9, 10
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1  X
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 2  
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 3  V
        [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], // 4  A
        [0, 1, 0, 0, 1, 1, 1, 0, 0, "ent", 1], // 5  L
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1], // 6  U
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 7  E
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 8  S
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  // 9
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 10
    ],

  startTileX: 8, //Sets X tile to start player on
  startTileY: 5  //Sets Y tile to start player on
}

let landing = {
   graphicsMap: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  10
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1  X
    [4, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4], // 2  
    [4, 4, 4, 2, 0, 0, 0, 4, 4, 4, 4], // 3  V
    [4, 4, 4, 2, 0, 0, 0, 4, 4, 4, 4], // 4  A
    [4, 4, 4, 3, 0, 0, 0, 2, 4, 4, 4], // 5  L
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 6  U
    [4, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4], // 7  E
    [4, 4, 4, 2, 2, 3, 2, 2, 4, 4, 4], // 8  S
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 9
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
  ],

   tileRules: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9, 10
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 0
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 1  X
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 2  
    [0, 0, 0, 1, 0, 0, 0, "k", 0, 0, 0], // 3  V
    [0, 0, 0, 1, 0, 0, 0, "k", 0, 0, 0], // 4  A
    [0, 0, 1, "gb", 0, 0, 0, 1, 0, 0, 0], // 5  L
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 6  U
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 7  E
    [0, 0, 0, 1, 1, "mb", 1, 1, 0, 0, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 6,
  startTileY: 3 // starttiles for the player

}

let ghostBedroom = {
   graphicsMap: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  10
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1  X
    [4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4], // 2  
    [4, 4, 2, 0, 1, 4, 4, 1, 0, 2, 4], // 3  V
    [4, 4, 2, 0, 0, 4, 4, 0, 0, 2, 4], // 4  A
    [4, 4, 2, 1, 0, 0, 0, 0, 0, 3, 4], // 5  L
    [4, 4, 2, 1, 0, 0, 0, 0, 0, 2, 4], // 6  U
    [4, 4, 2, 0, 0, 0, 0, 1, 1, 2, 4], // 7  E
    [4, 4, 2, 2, 3, 2, 2, 2, 2, 2, 4], // 8  S
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 9
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
  ],

   tileRules: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9, 10
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 0
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 1  X
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0], // 2  
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0], // 3  V
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0], // 4  A
    [0, 0, 1, 1, 0, 0, 0, 0, 0, "l", 0], // 5  L
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0], // 6  U
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], // 7  E
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 8,
  startTileY: 5 // starttiles for the player

}

let masterBedroom = {
   graphicsMap: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9  10
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
    [4, 4, 2, 2, 2, 3, 2, 2, 2, 4, 4], // 1  X
    [4, 4, 2, 0, 0, 0, 0, 1, 2, 4, 4], // 2  
    [4, 4, 2, 1, 0, 0, 0, 1, 2, 4, 4], // 3  V
    [4, 4, 2, 4, 4, 0, 0, 0, 2, 4, 4], // 4  A
    [4, 4, 2, 4, 4, 0, 0, 1, 2, 4, 4], // 5  L
    [4, 4, 2, 1, 0, 0, 0, 1, 2, 4, 4], // 6  U
    [4, 4, 2, 0, 0, 0, 0, 1, 2, 4, 4], // 7  E
    [4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4], // 8  S
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 9
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
  ],

   tileRules: [
  //    Y    V  A  L  U  E  S
  // 0  1  2  3  4  5  6  7  8  9, 10
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // 0
    [0, 0, 1, 1, 1, "l", 1, 1, 1, 1, 0], // 1  X
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], // 2  
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0], // 3  V
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0], // 4  A
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0], // 5  L
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0], // 6  U
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], // 7  E
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 8,
  startTileY: 5 // starttiles for the player
}

//// LEVEL CONTROL VARIABLES
let rooms = [entrance, livingRoom, kitchen, bathroom, study, landing, ghostBedroom, masterBedroom];
let currentRoom = 0;
let previousRoom = 0;
let graphicsMap;
let tileRules;
let count;
let countMax = 30;

function setup() {
  createCanvas(740, 700); // creates a canvas big enough for the tile map

  loadLevel();

  textFont('Courier New');

  // create player
  player = new Player(playerSprite, 5, 9, tileSize, tileRules);

  // create inventory
  player.inventory = new Inventory(11);
}

function loadLevel() {
  // enterance
  if (currentRoom === 0 && previousRoom === 0) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 9;
  } else if (currentRoom === 0 && previousRoom === 1) {
    rooms[currentRoom].startTileX = 6;
    rooms[currentRoom].startTileY = 5;
  } else if (currentRoom === 0 && previousRoom === 2) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 1;
  } else if (currentRoom === 0 && previousRoom === 4) {
    rooms[currentRoom].startTileX = 4;
    rooms[currentRoom].startTileY = 5;
  } 
  // living room
  else if (currentRoom === 1 && previousRoom === 0) {
    rooms[currentRoom].startTileX = 3;
    rooms[currentRoom].startTileY = 5;
  } 
  // kitchen
  else if (currentRoom === 2 && previousRoom === 0) {
    rooms[currentRoom].startTileX = 8;
    rooms[currentRoom].startTileY = 9;
  } else if (currentRoom === 2 && previousRoom === 3) {
    rooms[currentRoom].startTileX = 9;
    rooms[currentRoom].startTileY = 3;
  } else if (currentRoom === 2 && previousRoom === 5) {
    rooms[currentRoom].startTileX = 9;
    rooms[currentRoom].startTileY = 9;
  } 
  // study
  else if (currentRoom === 4 && previousRoom === 0) {
    rooms[currentRoom].startTileX = 8;
    rooms[currentRoom].startTileY = 5;
  } 
  // landing
  else if (currentRoom === 5 && previousRoom === 2) {
    rooms[currentRoom].startTileX = 6;
    rooms[currentRoom].startTileY = 3;
  } else if (currentRoom === 5 && previousRoom === 6) {
    rooms[currentRoom].startTileX = 4;
    rooms[currentRoom].startTileY = 5;
  } else if (currentRoom === 5 && previousRoom === 7) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 7;
  } 
  // ghost bedroom
  else if (currentRoom === 6 && previousRoom === 5) {
    rooms[currentRoom].startTileX = 8;
    rooms[currentRoom].startTileY = 5;
  } 
  // master bedroom
  else if (currentRoom === 7 && previousRoom === 5) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 2;
  } 

  graphicsMap = rooms[currentRoom].graphicsMap;
  tileRules = rooms[currentRoom].tileRules;

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

  if (player) { // if the player has been created
    player.setPlayerPosition();
  } else {
    player = new Player(playerSprite, rooms[currentRoom].startTileX, rooms[currentRoom].startTileY, tileSize, tileRules);
  }
}

function preload() {
  // tilemap textures
  textures[0] = loadImage("images/woodFloor.jpg");
  textures[1] = loadImage("images/stone.png");
  textures[2] = loadImage("images/wall_50x.png");
  textures[3] = loadImage("images/door.png");
  textures[4] = loadImage("images/void_50x.png");
  textures[5] = loadImage("images/grassy.png");

  // player
  playerSprite = loadImage("images/character.png");

  // items 
  allItems.Locket.img = loadImage("images/locket.jpg");
}

function draw() {
  background(0);

if (gameState  == 0) {
  textSize(50);
  fill(255);
  background(0);
  textAlign(CENTER);
  text('main menu', width/2, height/2);
} else if (gameState == 1) {
  background(0);
  // loops through all tiles each time draw() is called
  for (let tileX = 0; tileX < tilesX; tileX++) {
    for (let tileY = 0; tileY < tilesY; tileY++) {
      tileMap[tileX][tileY].display();
      // tileMap[tileX][tileY].debugGrid(); // runs debug() for each tile
    }
  }  

  player.display();
  player.setDirection();
  player.move();
  player.updateSanity();
  player.inventory.display(invX, invY, tileSize);

  if (player.transition) {
    if (count === countMax) player.transition = false;
    else count++;
  }

  // display sanity bar
  stroke(0);
  strokeWeight(3);
  fill(200);
  rect(125, 665, 600, 30);
  strokeWeight(0);
  fill(255, 255, 0);
  textSize(25);
  textAlign(LEFT);
  text('SANITY:', 15, 687);
  
  if (player.sanity >= 50 && player.sanity <= 10000) {
    fill(0, 255, 0); 
  }

  if (player.sanity >= 15 && player.sanity < 5000) {
    fill(255, 255, 0);
  }

  if (player.sanity > 0 && player.sanity < 1500) {
    fill(255, 0, 0);
    //image();
  }

  rect(127, 667, player.sanity/16.67, 26);
} else if (gameState == 2) {
  background(0);
  textSize(50);
  fill(255);
  textAlign(CENTER);
  text('game over', width/2, height/2);
}

}

function keyPressed() {
  // visual way to show that the item is equipped
  if (keyCode === 76) { // if player clicks L
    if (player.inventory.items[10]) {
      player.inventory.items[10].isEquipped = !player.inventory.items[10].isEquipped; // toggles it
      if (player.inventory.items[10].isEquipped == true) {
        player.inventory.items[10].opacity = 255;
      } else {
        player.inventory.items[10].opacity = 100;
      }
    }
  } 
  // if the player is walking they cannot use the lockets ability
  if (keyCode === 87 || keyCode === 83 || keyCode === 65 || keyCode === 68) {
    if (player.inventory.items[10]) {
      player.inventory.items[10].isEquipped = false;
      player.inventory.items[10].opacity = 100;
    }
  } 
  // searching a tile
  if (keyCode === 32) { // if player clicks the space bar
        console.log('Spacebar pressed');
    player.getNextTile(); // update the coordinates of the tile in front of the player

    // checks if the next tile is in bounds of the tilemap
    if (player.targetTileX >= 0 && // left bound
        player.targetTileX < player.tilesX && // right bound
        player.targetTileY >= 0 && // top bound
        player.targetTileY < player.tilesY) { // bottom bound

          // somehow find the tilevalue for that tilemap coord and then check what item has it and then pick it up make the tile empty
          let targetTile = tileRules[player.targetTileY][player.targetTileX]; 
          
          console.log('Target tile value:', targetTile);
          console.log('Item at target:', itemTiles[targetTile]);

          // if the value on the tile stores an item (is part of the itemTile list)
          if (itemTiles[targetTile]) {
            // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
            if (player.inventory.addItem(itemTiles[targetTile])) {
              tileRules[player.targetTileY][player.targetTileX] = 1; // set the tile to an obstacle/empty
              console.log('you picked up an item');
            } else { // if it returns as false
              console.log('inventory is full');
            }
          } else { // if its not an item tile
            console.log('there is nothing to pick up here');
          }
        }
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

    // sanity
    this.sanity = 10000;
  }

  // getting the next tile coords to search for item
  getNextTile() {
    // check the tile in front of the player 
    let targetTileX = this.tileX + this.dirX;
    let targetTileY = this.tileY + this.dirY;
  }

  updateSanity() {
    if (this.inventory.items[10].isEquipped == true && this.isMoving == false) {
      this.sanity = this.sanity + 1;
      if (this.sanity > 10000) {
        this.sanity = 10000; // cannot go over 10000
      }
    } else if (this.sanity > 0) {
      this.sanity = this.sanity - 1;
    } else if (this.sanity == 0) {
      gameState = 2;
    } 
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

          if (tileRules[nextTileY][nextTileX] === "ent") {
            previousRoom = currentRoom;
            currentRoom = 0;

            // loads the next level 
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          } 
          
          else if (tileRules[nextTileY][nextTileX] === "lr") {
            previousRoom = currentRoom;
            currentRoom = 1;

            // loads the next rooms 
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          } 
          
          else if (tileRules[nextTileY][nextTileX] === "k") {
            previousRoom = currentRoom;
            currentRoom = 2;

            // loads the next rooms 
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          } 
          
          else if (tileRules[nextTileY][nextTileX] === "b") {
            previousRoom = currentRoom;
            currentRoom = 3;

            // loads the next rooms
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          } 
          
          else if (tileRules[nextTileY][nextTileX] === "s") {
            previousRoom = currentRoom;
            currentRoom = 4;

            // loads the next rooms
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          }

          else if (tileRules[nextTileY][nextTileX] === "l") {
            previousRoom = currentRoom;
            currentRoom = 5;

            // loads the next rooms
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          }

          else if (tileRules[nextTileY][nextTileX] === "gb") {
            previousRoom = currentRoom;
            currentRoom = 6;

            // loads the next rooms
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          }

          else if (tileRules[nextTileY][nextTileX] === "mb") {
            previousRoom = currentRoom;
            currentRoom = 7;

            // loads the next rooms
            loadLevel();

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          }

          // check if the next tile is walkable or not
          else if (tileRules[nextTileY][nextTileX] != 1 && tileRules[nextTileY][nextTileX] != 4) { // if it's not (!=) the tile you can't walk on
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
    this.tileX = rooms[currentRoom].startTileX;
    this.tileY = rooms[currentRoom].startTileY;
    this.xPos = rooms[currentRoom].startTileX * tileSize;
    this.yPos = rooms[currentRoom].startTileY * tileSize;
    //this.dirX = 0;
    //this.dirY = 0;
  }

}

class Inventory {
  constructor(size = 11) {
    this.size = size;
    this.items = [null, null, null, null, null, null, null, null, null, null, null];
    this.items[10] = allItems.Locket; // the last slot must be the locket 
  }

  addItem(item) {
    // finds first empty slot
    for (let i = 0; i < this.size; i++) {
      if (this.items[i] === null) {
        this.items[i] = item; // adds the item
        return true;
        // shows on screen that you added an item "you picked up a locket"
      } 
    } 
    return false;
    // shwos that invenotyr is full
  }

  removeItem(slot) {
    if (slot >= 0 && slot < this.items.length) { 
      if (this.items[slot] && this.items[slot].name === "Locket") {
        // say you cannot drop this item
      } else {
        this.items[slot] = null;
        // item appears on the floor next to character
      }
    }
  }

  display(x, y, size) {
  //// GRID FOR INVENTORY
    for (let i = 0; i < tilesY; i++) {
      // draw grid
      let x = invX;
      let y = invY + i * tileSize;
      strokeWeight(1);
      stroke(255);
      noFill();
      rect(x, y, tileSize, tileSize);

      //display items
      if (this.items[i]) {
        if (this.items[i].img) {
          tint(255, this.items[i].opacity);
          image(this.items[i].img, x + 2, y + 2, size - 5, size - 5);
          noTint();
        } else {
          fill(255);
          textSize(10);
          noStroke();
          textAlign(CENTER);
          text(this.items[i].name, x + 30, y + 35);
        }
      }

      // number each box
      fill(255);
      noStroke();
      textSize(10);
      textAlign(LEFT);
      if (i !== 10) {
        text(i, x + 5, y + 15); // adds padding and increments number
      } else {
        text("L", x + 5, y + 15); // adds padding and puts L for locket space in the inventory
      }
    }
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