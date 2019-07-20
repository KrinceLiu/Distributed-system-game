//const $ = require("jquery");

// initialication


// window.onload = function init() {
//     var canvas = document.getElementById("canvas");
//     var painter = new Painter(canvas, defaultPercentage);
//     setUpCallbacks(canvas, painter);
//     painter.initialize();
// };



class Player {
    constructor(color_of_player, player_id){
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.currentCubeX = null;
        this.currentCubeY = null;
        this.paint = false;
        this.color = color_of_player ;
        this.id = player_id
    }
    hello() {
        console.log("john");
    }
};



// draw grids
class Painter {
    constructor(canvas, percentage) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.percentage =s percentage;
        this.occupied_matrix = [];

        this.initializeBoard();
    }

    initializeBoard() {
        this.draw_grid();
        this.setUpOccupiedMatrix();s
    }

    setUpOccupiedMatrix() {
        for(var i=0; i<8; i++) {
            this.occupied_matrix[i] = [];
            for(var j=0; j<8; j++) {
                this.occupied_matrix[i][j] = null;
            }
        }
    }

    draw_grid()
    {
        this.context.strokeStyle = "black";
        this.context.lineJoin = "miter";
        this.context.lineWidth = 1;
        for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            this.context.moveTo(0,50*j);
            this.context.lineTo(400,50*j);
            this.context.stroke();

            this.context.moveTo(50*i,0);
            this.context.lineTo(50*i,400);
            this.context.stroke();
        }
        }
    }

    addClick(x, y, dragging,player)
    {

        player.clickX.push(x);
        player.clickY.push(y);
        player.clickDrag.push(dragging);
    }

    draw(player){
        var length = player.clickX.length;
        currentCube = this.getCube(player.clickX[length-1],player.clickY[length-1]);

        this.context.strokeStyle = player.color;
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;

        this.context.beginPath();
        this.context.moveTo(player.clickX[length-2],player.clickY[length-2]);
        this.context.lineTo(player.clickX[length-1],player.clickY[length-1]);
        this.context.stroke();
    }

    //check if draw inside a cube
    getCube(x,y){
        return [Math.floor(x/50),Math.floor(y/50)];
    }

    resetCube(x,y){
        this.context.clearRect(x*50,y*50,50,50);

        this.context.strokeStyle = "black";
        this.context.lineJoin = "miter";
        this.context.lineWidth = 1;

        this.context.beginPath();
        this.context.moveTo(x*50,y*50);
        this.context.lineTo((x+1)*50,y*50);
        this.context.lineTo((x+1)*50,(y+1)*50);
        this.context.lineTo(x*50,(y+1)*50);
        this.context.lineTo(x*50,y*50);
        this.context.closePath();
        this.context.stroke();

    }

    paintCube(x,y,player){
        this.context.fillStyle = player.color;
        this.context.fillRect(x*50,y*50,50,50);
    }

    resetInfo(player){
        player.paint = false;
        player.clickX.length = 0;
        player.clickY.length = 0;
        player.clickDrag.length = 0;
        player.currentCubeX = 0;
        player.currentCubeY = 0;
    }

    getArea(x,y){
        var occupied = 0;
        var sum = 0;
        var image = this.context.getImageData(x*50, y*50, 50, 50);

        for (let i = 0; i < image.data.length; i += 4) {
            sum = image.data[i] + image.data[i+1] + image.data[i+2];
            if(sum != 0 && sum != 255*3){
                occupied = occupied +1;
            }
        }
        return occupied;
    }

    reset_analysis(player) {
        var occupied_area = this.getArea(player.currentCubeX,player.currentCubeY);
        console.log(occupied_area);
        if(occupied_area/2500 > this.percentage){
            this.paintCube(player.currentCubeX,player.currentCubeY,player);
        }
        else{
            console.log(player.currentCubeX, player.currentCubeY);
            this.occupied_matrix[player.currentCubeX][player.currentCubeY] = null;
            this.resetCube(player.currentCubeX,player.currentCubeY);

        }
        this.resetInfo(player);
    }
}

function setUpCallBacks(painter, player) {
    parinter.canvas.addEventListener('mousedown', function(e){

        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        var currentCube = painter.getCube(mouseX,mouseY);

        if(painter.occupied_matrix[currentCube[0]][currentCube[1]] == null){
            player.paint = true;
            player.currentCubeX = currentCube[0];
            player.currentCubeY = currentCube[1];
            painter.occupied_matrix[player.currentCubeX][player.currentCubeY] = player.id;
            painter.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        }
    });

    painter.canvas.addEventListener('mousemove', function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        currentCube = painter.getCube(mouseX,mouseY);

        if(player.paint){
            if( [player.currentCubeX,player.currentCubeY].equals(currentCube)){
                //ipc.send("user-data", [e.pageX - this.offsetLeft, e.pageY - this.offsetTop]);
                painter.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, player);
                painter.draw(player);
            }
            else{

                painter.reset_analysis(player);
            }
        }
    });

    painter.canvas.addEventListener('mouseup',function(e){
        if(player.paint == true){
            painter.reset_analysis(player);
        }
    });

    painter.canvas.addEventListener('mouseleave',function(e){
        if(player.paint = true) {
            painter.reset_analysis(player);
        }
    });
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

module.exports = {
    Player:Player,
    Painter:Painter,
    setUpCallBacks: setUpCallBacks
};
