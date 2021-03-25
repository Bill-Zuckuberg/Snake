document.addEventListener('DOMContentLoaded', (e) => {
	'use stricts';

	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const box = 32;

	let score = 0;
	let direction = 'START';
	let snake = [];
	let food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box,
	};

    canvas.width = 608;
    canvas.height = 608;
	snake[0] = { x: 9 * box, y: 10 * box };



	function draw() {
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(foodImage, food.x, food.y);
		for (let i = 0; i < snake.length; i++) {
				ctx.drawImage(i == 0 ? headImage :bodyImage,snake[i].x, snake[i].y, box, box);
		}

		// Thông báo đầu game
        if(direction == 'START'){
            ctx.fillStyle = 'red';
            ctx.font = '35px Arial';
            ctx.fillText('Press the arrow keys to play', 3*box, 9*box);
        }

		// Di chuyển
		if (direction === 'DOWN') snakeY += box;
		if (direction === 'UP') snakeY -= box;
		if (direction === 'LEFT') snakeX -= box;
		if (direction === 'RIGHT') snakeX += box;

		// Ăn
		if (food.x === snakeX && food.y === snakeY) {
			score++; // Cập nhật điểm
			eat.play();
			food = {
				x: Math.floor(Math.random() * 17 + 1) * box,
				y: Math.floor(Math.random() * 15 + 3) * box,
			};
		} else {
			snake.pop();
		}

		const newHead = {
			x: snakeX,
			y: snakeY,
		};

		// Thua
		if (
			snakeX < box ||
			snakeX > 17 * box ||
			snakeY < 3 * box ||
			snakeY > 17 * box ||
			collision(newHead, snake)
		) {
			dead.play(); 
            ctx.drawImage(overImage, 7*box, 6*box);
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText('Space to replay', 8*box, 12*box);
            direction = 'OVER';
			clearInterval(game);
		}

		snake.unshift(newHead);

		// Vẽ điểm
		ctx.fillStyle = 'white';
		ctx.font = '45px Arial';
		ctx.fillText(score, 2.3 * box, 1.6 * box);
	}

	let game = setInterval(draw, 100);

	// Kiểm tra rắn có cắn chính nó ko
	function collision(head, snakes) {
		for (let i = 0; i < snakes.length; i++) {
			if (head.x === snakes[i].x && head.y === snakes[i].y) {
				return true;
			}
		}
		return false;
	}


	// Bắc sự kiện nhấn phím mũi tên
	document.addEventListener('keydown', (e) => {
		switch (true) {
			case e.keyCode === 37 && direction !== 'RIGHT':
                left.play();
				direction = 'LEFT';
				break;
			case e.keyCode === 38 && direction !== 'DOWN':
                up.play();
				direction = 'UP';
				break;
            case e.keyCode === 39 && direction !== 'LEFT':
                right.play();
                direction = 'RIGHT';
                break;
			case e.keyCode === 40 && direction !== 'UP':
                down.play();
				direction = 'DOWN';
				break;
            case e.keyCode === 32:
                if(direction ='OVER'){
                    location.reload();
                };
                break;
		}
	});

});
