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
        function get_position(element) {
            return {
                x: parseInt(element.getAttribute('data-position_x')),
                y: parseInt(element.getAttribute('data-position_y'))
            };
        }
        function move_pacman(sens) {
            function move(current, next, direction) {
                let opened = current.getAttribute('data-opened') === "true";
                current.classList.remove('direction-left', 'direction-right', 'direction-top', 'direction-bottom');
                if(next && !next.classList.contains('wall')) {
                    current.removeAttribute('data-opened');
                    current.classList.remove('pacman');
                    if(next.classList.contains('food')) {
                        next.classList.remove('food');
                    }
                    if(next.classList.contains('ghost')) {
                        next.classList.remove('ghost');
                    }
                    next.classList.add('pacman');
                    next.classList.add(`direction-${direction}`);
                    next.setAttribute('data-opened', !opened === true ? "true" : "false");
                } else current.classList.add(`direction-${direction}`);
            }
            let pacman = document.querySelector(`.pacman`);
            let position = get_position(pacman);
            switch (sens) {
                case 'left':
                    move(pacman, document.querySelector(`.pacman-block[data-position_x="${position.x - 1}"][data-position_y="${position.y}"]`), sens);
                    break;
                case 'right':
                    move(pacman, document.querySelector(`.pacman-block[data-position_x="${position.x + 1}"][data-position_y="${position.y}"]`), sens);
                    break;
                case 'top':
                    move(pacman, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y - 1}"]`), sens);
                    break;
                case 'bottom':
                    move(pacman, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y + 1}"]`), sens);
                    break;
                default:
                    break;
            }
        }
        function move_ghost(color, sens) {
            function move(current, next) {
                if(next && !next.classList.contains('wall') && !next.classList.contains('ghost')) {
                    current.classList.remove('ghost');
                    current.removeAttribute('data-color');
                    next.classList.add('ghost');
                    next.setAttribute('data-color', color);
                }
            }

            let ghost = document.querySelector(`.ghost[data-color="${color}"]`);
            if(ghost) {
                let position = get_position(ghost);
                switch (sens) {
                    case 'left':
                        move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x - 1}"][data-position_y="${position.y}"]`));
                        break;
                    case 'right':
                        move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x + 1}"][data-position_y="${position.y}"]`));
                        break;
                    case 'top':
                        move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y - 1}"]`));
                        break;
                    case 'bottom':
                        move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y + 1}"]`));
                        break;
                    default:
                        break;
                }
            }
        }
        function init_events() {
            document.addEventListener('keydown', e => {
                switch (e.keyCode) {
                    case KEY.LEFT:
                        move_pacman('left');
                        break;
                    case KEY.RIGHT:
                        move_pacman('right');
                        break;
                    case KEY.DOWN:
                        move_pacman('bottom');
                        break;
                    case KEY.UP:
                        move_pacman('top');
                        break;
                    default:
                        break;
                }
            });
            document.querySelector('.go-top').addEventListener('click', () => move_pacman('top'));
            document.querySelector('.go-bottom').addEventListener('click', () => move_pacman('bottom'));
            document.querySelector('.go-left').addEventListener('click', () => move_pacman('left'));
            document.querySelector('.go-right').addEventListener('click', () => move_pacman('right'));
        }
        function init_html_map() {
            let board = document.querySelector('#board');
            board.style.height = `${MAPS.level1.length * COL_SIZE + COL_SIZE + 10}px`;
            board.style.width = `${5 + (MAPS.level1[0].length * COL_SIZE)}px`;
            for(let row_i in MAPS.level1) {
                let row = MAPS.level1[row_i];
                let row_o = document.createElement('div');
                row_o.classList.add('row');
                let col_12 = document.createElement('div');
                col_12.classList.add('col-12');
                for(let col_i in row) {
                    let element = document.createElement('div');
                    element.classList.add('d-inline-block');
                    element.classList.add('pacman-block');
                    element.classList.add('lawn');
                    element.style.width = `${COL_SIZE}px`;
                    element.style.height = `${COL_SIZE}px`;
                    element.setAttribute('data-position_x', col_i);
                    element.setAttribute('data-position_y', row_i);
                    switch (row[col_i]) {
                        case PACMAN:
                            element.classList.add('pacman');
                            element.setAttribute('data-opened', 'true');
                            break;
                        case GHOSTS[0]:
                            element.classList.add('ghost');
                            element.setAttribute('data-color', 'red');
                            break;
                        case GHOSTS[1]:
                            element.classList.add('ghost');
                            element.setAttribute('data-color', 'blue');
                            break;
                        case GHOSTS[2]:
                            element.classList.add('ghost');
                            element.setAttribute('data-color', 'yellow');
                            break;
                        case GHOSTS[3]:
                            element.classList.add('ghost');
                            element.setAttribute('data-color', 'pink');
                            break;
                        case FOOD:
                            element.classList.add('food');
                            break;
                        case HERBE:
                            element.classList.add('lawn');
                            break;
                        case MUR:
                            element.classList.add('wall');
                            break;
                        default:
                            break;
                    }
                    col_12.append(element);
                }
                row_o.append(col_12);
                board.append(row_o);
                console.log(row);
            }
        }
        function animate_ghosts() {
            setInterval(function () {
                move_ghost('red', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
                move_ghost('blue', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
                move_ghost('yellow', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
                move_ghost('pink', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
            }, 500);
        }
        init_html_map();
        init_events();
        animate_ghosts();
    }

    onPositionChange(newPosition, oldPosition) {
        if(oldPosition !== null) {
            console.log(`Pacman change its position from ${oldPosition.getX()}:${oldPosition.getY()} to ${newPosition.getX()}:${newPosition.getY()} position !`)
        } else {
            console.log(`Pacman position was init to ${newPosition.getX()}:${newPosition.getY()} !`)
        }
    }
}