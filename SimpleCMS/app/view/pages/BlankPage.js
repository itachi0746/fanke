Ext.define('SimpleCMS.view.pages.BlankPage', {
    extend: 'Ext.container.Container',
    xtype: 'pageblank',

    requires: [
        // 'SimpleCMS.view.grid.TableModel',
        // 'SimpleCMS.view.grid.Table',
        'Ext.container.Container',
    ],

    anchor : '100% -1',

    layout:{
        type:'vbox',
        pack:'center',
        align:'center'
    },

    items: [
        {
            xtype: 'box',
            cls: 'blank-page-container',
            html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-clock-o\'></span></div><h1>' + I18N.BlankPage + '</h1>',

        }
    ]
});
