<template>
  <div>
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="" class="loadingImg">
    </div>
    <div class="postlist">
      <ul>
        <li class="topBar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
            <span>客户端测试</span>
        </li>
        <li v-for="post in posts" class="item">
          <div class="content">
            <img :src="post.author.avatar_url" alt="">
            <span class="count">
              <span class="replyCount">{{post.reply_count}}</span>/{{post.visit_count}}
            </span>
            <span :class="[{putGood:(post.good === true),putTop:(post.top === true),
            topicTab:(post.good !== true && post.top !== true)}]" id="tab">
              <span>
                {{post | tabFormat}}
              </span>
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
  .loadingImg {
    margin-top: 2%;
  }

  .postlist {
    margin-top: 24px;
    max-width: 1000px;
    margin-left: 80px;
  }

  .postlist ul {
    border-bottom: 1px solid #E1E1E1;
    border-radius: 40px;
  }
  .topBar{
    padding: 10px;
    list-style: none;
    background: #F6F6F6;
  }
  .topBar span{
    margin: 0 14px;
    color: #80bd01;
    font-size: 14px;
  }
  .topBar span:first-child{
    display: inline-block;
    background: #80bd01;
    color: white;
    padding: 2px;
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
  .putGood, .putTop span{
    color: white;
  }
  .topicTab {
    color: #999;
    background: lightgrey;
  }
  #tab span{
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

  .time {
    float: right;
    font-size: 10px;
    color: #b4b4b4;
  }
</style>
