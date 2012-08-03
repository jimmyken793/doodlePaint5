/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var RectangleTool = new Class({
    Extends: ToolBase,

    Implements : [Options],
        options: {
            size: 1.0,
            startX: 0,
            startY: 0
    },

    initialize: function(options){
        this.setOptions(options);
        
    },



    toolDown: function(_x,_y,_context){
        this.options.startX = _x;
        this.options.startY = _y;
    },

    toolMove: function(_x,_y,_context, _color){

        this.toolUp(_x, _y, _context, _color);

    },

    toolUp: function(_x,_y,_context, _color){
        console.log(this.options,this.options.startX);
        _context.strokeStyle = _color;
        _context.lineWidth = 2.0;
        _context.fillStyle = "#ff00ff";
        
        // Draw 10 times to get rid of the antialiasing for a more pixely look
        for(var i=0;i<10;i++){
           _context.strokeRect(this.options.startX, this.options.startY, _x-this.options.startX, _y-this.options.startY);
        }
        _context.stroke();
    }



    
});