<template>
  <div @click="setActive" class="edit-wrapper" :class="{ active: active }">
    <div class="close" @click="removeComponent">x</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
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
    const store = useStore()
    const setActive = () => {
      context.emit("set-active", props.id);
    };
    const removeComponent = () => {
      store.commit('removeComponent', props.id)
    }
    return {
      setActive,
      removeComponent
    };
  },
});
</script>

<style scoped>
.edit-wrapper {
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
.edit-wrapper:hover {
  border: 1px dashed #a3a3a3;
}
.edit-wrapper.active {
  border: 1px solid lightblue;
}
</style>