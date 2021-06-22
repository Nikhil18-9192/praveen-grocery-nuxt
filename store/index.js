export const state = () => ({
    menuState: false,

})

export const getters = {
    getMenuState: (state) => {
        return state.menuState
    },

}

export const mutations = {
    toggleMenuState(state) {
        state.menuState = !state.menuState
    },

}