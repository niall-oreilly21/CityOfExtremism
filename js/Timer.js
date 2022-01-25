/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Timer extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor() {
    super(
      null
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */

    this.seconds;
    this.minutes;
    this.timer = 180;
    this.intervalTime = 1000;
    this.intervalTimer;
  }

  startIntervalTimer() {
    // Store a handle to the timer
    this.intervalTimer = setInterval(this.intervalFunction, this.intervalTime);
    this.render();
  }

  intervalFunction() {
    // this.totalSeconds--;
    // this.minutes = Math.floor(this.thistotalSeconds / 60);
    // this.seconds = this.totalSeconds % 60;

    this.seconds = parseInt(this.timer % 60);
    this.minutes = parseInt(this.timer / 60);

    this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    this.timer--;

    if (timer === 0) 
    {
      console.log("HELLo");
      timer = 0;
      this.stopIntervalTimer();
    }
  }

  stopIntervalTimer() {
    // Stop the interval timer
    clearInterval(this.intervalTimer);
  }

  render() {
    ctx.fillStyle = "#010203";
    ctx.fillText(`${this.minutes}:${this.seconds} `, 200, 80);

    // if(this.timer < 9)
    // {
    //     ctx.fillText(` ${this.minutes}:${this.seconds}  `, 200, 80)
    // }
    // else
    // {
    //     ctx.fillText(` ${this.minutes}:0${this.seconds}  `, 200, 80)
    // }
  }
}
