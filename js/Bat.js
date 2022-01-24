/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Bat extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, width)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 10;
    }

    render()
    {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    changeX(changeAmount)
    {
        this.x += changeAmount;
        
        /* Ensure that only half of the bat can be off the screen                               */
        /* This ensures that the bat can still fire at a log that is on the edge of the screen, */
        /* while at the same time the bat cannot hide fully from oncoming fireballs.            */
        if(this.x > canvas.width - (this.width / 2))
        {
            this.x = canvas.width - (this.width / 2);
        }
        else if(this.x < -(this.width / 2))
        {
            this.x = -(this.width / 2);
        }
    }
    
    getWidth()
    {
        return this.width;
    }
    
    setWidth(newWidth)
    {
        this.width = newWidth;
    }

    getCentreX()
    {
        return this.x + this.width / 2;
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    return false; // to the right of this gameObject
                }
            }

            if (pointY > this.y)
            {
                if ((pointY - this.y) > this.height)
                {
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            return false;
        }
        return true; // inside this gameObject
    }
}