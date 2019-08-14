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

  // eslint-disable-next-line class-methods-use-this
  charToInt(unames) {
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

  required(val, msg) {
    const reg = /^\s*$/g;
    const message = msg || '此项必填';
    if (reg.test(val)) {
      this.popTips(message);
      return false;
    }
    return true;
  }

  validateName(val) {
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    return this.commonValidate(val, reg, '请输入中文名字');
  }

  validatePhone(val) {
    const reg = /^1\d{10}$/;
    return this.commonValidate(val, reg, '请输入正确的手机号码');
  }

  validateEmail(val) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return this.commonValidate(val, reg, '请输入正确的邮箱地址');
  }

  commonValidate(val, reg, msg) {
    if (val === '') {
      return true;
    }
    if (!reg.test(val)) {
      this.popTips(msg);
      return false;
    }
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
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

    const contentName = this.getListenName();

    let params = {
      siteId,
      contentName: this.charToInt(contentName),
      name: this.charToInt(name),
      phoneNo: phone,
      email,
      course: this.charToInt(course),
      city: this.charToInt(city),
      origin: window.location.href,
    };

    const sms = {
      isSms: 0,
      info: this.charToInt(smsInfo),
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
    const self = this;
    const { successFun } = this.opts;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1999/newListen.jspx',
      data: params,
      dataType: 'jsonp',
      jsonp: 'callbak',
      success(res) {
        console.log(res);
        if (res.success) {
          if (successFun && typeof successFun === 'function') {
            successFun();
          } else {
            self.popTips(res);
          }
          // self.popTips('恭喜您预约成功！');
        } else if (res.status === 3) {
          self.popTips('您已经预约，我们会尽快与您取得联系！');
        } else {
          self.popTips('预约提交失败，请重试！');
        }
      },
      error(err) {
        console.log('-----err-----');
        console.log(err);
        self.popTips('服务器异常');
      },
    });
  }

  submitClick(ele) {
    const self = this;
    const { submitTarget, delay } = this.opts;
    let lastTime = 0;
    // eslint-disable-next-line func-names
    $(ele.querySelector(submitTarget)).on('click', function () {
      const nowTime = new Date().getTime();
      if (nowTime - lastTime > delay) {
        lastTime = nowTime;
        self.validateLinsten(ele);
      }
      console.log(`点中了:${this.innerHTML}`);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  popTips(msg) {
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
