<template>
  <Select
    v-model="value"
    @on-change="handleViewSelector"
    style="width:100px"
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
    created() {
//      console.log(this.$router.currentRoute);
      this.value = this.$route.path.split('/')[1] || 'coins';
    },
    beforeUpdate() {
      this.value = this.$route.path.split('/')[1] || 'coins';
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

<style scoped>

</style>
