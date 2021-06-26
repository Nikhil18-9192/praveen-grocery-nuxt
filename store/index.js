import Cookies from 'js-cookie'
export const state = () => ({
    menuState: false,
    user: false,
    jwt: false,
    shops: [],
    selectedShop: {}
})

export const getters = {
    getMenuState: (state) => {
        return state.menuState
    },
    getUser: (state) => {
        return state.user
    },

    getJwt: (state) => state.jwt,
    getShops: (state) => {
        return state.shops
    },
    getSelectedShop: (state) => {
        return state.selectedShop
    }

}

export const mutations = {
    toggleMenuState(state) {
        state.menuState = !state.menuState
    },
    SET_USER: (state, user) => {
        state.user = user.user
    },
    SET_JWT: (state, token) => {
        state.jwt = token
    },
    SET_SHOPS: (state, shops) => {
        state.shops = shops
    },
    SET_SHOP: (state, shop) => {
        state.selectedShop = shop
    }
}

export const actions = {
    async nuxtClientInit({ commit }, { redirect }) {
        console.log('nuxtClientInit');
        const jwt = await Cookies.get('jwt')
        commit('SET_JWT', jwt)
        if (!jwt) {
            return
        }
        this.$axios.setToken(jwt, 'bearer')
        try {
            const user = await this.$axios.$get('/users/me')
            commit('SET_USER', user)
        } catch (error) {
            Cookies.remove('jwt')
            redirect('/login')
        }
    }
}