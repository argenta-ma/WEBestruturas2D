/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = new fabric.Canvas('c', { selection: false });
var grid = 50;
var editar = false;

// botoes
function editOn(){
    editar = true;
}
function editOff(){
    editar = false;
}

// create grid

for (var i = 0; i < (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false }));
}

// add objects

canvas.add(new fabric.Rect({ 
  left: 100, 
  top: 100, 
  width: 50, 
  height: 50, 
  fill: '#faa', 
  originX: 'center', 
  originY: 'center',
  hasControls: false
}));

canvas.add(new fabric.Line([50, 100, 200, 200], {
    left: 170,
    top: 150,
    stroke: 'red',
    hasControls: false,
    hasBorders: false,
    selectable: false
}));

// snap to grid

canvas.on('object:moving', function(options) { 
    options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
    });
});

var isDown;

canvas.on('mouse:down', function(options) {
    isDown = true;
    if (!editar) {
        if (options.target) {
            options.target.hasBorders = false;
            options.target.selectable = false;
        }
        if (!options.target) {
            var points = [ Math.round(options.e.layerX / grid) * grid,
                            Math.round(options.e.layerY / grid) * grid, 
                            Math.round(options.e.layerX / grid) * grid,
                            Math.round(options.e.layerY / grid) * grid ];
            line = new fabric.Line(points, {
                strokeWidth: 2,
                stroke: 'blue',
                originX: 'center',
                originY: 'center',
                hasControls: false,
                hasBorders: false,
                selectable: false
            });
            canvas.add(line);
            var circulo = new fabric.Circle({
                left: Math.round(options.e.layerX / grid) * grid,
                top: Math.round(options.e.layerY / grid) * grid,
                radius: 10, 
                fill: '#9f9', 
                originX: 'center', 
                originY: 'center',
                hasControls: false,
                hasBorders: false,
                selectable: false
              });   
            canvas.add(circulo);
            console.log('an object was not clicked! ');//, options.target.type);
        } else {
            var points = [ Math.round(options.e.layerX / grid) * grid,
                            Math.round(options.e.layerY / grid) * grid, 
                            Math.round(options.e.layerX / grid) * grid,
                            Math.round(options.e.layerY / grid) * grid ];
            line = new fabric.Line(points, {
                strokeWidth: 2,
                stroke: 'blue',
                originX: 'center',
                originY: 'center',
                hasControls: false,
                hasBorders: false,
                selectable: false
            });
            canvas.add(line);
            canvas.sendToBack(line);
        }
    } else {
        if (options.target) {
            options.target.hasBorders = true;
            options.target.selectable = true;
        }
    }
});


canvas.on('mouse:move', function(options){
    if (!isDown) return;
    if (!editar) {
        line.set({ x2: Math.round(options.e.layerX / grid) * grid,
                   y2: Math.round(options.e.layerY / grid) * grid });
        canvas.renderAll();
    }
});

canvas.on('mouse:up', function(options){
    isDown = false;
    if (!editar) {
        if (!options.target) {
            var circulo = new fabric.Circle({
                left: Math.round(options.e.layerX / grid) * grid,
                top: Math.round(options.e.layerY / grid) * grid,
                radius: 10, 
                fill: '#9f9', 
                originX: 'center', 
                originY: 'center',
                hasControls: false,
                hasBorders: false,
                selectable: false        
            });
            canvas.add(circulo);
        }
    }
});
