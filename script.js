// Set up the canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let gravityconstantInput = document.getElementById('gravityconstantInput');
let G = parseFloat(gravityconstantInput.value);
let planetMassInput = document.getElementById('planetMassInput');
let planetMass = parseFloat(planetMassInput.value);
let asteroidMassInput = document.getElementById('asteroidMassInput');
let asteroidMass = parseFloat(asteroidMassInput.value);
let asteroidxInput = document.getElementById('asteroidxInput');
let asteroidx = parseFloat(asteroidxInput.value);
let asteroidyInput = document.getElementById('asteroidyInput');
let asteroidy = parseFloat(asteroidyInput.value);
let asteroidvxInput = document.getElementById('asteroidvxInput');
let asteroidvx = parseFloat(asteroidvxInput.value);
let asteroidvyInput = document.getElementById('asteroidvyInput');
let asteroidvy = parseFloat(asteroidvyInput.value);

const asteroidRadius = 5; // Radius of asteroid in pixels

// Define the planet and asteroid as objects with position, velocity, and mass properties
let planet = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  mass: planetMass,
};

let asteroid = {
  x: asteroidx,
  y: asteroidy,
  vx: asteroidvx,
  vy: asteroidvy,
  mass: asteroidMass,
};
let asteroidPath = [];
asteroidPath.push({ x: asteroid.x, y: asteroid.y });

// Set up the restart button
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
  gravityconstantInput = document.getElementById('gravityconstantInput');
 G = parseFloat(gravityconstantInput.value);
 planetMassInput = document.getElementById('planetMassInput');
 planetMass = parseFloat(planetMassInput.value);
 asteroidMassInput = document.getElementById('asteroidMassInput');
 asteroidMass = parseFloat(asteroidMassInput.value);
 asteroidx = parseFloat(asteroidxInput.value);
 asteroidyInput = document.getElementById('asteroidyInput');
 asteroidy = parseFloat(asteroidyInput.value);
 asteroidvxInput = document.getElementById('asteroidvxInput');
 asteroidvxInput = document.getElementById('asteroidvxInput');
 asteroidvx = parseFloat(asteroidvxInput.value);
 asteroidvyInput = document.getElementById('asteroidvyInput');
 asteroidvy = parseFloat(asteroidvyInput.value);
  planet = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0,
    vy: 0,
    mass: planetMass,
  };
  asteroid = {
    x: asteroidx,
    y: asteroidy,
    vx: asteroidvx,
    vy: asteroidvy,
    mass: asteroidMass,
  };
  asteroidPath = [{ x: asteroid.x, y: asteroid.y }];
});

// Set up the game loop
const timeStep = 10; // Time step in milliseconds
setInterval(update, timeStep);

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the planet as a circle
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#0000FF';
  ctx.fill();

  // Draw the asteroid as a circle
  ctx.beginPath();
  ctx.arc(asteroid.x, asteroid.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(asteroidPath[0].x, asteroidPath[0].y);
  for (let i = 1; i < asteroidPath.length; i++) {
    ctx.lineTo(asteroidPath[i].x, asteroidPath[i].y);
  }
  ctx.strokeStyle = '#FF0000';
  ctx.stroke();
  

  // Calculate the distance between the asteroid and planet
  const dx = asteroid.x - planet.x;
  const dy = asteroid.y - planet.y;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // Calculate the gravitational force between the asteroid and planet
  const force = G * planet.mass * asteroid.mass / (distance * distance);

  // Calculate the acceleration of the asteroid
  const ax = -force * dx / distance / asteroid.mass;
  const ay = -force * dy / distance / asteroid.mass;

  // Update the velocity and position of the asteroid
  asteroid.vx += ax * timeStep / 1000;
  asteroid.vy += ay * timeStep / 1000;
  asteroid.x += asteroid.vx * timeStep / 1000;
  asteroid.y += asteroid.vy * timeStep / 1000;
  asteroidPath.push({ x: asteroid.x, y: asteroid.y });

  // Draw the updated asteroid position
  ctx.beginPath();
  ctx.arc(asteroid.x, asteroid.y, asteroidRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
}
