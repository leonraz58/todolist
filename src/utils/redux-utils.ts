import {ActionCreatorsMapObject, AnyAction, bindActionCreators} from "redux";
import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatchType, AppRootStateType} from "./types";

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

