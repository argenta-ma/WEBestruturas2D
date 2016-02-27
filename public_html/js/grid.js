/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvasGrid = document.getElementById('grid');
var contextGrid = canvasGrid.getContext('2d');
//var msg_ola = msg_hello;

var incX = 20; 
var incY = 20;

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvasGrid, false);

canvasGrid.style.visibility = 'hidden';

function resizeCanvasGrid() {
    canvasGrid.width = window.innerWidth;
    canvasGrid.height = window.innerHeight;
    
    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
    
    
    grid();
    
}
resizeCanvasGrid();

function gridOn(){
    canvasGrid.style.visibility = 'visible';
    document.getElementById("incX").disabled = false;
    document.getElementById("incY").disabled = false;
}
function gridOff(){
    canvasGrid.style.visibility = 'hidden';
    document.getElementById("incX").disabled = true;
    document.getElementById("incY").disabled = true;
}

//limitando somente a números
function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode !== 46 && charCode > 31 
     && (charCode < 48 || charCode > 57))
      return false;

   return true;
}

function atualiza_incX(){
    incX = Number(document.getElementById('incX').value);
    if (incX !== 0 && document.getElementById('gridOn').checked){
        contextGrid.clearRect(0,0, canvasGrid.width, canvasGrid.height);
        grid();             
    } else {
        incX = 20;
    }
}
function atualiza_incY(){
    incY = Number(document.getElementById('incY').value);
    if (incY !== 0  && document.getElementById('gridOn').checked){
        contextGrid.clearRect(0,0, canvasGrid.width, canvasGrid.height);
        grid();             
    } else {
        incY = 20;
    }
}

// Create a blue grid as a background
//
function grid() {
        // Set the canvas' internal image size to match the actual
        // size it takes on the web page, and clear canvas.
        var height = canvasGrid.height;
        var width = canvasGrid.width;      


        //variáveis para cores
        var lineColorOrigin = '#000000';
        var lineColorUnlabeled = '#DDE5FF';
        var lineColorLabeled = '#8888ED';

        // Opções de desenho
        contextGrid.lineWidth = 1;
        contextGrid.textBaseline = 'bottom';
        
        //linhas em x
        contextGrid.strokeStyle = lineColorLabeled;
        for (var xPos = 0; xPos <= width; xPos += incX){
            // Draw the actual line
            contextGrid.beginPath();
            contextGrid.moveTo(xPos, 0);
            contextGrid.lineTo(xPos, height);
            contextGrid.stroke();
            contextGrid.closePath();
        }
        
        //linhas em y
        contextGrid.strokeStyle = lineColorUnlabeled;
        for (var yPos = 0; yPos <= width; yPos += incY){
            // Draw the actual line
            contextGrid.beginPath();
            contextGrid.moveTo(0, yPos);
            contextGrid.lineTo(width, yPos);
            contextGrid.stroke();
            contextGrid.closePath();
        }
}