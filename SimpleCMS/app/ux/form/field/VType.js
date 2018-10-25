Ext.define('SimpleCMS.ux.form.field.VTypes', {
  override: 'Ext.form.field.VTypes',
  requires: ['SimpleCMS.locale.Locale'],
  daterange: function(val, field) {
    var date = field.parseDate(val);
    if (!date) {
      return false;
    }
    if (
      field.startDateField &&
      (!this.dateRangeMax || date.getTime() != this.dateRangeMax.getTime())
    ) {
      var start = field.up('form').down('#' + field.startDateField);
      start.setMaxValue(date);
      start.validate();
      this.dateRangeMax = date;
    } else if (
      field.endDateField &&
      (!this.dateRangeMin || date.getTime() != this.dateRangeMin.getTime())
    ) {
      var end = field.up('form').down('#' + field.endDateField);
      end.setMinValue(date);
      end.validate();
      this.dateRangeMin = date;
    }
    return true;
  },

  daterangeText: I18N.DaterangeText,
  password: function(val, field) {
    if (field.initialPassField) {
      var pwd = field.up('form').down('#' + field.initialPassField);
      return val == pwd.getValue();
    }
    return true;
  },

  passwordText: I18N.PasswordText,

  // 验证输入的vtype
  car: function (val, field) {
    var reg = /^([1-5])/i;
    return reg.test(val)
  },
  carText: '输入错误'

});
