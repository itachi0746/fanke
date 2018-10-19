Ext.define('SimpleCMS.store.NavigationTree', {
  extend: 'Ext.data.TreeStore',

  storeId: 'NavigationTree',

  fields: [
    {
      name: 'text'
    }
  ],

  root: {
    expanded: true,
    children: [
      {
        text: '空白页',
        viewType: 'pageblank',
        leaf: true,
        visible: true
      }
    ]
  }
});
