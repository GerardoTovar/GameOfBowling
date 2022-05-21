class Frame {
  constructror(score, shotOne, shotTwo, shotThree, strike, spare, normalGame, frameNumber) {
    this.score = score;
    this.shotOne = shotOne;
    this.shotTwo = shotTwo;
    this.shotThree = shotThree;
    this.strike = strike;
    this.spare = spare;
    this.normalGame = normalGame;
    this.frameNumber = frameNumber;
  }

  callSetter() {
    this.setScore = 0;
    this.setShotOne = 0;
    this.setShotTwo = 0;
    this.setShotThree = 0;
    this.setSpare = false;
    this.setNormal = false;
    this.setStrike = false;
    this.setFrameNumber = 0;
  }

  tiro_uno() {
    this.shotOne = Math.floor(Math.random() * 11);
    this.setStrike = this.getShotOne === 10;
  }

  tiro_dos() {
    if (this.getFrameNumber === 9) {
      if (this.shotOne === 10) {
        this.shotTwo = Math.floor(Math.random() * 11);
      } else {
        this.shotTwo = Math.floor(Math.random() * (11 - this.shotOne));
        this.spare = this.shotOne + this.shotTwo === 10;
      }
    }
    if (this.shotOne < 10) {
      this.shotTwo = Math.floor(Math.random() * (11 - this.shotOne));
      this.spare = this.shotOne + this.shotTwo === 10;
    }
    this.normalGame = this.shotOne + this.shotTwo < 10;
  }

  tiro_tres() {
    if (this.getStrike || this.getSpare) {
      this.shotThree = 10;
    }
  }

  set setScore(newScore) { this.score = newScore; }

  get getScore() { return this.score; }

  set setShotOne(newShot) { this.shotOne = newShot; }

  get getShotOne() { return this.shotOne; }

  set setShotTwo(newShot) { this.shotTwo = newShot; }

  get getShotTwo() { return this.shotTwo; }

  set setShotThree(newShot) { this.shotThree = newShot; }

  get getShotThree() { return this.shotThree; }

  set setStrike(newStrike) { this.strike = newStrike; }

  get getStrike() { return this.strike; }

  set setNormal(newNormal) { this.normalGame = newNormal; }

  get getNormal() { return this.normalGame; }

  set setSpare(newSpare) { this.spare = newSpare; }

  get getSpare() { return this.spare; }

  set setFrameNumber(newFrameNumber) { this.frameNumber = newFrameNumber; }

  get getFrameNumber() { return this.frameNumber; }
}

module.exports = Frame;
