import UserProfile from "@/components/UserProfile.vue"
import {VueWrapper, mount} from "@vue/test-utils"
import { message } from 'ant-design-vue'
import store from "@/store";

jest.mock('ant-design-vue', () => ({
    message: {
        success: jest.fn()
    }
}))
const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: (url: string) => mockedRoutes.push(url)
    })
}))
// jest.mock('vuex', () => ({
//     useStore: () => {
//         return {
//             commit: jest.fn()
//         }
//     }
// }))

const mockComponent = {
    template: '<div><slot></slot></div>'
}
const mockComponent2 = {
    template: '<div><slot></slot><slot name="overlay"></slot></div>'
}

const globalComponents = {
    'a-button': mockComponent,
    'a-dropdown-button': mockComponent2,
    'a-menu': mockComponent,
    'a-menu-item': mockComponent,
    'router-link': mockComponent,
}

let wrapper: VueWrapper<any>
describe.skip('UserProfile component', () => {
    beforeAll(() => {
        jest.useFakeTimers()
        wrapper = mount(UserProfile, {
            props: {
                user: { isLogin: false }
            },
            global: {
                components: globalComponents,
                provide: {
                    store
                }
            },
        })
    })
    it('should render login button when login is false', () => {
        console.log(wrapper.html())
        expect(wrapper.get('div').text()).toBe('登录')
    })
    it('should call message and update store when clicking login', async () => {
        await wrapper.get('div').trigger('click')
        expect(message.success).toHaveBeenCalled()
        expect(store.state.user.userName).toBe('jack')
    })
    it('should render username when login is true', async () => {
        await wrapper.setProps({
            user: { isLogin: true, userName: 'jack' }
        })
        console.log(wrapper.html())
        expect(wrapper.get('.user-profile-component').html()).toContain('jack')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })
    it('should call logout and show message, call router.push after timeout', async () => {
        await wrapper.get('.user-profile-dropdown div').trigger('click')
        expect(store.state.user.isLogin).toBeFalsy()
        expect(message.success).toHaveBeenCalledTimes(1)
        jest.runAllTimers()
        expect(mockedRoutes).toEqual(['/'])
    })
    afterEach(() => {
        (message as jest.Mocked<typeof message>).success.mockReset()
    })
})