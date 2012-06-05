/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var SprayTool = new Class({
    Extends: ToolBase,

    Implements : [Options],
        options: {
            size: 1.0
    },

    initialize: function(options){
        this.setOptions(options);
        
    },

    toolDown: function(_x,_y,_context,_color){
        this.spray(_x,_y,_context,_color);
    },

    toolMove: function(_x,_y,_context, _color){
        this.spray(_x,_y,_context,_color);
    },

    spray: function(_x,_y,_context,_color){
        console.log("spraaay")
        _context.strokeStyle = _color;
        _context.lineWidth = 2.0;
        var r = 1;

        for(var i=0;i<4;i++){
          var newX = _x+(Math.random()*25)-12;
          var newY = _y+(Math.random()*25)-12;
          for(var j=0;j<10;j++){
              _context.beginPath();
              _context.arc(newX, newY, r, 0, Math.PI*2, true);
              _context.stroke();
              _context.closePath();
          }
        }
    },
    
    getConstantDrawing: function(){
        return true;
    }


    
});