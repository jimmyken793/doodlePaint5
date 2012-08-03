/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var LineTool = new Class({
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

    toolMove: function(_x,_y,_context,_color){
        this.drawLine(_x,_y,_context,_color);
    },

    drawLine: function(_x,_y,_context,_color){
        console.log(this.options,this.options.startX);
        _context.beginPath();
        _context.strokeStyle = _color;
        _context.moveTo(this.options.startX, this.options.startY);
        _context.lineTo(_x, _y);
        _context.lineWidth = 2.0;
        _context.lineJoin = "round";
        _context.lineCap = "square";
        _context.stroke();
        _context.closePath();
    },

    toolUp: function(_x,_y,_context,_color){
        // Draw 15 times to get rid of antialiasing for a more pixely look
        // (and easier Fill)
        for(var i=0;i<15;i++){
            this.drawLine(_x,_y,_context,_color);
        }

    }



    
});