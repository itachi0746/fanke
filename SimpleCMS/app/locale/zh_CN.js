Ext.define('SimpleCMS.locale.zh_CN', {
  override: 'SimpleCMS.locale.Locale',  // 重写
  statics: {  // 定义属性 中文化
    ApplicationUpdate: '应用程序更新',
    ApplicationUpdateMsg: '应用程序已经更新，重新加载？',
    DaterangeText: '开始日期必须小于结束日期',
    PasswordText: '两次输入的密码不同',

    BlankPage: '即将推出！',
    Page404: '<div>页面不存在 !</div><div>尝试返回 <a href="#dashboard"> 首页 </a></div>',
    Page500: '<div>>服务器内部错误</div>' + '<div>尝试返回 <a href="#dashboard"> 首页 </a></div>',

    PasswordRegexText: '密码格式错误!',
    OldPasswordEqualNew: '新旧密码不能相同!',

    DefaultDatetimeFormat: '这是日期格式',
    EmptyText: '没有任何数据',
    Logout: '退出',
    PasswordResetTitle: '修改密码',
    UserModel: {
      UserName: '用户名',
      Roles: '角色',
      Created: '创建日期',
      LastLogin: '上次登录',
    },
    Add: '添加',
    Edit: '编辑',
    Delete: '删除',
    Refresh: '刷新',
    Count: '共{count}条',
  }
});
