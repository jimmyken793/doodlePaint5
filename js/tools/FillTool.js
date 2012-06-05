/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 10.10.2011
 * Time: 21:17
 * To change this template use File | Settings | File Templates.
 */
var FillTool = new Class({
    Extends: ToolBase,

    Implements : [Options],
        options: {
            size: 1.0,
            cr:0,
            cg:0,
            cb:0,
            fillReady:true
    },

    initialize: function(options){
        this.setOptions(options);

    },

    toolUp: function(_x,_y,_context, _color){
        if(!this.options.fillReady) return;
        this.options.fillReady = false;

        with (this) { setTimeout( function() { fillTimed() }, 2000 );}


        this.fillItUp(_x,_y,_context, _color);
    }, 

    fillTimed: function(){
        console.log(this.options);
        this.options.fillReady=true;
    },














    fillItUp: function(startX, startY,_context, _color){
        var canvasWidth=512;
        var canvasHeight=360;
        var drawingBoundTop=0;
        var colorLayer;

        this.options.cr = this.hexToR(_color);
        this.options.cg = this.hexToG(_color);
        this.options.cb = this.hexToB(_color);

        var context = _context;
        colorLayer = _context.getImageData(0,0,512,360);

        pixelStack = [[startX, startY]];
        
        var firstPixel = (startY*canvasWidth+startX)*4;
        var r = colorLayer.data[firstPixel];
        var g = colorLayer.data[firstPixel+1];
        var b = colorLayer.data[firstPixel+2];
        var firstPixelColor = [r,g,b];

        if(r == this.options.cr && g == this.options.cg && b == this.options.cb) return;


        var num=0;

        while(pixelStack.length || num>canvasWidth*canvasHeight)
        {
          num++;

          var newPos, x, y, pixelPos, reachLeft, reachRight;
          newPos = pixelStack.pop();
          x = newPos[0];
          y = newPos[1];

          pixelPos = (y*canvasWidth + x) * 4;
          while(y-- >= drawingBoundTop && this.matchStartColor(pixelPos, colorLayer, firstPixelColor))
          {
            pixelPos -= canvasWidth * 4;
          }
          pixelPos += canvasWidth * 4;
          ++y;
          reachLeft = false;
          reachRight = false;
          while(y++ < canvasHeight-1 && this.matchStartColor(pixelPos, colorLayer, firstPixelColor))
          {
            this.colorPixel(pixelPos, colorLayer, _color);

            if(x > 0)
            {
              if(this.matchStartColor(pixelPos - 4, colorLayer, firstPixelColor))
              {
                if(!reachLeft){
                  pixelStack.push([x - 1, y]);
                  reachLeft = true;
                }
              }
              else if(reachLeft)
              {
                reachLeft = false;
              }
            }

            if(x < canvasWidth-1)
            {
              if(this.matchStartColor(pixelPos + 4, colorLayer, firstPixelColor))
              {
                if(!reachRight)
                {
                  pixelStack.push([x + 1, y]);
                  reachRight = true;
                }
              }
              else if(reachRight)
              {
                reachRight = false;
              }
            }

            pixelPos += canvasWidth * 4;
          }
        }
        context.putImageData(colorLayer, 0, 0);
    },

    matchStartColor: function(pixelPos, colorLayer, firstPixelColor)
    {

      var startR = firstPixelColor[0];
      var startG = firstPixelColor[1];
      var startB = firstPixelColor[2];

      var r = colorLayer.data[pixelPos];
      var g = colorLayer.data[pixelPos+1];
      var b = colorLayer.data[pixelPos+2];

      return (r == startR && g == startG && b == startB);
    },

    colorPixel: function(pixelPos, colorLayer, _color)
    {

      var cr = this.options.cr;//this.hexToR(_color);
      var cg = this.options.cg;//this.hexToG(_color);
      var cb = this.options.cb;//this.hexToB(_color);

      colorLayer.data[pixelPos] = cr;
      colorLayer.data[pixelPos+1] = cg;
      colorLayer.data[pixelPos+2] = cb;
      colorLayer.data[pixelPos+3] = 255;
    },

    hexToR: function(h) {return parseInt((this.cutHex(h)).substring(0,2),16)},
    hexToG: function(h) {return parseInt((this.cutHex(h)).substring(2,4),16)},
    hexToB: function(h) {return parseInt((this.cutHex(h)).substring(4,6),16)},
    cutHex: function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


});