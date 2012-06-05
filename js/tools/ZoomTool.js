/**
 * Created by JetBrains WebStorm.
 * User: tsiiffi
 * Date: 11.10.2011
 * Time: 11:54
 * To change this template use File | Settings | File Templates.
 */
var ZoomTool = new Class({
    Extends: ToolBase,

    Implements : [Options],
        options: {
            size: 1.0
    },

    initialize: function(options){
        this.setOptions(options);
        
    }



    
});