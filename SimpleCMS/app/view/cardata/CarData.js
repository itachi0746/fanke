var myData = [
  { orderNum: '1', carType: 'GS4', code: 'A01', state: '启用' },
  { orderNum: '2', carType: 'GS4', code: 'A02', state: '启用' },
  { orderNum: '3', carType: 'GS4', code: 'A03', state: '启用' },
  { orderNum: '4', carType: 'GS4', code: 'A04', state: '启用' }
];
// Creation of first grid store
var carStore = Ext.create('Ext.data.Store', {
  model: 'SimpleCMS.view.cardata.CarDataModel',
  data: myData
});

Ext.define('SimpleCMS.view.cardata.CarData', {
  extend: 'Ext.grid.Panel',
  xtype: 'cardatapage',

  requires: [
    'SimpleCMS.view.cardata.CarDataModel',
    'SimpleCMS.view.cardata.CarDataController'
  ],
  model: 'cardata',
  controller: 'cardata',
  // padding: 300,
  store: carStore,
  stripeRows: true,
  title: '表格示例', // Title for the grid
  //  renderTo: 'gridDiv', // Div id where the grid has to be rendered
  width: 600,
  collapsible: true, // property to collapse grid
  enableColumnMove: true, // property which alllows column to move to different position by dragging that column.
  enableColumnResize: true, // property which allows to resize column run time.

  // Reusable actions
  actions: {
    edit: {
      iconCls: 'x-fa fa-cog',
      tooltip: '编辑',
      handler: 'onSellClick',
      flex: 1,
    },
    check: {
      iconCls: 'x-fa fa-cog',
      tooltip: '查看',
      handler: 'onBuyClick',
      flex: 1
    }
  },
  columns: [
    {
      header: '序号',
      dataIndex: 'orderNum',
      id: 'orderNum',
      align: 'center',
      flex: 0.5, // property defines the amount of space this column is going to take in the grid container with respect to all.
      sortable: true, // property to sort grid column data.
      hideable: true // property which allows column to be hidden run time on user request.
    },
    {
      header: '车型',
      dataIndex: 'carType',
      flex: 1,
      align: 'center',
      sortable: true,
      hideable: false // this column will not be available to be hidden.
    },
    {
      header: '车型代号',
      dataIndex: 'code',
      flex: 1,
      align: 'center',
      sortable: true
    },
    {
      header: '状态',
      dataIndex: 'state',
      flex: 1,
      sortable: true,
      align: 'center'
    },
    {
      header: '操作',
      // dataIndex: 'operation',
      flex: 1,
      align: 'center',
      sortable: false,
      xtype: 'actioncolumn',
      items: [
        '@edit',
        '@check'

      ]
    }
  ],
  tbar: [
    {
      text: '新增',
      xtype: 'button',
      // handler: 'onAddClick',
      listeners: {
        click: function() {
          console.log(12313);
        }
      }
    },
    {
      text: '删除',
      reference: 'removeEmployee',
      //  handler: 'onRemoveClick',
      disabled: true
    },
    '->',
    // {
    //   xtype: 'searchfield',
    //   fieldLabel: '输入关键字',
    //   labelWidth: 20,
    //   width: 100,
    //   // bind: { store: '{users}' }
    // },
    { xtype: 'label', text: '请输入关键字：' },
    { xtype: 'textfield', id: 'KeyWord' },
    {
      text: '搜索',
      handler: function() {
        alert('搜索');
      }
    }
  ]
});
