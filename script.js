const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Variáveis do Jogador
let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

// Variáveis do Tiro
let bullets = [];
let bulletSpeed = 7;

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para desenhar os tiros
function drawBullets() {
    ctx.fillStyle = "#f00";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Função para mover o jogador
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Impedir que o jogador saia da tela
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Função para mover os tiros
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;

        // Remove o tiro se ele sair da tela
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Função para desenhar tudo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    movePlayer();
    moveBullets();
    requestAnimationFrame(draw);
}

// Função para controlar os teclados
function keyDown(e) {
    if (e.key === "ArrowLeft" || e.key === "a") {
        player.dx = -player.speed;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
        player.dx = player.speed;
    }
    if (e.key === "ArrowUp" || e.key === "w") {
        player.dy = -player.speed;
    }
    if (e.key === "ArrowDown" || e.key === "s") {
        player.dy = player.speed;
    }
    if (e.key === " " || e.key === "Enter") {
        fireBullet();
    }
}

// Função para parar o movimento
function keyUp(e) {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "ArrowRight" || e.key === "d") {
        player.dx = 0;
    }
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "ArrowDown" || e.key === "s") {
        player.dy = 0;
    }
}

// Função para disparar os tiros
function fireBullet() {
    let bullet = {
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 5,
        height: 10
    };
    bullets.push(bullet);
}

// Adicionando os eventos de teclado
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

// Iniciar o loop do jogo
draw();
