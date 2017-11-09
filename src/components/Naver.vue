<template>
  <div class="nav">
    <div class="nav-content">
      <div class="nav--left">
        <div class="logo">
          <img src="//placehold.it/25x25" alt="logo">
          <h3><router-link to="/">Coinfans</router-link></h3>
        </div>
      </div>
      <div class="nav--right">
        <div class="nav__user">
        </div>
        <div class="nav__language">
          <Select
            :value="localLanguage"
            @on-change="autoToggleLanguage"
          >
            <Option
              v-for="item in languages"
              :value="item.language"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        languages: [{
          language: 'zh-CN',
          label: this.$t('index.language.zh'),
        }, {
          language: 'en-US',
          label: this.$t('index.language.en'),
        }],
      };
    },
    computed: mapState({
      localLanguage: 'language',
    }),
    methods: {
      handleUserAction(action) {
        this.$Message.info({
          content: action,
        });
      },
      autoToggleLanguage(language) {
        this.handleLanguageChange(language);
        window.location.href = '/';
      },
      ...mapMutations(['handleLanguageChange']),
    },
  };
</script>

<style lang="scss" scoped>
  .nav{
    border-bottom: 1px solid $borderColor;
    background-color: $nav-color;
  }
  .nav-content{
    width: 100%;
    max-width: $content-width;
    height: 100px;
    margin: 0 auto;
    @include flex(row, nowrap, space-between);
  }
  .logo{
    margin-left: 20px;
    display: inline-block;
    img{
      vertical-align: middle;
      border-radius: 50%;
    }
    h3{
      margin-left: 10px;
      vertical-align: middle;
      font-weight: bold;
      display: inline-block;
      font-size: 30px;
      line-height: 34px;
      a{
        color: #FFFFFF;
      }
    }
  }
  .nav--right{
    font-size: 13px;
    margin-right: 100px;
  }
  .nav__language{
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 90px;
  }
  .nav__user{
    display: inline-block;
    vertical-align: middle;
    img{
      vertical-align: middle;
    }
  }
</style>
