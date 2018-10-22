// 创建基础模型
Ext.define('SimpleCMS.model.Base', {
  extend: 'Ext.data.Model',
  fields: [
      { name: 'Id', type: 'int' }
    ],
  requires: [
    'Ext.data.identifier.Negative',
    'SimpleCMS.locale.Locale',
    'SimpleCMS.locale.zh_CN',
  ],
  identifier: 'negative',
  schema: {
    namespace: 'SimpleCMS.model'
  }
})