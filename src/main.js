import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
Vue.filter('formatData', function (str) {
  if (!str) return ''
  let date = new Date(str)
  let time = (new Date().getTime() - date.getTime()) / 1000
  console.log('现在时间', new Date());
  if (time < 0) {
    return ''
  } else if (time < 30) {
    return '刚刚'
  } else if (time < 60) {
    return parseInt(time) + '秒前'
  } else if (time / 60 < 60) {
    return parseInt((time / 60)) + '分钟前'
  } else if (time / 3600 < 24) {
    return parseInt((time / 3600)) + '小时前'
  } else if (time / 86400 < 30) {
    return parseInt((time / 86400)) + '天前'
  } else if (timg / 259200 < 12) {
    return parseInt((time / 259200)) + '月前'
  } else if (timg / 31104000 < 12) {
    return parseInt((time / 3110400)) + '年前'
  }
});
Vue.filter('tabFormat',function (post) {
  if(post.top === true){
    return '置顶'
  }else if(post.good === true){
    return '精华'
  }else if(post.tab=== 'ask'){
    return '问答'
  }else if(post.tab=== 'share'){
    return '分享'
  }
})
