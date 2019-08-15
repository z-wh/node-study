import '../css/style.css';
import '../scss/main.scss';
import ListenForm from './module/listenForm';

const div = document.createElement('div');
div.innerHTML = 'hahaha^_^!';
div.classList = 'orange';
document.body.appendChild(div);

const fn = () => 1;

let listenForm = new ListenForm('.form-1', {
  siteId: 13,
  contentName: [{
    search: '?sem',
    name: '2019秋季班',
  }],
  submitTarget: '.btn-submit1',
  isMsg: true,
  smsInfo: '【新航道】您已预约成功，我们将在1个工作日内与您取得联系，谢谢！',
  successFun() {
    alert('您已预约成功，我们将在1个工作日内与您取得联系，谢谢！');
  },
});

for (let i = 0; i < 200; i++) {
  div.innerHTML = i;
}

$('.banner').html('2019秋季班');
