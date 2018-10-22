Ext.define('SimpleCMS.view.grid.Tabel', {
  extend: 'Ext.grid.Panel',
  //   xtype: 'array-grid',
  //   controller: 'basicgrid',

  
  requires: [
      'SimpleCMS.view.grid.TableModel'
   ],

  id: 'gridId',
  store: tableStore,
  stripeRows: true,
  title: 'Students Grid', // Title for the grid
  renderTo: 'gridDiv', // Div id where the grid has to be rendered
  width: 600,
  collapsible: true, // property to collapse grid
  enableColumnMove: true, // property which alllows column to move to different position by dragging that column.
  enableColumnResize: true, // property which allows to resize column run time.
  columns: [
    {
      header: 'Student Name',
      dataIndex: 'name',
      id: 'name',
      flex: 1, // property defines the amount of space this column is going to take in the grid container with respect to all.
      sortable: true, // property to sort grid column data.
      hideable: true // property which allows column to be hidden run time on user request.
    },
    {
      header: 'Age',
      dataIndex: 'age',
      flex: 0.5,
      sortable: true,
      hideable: false // this column will not be available to be hidden.
    },
    {
      header: 'Marks',
      dataIndex: 'marks',
      flex: 0.5,
      sortable: true,
      // renderer is used to manipulate data based on some conditions here who ever has marks greater than 75 will be displayed as 'Distinction' else 'Non Distinction'.
      renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        if (value > 75) {
          return 'Distinction';
        } else {
          return 'Non Distinction';
        }
      }
    }
  ]
});
