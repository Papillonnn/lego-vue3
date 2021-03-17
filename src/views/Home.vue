<template>
  <div class="content-container">
    <template-list :list="templateList"></template-list>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '@/store';
import TemplateList from '../components/TemplateList.vue';

export default defineComponent({
  name: "Home",
  components: {
    TemplateList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    return {
      templateList: store.state.templates.data,
    };  
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>