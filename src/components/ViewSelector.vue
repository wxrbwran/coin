<template>
  <Select
    :value="view"
    @on-change="handleViewChange"
    style="width:90px"
  >
    <Option
      v-for="item in views"
      :value="item.view"
      :key="item.view"
    >
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        views: [{
          view: 'coins',
          label: this.$t('index.button.coin'),
        }, {
          view: 'exchanges',
          label: this.$t('index.button.exchange'),
        }],
      };
    },
    computed: mapState({
      view: 'currentView',
    }),
    methods: {
      ...mapMutations(['handleViewChange']),
    },
  };
</script>

