/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */

/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let portoMapBackgroundImage = new Image();
portoMapBackgroundImage.src = "images/porto_map.png";

let schoolLogo = new Image();
schoolLogo.src = "images/icon_school.png";

let restaurantLogo = new Image();
restaurantLogo.src = "images/icon_restaurant.png";

let barLogo = new Image();
barLogo.src = "images/icon_bar.png";

let officeLogo = new Image();
officeLogo.src = "images/icon_police.png";

let barMap = new Image();
barMap.src = "images/bar.png";

let barMan = new Image();
barMan.src = "images/jean_pierre.png";

let sophie = new Image();
sophie.src = "images/sophie.png";

let speechBubbles = new Image();
speechBubbles.src = "images/speech_bubble_left_side.png";

const BACKGROUND = 0;
const OFFICE_LOGO = 1;
const RESTAURANT_LOGO = 2;
const SCHOOL_LOGO = 3;
const BAR_LOGO = 4;

const BAR_MAP = 5;
const JEAN_PIERRE = 6;
const SOPHIE = 7;
const WIN_LOSE_MESSAGE = 8;
/* Instead of using gameObject[], we can declare our own gameObject variables */

/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame() {
  /* We need to initialise the game objects outside of the Game class */
  /* This function does this initialisation.                          */
  /* Specifically, this function will:                                */
  /* 1. initialise the canvas and associated variables                */
  /* 2. create the various game gameObjects,                   */
  /* 3. store the gameObjects in an array                      */
  /* 4. create a new Game to display the gameObjects           */
  /* 5. start the Game                                                */

  /* Create the various gameObjects for this game. */
  /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

  gameObjects[BACKGROUND] = new StaticImage(
    portoMapBackgroundImage,
    0,
    0,
    canvas.width,
    canvas.height
  );

  gameObjects[BAR_LOGO] = new StaticImage(barLogo, 150, 150, 65, 90);

  gameObjects[SCHOOL_LOGO] = new StaticImage(schoolLogo, 230, 230, 65, 90);

  gameObjects[RESTAURANT_LOGO] = new StaticImage(
    restaurantLogo,
    300,
    300,
    65,
    90
  );

  gameObjects[OFFICE_LOGO] = new StaticImage(officeLogo, 400, 400, 65, 90);

  gameObjects[BAR_MAP] = new StaticImage(
    barMap,
    0,
    0,
    canvas.width,
    canvas.height
  );

  gameObjects[JEAN_PIERRE] = new StaticImage(barMan, 500, 350, 200, 200);

  gameObjects[SOPHIE] = new StaticImage(sophie, 300, 365, 200, 290);

  var audio = new Audio("music/start_menu_music.wav");
  audio.play();

  const timer = new Timer();

  timer.startIntervalTimer();

  /* END OF game specific code. */

  /* Always create a game that uses the gameObject array */
  let game = new CanvasGame();

  /* Always play the game */
  game.start();

  gameObjects[BAR_MAP].stopAndHide();

  gameObjects[JEAN_PIERRE].stopAndHide();

  gameObjects[SOPHIE].stopAndHide();

  let x = document.getElementById("bar_menu");
  x.style.display = "none";

  document.getElementById("gameCanvas").addEventListener("click", function (e) {
    audio = new Audio("music/bar_music.wav");
    audio.loop = true;
    audio.play();
    let canvasBoundingRectangle = document
      .getElementById("gameCanvas")
      .getBoundingClientRect();
    let mouseX = e.clientX - canvasBoundingRectangle.left;
    let mouseY = e.clientY - canvasBoundingRectangle.top;

    for (let i = 0; i < gameObjects.length; i++) {
      if (gameObjects[i].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
        if (i === BAR_MAP) {
          {
            gameObjects[BAR_MAP].start();

            for (let i = 0; i < 5; i++) {
              gameObjects[i].stopAndHide();
            }
            // gameObjects[BAR_LOGO].stopAndHide();
            // gameObjects[RESTAURANT_LOGO].stopAndHide();
            // gameObjects[OFFICE_LOGO].stopAndHide();
            // gameObjects[SCHOOL_LOGO].stopAndHide();

            // Select the element with id "theDIV"
            let x = document.getElementById("game_menu");

            if (x.style.display != "none") {
              // Show the hidden element
              x.style.display = "none";
            }

            let y = document.getElementById("bar_menu");

            if (y.style.display === "none") {
              // Show the hidden element
              y.style.display = "block";

              gameObjects[JEAN_PIERRE].start();

              gameObjects[SOPHIE].start();
            }
          }
        }
      }
    }
  });

  let button = document.getElementById("unpauseGame");
  button.addEventListener("click", function () {
    for (let i = 0; i < 5; i++) {
      gameObjects[i].start();
    }
    audio.pause();
    audio = new Audio("music/start_menu_music.wav");
    audio.play();
    gameObjects[BAR_MAP].stopAndHide();
    gameObjects[SOPHIE].stopAndHide();
    gameObjects[JEAN_PIERRE].stopAndHide();

    let x = document.getElementById("game_menu");

    if (x.style.display === "none") {
      // Show the hidden element
      x.style.display = "block";
    }

    let y = document.getElementById("bar_menu");

    if (y.style.display != "none") {
      // Show the hidden element
      y.style.display = "none";
    }
  });
}
