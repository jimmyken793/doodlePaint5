// Abstract base class, override all the toolFunctions in subclasses
var ToolBase = new Class({



    Implements : [Options],
        options: {
            size: 1.0

    },

    initialize: function(options){
        this.setOptions(options);
        
    },

    toolMove: function(_x,_y, _context, _color){
        console.log('base move');
    },

    toolDown: function(_x, _y, _context, _color){
        console.log('base down')
    },

    toolUp: function(_x, _y, _context, _color){
        console.log('base up')
    },

    getConstantDrawing: function(){
        return false;
    }



    
});