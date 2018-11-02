Ext.define('SimpleCMS.view.cardata.MainModel', {
  extend: 'Ext.data.Model',
  alias: 'viewModel.cardata',
  
  fields: [
    { name: 'orderNum', mapping: 'orderNum' },
    { name: 'carType', mapping: 'carType' },
    { name: 'code', mapping: 'code' },
    { name: 'state', mapping: 'state' }
    // { name: 'operation', mapping: 'operation' }
  ],
//   stores: {
//     cars: {
//       // type: 'buffered',
//       model: 'SimpleCMS.view.cardata.MainModel',
//       autoLoad: true,
//       storeId: 'cars',
//       pageSize: 5,
//       proxy: {
//         type: 'ajax',
//         url: '/app/simulated/data.json',
//         reader: {
//           type: 'json',
//           rootProperty: 'cars',
//           totalProperty: 'total'
//         }
//       },
//       sorters: {
//           property: 'UserName',
//           direction: ''
//       },
//       listeners: {
//           load: 'onUsersStoreLoad'
//       }
//     }
// }
});
