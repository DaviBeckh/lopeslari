const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: "#dfe6e9",
  scene: {
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

// ===== DADOS DA PALAVRA =====
const wordData = {
  coded: "mufo",
  correct: "fumo",
  meaning: "Conjulgado: tomar fumo, significado: se lascou"
};

function create() {
  // Lesma (bola verde)
  snail = this.add.circle(x, y, 20, 0x6ab04c);

  // Texto de informação
  infoText = this.add.text(400, 60, "", {
    fontSize: "20px",
    color: "#2c3e50",
    align: "center",
    wordWrap: { width: 720 }
  }).setOrigin(0.5);

  spawnWord.call(this);
}

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

function update() {
  const speed = 0.8;

  if (this.input.keyboard.addKey("LEFT").isDown) x -= speed;
  if (this.input.keyboard.addKey("RIGHT").isDown) x += speed;
  if (this.input.keyboard.addKey("UP").isDown) y -= speed;
  if (this.input.keyboard.addKey("DOWN").isDown) y += speed;

  snail.setPosition(x, y);

  const distance = Phaser.Math.Distance.Between(
    snail.x, snail.y, word.x, word.y
  );

  if (distance < 30) {
    infoText.setText(
      `✔ ${word.correct}\n\n${word.meaning}`
    );
    spawnWord.call(this);
  }
}
