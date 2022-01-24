/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class JigsawPiece extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(jigsawPieceImage, colour, letter, id, size, granulatity, startX, startY, finalX, finalY)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.letter = letter;
        this.id = id;
        this.width = size;
        this.height = size;
        this.x = startX;
        this.y = startY;
        this.offsetX = 0;
        this.offsetY = 0;

        this.finalX = finalX; // this is the position where the jigsaw piece needs to end up at
        this.finalY = finalY;
        this.granulatity = granulatity; // the +/- resolution of the accuracy of where the piece needs to end up
        this.isLocked = false; // set to true when the piece is at its final place


        this.jigsawCanvas = document.createElement('canvas');
        this.jigsawCanvasCtx = this.jigsawCanvas.getContext("2d");
        this.jigsawCanvas.width = jigsawPieceImage.width;
        this.jigsawCanvas.height = jigsawPieceImage.height;
        this.jigsawCanvasCtx.drawImage(jigsawPieceImage, 0, 0, jigsawPieceImage.width, jigsawPieceImage.height); /* As all jigsaw pieces are the same size, we can use any one for the collision detection */

        let imageData = this.jigsawCanvasCtx.getImageData(0, 0, this.jigsawCanvas.width, this.jigsawCanvas.height);
        let data = imageData.data;

        // Manipulate the pixel data
        for (let i = 0; i < data.length; i += 4)
        {
            if (data[i + 3] !== 0)
            {
                data[i + 0] = colour[0];
                data[i + 1] = colour[1];
                data[i + 2] = colour[2];
            }
        }
        
        this.jigsawCanvasCtx.putImageData(imageData, 0, 0);

        this.jigsawCanvasCtx.strokeStyle = "black";
        this.jigsawCanvasCtx.font = this.height * 0.6 + "px Arial";  // scale the font to match the size of the jigsaw piece
        this.jigsawCanvasCtx.fillText(this.letter, this.height * 0.35, this.height * 0.70);   // position the letter in the jigsaw piece
    }

    render()
    {
        ctx.drawImage(this.jigsawCanvas, this.x, this.y, this.width, this.height);
    }

    isPieceAtFinalPosition()
    {
        if (this.id !== currentPiece)
        {
            return false;
        }
        if (this.isLocked)
        {
            return false;
        }
        if ((this.x > this.finalX - this.granulatity) &&
                (this.x < this.finalX + this.granulatity) &&
                (this.y > this.finalY - this.granulatity) &&
                (this.y < this.finalY + this.granulatity))
        {

            this.x = this.finalX;
            this.y = this.finalY;
            this.isLocked = true;

            currentPiece++; // allow the next jigsaw piece to be locked

            return true;
        }
        return false;
    }

    setX(newMouseX)
    {
        if (this.isLocked)
        {
            return;
        }
        if (!this.isPieceAtFinalPosition())
        {
            this.x = newMouseX - this.offsetX;
        }
    }

    setY(newMouseY)
    {
        if (this.isLocked)
        {
            return;
        }
        this.y = newMouseY - this.offsetY;
    }

    setOffsetX(newMouseX)
    {
        if (this.isLocked)
        {
            return;
        }
        this.offsetX = newMouseX - this.x;
    }

    setOffsetY(newMouseY)
    {
        if (this.isLocked)
        {
            return;
        }
        this.offsetY = newMouseY - this.y;
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if (this.isLocked)
        {
            return;
        }
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

        // passed basic bounding test
        // now test for the transparent part of the jigsaz piece
        let imageData = this.jigsawCanvasCtx.getImageData(pointX - this.x, pointY - this.y, 1, 1);
        let data = imageData.data;

        // Check the pixel data for transparancy
        if (data[3] === 0)
        {
            return false;
        }

        // mouse is on top of jigsaw piece
        return true;
    }
}