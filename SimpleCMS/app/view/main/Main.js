Ext.define('SimpleCMS.view.main.Main', {
  extend: 'Ext.container.Viewport',

  requires: [
    'Ext.button.Segmented',
    'Ext.list.Tree',

    'SimpleCMS.view.main.MainContainerWrap',
    'SimpleCMS.view.main.MainController',
    'SimpleCMS.view.main.MainModel',

    'SimpleCMS.view.pages.*',
    'SimpleCMS.view.authentication.*',
    // 新的视图加入
    'SimpleCMS.view.user.Main',
    'SimpleCMS.view.cardata.Main'
    // 'SimpleCMS.view.cardata.CarData',
    // 'SimpleCMS.view.form.Main',

  ],

  controller: 'main',
  viewModel: 'main',

  cls: 'sencha-dash-viewport',
  itemId: 'mainView',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  listeners: {
    render: 'onMainViewRender'
  },

  items: [
    {
      xtype: 'toolbar',
      cls: 'sencha-dash-dash-headerbar shadow',
      height: 64,
      itemId: 'headerBar',
      items: [
        {
          xtype: 'component',
          reference: 'senchaLogo',
          cls: 'sencha-logo',
          html:
            '<div class="main-logo"><img src="' + URI.getResource('logo') + '">后台管理系统</div>',
          width: 250
        },
        {
          margin: '0 0 0 8',
          ui: 'header',
          iconCls: 'x-fa fa-navicon',
          id: 'main-navigation-btn',
          handler: 'onToggleNavigationSize'
        },
        '->',
        {
          iconCls: 'x-fa fa-key',
          ui: 'header',
          tooltip: I18N.PasswordResetTitle,
          href: '#passwordreset',
          hrefTarget: 'self'
        },
        {
          ui: 'header',
          iconCls: 'x-fa fa-power-off',
          handler: 'onLogout',
          tooltip: I18N.Logout
        },
        {
          xtype: 'tbtext',
          text: 'Goff Smith',
          cls: 'top-user-name'
        }
      ]
    },
    {
      xtype: 'maincontainerwrap',
      id: 'main-view-detail-wrap',
      reference: 'mainContainerWrap',
      flex: 1,
      items: [
        {
          xtype: 'treelist',
          reference: 'navigationTreeList',
          itemId: 'navigationTreeList',
          ui: 'navigation',
          store: 'NavigationTree',
          width: 250,
          expanderFirst: false,
          expanderOnly: false,
          listeners: {
            selectionchange: 'onNavigationTreeSelectionChange'
          }
        },
        // 主要容器
        {
          xtype: 'container',
          // flex: 1,
          padding: '0 0 0 20',
          reference: 'mainCardPanel',
          cls: 'sencha-dash-right-main-container',
          itemId: 'contentPanel',
          layout: {
            type: 'card',
            anchor: '100%'
          },

        }
      ]
    }
  ]
});
