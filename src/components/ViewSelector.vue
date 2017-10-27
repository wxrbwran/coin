<template>
  <Select
    v-model="value"
    @on-change="handleViewSelector"
    style="width:90px"
  >
    <Option
      v-for="item in views"
      :value="item.value"
      :key="item.value"
    >
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
  export default {
    data() {
      return {
        views: [{
          value: 'coins',
          label: 'Coin',
        }, {
          value: 'exchanges',
          label: 'Exchange',
        }],
        value: ['/home/exchanges'].includes(this.$route.path) ?
          'exchanges' : 'coins',
      };
    },
    /* eslint-disable object-shorthand */
    watch: {
      '$route'(to) {
        if (['/home', '/home/coins'].includes(to.path)) {
          this.value = 'coins';
        } else if (['/home/exchanges'].includes(to.path)) {
          this.value = 'exchanges';
        }
      },
    },
    methods: {
      handleViewSelector(val) {
        this.$router.push({
          path: `/home/${val}`,
        });
      },
    },
  };
</script>

