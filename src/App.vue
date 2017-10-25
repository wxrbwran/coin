<template>
  <div id="app">
    <Naver />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Naver from './components/Naver';

  export default {
    name: 'app',
    components: {
      Naver,
    },
  };
</script>
<style>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 1100px;
  }
  .content{
    width: 1100px;
    min-width: 1100px;
    margin: 0 auto;
  }
</style>
