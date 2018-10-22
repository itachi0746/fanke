// var gridStore = Ext.create('Ext.data.Store', {
//   model: 'StudentDataModel',
//   data: [
//     { name: 'Asha', age: '16', marks: '90' },
//     { name: 'Vinit', age: '18', marks: '95' },
//     { name: 'Anand', age: '20', marks: '68' },
//     { name: 'Niharika', age: '21', marks: '86' },
//     { name: 'Manali', age: '22', marks: '57' }
//   ]
// });


Ext.define('SimpleCMS.store.TableStore', {
  extend: 'Ext.data.Store',
  alias: 'store.tableStore',
  model: 'TableModel',

  storeId: 'TableStore',

  data: [
    { name: 'Asha', age: '16', marks: '90' },
    { name: 'Vinit', age: '18', marks: '95' },
    { name: 'Anand', age: '20', marks: '68' },
    { name: 'Niharika', age: '21', marks: '86' },
    { name: 'Manali', age: '22', marks: '57' }
  ]

});
