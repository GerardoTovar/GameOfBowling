const Frame = require('./frame');

class BowlingGame {
  constructor(score = 0) {
    this.frames = new Array(10).fill('').map(() => new Frame());
    this.score = score;
  }

  play() {
    this.frames.forEach((frame, index) => {
      frame.callSetter();
      frame.setFrameNumber = index;
      frame.tiro_uno();
      frame.tiro_dos();
      if (index === 9) frame.tiro_tres();
    });
    this.calScore();
  }

  calScore() {
    this.frames.forEach((frame) => {
      if (frame.getNormal) this.normalGameCalc(frame);
      if (frame.getSpare) this.spareGameCalc(frame);
      if (frame.getStrike) this.strikeGameCalc(frame);
    });
    this.showGame();
  }

  normalGameCalc(frame) {
    this.score += frame.getShotOne + frame.getShotTwo;
    this.frames[frame.getFrameNumber].setScore = this.score;
  }

  spareGameCalc(frame) {
    if (frame.getFrameNumber === 0) {
      this.score += 10 + this.frames[frame.getFrameNumber + 1].getShotOne;
      this.frames[frame.getFrameNumber].setScore = this.score;
    }
    if (frame.getFrameNumber < 9 && frame.getFrameNumber > 0) {
      this.score += 10 + this.frames[frame.getFrameNumber + 1].getShotOne;
      this.frames[frame.getFrameNumber].setScore = this.score;
    }
    if (frame.getFrameNumber === 9) {
      const oneOne = this.frames[frame.getFrameNumber].getShotOne;
      const oneTwo = this.frames[frame.getFrameNumber].getShotTwo;
      const oneThree = this.frames[frame.getFrameNumber].getShotThree;
      this.score += oneOne + oneTwo + oneThree;
      this.frames[frame.getFrameNumber].setScore = this.score;
    }
  }

  strikeGameCalc(frame) {
    const currentFrame = this.frames[frame.getFrameNumber];
    if (frame.getFrameNumber < 9) {
      const nextFrame = this.frames[frame.getFrameNumber + 1];

      if (nextFrame.getSpare || nextFrame.getNormal) {
        this.score += nextFrame.getShotOne + nextFrame.getShotTwo + currentFrame.getShotOne + currentFrame.getShotTwo;
        currentFrame.setScore = this.score;
      }
      if (nextFrame.getStrike) {
        if (frame.getFrameNumber === 8) {
          this.score += 10 + nextFrame.getShotOne + nextFrame.getShotTwo + nextFrame.getShotThree;
          currentFrame.setScore = this.score;
        } else {
          const nextFrame2 = this.frames[frame.getFrameNumber + 2];
          this.score += 20 + nextFrame2.getShotOne;
          currentFrame.setScore = this.score;
        }
      }
    }
    if (frame.getFrameNumber === 9) {
      const One = currentFrame.getShotOne;
      const Two = currentFrame.getShotTwo;
      const Three = currentFrame.getShotThree;
      this.score += One + Two + Three;
      this.frames[frame.getFrameNumber].setScore = this.score;
    }
  }

  showGame() {
    let textTop = '|';
    let textbot = '|';
    this.frames.forEach((frame) => {
      if (frame.getScore > 99) {
        textTop += ' ';
      }
      textTop += ' ' + frame.getShotOne + " | " + frame.getShotTwo + " |"
      if (frame.getFrameNumber === 9) {
        textTop += ' ' + frame.getShotThree + " |";
      }
    });
    this.frames.forEach((frame) => {
      if (frame.getFrameNumber < 9) {
        if (frame.getScore <= 9) {
          textbot += "   " +  frame.getScore + "   ";
        }
        if (frame.getScore > 9) {
          textbot += "   " +  frame.getScore + "  ";
        }
        if (frame.getShotOne > 9 || frame.getShotTwo > 9) {
          textbot += ' ';
        }
        textbot += "|";
      }
      if (frame.getFrameNumber === 9) {
        if (frame.getScore > 9) {
          textbot += "     " +  frame.getScore + "    ";
        }
        if (frame.getShotOne > 9) textbot += ' ';
        if (frame.getShotTwo > 9) textbot += ' ';
        if (frame.getShotThree > 9) textbot += ' ';
        textbot += "|";
      }
    });
    //console.log(this.frames); debugin
    console.log(textTop);
    console.log(textbot);
  }
}

module.exports = BowlingGame;
