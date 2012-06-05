/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var EraserTool = new Class({
    Extends: ToolBase,

    Implements : [Options],
        options: {
            size: 1.0,
            downX:0,
            downY:0
    },

    toolDown: function(_x, _y, _context){
        this.options.downX = _x;
        this.options.downY = _y;
        _context.moveTo(_x,_y);
    },

    toolMove: function(_x,_y,_context){
        for(var i=0;i<20;i++){
            _context.moveTo(this.options.downX, this.options.downY);
            this.pencilDraw(_x,_y,_context);
        }

        this.options.downX = _x;
        this.options.downY = _y;

    },

    pencilDraw: function(_x,_y,_context){
        _context.lineTo(_x, _y);
        _context.strokeStyle = "#ffffff";
        _context.lineWidth = 10.0;
        _context.lineJoin = "round";
        _context.lineCap = "round";
        _context.stroke();
        _context.closePath();
        _context.beginPath();

    },

    getConstantDrawing: function(){
        return true;
    }

    
});