import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'

Vue.use(Router)

export default new Router({
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
      path: '/topic/:id',
      components:{
        main: Article
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
