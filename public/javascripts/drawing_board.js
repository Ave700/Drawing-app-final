

///INITIAL CANVAS DECLARATION
var canvasWidth = 400;
var canvasHeight = 400;

var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

///MOUSE EVENTS TO HANDLE INTERACTION
    //activate painting
$('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
          
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
});
    //track moving
$('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
});
    //deactivate painting
$('#canvas').mouseup(function(e){
    paint = false;
});
    //deactivate if canvas is left
$('#canvas').mouseleave(function(e){
    paint = false;
});

///CLEARING CANVAS ACTION
function clearCanvas(){
    context.clearRect(0,0, canvasWidth, canvasHeight);
}
    //Clearing with button press
$('#clearCanvas').mousedown(function(e){
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickTool = new Array();
    clickColor = new Array();
    clickSize = new Array();
    clearCanvas();
})

///DATA COLLECTION AND MAIN RENDER FUNCTION
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
  
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curTool == "eraser"){
    clickColor.push("white");
  }else{
    clickColor.push(curColor);
  }
  clickSize.push(curSize);

}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
    // context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    // var radius;
    // for(var i=0; i<clickX.length;i++)
    // {
    //     if(clickSize)
    // }
    for(var i=0; i < clickX.length; i++)
    {		
        if(clickSize[i] == "tiny"){
			radius = 1;
		}else if(clickSize[i] == "small"){
			radius = 3;
		}else if(clickSize[i] == "normal"){
			radius = 5;
		}else if(clickSize[i] == "large"){
			radius = 10;
		}else if(clickSize[i] == "huge"){
			radius = 20;
		}
        context.beginPath();
        if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
        context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = radius;
        context.stroke();
    }
}
///ERASER OR PEN FUNCTION
var clickTool = new Array();
var curTool = 'pen';

$('#choosePen').mousedown(function(e){
    curTool= 'pen';
})
$('#chooseEraser').mousedown(function(e){
    curTool= 'eraser';
})

///SIZE CHANGE FUNCTIONS
var clickSize = new Array();
var curSize = "normal";
var radius;

///---------MOUSE EVENTS
$('#chooseTiny').mousedown(function(e){
    curSize= 'tiny';
})
$('#chooseSmall').mousedown(function(e){
    curSize= 'small';
})
$('#chooseNormal').mousedown(function(e){
    curSize= 'normal';
})
$('#chooseLarge').mousedown(function(e){
    curSize= 'large';
})
$('#chooseWow').mousedown(function(e){
    curSize= 'huge';
})
///COLOR SELECTION FUNCTIONS
var colorPurple = "#a23fff";
var colorRed = "#ff3f3f";
var colorYellow ="#fff53f";
var colorGreen = "#3fff6b";
var colorBlue = "#3f42ff";

//more colors can be added above ^
var curColor = colorRed;
var clickColor = new Array();
///---------MOUSE EVENTS
$('#choosePurple').mousedown(function(e){
    curColor= colorPurple;
})
$('#chooseRed').mousedown(function(e){
    curColor= colorRed;
})
$('#chooseYellow').mousedown(function(e){
    curColor= colorYellow;
})
$('#chooseGreen').mousedown(function(e){
    curColor= colorGreen;
})
$('#chooseBlue').mousedown(function(e){
    curColor= colorBlue;
})
