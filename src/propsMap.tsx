import { VNode } from 'vue'
import { TextComponentProps } from './defaultProps'

export interface PropToForm {
    component: string;
    subComponent?: string;
    extraProps?: { [key: string]: any };
    text?: string;
    options?: { text: string | VNode; value: any }[];
    initialTransform?: (v: any) => any; // antd有些属性要求string或者number类型 这个方法可以将传入的属性转换成对应的类型
    afterTransform?: (v: any) => any;
    valueProp?: string; // 组件传入的属性不一定是"value" 用来自定义传入组件属性名
    eventName?: string;
    color?: string;
}

export type PropsToForm = {
    [P in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArray = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiTi"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' },
]

const fontFamilyOptions = fontFamilyArray.map(font => ({
    value: font.value,
    text: <span style={{fontFamily: font.value}}>{font.text}</span> as VNode
}))

export const mapPropsToForms: PropsToForm = {
    text: {
        text: '文本',
        component: 'a-textarea',
        extraProps: {
            rows: 3
        },
        afterTransform: (e: any) => e.target.value
    },
    fontSize: {
        text: '字号',
        component: 'a-input-number',
        initialTransform: (v: string) => parseInt(v),
        afterTransform: (e: any) => `${e}px`
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: {
            min: 0,
            max: 3,
            step: 0.1
        },
        initialTransform: (v: string) => parseFloat(v),
        afterTransform: (e: any) => e.toString()
    },
    textAlign: {
        text: '对齐',
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' },
        ],
        afterTransform: (e: any) => e.target.value
    },
    fontFamily: {
        text: '字体',
        component: 'a-select',
        subComponent: 'a-select-option',
        options: [
            { text: '无', value: '' },
            ...fontFamilyOptions
        ]
    },
    color: {
        component: 'color-picker',
        text: '字体颜色'
    }
}