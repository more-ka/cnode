<template>
  <div class="header">
    <img src="../assets/cnodejs_light.svg" alt="">
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .header{
    height: 50px;
    background: #444;
    padding: 5px 80px;
  }
  img{
    max-width: 120px;
    margin: 3px 0;
  }
  ul{
    list-style: none;
    float: right;
    text-align: center;
  }
  li{
    display: inline-block;
    padding: 8px 15px;
  }
  a{
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
  }
</style>
