<template>
  <div class="sliderBar" v-else>
    <div class="authorInfo">
      <p class="topBar">作者</p>
      <div class="info">
        <router-link
          :to="{
          name: 'userInfo',
          params:{
            user:post.loginname
          }
        }"
        >
          <img :src="post.avatar_url" alt />
        </router-link>
        <p class="name">{{post.loginname}}</p>
        <p class="score">{{post.score}} 积分</p>
      </div>
    </div>
    <div class="recentTopic">
      <p class="topBar">作者最近创建的主题</p>
      <ul v-for="topics in setTopicCount">
        <router-link
          :to="{
              name: 'postContent',
              params:{id:topics.id,name:topics.author.loginname}
            }"
        >
          <li class="topicTitle">{{topics.title}}</li>
        </router-link>
      </ul>
    </div>
    <div class="recentReplies">
      <p class="topBar">作者最近回复的主题</p>
      <ul v-for="replies in setRepliesCount">
        <router-link
          :to="{
              name: 'postContent',
              params:{id:replies.id,name:replies.author.loginname}
            }"
        >
          <li class="repliesTitle">{{replies.title}}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sliderbar",
  data() {
    return {
      post: {}
    };
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(response => {
          this.post = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.getUserData();
  },
  computed: {
    setTopicCount() {
      if (this.post.recent_topics) {
        return this.post.recent_topics.slice(0, 5);
      }
    },
    setRepliesCount() {
      if (this.post.recent_replies) {
        return this.post.recent_replies.slice(0, 5);
      }
    }
  }
};
</script>

<style scoped>
.sliderBar {
  float: right;
  width: 24%;
  background: #e1e1e1;
}

.topBar {
  background: #f6f6f6;
  padding: 0.7em;
}
.info {
  padding: 0.5em;
  background: #ffffff;
}
.authorInfo img {
  display: inline-block;
  height: 4em;
  width: 4em;
}
.info .name {
  display: inline-block;
  color: #778087;
  vertical-align: top;
  margin-left: 0.5em;
}
.info .score {
  margin-top: 0.5em;
  font-size: 14px;
}
.recentTopic,
.recentReplies {
  margin-top: 1em;
  background: #ffffff;
}
ul {
  padding: 0.5em;
}
ul a {
  text-decoration: none;
  color: black;
}
ul li {
  list-style: none;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}
</style>
