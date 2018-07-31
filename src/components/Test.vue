<template>
  <div class="gird">
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>
    <div class="item4">4</div>
    <div class="item5">5</div>
    <div class="item6">6</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .gird{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    div{
      text-align: center;
      line-height: 100px;
    }
  }
  .item1{
    grid-row: 1/4;
  }
  .item2{
    grid-column: 2/4;

  }
  .item3{

  }
  .item4{

  }
  .item5{

  }
  .item6{

  }
</style>