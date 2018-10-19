Ext.define('SimpleCMS.util.Url', {
  // DEBUG: true,
  alternateClassName: 'URL',
  singleton: true,
  config: {},
  constructor: function(config) {
    this.initConfig(config);
    this.callParent(arguments);
  },

  defaultActions: {
    create: 'create',
    read: 'list',
    update: 'update',
    destroy: 'delete',
    details: 'details'
  },
  actions: {},
  resources: {
    logo: 'resources/images/company-logo.png'
  },

  get: function(controller, action) {
    var me = this;
    return (
      controller +
      '/' +
      (me.defaultActions[action] || me.actions[action] || action)
    );
  },
  // getResource: function(res) {
  //   var me = this;
  //   return ROOTPATH + (me.DEBUG ? '/sencha/' : '/') + me.resources[res];
  // }
});
