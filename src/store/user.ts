import {Module} from "vuex"
import { GlobalDataProps } from "@/store/index";

export interface UserProps {
    isLogin: boolean;
    userName?: string;
}

const user: Module<UserProps, GlobalDataProps> = {
    state: {
        isLogin: true,
        userName: '嘻嘻'
    },
    mutations: {
        login(state) {
            state.isLogin = true
            state.userName = 'jack'
        },
        logout(state) {
            state.isLogin = false
        }
    }
}

export default user;