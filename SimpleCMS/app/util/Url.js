Ext.define('SimpleCMS.util.Url', {
  alternateClassName: 'URL',
  singleton: true,
  config: {},
  constructor: function(config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  get: function(controller, action) {}
});
