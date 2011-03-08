/*
 * jQuery Taskbar UI Widget 1.0
 * Copyright (c) 2011 Buzzilla 
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($, undefined){

$.widget("buzzilla.taskbardialog", $.ui.dialog, {
    options: {
        minimized: false,
        minimizeText: "minimize",
        taskbar: null
    },

    _create: function(){
        $.ui.dialog.prototype._create.apply(this, arguments);

        var self = this,
                options = self.options,

                uiDialogTitlebarMinimize = $( "<a href='#'></a>" )
                        .addClass( "ui-dialog-titlebar-minimize  ui-corner-all" )
                        .attr( "role", "button" )
                        .hover(
                            function() {
                                uiDialogTitlebarMinimize.addClass('ui-state-hover');
                            },
                            function() {
                                uiDialogTitlebarMinimize.removeClass('ui-state-hover');
                            }
                        )
                        .focus(function() {
                            uiDialogTitlebarMinimize.addClass('ui-state-focus');
                        })
                        .blur(function() {
                            uiDialogTitlebarMinimize.removeClass('ui-state-focus');
                        })
                        .click(function(event) {
                            self.minimize(event);
                            return false;
                        })
                        .appendTo( self.uiDialogTitlebar ),

			    uiDialogTitlebarMinimizeText = ( self.uiDialogTitlebarMinimizeText = $( "<span>" ) )
                        .addClass( "ui-icon ui-icon-minusthick" )
                        .text( options.minimizeText )
	        			.appendTo( uiDialogTitlebarMinimize );

        if(this.options.taskbar) {
            var taskbar = $(this.options.taskbar);
            taskbar.addClass("ui-taskbar")
            var tile = $("<div></div>")
                    .addClass(
                        'ui-dialog-titlebar ' +
                        'ui-widget-header ' +
                        'ui-corner-all ' +
                        'ui-helper-clearfix'
                    )
                    .text(this.options.title);
            tile.appendTo(taskbar);
            tile.click(function() {
                if(self.options.minimized) {
                    self.restore();
                }
                self.moveToTop();
            });
            this.options.tile = tile;
        }
    },

    _init: function(){
        $.ui.dialog.prototype._init.apply(this, arguments);
    },

    minimize: function(event) {
        this.uiDialog.hide();
        this.options.minimized = true;
    },

    restore: function(event) {
        this.uiDialog.show();
        this.options.minimized = false;
    },

    close: function(event) {
        if(this.options.tile) {
            this.options.tile.remove();
        }
        $.ui.dialog.prototype.close.apply(this, arguments);
    },

    destroy: function(){
        // remove classes + data
        $.Widget.prototype.destroy.call( this );

        return this;
    },

    // react to option changes after initialization
    _setOption: function( key, value ){
        var self = this;

        switch(key){
            case 'minimized':
                if(value) self.minimize(); else self.restore();
                break;
            case 'minimizeText':
                self.uiDialogTitlebarMinimizeText.text("" + value);
                break;
        }

        $.ui.dialog.prototype._setOption.apply(self, arguments);
    }
});

})(jQuery);
