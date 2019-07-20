var Color = require('color');
var color = Color({r: 255, g: 0, b:0});



window.onload = function init() {    
   canvas = document.getElementById( "canvas" );
   context = canvas.getContext("2d");
   context.strokeStyle = color.hex();
//   console.log(ipcRenderer.send('start-server', 'ping')); // prints "pong"
//   console.log(ipcRenderer.send('start-server', 'ping')); // prints "pong"

//    setUpDrawingCallbacks(canvas);
};

function setUpDrawingCallbacks(canvas) {
    tool = new tool_pencil();
    canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup',	 ev_canvas, false);
}


function tool_pencil () {
	var tool = this;
	this.started = false;

	// This is called when you start holding down the mouse button
	// This starts the pencil drawing
	this.mousedown = function (ev) {
			context.beginPath();
			context.moveTo(ev._x, ev._y);
            tool.started = true;
            j = {evt: 'down', x: ev._x, y: ev._y, color: color.hex()};
            sendMessage(JSON.stringify(j));
	};

	// This function is called every time you move the mouse. Obviously, it only
	// draws if the tool.started state is set to true (when you are holding down
	// the mouse button)
	this.mousemove = function (ev) {
		if (tool.started) {
            context.lineTo(ev._x, ev._y);
			context.stroke();
            j = {evt: 'move', x: ev._x, y: ev._y, color: color.hex()};
            sendMessage(JSON.stringify(j));
		}
	};

	// This is called when you release the mouse button
	this.mouseup = function (ev) {
		if (tool.started) {
			tool.mousemove(ev);
			tool.started = false;
		}
	};
}


function ev_canvas(ev) {
    var rect = canvas.getBoundingClientRect();
    ev._x = ev.clientX - rect.left;
    ev._y = ev.clientY - rect.top;
    
    var func = tool[ev.type];
    if(func) {
        func(ev);
    }
}



function setRedColor() {
    color = Color({r: 255, g: 0, b:0});
    context.strokeStyle = color.hex();
}

function setBlackColor() {
    color = Color({r: 0, g: 0, b:0});
    context.strokeStyle = color.hex();
}

function setGreenColor() {
    color = Color({r: 0, g: 255, b:0});
    context.strokeStyle = color.hex();
}

function setBlueColor() {
    color = Color({r: 0, g: 0, b:255});
    context.strokeStyle = color.hex();
}





