import Cookies from 'js-cookie'
export const state = () => ({
    menuState: false,
    user: false,
    jwt: false,
})

export const getters = {
    getMenuState: (state) => {
        return state.menuState
    },
    getUser: (state) => {
        return state.user
    },

    getJwt: (state) => state.jwt,

}

export const mutations = {
    toggleMenuState(state) {
        state.menuState = !state.menuState
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_JWT: (state, token) => {
        state.jwt = token
    },
}


export const actions = {
    async nuxtServerInit() {
        const jwt = await Cookies.get('jwt')
        console.log(jwt);
    }
}