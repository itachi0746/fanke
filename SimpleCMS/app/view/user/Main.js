Ext.define('SimpleCMS.view.user.Main', {
  extend: 'Ext.grid.Panel',
  xtype: 'userView',
  requires: [
    'SimpleCMS.view.user.MainModel',
    'SimpleCMS.view.user.MainController'
  ],
  cls: 'email-inbox-panel shadow',
  headerBorders: false,
  rowLines: false,
  // width: 600,

  controller: 'user',
  viewModel: 'user',
  emptyText: I18N.EmptyText,
  selModel: 'checkboxmodel',
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
  ]
});
