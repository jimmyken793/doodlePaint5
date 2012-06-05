/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var CircleTool = new Class({
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



    toolDown: function(_x,_y,_context, _color){
        this.options.startX = _x;
        this.options.startY = _y;
    },

    toolMove: function(_x,_y,_context, _color){
        console.log('circle move');
        this.toolUp(_x,_y,_context, _color);
    },

    toolUp: function(_x,_y,_context, _color){
        console.log(this.options,this.options.startX);
        _context.strokeStyle = _color;
        _context.lineWidth = 2.0;
//        _context.fillStyle = ;
        var radius = Math.sqrt( Math.pow(_x - this.options.startX, 2) + Math.pow(_y - this.options.startY, 2) );

        for(var i=0;i<10;i++){
            this.circle(_context, this.options.startX, this.options.startY, radius, _color);
        }
    },

    circle: function circle(_context, x,y,r, _color) {
      _context.beginPath();
      _context.arc(x, y, r, 0, Math.PI*2, true);
      _context.stroke();
      _context.closePath();
    }




    
});