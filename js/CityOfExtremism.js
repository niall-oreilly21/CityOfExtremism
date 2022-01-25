/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let portoMapBackgroundImage = new Image();
portoMapBackgroundImage.src = "images/porto_map.png";

let schoolLogo = new Image();
schoolLogo.src = "images/icon_school.png"

let restaurantLogo = new Image();
restaurantLogo.src = "images/icon_school.png"

let barLogo = new Image();
barLogo.src = "images/icon_bar.png"

let officeLogo = new Image()
officeLogo.src = "images/icon_police.png"

let barMap = new Image();
barMap.src = "images/bar.png"

let barMan = new Image()
barMan.src = "images/jean_pierre.png"

let sophie = new Image()
sophie.src = "images/sophie.png"



const BACKGROUND = 0;
const WIN_LOSE_MESSAGE = 1;
const BAR_LOGO = 2;
const BAR_MAP = 3;
const JEAN_PIERRE =  4;
const SOPHIE = 5;
const OFFICE_LOGO = 6;
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

    gameObjects[BACKGROUND] = new StaticImage(portoMapBackgroundImage, 0, 0, canvas.width, canvas.height);

    gameObjects[BAR_LOGO] =  new StaticImage(barLogo, 150, 150, 65, 90);

    gameObjects[BAR_MAP] = new StaticImage(barMap, 0, 0, canvas.width, canvas.height);   
 
    gameObjects[JEAN_PIERRE] =  new StaticImage(barMan, 500, 350, 200, 200);

    gameObjects[SOPHIE] =  new StaticImage(sophie, 300, 365, 200, 290);
    
  
    const timer = new Timer();
    
    timer.startIntervalTimer();


    
    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    let game = new CanvasGame();

    /* Always play the game */
    game.start();

    gameObjects[BAR_MAP].stopAndHide()

    gameObjects[JEAN_PIERRE].stopAndHide();

    gameObjects[SOPHIE].stopAndHide();

    let x = document.getElementById("bar_menu");
    x.style.display = "none";

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
                        {
                            
                        gameObjects[BAR_MAP].start();
	
                            // Select the element with id "theDIV"
                            let x = document.getElementById("game_menu");
                            
                            if (x.style.display != "none") 
                            {
                            
                              // Show the hidden element
                              x.style.display = "none";
                            }

                            let y = document.getElementById("bar_menu");

                            if (y.style.display === "none") 
                            {
                            

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

   

let button = document.getElementById("unpauseGame")
    button.addEventListener("click", function ()
    {
        gameObjects[BAR_MAP].stopAndHide();
        gameObjects[SOPHIE].stopAndHide();
        gameObjects[JEAN_PIERRE].stopAndHide();
        gameObjects[BACKGROUND].start();


        let x = document.getElementById("game_menu");
                            
        if (x.style.display === "none") 
        {
        
          // Show the hidden element
          x.style.display = "block";
        }

        let y = document.getElementById("bar_menu");

        if (y.style.display != "none") 
        {
        
          // Show the hidden element
          y.style.display = "none";
  
        }
    });


}




