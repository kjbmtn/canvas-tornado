let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let n = 1000;
let circles = [];
let mouseX = 1;
let mouseY = 1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `hsla(214, 24%, 20%, 1)`;

centerX = canvas.width / 2;
centerY = canvas.height / 2;

let editor = {
    pos: () => {
        let y = randInt(0, canvas.height);
        let x = centerX //randInt(randInt(canvas.width/2 - y, canvas.width/2 + y);
        return {
            x: x,
            y: y,
        };
    },
    speed: () => randFloat(0.01, 0.05),
    radius: () => randInt(0, 3),
    opacity: () => randFloat(0, 0.90),
    hue: () => randInt(0, 1) ? randInt(70, 150) : randInt (30, 70),
    saturation: () => randInt(),
    counter: () => 0,
    timer: () => 0,
    theta: () => randInt(0, 360),
    amplitude: (y) => y*y / 10000000
}

class Circle {
    constructor() {
        this.pos = editor.pos()
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.radius = editor.radius();
        this.r = this.radius;
        this.speed = editor.speed() / (this.radius / 2);
        this.opacity = editor.opacity();
        this.o = this.opacity;
        this.hue = editor.hue();
        this.saturation = editor.saturation();
        this.theta = editor.theta();
        this.amplitude = editor.amplitude(this.y);
    }

    update() {
        // let delta 

        this.theta = (this.theta + this.speed) % (2 * Math.PI);
        this.radius = this.r + (Math.sin(this.theta) * this.r * 0.25);
        this.opacity = this.o + (Math.sin(this.theta) * this.o * 0.2);

        if (Math.abs(mouseX-centerX) > 0.00001) {
            this.speed = (1 / (Math.abs(mouseX - centerX))*30) ** 2;
        }

        let deltaX = Math.cos(this.theta) / this.amplitude;
        let deltaY = 0; // Math.sin(this.theta) / this.amplitude;

        ctx.beginPath();
        ctx.arc(
            this.x + deltaX,
            this.y + deltaY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.closePath();
        ctx.fillStyle = `hsla(${this.hue}, 30%, 50%, ${this.opacity})`;
        ctx.fill();
    }
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return Math.random() * (max - min) + min;
};

function animate() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) { 
        circles[i].update();
    }

    requestAnimationFrame(animate);
}

function drawCircles() {
    for (let i = 0; i < n; i++) {
        let c = new Circle();
        circles.push(c);
    }

    animate();
}

drawCircles();

window.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mosueY = e.pageY;
})