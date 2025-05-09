const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 32;
const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;

// Simples mapa de tiles (0: chão, 1: parede)
const map = [
  // 16x16 mapa (linhas de 16 elementos)
  ...Array(16).fill([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]),
];

// Personagem
const player = {
  x: 2,
  y: 2,
  color: "blue"
};

// Desenha o mapa
function drawMap() {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tile = map[y][x];
      ctx.fillStyle = tile === 1 ? "#444" : "#999";
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

// Desenha o personagem
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.x * TILE_SIZE + 4,
    player.y * TILE_SIZE + 4,
    TILE_SIZE - 8,
    TILE_SIZE - 8
  );
}

// Atualiza a tela
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (
    newX >= 0 &&
    newY >= 0 &&
    newX < MAP_WIDTH &&
    newY < MAP_HEIGHT &&
    map[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;
  }

  render();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

// Inicializa
render();

