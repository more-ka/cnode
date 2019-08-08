import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'
import Sliderbar from '../components/Sliderbar'

Vue.use(Router)

export default new Router({
  base: '/hot/',
  routes: [
    {
      name: 'root',
      path: '/',
      components:{
        main: Postlist
      }
    },
    {
      name: 'postContent',
      path: '/topic/:id&author=:name',
      components:{
        main: Article,
        sliderbar: Sliderbar
      }
    },
    {
      name: 'user',
      path:'/user/:user',
      components:{
        main: Userinfo
      }
    }
  ]
})
