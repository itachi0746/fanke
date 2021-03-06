Ext.define('SimpleCMS.ux.container.FixedHeightOfFirstItem', {
  extend: 'Ext.container.Container',
  xtype: 'fixedHeightOfFirstItem',
  requires: ['Ext.layout.container.VBox'],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  initComponent: function() {
    var me = this,
      items = me.items,
      height = Ext.Element.getViewportHeight() - 64;
    items[0]['height'] = height;
    items.push({ xtype: 'box', flex: 1 });
    me.callParent(arguments);
  }
});
