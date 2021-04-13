import {shallowMount, VueWrapper} from '@vue/test-utils'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'
import flushPromises from "flush-promises";
jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>
const msg = 'new message'
let wrapper: VueWrapper<any>
describe.skip('HelloWorld.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
  })
  it('renders props.msg when passed', () => {
    expect(wrapper.get('h1').text()).toMatch(msg)
    expect(wrapper.findComponent(Hello).exists()).toBeTruthy()
  })
  it('should update the count when clicking the button', async () => {
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2')
  })
  it('should add todo when fill the input and click the add button', async () => {
    const todoContent = 'buy milk'
    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.add-todo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.get('li').text()).toBe(todoContent)
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send') as any[]
    expect(events[0]).toEqual([todoContent])
  })
  it('should load user message when click the load button', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'jack'} })
    await wrapper.get('.load-user').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    await flushPromises()
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.user-name').text()).toBe('jack')
  })
  it('should render the error page when axios request error', async () => {
    mockAxios.get.mockRejectedValueOnce({})
    await wrapper.get('.load-user').trigger('click')
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    expect(axios.get).toHaveBeenCalledTimes(1)
    await flushPromises()
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.error').text()).toBe('error!')
  })
  afterEach(() => {
    mockAxios.get.mockReset()
  })
})
