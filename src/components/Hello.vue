<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="msg">
    <button @click="reverse">反转</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome',
    };
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    reverse() {
      this.msg = this.msg.split('').reverse().join('');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
