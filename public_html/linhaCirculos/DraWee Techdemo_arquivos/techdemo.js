var canvasMode = 'drawLine';
var canvas = 0;
var started = false;
var lastX = 0;
var lastY = 0;

//window.addEventListener('load', function() { }, false)
$(document).on( 'ready', function() { documentReady(); } );

function MouseDown(e) {
    if (window.event && !e) e = window.event;

    if (canvasMode == 'drawRect') return DrawRectMouseDown(e);
    else if (canvasMode == 'drawLine') return DrawLineMouseDown(e);
}

function MouseMove(e) {
    if (window.event && !e) e = window.event;

    if (canvasMode == 'drawRect') DrawRectMouseMove(e);
    else if (canvasMode == 'drawLine') DrawLineMouseMove(e);
}

function MouseUp(e) {
    if (window.event && !e) e = window.event;

    if (canvasMode == 'drawRect') DrawRectMouseUp(e);
    else if (canvasMode == 'drawLine') DrawLineMouseUp(e);

    //    selected_Object = undefined;
}

//  Draw Rect events

function DrawRectMouseDown(e) {

    var mouse = canvas.getPointer(e.e);
    started = true;
    lastX = mouse.x;
    lastY = mouse.y;

    var square = new fabric.Rect({
        width: 0,
        height: 0,
        left: lastX,
        top: lastY,
        fill: 'red'
    });

    canvas.add(square);
    canvas.renderAll();
    canvas.setActiveObject(square);
}

function DrawRectMouseMove(e) {
    if (!started) {
        return false;
    }
    var mouse = canvas.getPointer(e.e);

    var w = Math.abs(mouse.x - lastX),
        h = Math.abs(mouse.y - lastY);

    if (!w || !h) {
        return false;
    }

    var square = canvas.getActiveObject();

    square.set('width', w).set('height', h);

    square.set('left', (lastX + mouse.x) / 2);
    square.set('top', (lastY + mouse.y) / 2);

    canvas.renderAll();
}

function DrawRectMouseUp(e) {
    if (started) {
        started = false;
    }
    var square = canvas.getActiveObject();
    canvas.discardActiveObject();
    square.setCoords();
    canvas.renderAll();

    //    selected_Object = undefined;
}



//  Draw Line events

function DrawLineMouseDown(e) {
    var mouse = canvas.getPointer(e.e);
    started = true;
    lastX = mouse.x;
    lastY = mouse.y;

    var line = new fabric.Line([lastX, lastY, lastX, lastY], {
        stroke: 'red',
        strokeWidth: 3,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        hasBorders: false,
        hasControls: false,
        perPixelTargetFind: true,
        fill: 'red'
    });
    line.lockScalingX = line.lockScalingY = true;

    var circle1 = new fabric.Circle({
        left: lastX,
        top: lastY,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        hasBorders: false,
        hasControls: false,
        radius: 3,
        strokeWidth: 3,
        stroke: 'red',
        fill: 'red'
    });
    var circle2 = new fabric.Circle({
        left: lastX,
        top: lastY,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        hasBorders: false,
        hasControls: false,
        radius: 3,
        strokeWidth: 3,
        stroke: 'red',
        fill: 'red'
    });

    circle1.line = circle2.line = line;
    line.circle1 = circle1;
    line.circle2 = circle2;

    canvas.add(line);

    canvas.add(circle1);
    canvas.add(circle2);

    circle1.bringToFront();
    circle2.bringToFront();

    canvas.setActiveObject(line);
    canvas.renderAll();
}

function DrawLineMouseMove(e) {
    if (!started) {
        return false;
    }
    var mouse = canvas.getPointer(e.e);

    var line = canvas.getActiveObject();
    line.set('x2', mouse.x).set('y2', mouse.y);
    line.setCoords();

    var cir1 = line.get('circle1');
    var cir2 = line.get('circle2');
    cir1.set('left', mouse.x).set('top', mouse.y);
    cir1.setCoords();

    canvas.renderAll();
}

function DrawLineMouseUp(e) {
    if (started) {
        started = false;
    }
    var line = canvas.getActiveObject();
    canvas.discardActiveObject();
    line.setCoords();
    canvas.renderAll();

    selected_Object = undefined;
}


function ObjectMoving(e) {
    var p = e.target;

    // move line
    if (p.circle1) {
        var oldCenterX = (p.x1 + p.x2) / 2;
        var oldCenterY = (p.y1 + p.y2) / 2;

        var deltaX = p.left - oldCenterX;
        var deltaY = p.top - oldCenterY;

        p.circle1 && p.circle1.set({
            'left': p.x1 + deltaX,
                'top': p.y1 + deltaY
        }).setCoords();
        p.circle2 && p.circle2.set({
            'left': p.x2 + deltaX,
                'top': p.y2 + deltaY
        }).setCoords();

        p.set({
            'x1': p.x1 + deltaX,
                'y1': p.y1 + deltaY
        });
        p.set({
            'x2': p.x2 + deltaX,
                'y2': p.y2 + deltaY
        });

        p.set({
            'left': (p.x1 + p.x2) / 2,
                'top': (p.y1 + p.y2) / 2
        });
    }

    // move circle
    if (p.line) {
        var cir1 = p.line.circle1;
        var cir2 = p.line.circle2;

        p.line.set({
            'x1': cir1.left,
                'y1': cir1.top
        });
        p.line.set({
            'x2': cir2.left,
                'y2': cir2.top
        });
        p.line.setCoords();
    }
    canvas.renderAll();
}

function setEditMode() {
    canvasMode = 'edit';
    canvas.isDrawingMode = false;
    canvas.selection = true;

    canvas.deactivateAll();

    var objs = canvas.getObjects();
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        obj.set('selectable', true);
    }
}

function setDrawLineMode() {
    canvasMode = 'drawLine';
    canvas.isDrawingMode = false;
    canvas.selection = false;

    canvas.deactivateAll();

    var objs = canvas.getObjects();
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        obj.set('selectable', false);
    }
}

function setDrawRectMode() {
    canvasMode = 'drawRect';
    canvas.isDrawingMode = false;
    canvas.selection = false;

    canvas.deactivateAll();

    var objs = canvas.getObjects();
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        obj.set('selectable', false);
    }
}





function documentReady() {
    canvas = new fabric.Canvas('mainCanvas', {
//        selection: false
    });

    canvas.isDrawingMode = false;
    fabric.isTouchSupported = false;

    canvas.on('mouse:down', function (e) {
        MouseDown(e);
    });
    canvas.on('mouse:move', function (e) {
        MouseMove(e);
    });
    canvas.on('mouse:up', function (e) {
        MouseUp(e);
    });

//    canvas.on('object:selected', function (obj) {
  //      objectSelected(obj.target);
    //});
    //canvas.on('selection:cleared', function (e) {
      //  objectSelected(undefined);
    //});

    canvas.on('object:moving', function (e) {
        ObjectMoving(e);
    });
}

/*function objectSelected( obj )
{
//    selected_Object = obj;
    if( obj == undefined )
        return 0;
    if( started ) 
        return 0;
}*/
