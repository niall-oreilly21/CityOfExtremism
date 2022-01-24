/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.                                                   */
/* The CanvasGame class is responsible for rendering all of the gameObjects and other game graphics on the canvas.         */
/* If you want to implement collision detection in your game, then you MUST overwrite the collisionDetection() method. */
/* This class will usually not change.                                                                                 */



class FireballCanvasGame extends CanvasGame
{
    constructor()
    {
        super();
    }

    collisionDetection()
    {
        for (let i = 0; i < numberOfBulletsFired; i++)
        {
            if (target.pointIsInsideBoundingRectangle(fireballs[i].getCentreX(), fireballs[i].getCentreY()))
            {
                target.setWidth(target.getWidth() - 10);
                target.setX(Math.random() * (canvas.width - target.getWidth()));

                if (target.getWidth() < target.getMinimumSize())
                {
                    /* Player has won */
                    for (let i = 0; i < fireballs.length; i++) /* stop all gameObjects from animating */
                    {
                        fireballs[i].stop();
                    }
                    gameObjects[WIN_LOSE_MESSAGE] = new StaticText("Win!", 150, 270, "Times Roman", 100, "black");
                    gameObjects[WIN_LOSE_MESSAGE].start(); /* render win message */
                }
            }
            else if (bat.pointIsInsideBoundingRectangle(fireballs[i].getCentreX(), fireballs[i].getCentreY()))
            {
                /* Player has lost */
                for (let i = 0; i < fireballs.length; i++) /* stop all gameObjects from animating */
                {
                    fireballs[i].stop();
                }
                gameObjects[WIN_LOSE_MESSAGE] = new StaticText("LOSE!", 100, 270, "Times Roman", 100, "red");
                gameObjects[WIN_LOSE_MESSAGE].start(); /* render lose message */
            }
        }
    }

    render()
    {
        super.render();

        bat.render();
        target.render();
        for (let i = 0; i < fireballs.length; i++)
        {
            fireballs[i].render();
        }
    }
}