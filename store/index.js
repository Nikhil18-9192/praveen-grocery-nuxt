import Cookies from 'js-cookie'
export const state = () => ({
    menuState: false,
    user: false,
    jwt: false,
    shops: [],
    selectedShop: {},
    loading: false
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
        state.user = user
    },
    SET_JWT: (state, token) => {
        state.jwt = token
    },
    SET_SHOPS: (state, shops) => {
        state.shops = shops
    },
    SET_SHOP: (state, shop) => {
        state.selectedShop = shop
    },
    SET_LOADING: (state) => {
        state.loading = !state.loading
    }
}

export const actions = {
    async nuxtServerInit({ commit }, { req, res, redirect }) {

        if (!req.headers.cookie) {
            return
        }
        const jwt = req.headers.cookie.split('=')[1]
        commit('SET_JWT', jwt)
        if (!jwt) {
            return
        }

        this.$axios.setToken(jwt, 'bearer')
        const user = await this.$axios.$get('/users/me')
        commit('SET_LOADING')
        let shops = []
        if (user.role.type == 'admin') {
            shops = await this.$axios.$get(`/shops`)
        } else {
            shops = await this.$axios.$get(`/shops?_where[user.id]=${user.id}`)
        }
        commit('SET_LOADING')
        commit('SET_SHOPS', shops)
        commit('SET_USER', user)

    },

    async cleanupAction({ commit }) {
        Cookies.remove('jwt')
        commit('SET_USER', false)
        commit('SET_JWT', false)
        commit('SET_SHOP', [])
        this.$axios.setToken('', 'bearer')
    }
}