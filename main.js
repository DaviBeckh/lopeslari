const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: "#dfe6e9",
  scene: {
    preload,
    create,
    update
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);

// ===== VARIÁVEIS =====
let snail;
let x = 400;
let y = 225;
let word;
let infoText;

// ===== PALAVRA =====
const wordData = {
  coded: "mufo",
  correct: "fumo",
  meaning: "Conjugado: tomar fumo, significado: se lascou"
};

// ===== PRELOAD =====
function preload() {
  this.load.image("snail", "snail.png");
}

// ===== CREATE =====
function create() {
  snail = this.add.sprite(x, y, "snail");
  snail.setOrigin(0.5);
  snail.setScale(0.1);

  infoText = this.add.text(400, 60, "", {
    fontSize: "20px",
    color: "#2c3e50",
    align: "center",
    wordWrap: { width: 720 }
  }).setOrigin(0.5);

  spawnWord.call(this);
}

// ===== SPAWN DA PALAVRA =====
function spawnWord() {
  if (word) word.destroy();

  let wx, wy, dist;
  do {
    wx = Phaser.Math.Between(50, 750);
    wy = Phaser.Math.Between(120, 420);
    dist = Phaser.Math.Distance.Between(x, y, wx, wy);
  } while (dist < 200);

  word = this.add.text(wx, wy, wordData.coded, {
    fontSize: "30px",
    color: "#000"
  });

  word.correct = wordData.correct;
  word.meaning = wordData.meaning;
}

// ===== UPDATE =====
function update() {
  const speed = 0.8;

  let dx = 0;
  let dy = 0;

  const keys = this.input.keyboard.createCursorKeys();

  if (keys.left.isDown) dx -= speed;
  if (keys.right.isDown) dx += speed;
  if (keys.up.isDown) dy -= speed;
  if (keys.down.isDown) dy += speed;

  x += dx;
  y += dy;

  // 🔄 ROTAÇÃO CORRIGIDA (OFFSET -90°)
  if (dx !== 0 || dy !== 0) {
    snail.rotation = Math.atan2(dy, dx) - Math.PI / 2;
  }

  snail.setPosition(x, y);

  const distance = Phaser.Math.Distance.Between(
    snail.x, snail.y, word.x, word.y
  );

  if (distance < 30) {
    infoText.setText(`✔ ${word.correct}\n\n${word.meaning}`);
    spawnWord.call(this);
  }
}
