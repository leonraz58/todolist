import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(()=>{
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error message should be set', ()=>{
    const endState = appReducer(startState, setErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', ()=>{
    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})