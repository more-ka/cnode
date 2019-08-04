<template>
  <div>
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="article">
      <section class="main">
        <span class="title">{{post.title}}</span>
        <ul class="info">
          <li>• 发布于 {{post.last_reply_at | formatDate}}</li>
          <li>• 作者 {{post.author.loginname}}</li>
          <li>• {{post.visit_count}} 次浏览</li>
          <li>• 来自 {{post | tabFormat}}</li>
        </ul>
        <p class="content" v-html="post.content"></p>
      </section>
      <section class="comment">
        <div class="title">{{post.reply_count}}</div>
        <div class="content">
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
          .cache(error => {
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
  .loading {
    height: calc(100vh - 50px);
    text-align: center;
  }

  .loadingImg {
    margin-top: 30%;
  }
  .main .title{
    font-size: 22px;
    display: block;
  }
  .main .info{
    display: block;
  }
  .main .info li{
    font-size: 10px;
    list-style: none;
    color: #838383;
    display: inline-block;
  }
  .main .content{
    display: block;
    width: 100%;
  }
</style>
