/* eslint-disable no-console */
class ListenForm {
  #defaults = {
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
    delay: 3000,
  };

  constructor(elements, options) {
    const eles = document.querySelectorAll(elements);
    console.log(eles);
    eles.forEach((ele) => {
      this.opts = { ...this.#defaults, ...options };
      this.submitClick(ele);
      console.log('-----------value-----------------');
      console.log(ele);
      console.log('-----------opts-----------------');
      console.log(this.opts);
      console.log(`是否需邮箱：${this.opts.emailRequired}`);
    });
  }

  static charToInt(unames) {
    if (unames == null || unames === '') {
      return '';
    }
    const arr = {};
    let rtn = '';
    arr[0] = unames.charAt(0);
    rtn = arr[0].charCodeAt();
    for (let i = 1; i < unames.length; i++) {
      arr[i] = unames.charAt(i);
      rtn = `${rtn},${arr[i].charCodeAt()}`;
    }
    return rtn;
  }

  static required(val, msg) {
    const reg = /^\s*$/g;
    const message = msg || '此项必填';
    if (reg.test(val)) {
      ListenForm.popTips(message);
      return false;
    }
    return true;
  }

  static validateName(val) {
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    return ListenForm.commonValidate(val, reg, '请输入中文名字');
  }

  static validatePhone(val) {
    const reg = /^1\d{10}$/;
    return ListenForm.commonValidate(val, reg, '请输入正确的手机号码');
  }

  static validateEmail(val) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return ListenForm.commonValidate(val, reg, '请输入正确的邮箱地址');
  }

  static commonValidate(val, reg, msg) {
    if (val === '') {
      return true;
    }
    if (!reg.test(val)) {
      ListenForm.popTips(msg);
      return false;
    }
    return true;
  }

  getListenName() {
    const values = this.opts.contentName;
    let contentName = '';

    if (typeof values === 'string') {
      contentName = values;
    } else if (values instanceof Array) {
      values.forEach((value) => {
        if (window.location.search === value.search) {
          contentName = value.name;
        }
      });
    }

    console.log(`contentName是:${contentName}`);
    return contentName;
  }

  validateLinsten(ele) {
    let flag = false;
    const {
      siteId, emailRequired, courseRequired, cityRequired, isMsg, smsInfo,
    } = this.opts;
    const name = ele.querySelector('[name="name"]').value;
    const phone = ele.querySelector('[name="phone"]').value;
    const email = ele.querySelector('[name="email"]') ? ele.querySelector('[name="email"]').value : '';
    const course = ele.querySelector('[name="course"]') ? ele.querySelector('[name="course"]').value : '';
    const city = ele.querySelector('[name="city"]') ? ele.querySelector('[name="city"]').value : '';
    console.log(`name:${name},phone:${phone}, email:${email}`);
    flag = ListenForm.required(name, '请输入姓名') && ListenForm.validateName(name) && ListenForm.required(phone, '请输入手机号码') && ListenForm.validatePhone(phone) && ListenForm.validateEmail(email);
    if (emailRequired) {
      flag = flag && ListenForm.required(email, '请输入邮箱地址');
    }
    if (courseRequired) {
      flag = flag && ListenForm.required(course, '请输入您想预约的课程');
    }
    if (cityRequired) {
      flag = flag && ListenForm.required(city, '请输入您所在的城市');
    }

    const contentName = this.getListenName();

    let params = {
      siteId,
      contentName: ListenForm.charToInt(contentName),
      name: ListenForm.charToInt(name),
      phoneNo: phone,
      email,
      course: ListenForm.charToInt(course),
      city: ListenForm.charToInt(city),
      origin: window.location.href,
    };

    const sms = {
      isSms: 0,
      info: ListenForm.charToInt(smsInfo),
    };

    if (isMsg) {
      params = { ...params, ...sms };
    }

    console.log('*********params is*********');
    console.log(params);

    if (flag) {
      this.submitLinsten(params);
    }
  }

  submitLinsten(params) {
    const { successFun } = this.opts;
    $.ajax({
      type: 'GET',
      url: 'http://webms1.xhd.cn/newListen.jspx',
      data: params,
      dataType: 'jsonp',
      jsonp: 'callbak',
      success(res) {
        console.log(res);
        if (res.success) {
          if (successFun && typeof successFun === 'function') {
            successFun();
          } else {
            ListenForm.popTips(res);
          }
          // ListenForm.popTips('恭喜您预约成功！');
        } else if (res.status === 3) {
          ListenForm.popTips('您已经预约，我们会尽快与您取得联系！');
        } else {
          ListenForm.popTips('预约提交失败，请重试！');
        }
      },
      error(err) {
        console.log('-----err-----');
        console.log(err);
        ListenForm.popTips('服务器异常');
      },
    });
  }

  submitClick(ele) {
    const self = this;
    const { submitTarget, delay } = this.opts;
    let lastTime = 0;
    // eslint-disable-next-line no-param-reassign
    ele.querySelector(submitTarget).onclick = function btnClick() {
      const nowTime = new Date().getTime();
      if (nowTime - lastTime > delay) {
        lastTime = nowTime;
        self.validateLinsten(ele);
      }
    };
  }

  static popTips(msg) {
    const hm = `<div id="popTips">${msg}</div>`;
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
      whiteSpace: 'nowrap',
    });
    setTimeout(() => {
      $('#popTips').remove();
    }, 1500);
  }
}

export default ListenForm;
