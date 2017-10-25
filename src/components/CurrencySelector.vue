<template>
  <Select v-model="currency" style="width:100px">
    <Option
      v-for="item in currencies"
      :value="item.currency"
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
        currencies: [{
          currency: 'USD',
          label: 'USD',
        }, {
          currency: 'CNY',
          label: 'CNY',
        }],
        currency: 'USD',
      };
    },
  };
</script>

<style scoped>

</style>