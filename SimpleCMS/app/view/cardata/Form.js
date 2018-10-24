
Ext.define('SimpleCMS.view.cardata.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'carform',

    title: '表达标题',
    frame:true,
    width: 320,
    bodyPadding: 10,
    // padding: 100,
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: '车型',
        name: 'user',
        // emptyText: 'user id'
    }, {
        allowBlank: false,
        fieldLabel: '车型代码',
        name: 'pass',
        // emptyText: 'password',
        // inputType: 'password'
    }, {
        allowBlank: false,
        fieldLabel: '状态',
        name: 'state',
    }],

    buttons: [
        { text:'保存' },
        { text:'取消' }
    ],

    defaults: {
        anchor: '100%',
        labelWidth: 120
    }
});