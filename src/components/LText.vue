<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handlerClick">
    {{ text }}
  </component>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "../defaultProps";
const defaultProps = transformToComponentProps(textDefaultProps);
import useComponentCommon from '../hooks/useComponentCommon';

export default defineComponent({
  name: "l-text",
  props: {
    ...defaultProps,
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const { styleProps, handlerClick } = useComponentCommon(props, textStylePropNames);
    return {
      styleProps,
      handlerClick
    };
  },
});
</script>

<style scoped>
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>