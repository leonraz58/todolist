import * as appSelectors from './selectors'
import {slice} from './app-reducer'
import {asyncActions} from "./app-reducer";

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...asyncActions
}

export {
    appSelectors,
    appReducer,
    appActions
}