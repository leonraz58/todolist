import * as appSelectors from './selectors'
import {slice} from './app-reducer'

const appReducer = slice.reducer
const appActions = slice.actions

export {
    appSelectors,
    appReducer,
    appActions
}