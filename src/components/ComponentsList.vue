<template>
  <div
    v-for="(item, index) in list"
    :key="index"
    class="component-item"
    @click="onItemClick(item)"
  >
    <l-text v-bind="item"></l-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import LText from "@/components/LText.vue";
import { TextComponentProps } from "@/defaultProps";
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<Partial<TextComponentProps>[]>,
      required: true,
    },
  },
  emits: ["on-item-click"],
  components: {
    LText,
  },
  setup(props, context) {
    const onItemClick = (data: Partial<TextComponentProps>) => {
      context.emit("on-item-click", data);
    };
    return {
      onItemClick,
    };
  },
});
</script>

<style scoped>
</style>