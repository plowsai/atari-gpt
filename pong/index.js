const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 8;

const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const rightPaddle = {
    x: canvas.width - 10 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    dx: 4,
    dy: 4
};

function drawPaddle(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawBall(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function update() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y -= rightPaddle.dy;

    if (leftPaddle.y < 0 || leftPaddle.y + paddleHeight > canvas.height) {
        leftPaddle.dy = -leftPaddle.dy;
    }

    if (rightPaddle.y < 0 || rightPaddle.y + paddleHeight > canvas.height) {
        rightPaddle.dy = -rightPaddle.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    if (
        (ball.x - ball.radius < leftPaddle.x + paddleWidth &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.dx = -ball.dx;
    } else if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    drawBall(ball.x, ball.y, ball.radius);
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
