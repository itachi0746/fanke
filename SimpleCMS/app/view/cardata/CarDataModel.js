Ext.define('SimpleCMS.view.cardata.CarDataModel', {
  extend: 'Ext.data.Model',
  alias: 'viewmodel.cardata',

  fields: [
    { name: 'orderNum', mapping: 'orderNum' },
    { name: 'carType', mapping: 'carType' },
    { name: 'code', mapping: 'code' },
    { name: 'state', mapping: 'state' }
    // { name: 'operation', mapping: 'operation' }
  ]
});
