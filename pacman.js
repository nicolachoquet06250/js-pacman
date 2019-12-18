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
        function rectArrondi(ctx, x, y, w, hauteur, rayon) {
            ctx.beginPath();
            ctx.moveTo(x, y + rayon);
            ctx.lineTo(x, y + hauteur - rayon);
            ctx.quadraticCurveTo(x, y + hauteur, x + rayon, y + hauteur);
            ctx.lineTo(x + w - rayon, y + hauteur);
            ctx.quadraticCurveTo(x + w, y + hauteur, x + w, y + hauteur - rayon);
            ctx.lineTo(x + w, y + rayon);
            ctx.quadraticCurveTo(x + w, y, x + w - rayon, y);
            ctx.lineTo(x + rayon,y);
            ctx.quadraticCurveTo(x, y, x, y + rayon);
            ctx.stroke();
        }
        function dessiner_obstacle_vide(ctx, x, y, w, h) {
            rectArrondi(ctx, x, y, w, h, (h >= 30 ? 10 : (h - 10)));
        }
        function save_pacman(x, y, opened) {
            document.querySelector('#board').setAttribute('data-pacman', JSON.stringify({ position: { x, y }, opened }));
        }
        function get_pacman_properties() {
            return JSON.parse(document.querySelector('#board').getAttribute('data-pacman'));
        }
        function clear_pacman(ctx, x, y, opened = true) {
            ctx.fillStyle = 'white';
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            let startAngle = opened ? Math.PI / 5 : Math.PI;
            let endAngle = opened ? -Math.PI / 5 : -Math.PI;
            ctx.beginPath();
            ctx.arc(x, y - 6, 12.5, startAngle, endAngle, false);
            ctx.fill();
            ctx.restore();
        }
        function dessiner_pacman(ctx, x, y, sens, opened = true) {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            let startAngle = opened ? Math.PI / 5 : Math.PI;
            let endAngle = opened ? -Math.PI / 5 : -Math.PI;
            ctx.arc(x, y - 6, 12, startAngle, endAngle, false);
            if(opened) {
                ctx.lineTo(x, y - 6);
            }
            ctx.fill();
            save_pacman(x, y, opened);
        }
        function dessiner_nouriture(ctx, x, y) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, 4, 4);
        }
        function dessiner_fantome(ctx, x, y, color = 'black') {
            function dessiner_contours(ctx, color) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y - 14);
                ctx.bezierCurveTo(x, y - 22, x + 6, y - 28, x + 4, y - 28);
                ctx.bezierCurveTo(x + 22, y - 40, x + 28, y - 22, x + 28, y + 14);
                ctx.lineTo(x + 28, y);
                ctx.lineTo(x + 23.34, y - 4.67);
                ctx.lineTo(x + 18.67, y);
                ctx.lineTo(x + 14, y - 4.67);
                ctx.lineTo(x + 9.33, y);
                ctx.lineTo(x + 4.67, y - 4.67);
                ctx.lineTo(x, y);
                ctx.fill();
            }
            function dessiner_yeux(ctx) {
                ctx.fillStyle = "white";
                ctx.beginPath();

                ctx.ellipse(x + 6, y - 18, 3, 6, 0, 0, 2 * Math.PI);
                ctx.ellipse(x + 16, y - 18, 3, 6, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
            function dessiner_yeux_cercle_noir(ctx, cote = 'left') {
                let _x;
                let _y;
                switch (cote) {
                    case 'left':
                        _x = x + 6;
                        _y = y - 18;
                        break;
                    case 'right':
                        _x = x + 16;
                        _y = y - 18;
                        break;
                    default:
                        break;
                }
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(_x, _y, 2, 0, Math.PI * 2, true);
                ctx.fill();
            }

            dessiner_contours(ctx, color);
            dessiner_yeux(ctx);
            dessiner_yeux_cercle_noir(ctx, 'right');
            dessiner_yeux_cercle_noir(ctx, 'left');
        }
        function move(ctx, sens) {
            let pacman = get_pacman_properties();
            clear_pacman(ctx, pacman.position.x, pacman.position.y, pacman.opened);
            switch (sens) {
                case 'left':
                    dessiner_pacman(ctx, pacman.position.x - 10, pacman.position.y, 'left', !pacman.opened);
                    break;
                case 'right':
                    dessiner_pacman(ctx, pacman.position.x + 10, pacman.position.y, 'right', !pacman.opened);
                    break;
                case 'top':
                    dessiner_pacman(ctx, pacman.position.x, pacman.position.y - 10, 'top', !pacman.opened);
                    break;
                case 'bottom':
                    dessiner_pacman(ctx, pacman.position.x, pacman.position.y + 10, 'bottom', !pacman.opened);
                    break;
                default:
                    break;
            }
        }
        function init_events(ctx) {
            document.addEventListener('keydown', e => {
                switch (e.keyCode) {
                    case KEY.LEFT:
                        move(ctx, 'left');
                        break;
                    case KEY.RIGHT:
                        move(ctx, 'right');
                        break;
                    case KEY.DOWN:
                        move(ctx, 'bottom');
                        break;
                    case KEY.UP:
                        move(ctx, 'top');
                        break;
                    default:
                        break;
                }
            });
            document.querySelector('.go-top').addEventListener('click', () => move(ctx, 'top'));
            document.querySelector('.go-bottom').addEventListener('click', () => move(ctx, 'bottom'));
            document.querySelector('.go-left').addEventListener('click', () => move(ctx, 'left'));
            document.querySelector('.go-right').addEventListener('click', () => move(ctx, 'right'));
        }
        function dessiner() {
            let canvas = document.querySelector('#board');
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');

                dessiner_obstacle_vide(ctx, 53, 50, 49, 30);
                dessiner_obstacle_vide(ctx, 135, 50, 49, 30);
                dessiner_obstacle_vide(ctx, 53, 110, 49, 16);
                dessiner_obstacle_vide(ctx, 135, 110, 49, 16);

                // horizontals
                for(let i = 0; i < 18; i++) {
                    dessiner_nouriture(ctx, 10 + i * 16, 12);
                    dessiner_nouriture(ctx, 10 + i * 16, 91);
                }

                // verticals
                for(let i = 0; i < 8; i++) {
                    dessiner_nouriture(ctx, 122, 27 + i * 16);
                    dessiner_nouriture(ctx, 26, 27 + i * 16);
                }

                dessiner_pacman(ctx, 20, 20, 'right', true);

                // Fantome
                dessiner_fantome(ctx, 100, 36, 'red');
                dessiner_fantome(ctx, 83, 110, 'black');
                dessiner_fantome(ctx, 215, 110, 'purple');
                dessiner_fantome(ctx, 215, 36, 'yellow');

                init_events(ctx);
            }
        }
        dessiner();
    }

    onPositionChange(newPosition, oldPosition) {
        if(oldPosition !== null) {
            console.log(`Pacman change its position from ${oldPosition.getX()}:${oldPosition.getY()} to ${newPosition.getX()}:${newPosition.getY()} position !`)
        } else {
            console.log(`Pacman position was init to ${newPosition.getX()}:${newPosition.getY()} !`)
        }
    }
}