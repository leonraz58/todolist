import {ActionCreatorsMapObject, AnyAction, bindActionCreators} from "redux";
import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {AppRootStateType, store} from "../app/store";
import {ThunkDispatch} from "redux-thunk";

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppDispatch2 = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}

export type AppDispatchType = typeof store.dispatch