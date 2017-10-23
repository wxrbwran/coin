<template>
  <div class="nav">
    <div class="nav--left">
      <div class="logo">
        <img src="//placehold.it/25x25" alt="logo">
        <h3>Coinfans</h3>
      </div>
      <ul class="nav__link">
        <li>
          <Button type="primary">123</Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Button } from 'element-ui';

  export default {
    data() {
      return {

      };
    },
    components: {
      Button,
    },
  };
</script>

<style lang="scss" scoped>
  .nav{
    @include flex(row, nowrap, space-between);
  }
  .logo{
    display: inline-block;
    h3{
      vertical-align: middle;
      display: inline-block;
    }
  }
  .nav__link{
    display: inline-block;
  }

</style>