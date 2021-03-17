<template>
  <div @click="setActive" class="edit-wrapper" :class="{ active: active }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "edit-wrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["set-active"],
  setup(props, context) {
    const setActive = () => {
      context.emit("set-active", props.id);
    };
    return {
      setActive,
    };
  },
});
</script>

<style scoped>
.edit-wrapper:hover {
  border: 1px dashed #a3a3a3;
}
.edit-wrapper.active {
  border: 1px solid lightblue;
}
</style>