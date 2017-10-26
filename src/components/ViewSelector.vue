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
        value: 'coins',
      };
    },
    /* eslint-disable object-shorthand */
    watch: {
      '$route'(to) {
        if (['/', '/coins'].includes(to.path)) {
          this.value = 'coins';
        } else if (['/exchanges'].includes(to.path)) {
          this.value = 'exchanges';
        }
      },
    },
    methods: {
      handleViewSelector(val) {
        this.$router.push({
          path: `/${val}`,
        });
      },
    },
  };
</script>

