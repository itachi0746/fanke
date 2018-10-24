/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('SimpleCMS.Application', {
  extend: 'Ext.app.Application',

  name: 'SimpleCMS',

  quickTips: false,
  platformConfig: {
    desktop: {
      quickTips: true
    }
  },
  requires: [
    'SimpleCMS.locale.Locale',
  ],
  stores: [
    'NavigationTree'
    // TODO: add global / shared stores here
  ],

  launch: function() {
    // TODO - Launch the application
    console.log('app launch');

    Ext.util.Format.defaultValue = function(value, defaultValue) {
      return Ext.isEmpty(value) ? defaultValue : value;
    };
  },

  onAppUpdate: function() {
    Ext.Msg.confirm(
      I18N.ApplicationUpdate,
      I18N.ApplicationUpdateMsg,
      function(choice) {
        if (choice === 'yes') {
          window.location.reload();
        }
      }
    );
  }
});
