<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, index) in finalProps" :key="index">
      <span class="label" v-if="value.text">{{value.text}}</span>
      <div class="prop-component">
        <component :is="value.component" :value="value.value" v-bind="value.extraProps">
          <template v-if="value.options">
            <component
                :is="value.subComponent"
                v-for="(item, k) in value.options"
                :key="k"
                :value="item.value"
            >{{item.text}}</component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TextComponentProps } from "@/defaultProps";
import { reduce } from "lodash-es";
import { mapPropsToForms, PropsToForm } from "@/propsMap";
export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  setup(props) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            item.value = item.initialTransform ? item.initialTransform(value) : value;
            result[newKey] = item;
          }
          return result;
        },
        {} as Required<PropsToForm>
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