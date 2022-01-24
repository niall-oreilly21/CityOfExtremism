/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let portoMapBackgroundImage = new Image();
portoMapBackgroundImage.src = "images/porto_map.png";

let schoolLogo = new Image();
schoolLogo.src = "images/school_logo.png"


let logImage = new Image();
logImage.src = "images/log.png";

let fireballImage = new Image();
fireballImage.src = "images/fireball.png";

const BACKGROUND = 0;
const WIN_LOSE_MESSAGE = 1;
const MAP_LOGOS = 2;

/* Instead of using gameObject[], we can declare our own gameObject variables */
let bat = null; // we cannot initialise gameObjects yet, as they might require images that have not yet loaded
let target = null;

let fireballs = [];
let numberOfBulletsFired = 0; // no bullets fired yet
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

    gameObjects[BACKGROUND] = new StaticImage(portoMapBackgroundImage, 0, 0, canvas.width, canvas.height);

    gameObjects[MAP_LOGOS] =  new StaticImage(schoolLogo, 150, 150, 65, 90);

    bat = new Bat(0, canvas.height - 10, 125);
    target = new Target(logImage, 100, 0, 100);
    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    let game = new FireballCanvasGame();

    /* Always play the game */
    game.start();

    
    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e)
    {
        var stepSize = 10;

        if (e.keyCode === 37)  // left
        {
            bat.changeX(-stepSize);
        }
        else if (e.keyCode === 39) // right
        {
            bat.changeX(stepSize);
        }
        else if (e.keyCode === 32) // space bar
        {
            fireballs[numberOfBulletsFired] = new Fireball(fireballImage, bat.getCentreX());
            fireballs[numberOfBulletsFired].start();
            numberOfBulletsFired++;
            bat.setWidth(bat.getWidth() + 10);
        }
    });
   
// console.log(gameObjects)
//     canvas.addEventListener('click', function(e)
//     {
//         var index = gameObjects.indexOf(e.target)
        
//   console.log(gameObjects.indexOf(e.target))
//         if(index === 2) { // if no image was clicked
//           console.log("HERE");
//         }
//     });


    document.getElementById("gameCanvas").addEventListener("click", function (e)
    {
        
        let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
        let mouseX = e.clientX - canvasBoundingRectangle.left;
        let mouseY = e.clientY - canvasBoundingRectangle.top;

        for (let i = 0; i < gameObjects.length; i++)
        {
                if (gameObjects[i].pointIsInsideBoundingRectangle(mouseX, mouseY))
                {
                    if(i === 2)
                    {
                        console.log("BOOM")
                    }
                  
                }
            
        }
        
    });


    // function getMousePosition(canvas, event) {
    //     let rect = canvas.getBoundingClientRect();
    //     let x = event.clientX - rect.left;
    //     let y = event.clientY - rect.top;
    //     console.log("Coordinate x: " + x, 
    //                 "Coordinate y: " + y);
    // }
  
    // let canvasElem = document.querySelector("canvas");
      
    // canvasElem.addEventListener("mousedown", function(e)
    // {
    //     getMousePosition(canvasElem, e);
    // });
    
}