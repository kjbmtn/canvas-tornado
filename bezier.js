var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ch = window.innerHeight;
cw = window.innerWidth;

canvas.width = cw;
canvas.height = ch;
canvas.style.backgroundColor = `hsla(36, 16%, 43%, 1)`;

theta = 0;
cp1y = 0;
cp2y = 0;
deltaTheta = 0.01;

function animate() {
    theta = (theta + deltaTheta) % (2*Math.PI);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Oscillate between certain range
    cp1y = (Math.sin(theta)*ch + ch)/2;
    cp2y = (Math.sin(theta+Math.PI)*ch + ch)/2;

    cp3y = (Math.sin(theta)*ch*2 + ch)/2;
    cp4y = (Math.sin(theta+Math.PI)*ch*2 + ch)/2;

    cp5y = (Math.sin(theta)*ch*1.5 + ch)/2;
    cp6y = (Math.sin(theta+Math.PI)*ch*1.5 + ch)/2;

    ctx.beginPath();
    ctx.moveTo(0, ch/2);
    ctx.quadraticCurveTo(cw/4, cp1y, cw/2, ch/2);
    ctx.quadraticCurveTo(3*cw/4, cp2y, cw, ch/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, ch/2);
    ctx.quadraticCurveTo(cw/4, cp3y, cw/2, ch/2);
    ctx.quadraticCurveTo(3*cw/4, cp4y, cw, ch/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, ch/2);
    ctx.quadraticCurveTo(cw/4, cp5y, cw/2, ch/2);
    ctx.quadraticCurveTo(3*cw/4, cp6y, cw, ch/2);
    ctx.stroke();

    requestAnimationFrame(animate);
}

animate();