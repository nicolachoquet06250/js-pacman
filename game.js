class Game {
    constructor() {
        this.canvas = document.querySelector('#board');
        this.context = this.canvas.getContext('2d');
        this.time = {};
        this.boardIs(new Board(MAPS));
        this.account = null;
        this.requestId = null;
    }

    /**
     * @param {Pacman} account
     * @returns {Game}
     */
    accountIs(account) {
        this.account = account.contextIs(this.context);
        for(let row in this.board.map) {
            for(let line in this.board.map[row]) {
                if(this.board.map[row][line] === PACMAN) {
                    account.position = new Position(line, row);
                    break;
                }
            }
            if(account.position !== null) break;
        }
        return this;
    }

    /**
     * @param {Board} board
     * @returns {Game}
     */
    boardIs(board) {
        board.contextIs(this.context);
        this.board = board;
        return this;
    }

    reset() {
        this.account.score = 0;
        this.account.lines = 0;
        this.account.level = 1;
        this.board.reset();
        this.time = { start: 0, elapsed: 0, level: this.account.level };
    }

    initPlayButtonEvent() {
        for(let play_button of document.querySelectorAll('.play-button')) {
            play_button.addEventListener('click', () => {
                this.play();
            });
        }
    }

    /*initPauseButtonEvent() {
        for(let pause_button of document.querySelectorAll('.pause-button')) {
            pause_button.addEventListener('click', () => {
                this.pause();
                pause_button.innerHTML = pause_button.innerText === 'Pause' ? 'Replay' : 'Pause';
            });
        }
    }*/

    play() {
        this.reset();
        this.time.start = performance.now();
        // If we have an old game running a game then cancel the old
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }

        this.account.draw();

        // this.animate();
    }

    /*pause() {
        if (!this.requestId) {
            this.animate();
            return;
        }

        cancelAnimationFrame(this.requestId);
        this.requestId = null;

        this.context.fillStyle = 'black';
        this.context.fillRect(1, 3, 8, 1.2);
        this.context.font = '1px Arial';
        this.context.fillStyle = 'yellow';
        this.context.fillText('PAUSED', 3, 4);
    }*/

    /*animate(now = 0) {
        this.time.elapsed = now - this.time.start;
        if (this.time.elapsed > this.time.level) {
            this.time.start = now;
            if (!this.board.drop()) {
                this.gameOver();
                return;
            }
        }

        // Clear board before drawing new state.
        this.context.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.board.draw();
        this.requestId = requestAnimationFrame(e => this.animate(e));
    }*/

    gameOver() {
        cancelAnimationFrame(this.requestId);
        this.context.fillStyle = 'black';
        this.context.fillRect(1, 3, 8, 1.2);
        this.context.font = '1px Arial';
        this.context.fillStyle = 'red';
        this.context.fillText('GAME OVER', 1.8, 4);
        /*for(let play_button of document.querySelectorAll('.play-button')) {
            this.toggleButton(play_button);
        }
        for(let pause_button of document.querySelectorAll('.pause-button')) {
            pause_button.innerHTML = 'Pause';
            this.toggleButton(pause_button);
        }*/
    }
}