Ext.define('SimpleCMS.view.cardata.CarData', {
  extend: 'Ext.grid.Panel',
  xtype: 'cardatapage',

  requires: ['Ext.grid.column.Action', 'Ext.toolbar.Paging'],

  store: {
    type: 'carStore'
  },
  frame: true,
  stripeRows: true,
  title: '表格示例', // Title for the grid
  width: 600,
  height: 500,
  collapsible: true, // property to collapse grid
  enableColumnMove: false, // property which alllows column to move to different position by dragging that column.
  enableColumnResize: false, // property which allows to resize column run time.
  // 分页工具栏
  dockedItems: [
    {
      xtype: 'pagingtoolbar',
      store: {
        type: 'carStore'
      },
      dock: 'bottom',
      displayInfo: true
    }
  ],

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
      layout: 'vbox',
      items: ['@edit', '@check']
    }
  ],
  // Reusable actions
  actions: {
    edit: {
      iconCls: 'x-fa fa-edit',
      tooltip: '编辑',
      handler: 'onEditClick'
      // flex: 0.5
    },
    check: {
      iconCls: 'x-fa fa-cog',
      tooltip: '查看',
      handler: 'onCheckClick'
      // flex: 0.5
    }
  },
  tbar: [
    {
      text: '新增',
      xtype: 'button',
      handler: 'onAddClick'
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
  ],
  initComponent: function() {
    console.log('init');
    console.log(this.getStore('carStore')==this.store);

    this.callParent();
  }
});
