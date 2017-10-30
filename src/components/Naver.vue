<template>
  <div class="nav">
    <div class="nav--left">
      <div class="logo">
        <img src="//placehold.it/25x25" alt="logo">
        <h3><router-link to="/">Coinfans</router-link></h3>
      </div>
      <ul class="nav__link">
        <li>
          <router-link to="/home">{{ $t('index.condition') }}</router-link>
        </li>
        <li>
          <router-link to="/ssss">{{ $t('index.value') }}</router-link>
        </li>
        <li>
          <router-link to="/ddd">{{ $t('index.information') }}</router-link>
        </li>
        <li>
          <router-link to="/fff">{{ $t('index.transport') }}</router-link>
        </li>
      </ul>
    </div>
    <div class="nav--right">
      <div class="nav__user">
        <img src="//placehold.it/25x25" alt="head">
        <div>
          <Dropdown
            @on-click="handleUserAction"
          >
            <a href="javascript:void(0)">
              {{ $t('index.username') }}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="out">Sign Out</DropdownItem>
              <DropdownItem name="account">Account</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        languages: [{
          language: 'zh-CN',
          label: '汉语',
        }, {
          language: 'en-US',
          label: '英语',
        }],
      };
    },
    computed: mapState({
      localLanguage: 'language',
    }),
    methods: {
      handleUserAction(action) {
        this.$Modal.info({
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
    height: 40px;
    border-bottom: 1px solid $borderColor;
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
    }
  }
  .nav__link{
    margin-left: 40px;
    display: inline-block;
    li {
      display: inline-block;
      margin-left: 30px;
      font-size: 13px;
      a {
        color: #666;
        &.active{
          color: $activeColor;
        }
      }
    }
  }
  .nav--right{
    font-size: 13px;
    margin-right: 100px;
    div{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .nav__language{
    margin-left: 10px;
    width: 75px;
  }
  .nav__user{
    img{
      vertical-align: middle;
    }
  }
</style>
