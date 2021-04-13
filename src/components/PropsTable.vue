<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, index) in finalProps" :key="index">
      <span class="label" v-if="value.text">{{value.text}}</span>
      <div class="prop-component">
        <component
          :is="value.component"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, k) in value.options"
              :key="k"
              :value="option.value"
            >
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, VNode} from "vue";
import { TextComponentProps } from "@/defaultProps";
import { reduce } from "lodash-es";
import { mapPropsToForms } from "@/propsMap.tsx";
import RenderVnode from "@/components/RenderVnode";
import ColorPicker from "@/components/ColorPicker.vue";
export interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string; // 组件传入的属性不一定是"value" 用来自定义传入组件属性名
  eventName: string;
  events: { [ key: string ]: (e: any) => void };
}
export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  components: {
    RenderVnode,
    ColorPicker
  },
  emits: ['change'],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            const { valueProp = 'value', eventName = 'change', initialTransform, afterTransform} = item
            const newItem = {
              ...item,
              value: initialTransform ? initialTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => { context.emit('change', { key, value: afterTransform ? afterTransform(e) : e }) }
              }
            }
            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps}
      );
    });
    return {
      finalProps,
    };
  },
});
</script>

<style scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>