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

let speechBubble = new Image();
speechBubble.src = "images/speech_bubble_left_side.png";

let newspaper = new Image()
newspaper.src = "images/newspaper.png"

let tv = new Image()
tv.src = "images/tv.png"

let postit = new Image()
postit.src = "images/postit.png"

let board = new Image()
board.src = "images/board.png"


let station = new Image()
station.src = "images/police_office_scene.png"

const BACKGROUND = 0;
const OFFICE_LOGO = 1;
const RESTAURANT_LOGO = 2;
const SCHOOL_LOGO = 3;
const BAR_LOGO = 4;

const BAR_MAP = 5;
const JEAN_PIERRE = 6;
const SOPHIE = 7;
const WIN_LOSE_MESSAGE = 8;
const SPEECH_BUBBLE = 9;
const TEXT_SOPHIE = 10;

const TIMER = 11;
const NEWSPAPER = 12
const TV = 13
const POSTIT = 14
const BOARD = 15
const STATION = 16
/* Instead of using gameObject[], we can declare our own gameObject variables */

/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame() 
{
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

  gameObjects[STATION] = new StaticImage(station,  0,
    0,
    canvas.width,
    canvas.height);

  gameObjects[SCHOOL_LOGO] = new StaticImage(schoolLogo, 230, 230, 65, 90);
  gameObjects[BACKGROUND] = new StaticImage(
    portoMapBackgroundImage,
    0,
    0,
    canvas.width,
    canvas.height
  );

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

  gameObjects[BAR_MAP] = new StaticImage(
    barMap,
    0,
    0,
    canvas.width,
    canvas.height
  );

  gameObjects[JEAN_PIERRE] = new StaticImage(barMan, 500, 350, 200, 200);

  gameObjects[SOPHIE] = new StaticImage(sophie, 300, 365, 200, 290);

  gameObjects[SPEECH_BUBBLE] = new StaticImage(
    speechBubble,
    380,
    355,
    280,
    100
  );

  gameObjects[TIMER] =  new Timer(60, 950,100, "Arial", 100,"white")

  gameObjects[NEWSPAPER] = new StaticImage(newspaper, 700, 440, 80, 80)

  gameObjects[TV] = new StaticImage(tv, 430, 165, 258, 258)

  gameObjects[POSTIT] = new StaticImage(postit, 485, 500, 50, 50)

  gameObjects[BOARD] = new StaticImage(board, 835, 370, 120, 120)


  var audio = new Audio("music/start_menu_music.wav");
  audio.play();

  /* END OF game specific code. */

  /* Always create a game that uses the gameObject array */
  let game = new CanvasGame();

  /* Always play the game */
  game.start();
  
  gameObjects[BAR_MAP].stopAndHide();
  gameObjects[SPEECH_BUBBLE].stopAndHide();
  gameObjects[STATION].stopAndHide();
  gameObjects[JEAN_PIERRE].stopAndHide();
  gameObjects[TIMER].pauseTimer();

  gameObjects[NEWSPAPER].stopAndHide()

  gameObjects[TV].stopAndHide()

  gameObjects[POSTIT].stopAndHide()

  gameObjects[BOARD].stopAndHide()

  gameObjects[SOPHIE].stopAndHide();
  let x = document.getElementById("bar_menu");
  x.style.display = "none";

  let k = document.getElementById("station_menu");
  k.style.display = "none";

  document.getElementById("gameCanvas").addEventListener("click", function (e) {
    audio.pause();
    audio = new Audio("music/bar_music.wav");
    
    //audio.loop = true;
    audio.play();

    
    let canvasBoundingRectangle = document
      .getElementById("gameCanvas")
      .getBoundingClientRect();
    let mouseX = e.clientX - canvasBoundingRectangle.left;
    let mouseY = e.clientY - canvasBoundingRectangle.top;

    for (let i = 0; i < gameObjects.length; i++) {
      if (gameObjects[i].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
        

        if (i === OFFICE_LOGO) {
          audio.pause();
          gameObjects[STATION].start();
          for (let i = 0; i < 5; i++) {
            gameObjects[i].stopAndHide();
          }

          // Select the element with id "theDIV"
          let x = document.getElementById("station_menu");

          if (x.style.display === "none") {
            // Show the hidden element
            x.style.display = "block";
          }
          

          let y = document.getElementById("bar_menu");

          if (y.style.display != "none") {
            // Show the hidden element
            y.style.display = "none";

          }}


        if (i === BAR_LOGO) {
          gameObjects[BAR_MAP].start();
          gameObjects[TIMER].startInterval()
          for (let i = 0; i < 5; i++) {
            gameObjects[i].stopAndHide();
          }

          // Select the element with id "theDIV"
          let x = document.getElementById("game_menu");

          if (x.style.display != "none") {
            // Show the hidden element
            x.style.display = "none";
          }

          let k = document.getElementById("station_menu");

          if (k.style.display != "none") {
            // Show the hidden element
            k.style.display = "none";
          }

          let y = document.getElementById("bar_menu");

          if (y.style.display === "none") {
            // Show the hidden element
            y.style.display = "block";

            gameObjects[JEAN_PIERRE].start();

            gameObjects[SOPHIE].start();

            gameObjects[NEWSPAPER].start();

            gameObjects[TV].start();

            gameObjects[POSTIT].start();

            gameObjects[BOARD].start();
          }
        }
        let clickSophie = 1;
        if (gameObjects[SOPHIE].isDisplayed()) {
          if (i === SOPHIE) {
           
            if(clickSophie <= 0)
            {
              gameObjects[SPEECH_BUBBLE].start();

              gameObjects[TEXT_SOPHIE] = new StaticText(
                "I saw a boy the other day",
                380,
                400,
                "Algerian",
                20,
                "orange"
              );
  
              gameObjects[TEXT_SOPHIE].start();
  
              setTimeout(() => {
                gameObjects[SPEECH_BUBBLE].stopAndHide();
                gameObjects[TEXT_SOPHIE].stopAndHide();
              }, 3000);
  
              clickSophie--;

              console.log(clickSophie)
            }
            

          }
        }
      }
    }
  });

  let button = document.getElementById("unpauseGame")
    button.addEventListener("click", function ()
    {
      audio.pause();
      audio = new Audio("music/start_menu_music.wav");
      audio.play();

      gameObjects[TIMER].pauseTimer();

      
      for (let i = 0; i < 5; i++){
        gameObjects[i].start();
      }

      gameObjects[BAR_MAP].stopAndHide();
      gameObjects[SOPHIE].stopAndHide();
      gameObjects[JEAN_PIERRE].stopAndHide();
      gameObjects[NEWSPAPER].stopAndHide()

      gameObjects[TV].stopAndHide()

      gameObjects[POSTIT].stopAndHide()

      gameObjects[BOARD].stopAndHide()

      let x = document.getElementById('game_menu');

      if (x.style.display === "none"){
        x.style.display = "block";
      }
      
      let y = document.getElementById("bar_menu");

      if (y.style.display != "none"){
        y.style.display = "none";
      }

      let k = document.getElementById("station_menu");

      if (k.style.display != "none"){
 
        k.style.display = "none";
      }
    })


    let button2 = document.getElementById("backToGame")
    button2.addEventListener("click", function ()
    {
      audio.pause();
      audio = new Audio("music/start_menu_music.wav");
      audio.play();

      gameObjects[TIMER].pauseTimer();

      
      for (let i = 0; i < 5; i++){
        gameObjects[i].start();
      }

      gameObjects[BAR_MAP].stopAndHide();
      gameObjects[SOPHIE].stopAndHide();
      gameObjects[JEAN_PIERRE].stopAndHide();
      gameObjects[NEWSPAPER].stopAndHide()

      gameObjects[TV].stopAndHide()

      gameObjects[POSTIT].stopAndHide()

      gameObjects[BOARD].stopAndHide()

      let x = document.getElementById('game_menu');

      if (x.style.display === "none"){
        x.style.display = "block";
      }
      
      let y = document.getElementById("station_menu");

      if (y.style.display != "none"){
        y.style.display = "none";

        gameObjects[STATION].stopAndHide()
      }

    })

}