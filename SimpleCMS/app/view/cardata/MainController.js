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
    this.setCurrentView('carform', {});
  },
  onSave: function () {
    console.log('save');
    this.setCurrentView('cardatapage', {});
    
  },

  // 视图转换
  setCurrentView: function(view, params) {
    var me = this,
    contentPanel = me.getView(),
    layout = contentPanel.getLayout(),
    currentItem = layout.getActiveItem();

    if (!contentPanel || view === '' || currentItem.xtype === view) {
      // debugger
      return false;
    }
    console.log(currentItem.xtype);
    layout.setActiveItem(view)


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
