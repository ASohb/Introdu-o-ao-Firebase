var sprite, position;
var database, spritePosition;

function setup() {
  // Inicializando o banco de dados do Firebase
  database = firebase.database();
  console.log("banco de dados = " + database);

  createCanvas(600, 400);

  // Criando o sprite
  sprite = createSprite(280, 190, 20, 20);
  sprite.shapeColor = "white";

  // Referência ao Firebase para a posição do sprite
  spritePosition = database.ref('sprite/position');

  // Lendo a posição inicial do banco de dados
  spritePosition.on("value", readPosition, showError);
}

function draw() {
  background(0);

  // Verifica se a posição já foi carregada
  if (position !== undefined) {
    // Movendo o sprite com as teclas
    if (keyDown("a")) {
      writePosition(-5, 0);
    }
    if (keyDown("d")) {
      writePosition(5, 0);
    }
    if (keyDown("w")) {
      writePosition(0, -5);
    }
    if (keyDown("s")) {
      writePosition(0, 5);
    }
  }

  drawSprites();
}

function writePosition(x, y) {
  // Verifica se 'position' já foi definida antes de tentar atualizá-la
  if (position) {
    // Atualizando a posição no Firebase
    spritePosition.set({
      'x': position.x + x,
      'y': position.y + y
    });
  }
}

function readPosition(data) {
  position = data.val();
  console.log(position.x);
  sprite.x = position.x;
  sprite.y = position.y;
}

function showError() {
  console.log("Erro ao acessar o banco de dados");
}
s