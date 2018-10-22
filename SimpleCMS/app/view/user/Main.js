Ext.define('SimpleCMS.view.user.Main', {
  extend: 'SimpleCMS.ux.container.FixedHeightOfFirstItem',
  xtype: 'userView',
  requires: [
    'SimpleCMS.view.user.MainModel',
    'SimpleCMS.view.user.MainController'
  ],
  // cls: 'email-inbox-panel shadow',
  // headerBorders: false,
  // rowLines: false,
  // width: 600,

  controller: 'user',
  viewModel: 'user',
  // emptyText: I18N.EmptyText,
  // selModel: 'checkboxmodel',
  // columns: [
  //   { xtype: 'rownumberer' },
  //   { text: I18N.UserModel.UserName, dataIndex: 'UserName', width: 150 },
  //   { text: I18N.UserModel.Roles, dataIndex: 'Roles', width: 150 },
  //   {
  //     xtype: 'datecolumn',
  //     text: I18N.UserModel.Created,
  //     dataIndex: 'Created',
  //     format: I18N.DefaultDatetimeFormat,
  //     width: 150
  //   },
  //   {
  //     xtype: 'datecolumn',
  //     text: I18N.UserModel.LastLogin,
  //     dataIndex: 'LastLogin',
  //     format: I18N.DefaultDatetimeFormat,
  //     width: 150
  //   }
  // ],
  items: [
    {
      xtype: 'grid',
      cls: 'email-inbox-panel shadow',
      headerBorders: false,
      rowLines: false,
      padding: '20',
      emptyText: I18N.EmptyText,
      selModel: 'checkboxmodel',

        bind: {selection: '{selection}'},
      columns: [
        { xtype: 'rownumberer' },
        { text: I18N.UserModel.UserName, dataIndex: 'UserName', width: 150 },
        { text: I18N.UserModel.Roles, dataIndex: 'Roles', width: 150 },
        {
          xtype: 'datecolumn',
          text: I18N.UserModel.Created,
          dataIndex: 'Created',
          format: I18N.DefaultDatetimeFormat,
          width: 150
        },
        {
          xtype: 'datecolumn',
          text: I18N.UserModel.LastLogin,
          dataIndex: 'LastLogin',
          format: I18N.DefaultDatetimeFormat,
          width: 150
        }
      ],
      tbar: [
        {
          iconCls: 'x-fa fa-file',
          ui: 'soft-green',
          tooltip: I18N.Add,
          handler: 'onUserAdd'
        },
        {
          iconCls: 'x-fa fa-pencil',
          ui: 'soft-blue',
          tooltip: I18N.Edit,
          handler: 'onUserEdit',
          bind: { disabled: '{!selection}'}
        },
        {
          iconCls: 'x-fa fa-trash',
          ui: 'soft-red',
          tooltip: I18N.Delete,
          handler: 'onUserDelete',
          bind: { disabled: '{!selection}'}
        },
        {
          iconCls: 'x-fa fa-refresh',
          ui: 'soft-cyan',
          tooltip: I18N.Refresh,
          handler: 'onRefresh'
        },
        '->',
        { xtype: 'tbtext', bind: I18N.Count },

      ]
    }
  ]
});
