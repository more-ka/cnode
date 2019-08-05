<template>
  <div id="app">
    <Header></Header>
    <div id="main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
  *{
    margin: 0;padding: 0;box-sizing: border-box;
  }
  #app{
    background: #E1E1E1;
  }
  #main{
    width:80%;
    margin: 16px auto;
  }
</style>
