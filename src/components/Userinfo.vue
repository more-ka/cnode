<template>
  <div>
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="infoWrapper" v-else>
      <router-link :to="{
        name: 'root'
      }">
        <div class="title">主页/</div>
      </router-link>
      <section class="info">
        <img :src="post.avatar_url" alt="">
        <p class="name">{{post.loginname}}</p>
        <p class="score">{{post.score}} 积分</p>
        <p class="time">注册时间: {{post.create_at | formatDate}}</p>
      </section>
      <section class="recentTopic">
        <p class="title">最近创建的话题</p>
        <ul v-for="topics in post.recent_topics">
          <li class="clearfix">
            <router-link :to="{
              name: 'user',
              params:{user:topics.author.loginname}
            }">
              <img :src="topics.author.avatar_url" alt="">
            </router-link>
            <router-link :to="{
              name: 'postContent',
              params:{id:topics.id}
            }">
              <span class="topicTitle">{{topics.title}}</span>
            </router-link>
            <span class="time">{{topics.last_reply_at | formatDate}}</span>
          </li>
        </ul>
      </section>
      <section class="recentReplies">
        <p class="title">最近回复的话题</p>
        <ul v-for="replies in post.recent_replies">
          <li class="clearfix">
            <router-link :to="{
              name: 'user',
              params:{user:replies.author.loginname}
            }">
              <img :src="replies.author.avatar_url" alt="">
            </router-link>
            <router-link :to="{
              name: 'postContent',
              params:{id:replies.id}
            }">
              <span class="repliesTitle">{{replies.title}}</span>
            </router-link>
            <span class="time">{{replies.last_reply_at | formatDate}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Userinfo",
    data() {
      return {
        isLoading: false,
        post: {}
      }
    },
    methods: {
      getUserData() {
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.user}`)
          .then(response => {
            this.isLoading = false
            this.post = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getUserData()
    }
  }
</script>

<style scoped>
  .loading {
    height: calc(100vh - 50px);
    width: 100%;
    text-align: center;
  }

  .loadingImg {
    margin-top: 24%;
  }
  .infoWrapper{
    padding-bottom: 10vh;
    line-height: 2em;
    min-height: calc(100vh - 66px);
  }
  .title {
    padding: 0.5em;
    background: #f6f6f6;
    color: #80bd01;
  }

  .info {
    border-bottom: 1px solid #000;
    background: #ffffff;
    width: 100%;
    padding: 1em;
  }

  .info img {
    height: 3em;
    width: 3em;
    display: inline-block;
  }
  .info .name{
    display: inline-block;
    color: #b4b4b4;
    vertical-align: top;
  }
  .info .time{
    color: #b4b4b4;
  }
  .recentTopic, .recentReplies {
    margin-top: 1em;
    background: #ffffff;
  }

  li {
    list-style: none;
    padding: 0.5em;
    height: 3em;
    line-height: 3em;
    border-bottom: 1px solid lightgray;
  }

  li img {
    display: inline-block;
    line-height: 2em;
    height: 2em;
    margin-right: 2em;
  }

  li span {
    height: 2em;
    line-height: 2em;
    vertical-align: top;
  }

  li .time {
    float: right;
    font-size: 10px;
    padding: 1em;
    color: #b4b4b4;
    line-height: 100%;
  }
  a{
    text-decoration: none;
  }
  a:hover{
    text-decoration:underline;
  }
</style>
