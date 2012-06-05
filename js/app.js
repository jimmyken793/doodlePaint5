var App = function() {
    var canvasContext;
    var toolOverlayCanvas;

    var mouseDown = false;


    var canvasImageData;

    var eraserTool = new EraserTool();
    var fillTool = new FillTool();
    var brushTool = new BrushTool();
    var circleTool = new CircleTool();
    var dropperTool = new DropperTool();
    var lineTool = new LineTool();
    var pencilTool = new PencilTool();
    var rectangleTool = new RectangleTool();
    var sprayTool = new SprayTool();
    var typingTool = new TypingTool();
    var zoomTool = new ZoomTool();

    /*
    var minimize = document.getElementById('minimize');
    minimize.addEventListener('click', pokki.closePopup);
    */


    var undoArray=[];

    var currentTool;
    var currentColor = "#000000";

    function chooseTool(toolId){
        $('saveDialog').fade('out');
        switch(toolId){
            case "eraser":
                currentTool = eraserTool;
            break;
            case "fill":
                currentTool = fillTool;
            break;
            case "pencil":
                currentTool = pencilTool;
            break;
            case "brush":
                currentTool = brushTool;
            break;
            case "circle":
                currentTool = circleTool;
            break;
            case "dropper":
                currentTool = dropperTool;
            break;
            case "line":
                currentTool = lineTool;
            break;
            case "rectangle":
                currentTool = rectangleTool;
            break;
            case "spray":
                currentTool = sprayTool;
            break;
            case "typing":
                currentTool = typingTool;
            break;
            case "zoom":
                currentTool = zoomTool;
            break;


            case "newFile":
//                currentTool = null;
                canvasContext.fillStyle="#FFFFFF";
                canvasContext.fillRect(0,0,512,400);
                $$('.toolButtons').removeClass('selected');
            break;

            case "loadFile":
                $('loadDialog').fade('in');
            break;

            case "saveFile":
                currentTool = null;

                $('saveDialog').fade('in');
                var urli = $('paintCanvas');
                var urliData = urli.toDataURL("image/jpeg", 0.9);

                $('saveTextArea').innerText = urliData;
                $('saveTextArea').select();

                $$('.toolButtons').removeClass('selected');
            break;

            case "undo":
//                currentTool = null;
                var imgData = undoArray.shift();
                console.log(imgData, undoArray)
                if(imgData) canvasContext.putImageData(imgData, 0,0, 0,0, 512,360);
                $$('.toolButtons').removeClass('selected');
            break;

        }
        console.log(currentTool);
    }


    this.onCreated = function(){



        $$('.toolButtons').addEvent('click', function(e){
            $$('.toolButtons').removeClass('selected');
            this.removeClass('over');
            this.addClass('selected');
            chooseTool(this.id);
            console.log(currentTool, "current tool selected")
        });

        $$('.toolButtons').addEvent('mouseover', function(e){
            this.addClass('over');
        });
        $$('.toolButtons').addEvent('mouseout', function(e){
            this.removeClass('over');
        });

        $$('.colorPalette').addEvent('mouseover', function(e){
            this.addClass('over');
        });
        $$('.colorPalette').addEvent('mouseout', function(e){
            this.removeClass('over');
        });
        $$('.colorPalette').addEvent('click', function(e){
            this.removeClass('over');
            $('saveDialog').fade('out');
            $('bigColor').setStyle('background-color', this.getStyle('background-color'));
            currentColor = $('bigColor').getStyle('background-color');
        });




        canvasContext = $('paintCanvas').getContext('2d');
//        canvasContext.translate(0.5,0.5);

        canvasContext.fillStyle = "#FFFFFF";
        canvasContext.fillRect(0,0,512,400);



        $('paintCanvas').addEvent('mousedown', function(e){
            console.log(mouseDown, currentTool);
            mouseDown = true;

            undoArray.unshift(canvasContext.getImageData(0,0,512,360));
            if(undoArray.length > 5) undoArray = undoArray.splice(0,5);

            $$('.dialog').fade('out');

            if(currentTool) currentTool.toolDown(e.event.layerX, e.event.layerY, canvasContext, currentColor);
        });
        $('paintCanvas').addEvent('mouseup', function(e){
            if(currentTool && mouseDown){
                if(canvasImageData) canvasContext.putImageData(canvasImageData, 0,0, 0,0, 512,360);
                currentTool.toolUp(e.event.layerX, e.event.layerY, canvasContext, currentColor);
                canvasImageData = null;
            }
            mouseDown = false;
        });
         $('paintCanvas').addEvent('mousemove', function(e){
            if(!mouseDown) return;
            if(currentTool){
                if(!currentTool.getConstantDrawing()){
                   if(canvasImageData) canvasContext.putImageData(canvasImageData, 0,0, 0,0, 512,360);
                }
            }
            canvasImageData = canvasContext.getImageData(0,0,512,360);

            if(currentTool) currentTool.toolMove(e.event.layerX, e.event.layerY, canvasContext, currentColor);

        });


        $('paintCanvas').addEvent('mouseout', function(e){
            // same as on up!
            if(mouseDown){
            if(canvasImageData) canvasContext.putImageData(canvasImageData, 0,0, 0,0, 512,360);
            canvasImageData = null;
            }
            mouseDown = false;
            
        });



    }


    this.onPopupShowing = function() {

        /*
        if(saveState) canvasContext.putImageData(saveState, 0,0, 0,0, 512,360);
        saveState = null;
        */
    };
    
    this.onPopupShown = function() {
        var wrapper = document.getElementById('wrapper');

        var imgData = localStorage.getItem('savedTempImagedata');

        console.log(imgData + canvasContext + localStorage);

        if(imgData && canvasContext){
            // load image from data url
            var imageObj = new Image();
            imageObj.onload = function(){
                canvasContext.drawImage(this, -1, -1);
            };

            imageObj.src = imgData;
            
        }

    };


    this.onPopupHidden = function() {
            console.log('save state!')

        localStorage.clear();
        localStorage.removeItem('savedTempImagedata');
        localStorage.setItem('savedTempImagedata', $('paintCanvas').toDataURL());
    };

    var saveState;

    this.onPopupUnload = function() {

//        saveState = canvasContext.getImageData(0,0,512,360);
    };




};