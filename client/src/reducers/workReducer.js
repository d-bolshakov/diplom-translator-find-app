const SET_WORKS = "SET_WORKS"


const defaultState = {
    works: []
}

export default function workReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_WORKS:
            return {
                ...state,
                works: action.payload,
            }
        default:
            return state
    }
}

export const setWorks = works => ({type: SET_WORKS, payload: works})