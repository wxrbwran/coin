<template>
  <div class="nav">
    <div class="nav--left">
      <div class="logo">
        <img src="//placehold.it/25x25" alt="logo">
        <h3>Coinfans</h3>
      </div>
      <ul class="nav__link">
        <li>
          <a href="">行情</a>
        </li>
        <li>
          <a href="">市值</a>
        </li>
        <li>
          <a href="">资料</a>
        </li>
        <li>
          <a href="">搬砖</a>
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
              用户名
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
          v-model="language"
          @on-change="changeLanguage"
        >
          <Option
            @change="changeLanguage"
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

  export default {
    data() {
      return {
        languages: [{
          language: 'chinese',
          label: '汉语',
        }, {
          language: 'english',
          label: '英语',
        }],
        language: 'chinese',
      };
    },
    methods: {
      handleUserAction(action) {
        console.log(action);
      },
      changeLanguage(val) {
        console.log(val);
      },
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
        color: #0074D9;
      }
    }
  }
  .nav--right{
    font-size: 13px;
    margin-right: 100px;
    div{
      display: inline-block;
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
