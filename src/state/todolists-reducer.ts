import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,{
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
                //setTodolists([...todolists])
            }
            return [...state]
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}
