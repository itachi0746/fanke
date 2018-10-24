Ext.define('SimpleCMS.view.cardata.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cardata',

  onEditClick: function() {
    console.log('1');
  },
  onCheckClick: function() {
    console.log(2);
  },
  onAddClick: function() {
    console.log(this);
    this.getActiveItem();

    // this.setCurrentView('carform', {});
  },

  // 视图转换
  setCurrentView: function(view, params) {
    console.log(view);
    // this.up('cardataMain').getController()
    var me = this,
      contentPanel = me.getView(),
      layout = contentPanel.getLayout();
    //   currentItem = layout.getActiveItem(),
    //   nextView = contentPanel.down(view);

console.log(contentPanel);
console.log(layout);

    // if (!contentPanel || view === '' || currentItem.xtype === view) {
    //   return false;
    // }
    // if (!nextView) {
    //   nextView = Ext.create({ xtype: view });
      // if (view === 'categoryEdit') {
      //   nextView.on('recordupdate', me.onCategoryRecordUpdate, me);
      //   nextView.on('aftersaved', me.onCategoryAfterSaved, me);
      // } else if (view === 'contentEdit') {
      //   nextView.on('aftersaved', me.onContentAfterSaved, me);
      // }
      // contentPanel.add(nextView);
    // }

    // if (view === 'articleDetails') {
    //   nextView.setTitle(params.title);
    //   nextView.update(params.html);
    // }

    // if (params && params.action) {
    //   if (params.action === 'add') {
    //     nextView.addRecord(true);
    //   } else if (params.action === 'edit') {
    //     if (params.record) {
    //       nextView.loadRecord(params.record);
    //       nextView.editRecord(true);
    //     } else {
    //       Ext.raise('没有要编辑的记录');
    //     }
    //   }
    // }

    // layout.setActiveItem(nextView);
  }
});
