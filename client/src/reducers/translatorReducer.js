const SET_TRANSLATORS = "SET_TRANSLATORS"
const SET_CURRENT_TRANSLATOR = "SET_CURRENT_TRANSLATOR"


const defaultState = {
    translators: [],
    currentTranslator: {}
}

export default function translatorReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TRANSLATORS:
            return {
                ...state,
                translators: action.payload,
            }
        case SET_CURRENT_TRANSLATOR:
            return {
                ...state,
                currentTranslator: action.payload,
            }
        default:
            return state
    }
}

export const setTranslators = translators => ({type: SET_TRANSLATORS, payload: translators})
export const setCurrentTranslator = currentTranslator => ({type: SET_CURRENT_TRANSLATOR, payload: currentTranslator})