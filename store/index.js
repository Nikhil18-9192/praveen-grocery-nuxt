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
    }
}


export const actions = {
    async nuxtServerInit() {
        const jwt = await Cookies.get('jwt')
        console.log(jwt);
    }
}