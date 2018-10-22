Ext.define('SimpleCMS.view.grid.TableModel', {
  extend: 'Ext.data.Model',
  alias: 'viewmodel.tablemodel',

  fields: [
    { name: 'name', mapping: 'name' },
    { name: 'age', mapping: 'age' },
    { name: 'marks', mapping: 'marks' }
  ]
});
