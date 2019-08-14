"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

/* eslint-disable no-console */
var ListenForm =
/*#__PURE__*/
function () {
  function ListenForm(element, options) {
    var _this = this;

    _classCallCheck(this, ListenForm);

    _defaults.set(this, {
      writable: true,
      value: {
        siteId: 3,
        contentName: '',
        submitTarget: '.submit',
        emailRequired: false,
        courseRequired: false,
        cityRequired: false,
        gradeRequired: false,
        countryRequired: false,
        isMsg: false,
        smsInfo: '【新航道】',
        delay: 3000
      }
    });

    var eles = document.querySelectorAll(element);
    console.log(eles);
    eles.forEach(function (value, key, parent) {
      _this.ele = value;
      _this.opts = _objectSpread({}, _classPrivateFieldGet(_this, _defaults), {}, options);

      _this.submitClick();

      console.log(_this);
      console.log("value:".concat(value, ",key:").concat(key, ",parent:").concat(parent));
      console.log(_this.ele);
      console.log("\u662F\u5426\u9700\u90AE\u7BB1\uFF1A".concat(_this.opts.emailRequired));
    });
  } // eslint-disable-next-line class-methods-use-this


  _createClass(ListenForm, [{
    key: "charToInt",
    value: function charToInt(unames) {
      if (unames == null || unames === '') {
        return '';
      }

      var arr = {};
      var rtn = '';
      arr[0] = unames.charAt(0);
      rtn = arr[0].charCodeAt();

      for (var i = 1; i < unames.length; i++) {
        arr[i] = unames.charAt(i);
        rtn = "".concat(rtn, ",").concat(arr[i].charCodeAt());
      }

      return rtn;
    }
  }, {
    key: "required",
    value: function required(val, msg) {
      var reg = /^\s*$/g;
      var message = msg || '此项必填';

      if (reg.test(val)) {
        this.popTips(message);
        return false;
      }

      return true;
    }
  }, {
    key: "validateName",
    value: function validateName(val) {
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      return this.commonValidate(val, reg, '请输入中文名字');
    }
  }, {
    key: "validatePhone",
    value: function validatePhone(val) {
      var reg = /^1\d{10}$/;
      return this.commonValidate(val, reg, '请输入正确的手机号码');
    }
  }, {
    key: "validateEmail",
    value: function validateEmail(val) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      return this.commonValidate(val, reg, '请输入正确的邮箱地址');
    }
  }, {
    key: "commonValidate",
    value: function commonValidate(val, reg, msg) {
      if (val === '') {
        return true;
      }

      if (!reg.test(val)) {
        this.popTips(msg);
        return false;
      }

      return true;
    }
  }, {
    key: "getListenName",
    value: function getListenName() {
      var values = this.opts.contentName;
      var contentName = '';

      if (typeof values === 'string') {
        contentName = values;
      } else if (values instanceof Array) {
        values.forEach(function (value) {
          if (window.location.search === value.search) {
            contentName = value.name;
          }
        });
      }

      console.log("contentName\u662F:".concat(contentName));
      return contentName;
    }
  }, {
    key: "validateLinsten",
    value: function validateLinsten() {
      var flag = false;
      var formTarget = this.ele;
      var _this$opts = this.opts,
          siteId = _this$opts.siteId,
          emailRequired = _this$opts.emailRequired,
          courseRequired = _this$opts.courseRequired,
          cityRequired = _this$opts.cityRequired,
          isMsg = _this$opts.isMsg,
          smsInfo = _this$opts.smsInfo;
      var name = $(formTarget).find("[name='name']").val();
      var phone = $(formTarget).find("[name='phone']").val();
      var email = $(formTarget).find("[name='email']").val() || '';
      var course = $(formTarget).find("[name='course']").val() || '';
      var city = $(formTarget).find("[name='city']").val() || '';
      flag = this.required(name, '请输入姓名') && this.validateName(name) && this.required(phone, '请输入手机号码') && this.validatePhone(phone) && this.validateEmail(email);

      if (emailRequired) {
        flag = flag && this.required(email, '请输入邮箱地址');
      }

      if (courseRequired) {
        flag = flag && this.required(course, '请输入您想预约的课程');
      }

      if (cityRequired) {
        flag = flag && this.required(city, '请输入您所在的城市');
      }

      var contentName = this.getListenName();
      var params = {
        siteId: siteId,
        contentName: this.charToInt(contentName),
        name: this.charToInt(name),
        phoneNo: phone,
        email: email,
        course: this.charToInt(course),
        city: this.charToInt(city),
        origin: window.location.href
      };
      var sms = {
        isSms: 0,
        info: this.charToInt(smsInfo)
      };

      if (isMsg) {
        params = _objectSpread({}, params, {}, sms);
      }

      console.log('*********params is*********');
      console.log(params);

      if (flag) {
        this.submitLinsten(params);
      }
    }
  }, {
    key: "submitLinsten",
    value: function submitLinsten(params) {
      var self = this;
      var successFun = this.opts.successFun;
      $.ajax({
        type: 'GET',
        url: 'http://localhost:1999/newListen.jspx',
        data: params,
        dataType: 'jsonp',
        jsonp: 'callbak',
        success: function success(res) {
          console.log(res);

          if (res.success) {
            if (successFun && typeof successFun === 'function') {
              successFun();
            } else {
              self.popTips(res);
            } // self.popTips('恭喜您预约成功！');

          } else if (res.status === 3) {
            self.popTips('您已经预约，我们会尽快与您取得联系！');
          } else {
            self.popTips('预约提交失败，请重试！');
          }
        },
        error: function error(err) {
          console.log('-----err-----');
          console.log(err);
          self.popTips('服务器异常');
        }
      });
    }
  }, {
    key: "submitClick",
    value: function submitClick() {
      var self = this;
      var _self$opts = self.opts,
          submitTarget = _self$opts.submitTarget,
          delay = _self$opts.delay;
      var lastTime = 0; // eslint-disable-next-line func-names

      $(submitTarget).on('click', function () {
        var nowTime = new Date().getTime();

        if (nowTime - lastTime > delay) {
          lastTime = nowTime;
          self.validateLinsten();
        }

        console.log("\u70B9\u4E2D\u4E86:".concat(this.innerHTML));
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "popTips",
    value: function popTips(msg) {
      var hm = "<div id=\"popTips\">".concat(msg, "</div>");
      $('body').append(hm);
      $('#popTips').css({
        position: 'fixed',
        top: '5%',
        left: '50%',
        zIndex: '99999999',
        padding: '10px 150px',
        webkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f5d6d6',
        fontSize: '20px',
        color: 'red',
        borderRadius: '5px',
        whiteSpace: 'nowrap'
      });
      setTimeout(function () {
        $('#popTips').remove();
      }, 1500);
    }
  }]);

  return ListenForm;
}();

var _defaults = new WeakMap();

var _default = ListenForm;
exports.default = _default;
