
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
        name: 'carType',
        vtype: 'car'
        // emptyText: 'user id'
        // regex: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,  // 验证输入的reg
        // maskRe: /[\d\s:amp]/i,  // 限制键盘输入
        // invalidText: 'Not a valid time.  Must be in the format "12:34 PM".'
    }, {
        allowBlank: false,
        fieldLabel: '车型代码',
        name: 'carCode',
        // emptyText: 'password',
        // inputType: 'password'
    }, {
        allowBlank: false,
        fieldLabel: '状态',
        name: 'state',
    }],

    buttons: [
        { text:'保存',handler:'onSave' },
        { text:'取消' }
    ],

    defaults: {
        anchor: '100%',
        labelWidth: 120
    }
});