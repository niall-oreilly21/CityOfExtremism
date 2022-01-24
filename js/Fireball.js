/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Fireball extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, centreX)
    {
        super(5); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
        this.width = 30;
        this.height = 30;
        this.centreX = centreX;
        this.centreY = canvas.height - this.height - 1;
        this.stepSize = -1;
        this.rotation = 360;
    }

    updateState()
    {
        this.rotation -= 3;
        if (this.rotation < 1)
        {
            this.rotation = 360;
        }

        if (this.stepSize < 0)
        {
            this.centreY--;
            if (this.centreY < 0)
            {
                this.stepSize = 1;
            }
        }
        else // this.stepSize >= 0
        {
            this.centreY++;
            if (this.centreY > canvas.height)
            {
                this.stepSize = -1;
            }
        }
    }

    render()
    {
        ctx.save();
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(Math.radians(this.rotation));
        ctx.translate(-this.centreX, -this.centreY);

        ctx.drawImage(this.image, this.centreX - this.width / 2, this.centreY - this.width / 2, this.width, this.height);
        ctx.restore();
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCentreY()
    {
        return this.centreY;
    }
}