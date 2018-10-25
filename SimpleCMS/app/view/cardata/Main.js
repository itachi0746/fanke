Ext.define('SimpleCMS.view.cardata.Main', {
  extend: 'Ext.container.Container',
  xtype: 'cardataMain',

  requires : [
    'Ext.layout.container.Card',
    'SimpleCMS.view.cardata.MainController',
    'SimpleCMS.view.cardata.MainModel',
    'SimpleCMS.view.cardata.CarData',
    'SimpleCMS.view.cardata.Form',

  ],
  controller: 'cardata',
  viewModel: 'cardata',
  layout: 'card',
  items: [
    {
      xtype: 'cardatapage',
      itemId: 'cardatapage'
    },
    {
      xtype: 'carform',
      itemId: 'carform'

    },
  ]
});
