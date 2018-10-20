Ext.define('SimpleCMS.view.authentication.PasswordReset', {
  extend: 'SimpleCMS.view.authentication.LockingWindow',
  xtype: 'passwordreset',

  requires: [
    'SimpleCMS.view.authentication.Dialog',
    'Ext.form.Label',
    'Ext.form.field.Text',
    'Ext.button.Button'
  ],

  title: '重置密码',

  defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

  items: [
    {
      xtype: 'authdialog',
      width: 455,
      defaultButton: 'resetPassword',
      autoComplete: true,
      bodyPadding: '20 20',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },

      defaults: {
        margin: '10 0'
      },

      cls: 'auth-dialog-login',
      items: [
        {
          xtype: 'label',
          cls: 'lock-screen-top-label',
          text: '修改密码'
        },
        {
          xtype: 'textfield',
          cls: 'auth-textbox',
          height: 55,
          name: 'Password',
          inputType: 'password',
          hideLabel: true,
          allowBlank: false,
          emptyText: '旧密码',
          // vtype: 'email',
          triggers: {
            glyphed: {
              cls: 'trigger-glyph-noop auth-password-trigger'
            }
          }
        },
        {
          xtype: 'textfield',
          cls: 'auth-textbox',
          height: 55,
          name: 'NewPassword',
          inputType: 'password',
          hideLabel: true,
          allowBlank: false,
          emptyText: '新密码',
          itemId: 'NewPassword',
          regex: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,}$/,
          regexText: I18N.PasswordRegexText,
          validator: function (v) {
            var me = this,
            form = me.up('form'),
            values = form.getForm().getValues(),
            old = values["Password"];
            return old === v ? I18N.OldPasswordEqualNew : true;
          },
          // vtype: 'email',
          triggers: {
            glyphed: {
              cls: 'trigger-glyph-noop auth-password-trigger'
            }
          }
        },
        {
          xtype: 'textfield',
          cls: 'auth-textbox',
          height: 55,
          name: 'ConfirmPassword',
          inputType: 'password',
          hideLabel: true,
          allowBlank: false,
          emptyText: '确认新密码',
          vtype: 'password',
          initialPassField: 'NewPassword',
          triggers: {
            glyphed: {
              cls: 'trigger-glyph-noop auth-password-trigger'
            }
          }
        },
        {
          xtype: 'button',
          reference: 'resetPassword',
          scale: 'large',
          ui: 'soft-green',
          formBind: true,
          iconAlign: 'right',
          iconCls: 'x-fa fa-angle-right',
          text: '保存',
          listeners: {
            click: 'onResetClick'
          }
        },
        {
          xtype: 'button',
          // reference: 'resetPassword',
          scale: 'large',
          ui: 'soft-blue',
          // formBind: true,
          iconAlign: 'right',
          iconCls: 'x-fa fa-angle-right',
          text: '返回',
          listeners: {
            click: 'onReturnClick'
          }
        },
        // {
        //   xtype: 'component',
        //   html:
        //     '<div style="text-align:right">' +
        //     '<a href="#login" class="link-forgot-password">' +
        //     'Back to Log In</a>' +
        //     '</div>'
        // }
      ]
    }
  ]
});
