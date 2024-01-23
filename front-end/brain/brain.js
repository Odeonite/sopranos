// // brain.js original code
// function init() {
//   // Original code
//   const canvas = document.getElementById('brain-canvas');
//   // Rest of logic
// }


// // Set up canvas and context
// const canvas = document.getElementById('brain-canvas');
// const ctx = canvas.getContext('2d');

// // Brain drawing parameters
// const brainWidth = 200;
// const brainHeight = 250;

// // Draw brain shape
// ctx.beginPath();
// ctx.ellipse(brainWidth/2, brainHeight/2, brainWidth, brainHeight, 0, 0, 2 * Math.PI);
// ctx.fillStyle = 'lightgray';
// ctx.fill();

// // Add click handler 
// canvas.addEventListener('click', function(event) {
//   // Get click position
//   const x = event.clientX - canvas.offsetLeft;
//   const y = event.clientY - canvas.offsetTop;
  
//   // Check if click was on left or right hemisphere
//   if(x < brainWidth/2) {
//     // Transition left hemisphere
//     ctx.fillStyle = 'orangered';
//     ctx.fillRect(0, 0, brainWidth/2, brainHeight);
//   } else {
//     // Transition right hemisphere 
//     ctx.fillStyle = 'steelblue';
//     ctx.fillRect(brainWidth/2, 0, brainWidth/2, brainHeight);
//   }
// });

// // Add hover handler
// canvas.addEventListener('mousemove', function(event) {
//   // Get hover position
//   const x = event.clientX - canvas.offsetLeft;
//   const y = event.clientY - canvas.offsetTop;

//   // Rotate based on hover position
//   const rotation = x / brainWidth * Math.PI; 
//   ctx.translate(brainWidth/2, brainHeight/2);
//   ctx.rotate(rotation);
//   ctx.translate(-brainWidth/2, -brainHeight/2);
  
//   // Redraw brain
//   ctx.beginPath();
//   ctx.ellipse(brainWidth/2, brainHeight/2, brainWidth, brainHeight, 0, 0, 2 * Math.PI);
//   ctx.fillStyle = 'lightgray';
//   ctx.fill();
// });

// init(); // Run init function on load


// 

const canvas = document.getElementById('brain-canvas');
const ctx = canvas.getContext('2d');

const brainWidth = 200;
const brainHeight = 250;
const perspective = 0.8; // Adjust for stronger/weaker perspective

function draw3DBrain(xOffset, yOffset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw top side
  ctx.beginPath();
  ctx.moveTo(xOffset, yOffset);
  ctx.lineTo(xOffset + brainWidth, yOffset);
  ctx.lineTo(xOffset + brainWidth * (1 + perspective), yOffset - brainHeight * perspective);
  ctx.lineTo(xOffset + brainWidth * (1 - perspective), yOffset - brainHeight * perspective);
  ctx.closePath();
  ctx.fillStyle = 'lightgray';
  ctx.fill();

  // Draw bottom side
  ctx.beginPath();
  ctx.moveTo(xOffset, yOffset);
  ctx.lineTo(xOffset + brainWidth, yOffset);
  ctx.lineTo(xOffset + brainWidth * (1 + perspective), yOffset + brainHeight * (1 - perspective));
  ctx.lineTo(xOffset + brainWidth * (1 - perspective), yOffset + brainHeight * (1 - perspective));
  ctx.closePath();
  ctx.fillStyle = 'gray';
  ctx.fill();

  // Draw connecting lines
  ctx.beginPath();
  ctx.moveTo(xOffset, yOffset);
  ctx.lineTo(xOffset, yOffset + brainHeight);
  ctx.moveTo(xOffset + brainWidth, yOffset);
  ctx.lineTo(xOffset + brainWidth, yOffset + brainHeight);
  ctx.moveTo(xOffset + brainWidth * (1 + perspective), yOffset - brainHeight * perspective);
  ctx.lineTo(xOffset + brainWidth * (1 + perspective), yOffset + brainHeight * (1 - perspective));
  ctx.moveTo(xOffset + brainWidth * (1 - perspective), yOffset - brainHeight * perspective);
  ctx.lineTo(xOffset + brainWidth * (1 - perspective), yOffset + brainHeight * (1 - perspective));
  ctx.strokeStyle = 'darkgray';
  ctx.stroke();
}

function rotateBrain(event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  const rotationX = (y - canvas.height / 2) / canvas.height;
  const rotationY = (x - canvas.width / 2) / canvas.width;

  const angleX = rotationX * Math.PI;
  const angleY = rotationY * Math.PI;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angleX);
  ctx.rotate(angleY);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  draw3DBrain(canvas.width * 0.25, canvas.height * 0.25);
}

canvas.addEventListener('click', rotateBrain);
canvas.addEventListener('mousemove', rotateBrain);

// Initial drawing
draw3DBrain(canvas.width * 0.25, canvas.height * 0.25);
