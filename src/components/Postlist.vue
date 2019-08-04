<template>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="postlist">
      <ul>
        <li v-for="post in posts" class="item">
          <div class="content">
            <img :src="post.author.avatar_url" alt="">
            <span class="count">
              <span class="replyCount">{{post.reply_count}}</span>/{{post.visit_count}}
            </span>
            <p class="postTitle">{{post.title}}</p>
            <span class="time">{{post.last_reply_at | formatData}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Postlist",
    data() {
      return {
        'isLoading': false,
        posts: []
      }
    },
    methods: {
      getData() {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          page: 1,
          limit: 20
        })
          .then(response => {
            this.isLoading = false
            this.posts = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      }

    },
    beforeMount() {
      this.isLoading = true
      this.getData()
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    min-height: calc(100vh - 50px);
  }

  .loadingImg {
    margin-top: 2%;
  }
  .postlist{
    margin-top: 24px;
    max-width: 1000px;
    margin-left: 80px;
  }
  .postlist ul{
    border-bottom: 1px solid #E1E1E1;
    border-radius: 40px;
  }
  .item {
    list-style: none;
    border-bottom: 1px solid #9e9e9e5e;
    background: #fff;
    padding: 10px;
  }
  .item .content{
    line-height: 32px;
    height: 32px;
  }
  .item img{
    float: left;
    background-size: cover;
    width: 30px;
    height: 30px;
  }
  .count{
    display: inline-block;
    font-size: 10px;
    color: #b4b4b4;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .count .replyCount{
    color: #9e78c0;
    font-size: 14px;
  }
  .postTitle{
    display: inline-block;
  }
  .time{
    float: right;
    font-size: 10px;
    color: #b4b4b4;
  }
</style>
