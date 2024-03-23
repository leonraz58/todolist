import {slice, InitialStateType} from './application-reducer'
import {appActions} from '../CommonActions/App'
const {reducer: appReducer} = slice
const {setAppError, setAppStatus} = appActions

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

