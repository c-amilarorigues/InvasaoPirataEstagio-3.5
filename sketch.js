const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var balls = [];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 290, 250, 580);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);

  boat = new Boat(width, height - 100, 200, 200, -100);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  Matter.Body.setVelocity(boat.body, {
    x: -0.9,
    y: 0
  });
  boat.display()



  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();
}


//criando a bola de canhão ao pressionar a tecla
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

// função para exibir a bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}





//liberando a bala de canhão ao soltar a tecla
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
