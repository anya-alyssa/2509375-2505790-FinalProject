////// INITIALISING VARIABLES
// INITIALISE PLAYER VARIABLES
let player;
let playerSprite;
let playerSpeed = 5;

// ghost
let ghost;
let ghostSprite;
let spawnChance = 0.5; // 50% spawn cahnce
let despawnChance = 0.75; // 75% despawn chance

// INITIALISE TILEMAP VARIABLES
let tileMap = []; // creates an empty 1 dimensional array to be developed in later code to make a tile map
let tilesX = 11; // a variable to store the amount of columns in the tile map
let tilesY = 11; // a variable to store the amount of rows in the tile map
let tileSize = 60; // a variable to store the amount of pixels in each tile
let textures = [];

// items and inventory
let invX = 670; // position to start where to draw the inventory
let invY = 0; // position to start where to draw the inventory

let inputtedCode = ''; // for safe to get door key

let itemInUse = null;

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
    name: "Damaged Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  ParentRoomKey: {
    name: "Lost Key",
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
  },
  Book: {
    name: "Book",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  GhostRoomKey: {
    name: "Silver Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  CabinetKey: {
    name: "Rusty Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  ToolKit: {
    name: "Tool Kit",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  BedsideTableKey: {
    name: "Small Key",
    img: null,
    isEquipped: false,
    opacity: 100
  },
  BitsAndBobs: {
    name: "Bits and Bobs",
    img: null,
    isEquipped: false,
    opacity: 100
  }
}

// value on tilerules for where it is hidden
let itemTiles = {
  3: allItems.Paper,
  4: allItems.StudyKey,
  5: allItems.ParentRoomKey,
  6: allItems.DoorKey,
  7: allItems.Teddy,
  8: allItems.Book,
  9: allItems.GhostRoomKey,
  10: allItems.CabinetKey,
  11: allItems.ToolKit,
  12: allItems.BedsideTableKey,
  13: allItems.BitsAndBobs
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
    [0, 0, 0, 1, 1, "esc", 1, 1, 0, 0, 0]  // 10
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
      [1, 1, 1, 0, 0, 1, 3, 0, 0, 1, 1], // 2  
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], // 3  V
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], // 4  A
      [1, 0, "ent", 0, 13, 0, 0, 0, 1, 1, 1], // 5  L
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], // 6  U
      [1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 1], // 7  E
      [1, 1, 1, 0, 0, 13, 0, 0, 0, 1, 1], // 8  S
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
        [1, 1, 9, 13, 1, 13, 1, 0, 0, 0, 1], // 1  X
        [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1], // 2  
        [1, 13, 0, 0, 0, 0, 0, 0, 0, 0, "b"], // 3  V
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4  A
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 5  L
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6  U
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 7  E
        [1, 0, 1, 1, 13, 0, 0, 0, 0, 0, "l"], // 8  S
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
        [1, 0, 1, 1, 1, 1, 1, 10, 1, 0, 0], // 4  A
        [0, 1, 1, "k", 0, 0, 0, 0, 1, 0, 1], // 5  L
        [1, 0, 1, 1, 12, 0, 13, 0, 1, 0, 0], // 6  U
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
      [4, 2, 4, 4, 4, 5, 4, 4, 4, 2, 4], // 2  
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 4], // 3  V
      [4, 2, 0, 0, 0, 1, 0, 0, 0, 2, 4], // 4  A
      [4, 2, 0, 0, 1, 1, 1, 0, 0, 3, 4], // 5  L
      [4, 2, 0, 0, 1, 1, 1, 0, 0, 2, 4], // 6  U
      [4, 2, 0, 0, 0, 1, 0, 0, 0, 2, 4], // 7  E
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 4], // 8  S
      [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],  // 9
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 10
    ],
  
    tileRules: [
    //         2nd VALUE (x)  
    //   0  1  2  3  4  5  6  7  8  9, 10
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1  X
        [1, 1, 11, 1, 1, "sr", 1, 1, 1, 1, 1], // 2  
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 3  V
        [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], // 4  A
        [0, 1, 0, 0, 1, 1, 1, 0, 0, "ent", 1], // 5  L
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1], // 6  U
        [1, 1, 0, 0, 0, 13, 0, 0, 0, 1, 1], // 7  E
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
    [0, 0, 1, 1, 1, 1, 1, 13, 0, 1, 0], // 2  
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0], // 3  V
    [0, 0, 1, 0, 0, 13, 1, 0, 0, 1, 0], // 4  A
    [0, 0, 1, 5, 0, 0, 0, 0, 0, "l", 0], // 5  L
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0], // 6  U
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], // 7  E
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 5,
  startTileY: 3 // starttiles for the player

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
    [0, 0, 1, 0, 0, 0, 0, 13, 1, 1, 0], // 2  
    [0, 0, 1, 13, 0, 0, 0, 1, 1, 1, 0], // 3  V
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0], // 4  A
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0], // 5  L
    [0, 0, 1, 8, 0, 0, 0, 1, 1, 1, 0], // 6  U
    [0, 0, 1, 0, 0, 0, 0, 6, 1, 1, 0], // 7  E
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 8  S
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],  // 9
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]  // 10
  ],

  startTileX: 8,
  startTileY: 5 // starttiles for the player
}

let secretRoom = {

  graphicsMap: [
    //         2nd VALUE (x)  
    // 0  1  2  3  4  5  6  7  8  9, 10
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 0
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1  X
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 2  
      [4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4], // 3  V
      [4, 4, 2, 4, 0, 5, 0, 1, 2, 4, 4], // 4  A
      [4, 4, 2, 4, 0, 0, 0, 0, 2, 4, 4], // 5  L
      [4, 4, 2, 0, 0, 0, 0, 0, 2, 4, 4], // 6  U
      [4, 4, 2, 2, 2, 3, 2, 2, 2, 4, 4], // 7  E
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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // 3  V
        [1, 0, 1, 0, 0, 7, 0, 13, 1, 0, 0], // 4  A
        [0, 1, 1, 13, 0, 0, 0, 0, 1, 0, 1], // 5  L
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], // 6  U
        [1, 1, 1, 1, 1, "s", 1, 1, 1, 0, 0], // 7  E
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8  S
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 9
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 10
    ],

  startTileX: 4, //Sets X tile to start player on
  startTileY: 5  //Sets Y tile to start player on
}

//// LEVEL CONTROL VARIABLES
let rooms = [entrance, livingRoom, kitchen, bathroom, study, landing, ghostBedroom, masterBedroom, secretRoom];
let currentRoom = 0;
let previousRoom = 0;
let studyOpened = false; 
let mbOpened = false; // masterbedroom
let gbOpened = false; // ghost bedrtoom
let srOpened = false; // secret room
let safeOpened = false;

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
  } else if (currentRoom === 4 && previousRoom === 8) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 3;
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
  // secret room
  else if (currentRoom === 8 && previousRoom === 4) {
    rooms[currentRoom].startTileX = 5;
    rooms[currentRoom].startTileY = 6;
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

  if (ghost == null && random(0, 1) < spawnChance) {
    ghost = new Ghost(ghostSprite, 5, 5, tileSize, graphicsMap);
  } else if (ghost && random(0, 1) < despawnChance) {
    ghost = null;
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

  // ghost
  ghostSprite = loadImage("images/librarian-pink.png");

  // items 
  allItems.Locket.img = loadImage("images/locket.jpg");
  allItems.Paper.img = loadImage("images/paper.jpg");
  allItems.StudyKey.img = loadImage("images/rustyKey.jpg"); // CHANGE TO DAMAGED KEY
  allItems.ParentRoomKey.img = loadImage("images/silverKey.jpg"); // CHNAGE TO LOST KEY
  allItems.GhostRoomKey.img = loadImage("images/silverKey.jpg");
  allItems.DoorKey.img = loadImage("images/goldKey.jpg");
  allItems.Teddy.img = loadImage("images/teddy.jpg");
  allItems.Book.img = loadImage("images/book.jpg");
  allItems.CabinetKey.img = loadImage("images/rustyKey.jpg");

  // sanity
  lights = loadImage("images/void_50x.png");
}

function draw() {
  background(0);

if (gameState == 0) {
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

  if (ghost) { // only do all of these if there is one in the room
    ghost.display();
    ghost.chase();
    ghost.move();
    ghost.checkAlert();
  }

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
  }

  rect(127, 667, player.sanity/16.67, 26);
} 

else if (gameState == 2) {
  background(0);
  textSize(50);
  fill(255);
  textAlign(CENTER);
  text('game over', width/2, height/2);
} 

else if (gameState == 3) {
  textSize(50);
  fill(255);
  background(0);
  textAlign(CENTER);
  text('You Escaped', width/2, height/2);
} 

else if (gameState == 4) {
  textSize(50);
  fill(255);
  background(0);
  textAlign(CENTER);
  text('You helped the ghost', width/2, height/2);
}

else if (gameState == 'a') {
  textAlign(CENTER);
  fill(255);
  textSize(25);
  text('Enter Code', width/2, height/2);
  text(inputtedCode, width/2, 400);
}

}

// more efficient to have a function to toggle so i dont write it for all of the hotbar slots also it will only allo one to be equipped at a time
function equipItem (slot) {
  if (player.inventory.items[slot]) {
      player.inventory.items[slot].isEquipped = !player.inventory.items[slot].isEquipped; // toggles it
      
      if (player.inventory.items[slot].isEquipped == true) {
        itemInUse = player.inventory.items[slot].name;
        console.log(itemInUse);
        player.inventory.items[slot].opacity = 255; // visually equip it
        for (let i = 0; i < player.inventory.items.length; i++) { 
          // ignores the one that you just equipped and makes sure it is in the players inventory
          if (i !== slot && player.inventory.items[i]) {
            player.inventory.items[i].isEquipped = false; // unequips them
            player.inventory.items[i].opacity = 100; // visually unequip
          }
        } 
      } else {
        player.inventory.items[slot].opacity = 100; // unequip
        itemInUse = null;
        console.log(itemInUse);
      }
  }
}

function keyPressed() {
if (gameState === 1) { // doesnt interfere wuth other gamststes
  if (keyCode === 76) { // if player clicks L
    if (player.inventory.items[10]) {
      player.inventory.items[10].isEquipped = !player.inventory.items[10].isEquipped; // toggles it
      if (player.inventory.items[10].isEquipped == true) {
        itemInUse = player.inventory.items[10].name;
        console.log(itemInUse);
        player.inventory.items[10].opacity = 255;
      } else {
        player.inventory.items[10].opacity = 100;
        itemInUse = null;
        console.log(itemInUse);
      }
    }
  } 
  // if the player is walking they cannot use the lockets ability
  if (keyCode === 87 || keyCode === 83 || keyCode === 65 || keyCode === 68) {
    if (player.inventory.items[10].isEquipped) {
      itemInUse = null;
      console.log(itemInUse);
      player.inventory.items[10].isEquipped = false;
      player.inventory.items[10].opacity = 100;
    }
  } 

  if (keyCode === 81) {
    for (let i = 0; i < player.inventory.items.length; i++) { 
      if (player.inventory.items[i] && player.inventory.items[i].name === "Bits and Bobs" && player.inventory.items[i].isEquipped == true) { // checks for where there is an item, if its the rusty key and if its equipped
        // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
        player.inventory.removeItem(i);
        itemInUse = null;
        break;
      }
    }
  }

  // searching a tile (this was very hard to get right)
  if (keyCode === 32) { // if player clicks the space bar
    player.getNextTile(); // update the coordinates of the tile in front of the player
    console.log('Direction:', player.lastDirX, player.lastDirY);
  
    let targetTile = tileRules[player.nextTileY][player.nextTileX];

    // if the value on the tile stores an item (is part of the itemTile list)
    if (itemTiles[targetTile] == allItems.DoorKey) {
      if (safeOpened === false) {
        gameState = 'a';
      } else if (safeOpened === true) {
        // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
        if (player.inventory.addItem(itemTiles[targetTile])) {
          tileRules[player.nextTileY][player.nextTileX] = 1; // set the tile to an obstacle/empty
          console.log('you picked up an item');
        } else { // if it returns as false
          console.log('inventory is full');
        }
      }
    } else if (itemTiles[targetTile] == allItems.GhostRoomKey) {
      for (let i = 0; i < player.inventory.items.length; i++) { 
        if (player.inventory.items[i] && player.inventory.items[i].name === "Rusty Key" && player.inventory.items[i].isEquipped == true) { // checks for where there is an item, if its the rusty key and if its equipped
          // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
          if (player.inventory.addItem(itemTiles[targetTile])) {
            tileRules[player.nextTileY][player.nextTileX] = 1; // set the tile to an obstacle/empty
            console.log('you picked up an item');
            player.inventory.removeItem(i);
            itemInUse = null;
            break; 
          } else { // if it returns as false
            console.log('inventory is full');
          }
        } else {
          console.log('this cabinet seems to be locked...');
        }
      } 
    } else if (itemTiles[targetTile] == allItems.CabinetKey) {
      for (let i = 0; i < player.inventory.items.length; i++) { 
        if (player.inventory.items[i] && player.inventory.items[i].name === "Tool Kit" && player.inventory.items[i].isEquipped == true) { // checks for where there is an item, if its the tool kit and if its equipped
          // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
          if (player.inventory.addItem(itemTiles[targetTile])) {
            tileRules[player.nextTileY][player.nextTileX] = 1; // set the tile to an obstacle/empty
            console.log('you picked up an item');
            player.inventory.removeItem(i);
            itemInUse = null;
            break; 
          } else { // if it returns as false
            console.log('inventory is full');
          }
        } else {
          console.log('this seems to be screwed on...');
        }
      }
    } else if (itemTiles[targetTile] == allItems.Book) {
      for (let i = 0; i < player.inventory.items.length; i++) { 
        if (player.inventory.items[i] && player.inventory.items[i].name === "Small Key" && player.inventory.items[i].isEquipped == true) { // checks for where there is an item, if its the tool kit and if its equipped
          // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
          if (player.inventory.addItem(itemTiles[targetTile])) {
            tileRules[player.nextTileY][player.nextTileX] = 1; // set the tile to an obstacle/empty
            console.log('you picked up an item');
            player.inventory.removeItem(i);
            itemInUse = null;
            break; 
          } else { // if it returns as false
            console.log('inventory is full');
          }
        } else {
          console.log("It's locked. I wonder what's inside...");
        }
      }
    } else if (itemTiles[targetTile]) {
      // runs function to add the item to the inventory and if it returns as true (adds the item to the inventory)
      if (player.inventory.addItem(itemTiles[targetTile])) {
        tileRules[player.nextTileY][player.nextTileX] = 1; // set the tile to an obstacle/empty
        console.log('you picked up an item');
      } else { // if it returns as false
        console.log('inventory is full');
      }
    } else if (tileRules[player.nextTileY][player.nextTileX] === 0) { // if its not an item tile
      console.log("you can't search the ground"); 
    } else { // if its not an item tile
      console.log("you didn't find anything"); 
    } 
  }

  if (keyCode === 48) { // if player clicks 0
    equipItem(0);
  } 
  if (keyCode === 49) { // if player clicks 1
    equipItem(1);
  } 
  if (keyCode === 50) { // if player clicks 2
    equipItem(2);
  } 
  if (keyCode === 51) { // if player clicks 3
    equipItem(3);
  } 
  if (keyCode === 52) { // if player clicks 4
    equipItem(4);
  } 
  if (keyCode === 53) { // if player clicks 5
    equipItem(5);
  } 
  if (keyCode === 54) { // if player clicks 6
    equipItem(6);
  } 
  if (keyCode === 55) { // if player clicks 7
    equipItem(7);
  } 
  if (keyCode === 56) { // if player clicks 8
    equipItem(8);
  } 
  if (keyCode === 57) { // if player clicks 9
    equipItem(9);
  } 
} else if (gameState === 'a') {
  // this was hard to figure out
  if (key >= 0 && key <= 9) { // in between 0 and 9 i did not know using just key was a thing 
    if (inputtedCode.length < 4) {
      inputtedCode = inputtedCode + key;
    } else if (inputtedCode.length > 5) {
      textSize(50);
      fill(255, 0, 0);
      text(inputtedCode, width/2, 400);
    }
  } else if (keyCode === 13) { // keycode for enter
    if (inputtedCode === '6382') {
      safeOpened = true;
      gameState = 1;
      console.log('safe opened');
    } else {
      gameState = 1;
      console.log('incorrect code');
    }
      inputtedCode = '';
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

    // direction of player
    this.dirX = 0; // current
    this.dirY = 0; // current
    this.lastDirX = 0; 
    this.lastDirY = 0; // needed for getNextTile

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

    // for item finding
    this.nextTileX = 0;
    this.nextTileY = 0;
  }

  updateSanity() {
     if (this.inventory.items[10].isEquipped == true && this.isMoving == false) {
      this.sanity = this.sanity + 3;
      if (this.sanity > 10000) {
        this.sanity = 10000; // cannot go over 10000
      }
    } else if (this.sanity > 0 && !ghost) {
      this.sanity = this.sanity - 1;
    } else if (this.sanity > 0 && ghost.alert == true) { // when you're in contact with the ghost your snity decreases
      this.sanity = this.sanity - 5;
    } else if (this.sanity == 0) {
      gameState = 2;
    } 

    if (this.sanity > 0 && this.sanity < 1500 && !ghost) {
      tint(255, random(100, 200));
      image(lights, 0, 0, 660, 660);
      tint(255, 0);
    } else if (this.sanity > 0 && this.sanity < 1500 && ghost.alert == true) {
      tint(255, random(0, 255));
      image(lights, 0, 0, 660, 660);
      tint(255, 0);
    } else if (ghost && ghost.alert) {
      tint(255, random(0, 100));
      image(lights, 0, 0, 660, 660);
      tint(255, 0);
    }
  } 
  
  display() {
    image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize);
} 

  setDirection() {
    // reset the direction

    let up = 87; // w
    let down = 83; // s
    let left = 65; // a
    let right = 68; // d
    
    if (!this.isMoving) {

      if (keyIsDown(up)) {
        this.dirX = 0;
        this.dirY = -1;
        this.lastDirX = 0;
        this.lastDirY = -1;
      }

      else if (keyIsDown(down)) {
        this.dirX = 0;
        this.dirY = 1;
        this.lastDirX = 0;
        this.lastDirY = 1;
      }

      else if (keyIsDown(left)) {
        this.dirX = -1;
        this.dirY = 0;
        this.lastDirX = -1;
        this.lastDirY = 0;
      }

      else if (keyIsDown(right)) {
        this.dirX = 1;
        this.dirY = 0;
        this.lastDirX = 1;
        this.lastDirY = 0;
      }

      this.checkTargetTile();
    }
  }

  // getting the next tile coords to search for item
  getNextTile() {
    // calculate position of current tile
    this.tileX = Math.floor(this.xPos / this.tileSize);
    this.tileY = Math.floor(this.yPos / this.tileSize);
    
    // check the tile in front of the player 
    this.nextTileX = this.tileX + this.lastDirX;
    this.nextTileY = this.tileY + this.lastDirY;
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

            // cant be in the bathroom because its too small
            if (ghost) {
              ghost = null;
            }

            // sets the players start position
            this.setPlayerPosition();
            count = 0;
            this.transition = true;
          } 
          
          else if (tileRules[nextTileY][nextTileX] === "s") {           
            if (currentRoom == 0) {
              if (itemInUse === "Damaged Key") {
                previousRoom = currentRoom;
                currentRoom = 4;

                // loads the next room
                loadLevel();

                // sets the players start position
                this.setPlayerPosition();
                count = 0;
                this.transition = true;

                // unlock room and remove key
                studyOpened = true; 

                for (let i = 0; i < player.inventory.items.length; i++) { 
                  if (player.inventory.items[i].name === "Damaged Key" && player.inventory.items[i].isEquipped == true) {
                    player.inventory.removeItem(i);
                    itemInUse = null;
                    break; 
                  } 
                }
              } else if (studyOpened == true) {
                previousRoom = currentRoom;
                currentRoom = 4;

                // loads the next rooms
                loadLevel();

                // sets the players start position
                this.setPlayerPosition();
                count = 0;
                this.transition = true;
              } else {
                console.log('you need a key to open this door');
              } 
            } else if (currentRoom == 8) {
              previousRoom = currentRoom;
              currentRoom = 4

              // loads the next room
              loadLevel();

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;
            }
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
            if (itemInUse === "Silver Key") {
              previousRoom = currentRoom;
              currentRoom = 6;
              // loads the next room
              loadLevel();

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;              

              // unlock room and remove key
              gbOpened = true; 

              for (let i = 0; i < player.inventory.items.length; i++) { 
                if (player.inventory.items[i].name === "Silver Key" && player.inventory.items[i].isEquipped == true) {
                  player.inventory.removeItem(i);
                  itemInUse = null;
                  break; 
                } 
              }
            } else if (gbOpened == true) {
              previousRoom = currentRoom;
              currentRoom = 6;

              // loads the next rooms
              loadLevel();

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;
            } else {
              console.log('you need a key to open this door');
            }
          }

          else if (tileRules[nextTileY][nextTileX] === "mb") {
            if (itemInUse === "Lost Key") {
              previousRoom = currentRoom;
              currentRoom = 7;
              // loads the next room
              loadLevel();

              // cannot be in parents room
              if (ghost) {
                ghost = null;
              }

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;

              // unlock room and remove key
              mbOpened = true; 

              for (let i = 0; i < player.inventory.items.length; i++) { 
                if (player.inventory.items[i].name === "Lost Key" && player.inventory.items[i].isEquipped == true) {
                  player.inventory.removeItem(i);
                  itemInUse = null;
                  break; 
                } 
              }
            } else if (mbOpened == true) {
              previousRoom = currentRoom;
              currentRoom = 7;

              // loads the next rooms
              loadLevel();

              // cannot be in parents room
              if (ghost) {
                ghost = null;
              }

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;
            } else {
              console.log('you need a key to open this door');
            }
          }

          else if (tileRules[nextTileY][nextTileX] === "sr") {
            if (itemInUse === "Book") {
              previousRoom = currentRoom;
              currentRoom = 8;

              // loads the next room
              loadLevel();

              // afraid of secret room
              if (ghost) {
                ghost = null;
              }

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;

              // unlock room and remove key
              srOpened = true; 

              for (let i = 0; i < player.inventory.items.length; i++) { 
                if (player.inventory.items[i] && player.inventory.items[i].name === "Book" && player.inventory.items[i].isEquipped == true) {
                  player.inventory.removeItem(i);
                  itemInUse = null;
                  break; 
                } 
              }
            } else if (srOpened == true) {
              previousRoom = currentRoom;
              currentRoom = 8;

              // loads the next rooms
              loadLevel();

              // afraid of secret room
              if (ghost) {
                ghost = null;
              }

              // sets the players start position
              this.setPlayerPosition();
              count = 0;
              this.transition = true;
            } else {
              console.log('it looks like there is a book missing here');
            }
          }
          
          else if (tileRules[nextTileY][nextTileX] === "esc") {
            if (itemInUse === "Gold Key") {
              gameState = 3;
            } else {
              console.log('you need a key to open this door');
            } 
          }

          // check if the next tile is walkable or not
          else if (tileRules[nextTileY][nextTileX] != 1 && tileRules[nextTileY][nextTileX] < 3) { // if it's not (!=) the tile you can't walk on
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


// enemy code from git repository with minor adjustments
class Ghost {
    constructor(sprite, tileX, tileY, tileSize, graphicsMap) {
        //Sprites
        this.sprite = sprite;

        //Position
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;

        //Info
        this.tileSize = tileSize;
        this.graphicsMap = graphicsMap;

        //Movement
        this.tx = tileX;
        this.ty = tileY;
        this.isMoving = false;
        this.speed = 1.5;
        this.dirX = 0;
        this.dirY = 0;

        //Target Player
        this.alert = false;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }

    checkAlert() {
        //Calculate tile position of currentTile
        this.tileX = Math.floor(this.xPos / this.tileSize);
        this.tileY = Math.floor(this.yPos / this.tileSize);

        if (dist(this.tileX, this.tileY, player.tileX, player.tileY) < 5) { //Checks player's position relative to enemy, if within 5 tiles, chase!
            this.alert = true;
        } else {
            this.alert = false;
        }
    }

    chase() {
        //Checks player's location and sets which tile to go to next to pursue them
        if (this.alert && !this.isMoving) {
            if (this.tileX != player.tileX) { //First checks X tiles to move horizontally
                if (this.tileX < player.tileX) this.dirX = 1;
                else if (this.tileX > player.tileX) this.dirX = -1;
                
            } 
            else { //Once horizontally aligned with players, sets tile up or down to chase player
                this.dirX = 0;
                if (this.tileY != player.tileY) {
                    if (this.tileY < player.tileY) this.dirY = 1;
                    else if (this.tileY > player.tileY) this.dirY = -1;
                    else this.dirY = 0
            }
        }

            this.checkTargetTile()
        }
    }

    checkTargetTile() {
        //Calculate tile coordinates of next Tile;
        let nextTileX = this.tileX + this.dirX;
        let nextTileY = this.tileY + this.dirY;

        //Check if nextTileX and nextTileY are both inbounds
        //Remember && means AND (i.e. if ALL conditions are true)
        if (nextTileX >= 0 &&       //left side of map
            nextTileX < tilesX &&   //right side of map
            nextTileY >= 0 &&       //top of map
            nextTileY < tilesY) {  //bottom of map 

            if (graphicsMap[nextTileY][nextTileX] !== 2 || graphicsMap[nextTileY][nextTileX] !== 3) {  // as long as its not a wall becasue the ghost can float over it
                //If walkable, set tx and ty (pixel postiions)
                this.tx = nextTileX * tileSize;
                this.ty = nextTileY * tileSize;

                //set this.isMoving to true to start Movement
                this.isMoving = true;
            }
        }
    }

    move() {
        //This is in our draw loop, so called move() is called every frame BUT...
        if (this.isMoving) {
            //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
            //So first, start by moving in direction set by setDirection()
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            //Now check if player has reached targetX
            if (this.xPos === this.tx && this.yPos === this.ty) {
                //if there, stop moving and reset our variables
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }
    }
}