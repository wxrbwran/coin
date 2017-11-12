<template>
  <div id="app">
    <Naver />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Naver from '@/components/Naver';

  export default {
    name: 'app',
    components: {
      Naver,
    },
  };
</script>
<style>
  #app {
    width: auto;
    min-width: 1000px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .content{
    margin: 0 auto;
  }
  .home-views tr{
    height: 52px;
    line-height: 52px;
    font-size: 14px;
    color: #17162e;
  }
  .nav .ivu-select-selection{
    background-color: #17162E;
    color: #fff;
  }
  .nav i{
    color: #fff;
  }
</style>
