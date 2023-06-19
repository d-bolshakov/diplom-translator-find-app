import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userReducer"
import workReducer from "./workReducer"
import translatorReducer from "./translatorReducer"

const rootReducer = combineReducers({
    user: userReducer,
    translators: translatorReducer,
    works: workReducer,
})

export const store = configureStore({reducer: rootReducer})
