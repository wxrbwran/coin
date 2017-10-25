<template>
  <Select v-model="view" style="width:100px">
    <Option
      v-for="item in views"
      :value="item.view"
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
          view: 'coin',
          label: 'Coin',
        }, {
          view: 'exchange',
          label: 'Exchange',
        }],
        view: 'coin',
      };
    },
  };
</script>

<style scoped>

</style>