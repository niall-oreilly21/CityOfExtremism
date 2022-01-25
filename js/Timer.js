/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Timer extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(timer, x, y, font, fontSize, colour) {
    super(
      1000
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.timer = timer;
    this.x = x;
    this.y = y;
    this.font = font;
    this.fontSize = fontSize;
    this.colour = colour;

    ctx.font = this.fontSize + "px " + this.font;
    this.width = ctx.measureText(this.timer).width;
    if (this.x === -1) {
      this.x = (canvas.width - this.width) / 2;
    }
  }

  updateState() {
    this.timer--;
    console.log(this.timer);

    if (this.timer === 0) {
      this.stop();
    }
  }

  render() {
    ctx.fillStyle = this.colour;
    ctx.font = this.fontSize + "px " + this.font;
    ctx.fillText(this.timer, this.x, this.y);
  }
}
