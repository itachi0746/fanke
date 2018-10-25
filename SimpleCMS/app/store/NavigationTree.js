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
        visible: false
      },
      {
        text: '登录页',
        viewType: 'login',
        leaf: true,
        visible: false
      },
      {
        text: '500页面',
        viewType: 'page500',
        leaf: true,
        visible: false
      },
      {
        text: '重置密码',
        viewType: 'passwordreset',
        leaf: true,
        visible: false
      },
      {
        text: '用户管理',
        viewType: 'userView',
        leaf: true,
        visible: true
      },
      {
        text: '表格',
        viewType: 'cardataMain',
        leaf: true,
        visible: true
      },
      // {
      //   text: '表单',
      //   viewType: 'form-main',
      //   leaf: true,
      //   visible: false
      // },
    ]
  }
});
