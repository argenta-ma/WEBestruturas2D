/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = document.getElementById('AreaDesenho');
var context = canvas.getContext('2d');
//var msg_ola = msg_hello;

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
    drawStuff(); 
    
    
}
resizeCanvas();

function drawStuff() {

    // do your drawing stuff here
    // do cool things with the context
    context.font = '40pt Calibri';
    context.fillStyle = 'blue';
    //context.fillText('Olá Mundo!', 150, 100);
    context.fillText(msg_hello +' '+ msg_world, 150, 100);

    
}

