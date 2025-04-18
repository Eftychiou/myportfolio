export function setup(window) {
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
  var RADIUS = 110;
  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;

  // The number of particles that are used to generate the trail
  var QUANTITY = 3;

  var canvas;
  var context;
  var particles;

  var mouseX = window.innerWidth - SCREEN_WIDTH;
  var mouseY = window.innerHeight - SCREEN_HEIGHT;
  var mouseIsDown = false;

  init();

  function init() {
    // var d = document,
    //   canvas = document.getElementById('world'),
    //   context = canvas.getContext('2d'),
    //   time = 0,
    //   w = 1,
    //   h = 1,
    //   cos = Math.cos,
    //   sin = Math.sin,
    //   PI = Math.PI;
    // function resize() {
    //   canvas.width = w = innerWidth;
    //   canvas.height = h = innerHeight;
    // }
    // // Monitor browser resize
    // addEventListener('resize', resize, false);
    // // Initial size
    // resize();
    // // The main animation loop
    // setInterval(function () {
    //   context.clearRect(0, 0, w, h);
    //   context.fillStyle = 'rgba(52,180,255,.5)';
    //   context.globalCompositeOperation = 'lighter';
    //   time += 0.1;
    //   // The number of particles to generate
    //   var i = 10000;
    //   while (i--) {
    //     // The magic
    //     var r = (w + h) * 0.45 * (cos((time + i) * (0.05 + (sin(time * 0.00002) / PI) * 0.2)) / PI);
    //     context.fillRect(sin(i) * r + w / 2, cos(i) * r + h / 2, 1, 10);
    //   }
    // }, 16);
    //------
    canvas = document.getElementById('world');
    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
      // Register event listeners
      document.addEventListener('mousemove', documentMouseMoveHandler, false);
      document.addEventListener('mousedown', documentMouseDownHandler, false);
      document.addEventListener('mouseup', documentMouseUpHandler, false);
      canvas.addEventListener('touchstart', canvasTouchStartHandler, false);
      canvas.addEventListener('touchmove', canvasTouchMoveHandler, false);
      window.addEventListener('resize', windowResizeHandler, false);
      createParticles();
      windowResizeHandler();
      setInterval(loop, 1000 / 60);
    }
  }
  function createParticles() {
    particles = [];
    for (var i = 0; i < QUANTITY; i++) {
      var particle = {
        position: { x: mouseX, y: mouseY },
        shift: { x: mouseX, y: mouseY },
        size: 1,
        angle: 0,
        speed: 0.01 + Math.random() * 0.04,
        targetSize: 1,
        fillColor: '#' + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
        orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random()
      };
      particles.push(particle);
    }
  }
  function documentMouseMoveHandler(event) {
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
  }
  function documentMouseDownHandler(event) {
    mouseIsDown = true;
  }
  function documentMouseUpHandler(event) {
    mouseIsDown = false;
  }
  function canvasTouchStartHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
    }
  }
  function canvasTouchMoveHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
    }
  }
  function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.position = 'absolute';
    canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * 0.5 + 'px';
    canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * 0.5 + 'px';
  }
  function loop() {
    if (mouseIsDown) {
      // Scale upward to the max scale
      RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
    } else {
      // Scale downward to the min scale
      RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
    }
    RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);
    // Fade out the lines slowly by drawing a rectangle over the entire canvas
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    for (var i = 0, len = particles.length; i < len; i++) {
      var particle = particles[i];
      var lp = { x: particle.position.x, y: particle.position.y };
      // Offset the angle to keep the spin going
      particle.angle += particle.speed;
      // Follow mouse with some lag
      particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
      particle.shift.y += (mouseY - particle.shift.y) * particle.speed;
      // Apply position
      particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit * RADIUS_SCALE);
      particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit * RADIUS_SCALE);
      // Limit to screen bounds
      particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
      particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);
      particle.size += (particle.targetSize - particle.size) * 0.05;
      // If we're at the target size, set a new one. Think of it like a regular day at work.
      if (Math.round(particle.size) == Math.round(particle.targetSize)) {
        particle.targetSize = 1 + Math.random() * 7;
      }
      context.beginPath();
      context.fillStyle = particle.fillColor;
      context.strokeStyle = particle.fillColor;
      context.lineWidth = particle.size;
      context.moveTo(lp.x, lp.y);
      context.lineTo(particle.position.x, particle.position.y);
      context.stroke();
      context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
      context.fill();
    }
  }
}
