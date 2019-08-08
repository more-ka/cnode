<template>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="postlist" v-else>
      <ul>
        <li class="topBar">
          <span class="active">全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
          <span>客户端测试</span>
        </li>
        <li v-for="post in posts" class="item">
          <div class="content">
            <router-link :to="{
              name: 'user',
              params:{user: post.author.loginname}}">
              <img :src="post.author.avatar_url" alt="">
            </router-link>
            <span class="count">
              <span class="replyCount">{{post.reply_count}}</span>/{{post.visit_count}}
            </span>
            <span :class="[{putGood:(post.good === true),putTop:(post.top === true),
            topicTab:(post.good !== true && post.top !== true)}]" id="tab">
              <span>
                {{post | tabFormat}}
              </span>
            </span>
            <router-link :to="{
              name: 'postContent',
              params: { id: post.id,name: post.author.loginname }
                }">
              <p class="postTitle">{{post.title}}</p>
            </router-link>
            <span class="time">{{post.last_reply_at | formatDate}}</span>
          </div>
        </li>
        <li class="item"><pagination @handleList="renderList"></pagination></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pagination from '../components/Pagination'
  export default {
    name: "Postlist",
    data() {
      return {
        'isLoading': false,
        posts: [],
        postPage: 1
      }
    },
    components:{
      pagination
    },
    methods: {
      getData() {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params:{
            page: this.postPage,
            limit: 20
          }
        })
          .then(response => {
            this.isLoading = false
            this.posts = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      },
      renderList(value){
        this.postPage = value
        this.getData()
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getData()
    }
  }
</script>

<style scoped>
  .loading {
    height: calc(100vh - 50px);
    text-align: center;
  }

  .loadingImg {
    margin-top: 24%;
  }

  .postlist {
    max-width: 1000px;
    margin-left: 80px;
    padding-bottom: 10vh;
  }

  .postlist ul {
    border-bottom: 1px solid #E1E1E1;
    border-radius: 40px;
  }

  .topBar {
    padding: 10px;
    list-style: none;
    background: #F6F6F6;
  }

  .topBar span {
    margin: 0 14px;
    color: #80bd01;
    font-size: 14px;
  }

  .topBar span.active {
    display: inline-block;
    background: #80bd01;
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
  }

  .item {
    list-style: none;
    border-bottom: 1px solid #9e9e9e5e;
    background: #fff;
    padding: 10px;
  }

  .item .content {
    line-height: 32px;
    height: 32px;
  }

  .item img {
    float: left;
    background-size: cover;
    width: 30px;
    height: 30px;
  }

  .count {
    display: inline-block;
    font-size: 10px;
    color: #b4b4b4;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    vertical-align: top;
  }

  .count .replyCount {
    color: #9e78c0;
    font-size: 14px;
  }

  #tab {
    border-radius: 2px;
    vertical-align: top;
    height: 18px;
  }

  .putGood, .putTop {
    background: #80bd01;
  }

  .putGood, .putTop span {
    color: white;
  }

  .topicTab {
    color: #999;
    background: lightgrey;
  }

  #tab span {
    display: inline-block;
    font-size: 12px;
    padding: 0 4px;
    vertical-align: top;
  }

  .postTitle {
    display: inline-block;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .postTitle:hover{
    text-decoration: underline;
  }

  .time {
    float: right;
    font-size: 10px;
    color: #b4b4b4;
  }
</style>
