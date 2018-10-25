Ext.define('SimpleCMS.store.CarStore', {
  extend: 'Ext.data.Store',
  alias: 'store.carStore',
  storeId: 'carStore',
  autoLoad: true,
  pageSize: 5,
  model: 'SimpleCMS.view.cardata.MainModel',
  proxy: {
    type: 'ajax',
    url: '/app/simulated/data.json',
    reader: {
      type: 'json',
      rootProperty: 'cardata',
      totalProperty: 'total'
    }
  }
});
