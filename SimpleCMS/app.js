/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
  name: 'SimpleCMS',

  extend: 'SimpleCMS.Application',

  requires: [
    'Overrides.*',
    'SimpleCMS.locale.Locale',
    'SimpleCMS.locale.zh_CN',
    'SimpleCMS.util.Url',

    'SimpleCMS.ux.*',
    'SimpleCMS.view.main.Main',
  ],

  // The name of the initial view to create. With the classic toolkit this class
  // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
  // modern toolkit, the main view will be added to the Viewport.
  //
  mainView: 'SimpleCMS.view.main.Main'

  //-------------------------------------------------------------------------
  // Most customizations should be made to SimpleCMS.Application. If you need to
  // customize this file, doing so below this section reduces the likelihood
  // of merge conflicts when upgrading to new versions of Sencha Cmd.
  //-------------------------------------------------------------------------
});
Ext.onReady(function() {
  Ext.create('Ext.Button', {
    renderTo: Ext.getElementById('msgBox'),
    text: 'Click Me',
    listeners: {
      click: function() {
        Ext.Msg.alert('Title', 'Basic message box in ExtJS');
      }
    }
  });
});
