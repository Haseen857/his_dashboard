const initialState = {
    sidebarShow: true,
}

export const sideBarReducer = function (state = initialState, { type, ...rest }) {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}
