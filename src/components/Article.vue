<template>
  <div>
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="article" v-else>
      <section class="topic">
        <div class="header">
          <span class="title">{{post.title}}</span>
          <ul class="info">
            <li>• 发布于 {{post.create_at | formatDate}}</li>
            <!--<li>• 作者 {{post.author.loginname}}</li>-->
            <li>• {{post.visit_count}} 次浏览</li>
            <li>• 来自 {{post | tabFormat}}</li>
          </ul>
        </div>
        <div class="topic_content" v-html="post.content"></div>
      </section>
      <section class="comment">
        <div class="title">{{post.reply_count}} 回复</div>
        <div class="content" v-for="(reply,index) in post.replies">
          <div class="left">
              <img :src="reply.author.avatar_url" alt="">
          </div>
          <div class="right">
            <p class="name">{{reply.author.loginname}}</p>
            <p class="index">{{index+1}}楼</p>
            <p class="time">• {{reply.create_at | formatDate}}</p>
            <p class="ups" v-if="reply.ups.length>0"> 点赞{{reply.ups.length}}</p>
            <div class="text" v-html="reply.content"></div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data() {
      return {
        isLoading: false,
        post: {}
      }
    },
    methods: {
      getArticleData() {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
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
      this.getArticleData()
    }
  }
</script>

<style>
  @import url('../assets/github-markdown.css');

  .loading {
    height: calc(100vh - 50px);
    width: 100%;
    text-align: center;
  }

  .loadingImg {
    margin-top: 30%;
  }

  .article {
    padding-bottom: 20vh;
  }

  .article .topic {
    background: #FFFFFF;
  }

  .article .header {
    padding: 3vh;
    border-bottom: 1px solid lightgrey;
  }

  .topic .title {
    font-size: 22px;
    font-weight: 700;
    display: block;
  }

  .topic .info {
    display: block;
  }

  .topic .info li {
    font-size: 10px;
    list-style: none;
    color: #838383;
    display: inline-block;
  }

  .topic .topic_content {
    display: block;
    line-height: 2em;
    min-width: 200px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .prettyprint {
    background: #F7F7F7;
  }

  .comment {
    width: 100%;
    margin-top: 1vh;
    background: white;
  }
  .comment .content{
    border-bottom: 1px solid lightgray;
    padding: 0.7em;
  }
  .comment > .title {
    background: #F6F6F6;
    padding: 10px;
  }
  .comment .left{
    display: inline-block;
    width: 4em;
    height: 4em;
    padding-bottom: 0.5em;
    vertical-align: top;
  }
  .comment .left img {
    display: inline-block;
    width: 2em;
    margin-left: 1em;
  }
  .comment .right{
    display: inline-block;
    width: 90%;
  }
  .comment .right > p{
    font-size: 0.7em;
    display: inline-block;
  }
  .comment .right .name{
    font-weight: bold;
  }
  .comment .right .index{
    color: #1B95D1;
  }
  .comment .right .text{
    margin-top: 0.5em;
    margin-left: 1em;
  }
  .comment .right .text p{
    line-height: 1.5em;
    height: 1.5em;
  }
</style>
