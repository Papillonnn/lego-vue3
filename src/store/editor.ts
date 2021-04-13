import { TextComponentProps } from '@/defaultProps';
import { v4 as uuidv4 } from 'uuid';

export interface EditorProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[];
    // 当前编辑的是哪个元素 uuid
    currentElement: string;
}

export interface ComponentData {
    props: Partial<TextComponentProps>;
    // 组件id，通过uuid生成
    id: string;
    // 业务组件库名称：l-text, l-image等
    name: string;
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: '#000000', 'lineHeight': '1', textAlign: 'left', fontFamily: '' }},
    { id: uuidv4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px', color: 'red', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'center', fontFamily: '' }},
    // { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '' }},
    { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', 'lineHeight': '3', textAlign: 'right', fontFamily: '' }},
  ]

const editor = {
    state: {
        components: testComponents,
        currentElement: ''
    },
    mutations: {
        addComponent(state: EditorProps, props: Partial<TextComponentProps>) {
            const newComponent: ComponentData = {
                id: uuidv4(),
                name: 'l-text',
                props
            }
            state.components.push(newComponent)
        },
        removeComponent(state: EditorProps, id: string) {
            state.components = state.components.filter(component => component.id !== id)
        },
        updateComponent(state: EditorProps, e: any) {
            const updateComponent = state.components.find(component => component.id === state.currentElement)
            if (updateComponent) {
                updateComponent.props[e.key as keyof TextComponentProps] = e.value
            }
        },
        setActive(state: EditorProps, currentId: string) {
            state.currentElement = currentId
        }
    },
    getters: {
        getCurrentElement: (state: EditorProps) => {
            return state.components.find(component => component.id === state.currentElement)
        }
    }
}

export default editor;