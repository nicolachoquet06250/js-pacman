class Pacman extends Character {

    constructor(pseudo) {
        super(pseudo);
        this._score = 0;
    }

    set score(score) {
        let _score = this._score;
        this._score = score;
        if(score !== _score) {
            this.onScoreChange(score, this._score);
        }
    }

    get score() {
        return this._score;
    }

    onScoreChange(newScore, oldScore) {
        for(let score of document.querySelectorAll('.score')) {
            score.innerHTML = newScore;
        }
    }

    draw() {
        console.log(document.querySelector('#board').offsetWidth / 10);
        console.log(document.querySelector('#board').offsetHeight / 10);
        this.context.fillRect(
            this.position.getX(), this.position.getY(),
            parseInt(document.querySelector('#board').style.width.replace('px', '')) / 10,
            parseInt(document.querySelector('#board').style.height.replace('px', '')) / 10
        );
        this.context.stroke();
        console.log(`Pacman at the ${this.position.getX()}:${this.position.getY()} position !`)
    }

    onPositionChange(newPosition, oldPosition) {
        if(oldPosition !== null) {
            console.log(`Pacman change its position from ${oldPosition.getX()}:${oldPosition.getY()} to ${newPosition.getX()}:${newPosition.getY()} position !`)
        } else {
            console.log(`Pacman position was init to ${newPosition.getX()}:${newPosition.getY()} !`)
        }
    }
}