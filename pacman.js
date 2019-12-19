class Pacman extends Character {

    constructor(pseudo) {
        super(pseudo);
        this._score = 3;
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
        let ghostSetIntervals = {
            red: null,
            blue: null,
            yellow: null,
            pink: null
        };
        let events = {
            _score: 0,
            set score(score) {
                let _score = this._score;
                if(score !== _score) {
                    this.onScoreChange(score);
                }
                this._score = score
            },
            get score() {
                return this._score;
            },
            onScoreChange(score) {
                for(let _score of document.querySelectorAll('.score')) {
                    _score.innerHTML = score;
                }
            },
            onPacmanCollision(pacman, ghost) {
                unanimate_ghosts();
                let pacman_o = document.querySelector(`.pacman[data-position_x="${pacman['data-position_x']}"][data-position_y="${pacman['data-position_y']}"]`);
                console.log('onPacmanCollision', pacman, ghost);
                setTimeout(function () {
                    pacman_o.classList.remove('pacman');
                }, 0);
                setTimeout(function () {
                    pacman_o.classList.add('pacman');
                }, 500);
                setTimeout(function () {
                    pacman_o.classList.remove('pacman');
                }, 1000);
                setTimeout(function () {
                    pacman_o.classList.add('pacman');
                }, 1500);
                if(events.score === 0) {
                    setTimeout(function () {
                        pacman_o.classList.remove('pacman');
                    }, 2000);
                    setTimeout(function () {
                        pacman_o.classList.add('pacman');
                        pacman_o.classList.add('dead');
                    }, 2000);
                    setTimeout(function () {
                        pacman_o.classList.remove('pacman', 'dead');
                        pacman_o.removeAttribute('data-opened');
                        console.log('GAME OVER');
                    }, 4700);
                }
                if(events.score > 0) {
                    events.score--;
                    setTimeout(function () {
                        animate_ghosts();
                    }, 2000);
                }
            },
            onGhostCollision(pacman, ghost) {
                clearInterval(ghostSetIntervals[ghost["data-color"]]);
                let ghost_o = document.querySelector(`.ghost[data-position_x="${ghost['data-position_x']}"][data-position_y="${ghost['data-position_y']}"]`);
                setTimeout(function () {
                    ghost_o.classList.add('dead');
                }, 0);
                setTimeout(function () {
                    ghost_o.classList.remove('dead');
                }, 500);
                setTimeout(function () {
                    ghost_o.classList.add('dead');
                }, 1000);
                setTimeout(function () {
                    ghost_o.classList.remove('dead');
                }, 1500);
                setTimeout(function () {
                    ghost_o.classList.add('dead');
                }, 2000);
                setTimeout(function () {
                    ghost_o.classList.remove('ghost');
                    ghost_o.removeAttribute('data-color');
                    ghost_o.classList.remove('dead');
                }, 2000);
            }
        };

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
                if(next) {
                    if (next.classList.contains('ghost')) {
                        events.onGhostCollision({
                            "data-position_x": parseInt(current.getAttribute('data-position_x')),
                            "data-position_y": parseInt(current.getAttribute('data-position_y')),
                            "data-opened": current.getAttribute('data-opened') === "true",
                        }, {
                            "data-position_x": parseInt(next.getAttribute('data-position_x')),
                            "data-position_y": parseInt(next.getAttribute('data-position_y')),
                            "data-color": next.getAttribute('data-color'),
                        });
                    }
                    if(!next.classList.contains('wall') && !next.classList.contains('ghost')) {
                        current.removeAttribute('data-opened');
                        current.classList.remove('pacman');
                        if(next.classList.contains('food')) {
                            next.classList.remove('food');
                        }
                        next.classList.add('pacman');
                        next.classList.add(`direction-${direction}`);
                        next.setAttribute('data-opened', !opened === true ? "true" : "false");
                    }
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
        function move_ghost(color, sens, directions = DIRECTION) {
            function move(current, next) {
                if(next) {
                    if(next.classList.contains('pacman')) {
                        events.onPacmanCollision({
                            "data-position_x": next.getAttribute('data-position_x'),
                            "data-position_y": next.getAttribute('data-position_y'),
                            "data-opened": next.getAttribute('data-opened'),
                        }, {
                            "data-position_x": current.getAttribute('data-position_x'),
                            "data-position_y": current.getAttribute('data-position_y'),
                            "data-color": current.getAttribute('data-color'),
                        });
                    }
                    if (!next.classList.contains('wall') && !next.classList.contains('ghost') && !next.classList.contains('pacman')) {
                        current.classList.remove('ghost');
                        current.removeAttribute('data-color');
                        next.classList.add('ghost');
                        next.setAttribute('data-color', color);
                        return true;
                    }
                }
                return false;
            }

            let ghost = document.querySelector(`.ghost[data-color="${color}"]`);
            if(ghost) {
                let position = get_position(ghost);
                switch (sens) {
                    case 'left':
                        if(!move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x - 1}"][data-position_y="${position.y}"]`))) {
                            let directions_tmp = [];
                            for(let direction_i in directions) {
                                if(directions[direction_i] !== sens) {
                                    directions_tmp.push(directions[direction_i]);
                                }
                            }
                            directions = directions_tmp;

                            let direction_i = Math.floor(Math.random() * ((directions.length - 1) + 1));
                            let direction = directions[direction_i];
                            // console.log(directions, direction, direction_i);
                            move_ghost(color, direction, directions);
                        }
                        break;
                    case 'right':
                        if(!move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x + 1}"][data-position_y="${position.y}"]`))) {
                            let directions_tmp = [];
                            for(let direction_i in directions) {
                                if(directions[direction_i] !== sens) {
                                    directions_tmp.push(directions[direction_i]);
                                }
                            }
                            directions = directions_tmp;

                            let direction_i = Math.floor(Math.random() * ((directions.length - 1) + 1));
                            let direction = directions[direction_i];
                            // console.log(directions, direction, direction_i);
                            move_ghost(color, direction, directions);
                        }
                        break;
                    case 'top':
                        if(!move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y - 1}"]`))) {
                            let directions_tmp = [];
                            for(let direction_i in directions) {
                                if(directions[direction_i] !== sens) {
                                    directions_tmp.push(directions[direction_i]);
                                }
                            }
                            directions = directions_tmp;

                            let direction_i = Math.floor(Math.random() * ((directions.length - 1) + 1));
                            let direction = directions[direction_i];
                            // console.log(directions, direction, direction_i);
                            move_ghost(color, direction, directions);
                        }
                        break;
                    case 'bottom':
                        if(!move(ghost, document.querySelector(`.pacman-block[data-position_x="${position.x}"][data-position_y="${position.y + 1}"]`))) {
                            let directions_tmp = [];
                            for(let direction_i in directions) {
                                if(directions[direction_i] !== sens) {
                                    directions_tmp.push(directions[direction_i]);
                                }
                            }
                            directions = directions_tmp;

                            let direction_i = Math.floor(Math.random() * ((directions.length - 1) + 1));
                            let direction = directions[direction_i];
                            // console.log(directions, direction, direction_i);
                            move_ghost(color, direction, directions);
                        }
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
            events.score = 3;
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
            ghostSetIntervals.red = setInterval(function () {
                move_ghost('red', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
            }, 500);
            ghostSetIntervals.blue = setInterval(function () {
                move_ghost('blue', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
            }, 500);
            ghostSetIntervals.yellow = setInterval(function () {
                move_ghost('yellow', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
            }, 500);
            ghostSetIntervals.pink = setInterval(function () {
                move_ghost('pink', DIRECTION[Math.floor(Math.random() * ((DIRECTION.length - 1) + 1))]);
            }, 500);
        }
        function unanimate_ghosts() {
            clearInterval(ghostSetIntervals.red);
            clearInterval(ghostSetIntervals.blue);
            clearInterval(ghostSetIntervals.yellow);
            clearInterval(ghostSetIntervals.pink);
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
