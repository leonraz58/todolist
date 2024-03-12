import {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC, FilterValuesType, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../../state/app-reducer";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolist-actions";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: "idle"}
    ]
})

// test('correct todolist should be removed', () => {
//     const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({id: todolistId1}, 'requestId',{todolistId: todolistId1}))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });

// test('correct todolist should be added', () => {
//     //let newTodolistTitle = "New Todolist";
//
//     const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist: startState[0]}, 'requestId', {title: ''}))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[0].filter).toBe("all");
// });

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleTC.fulfilled({id: todolistId2, title: newTodolistTitle}, 'requestId', {id: todolistId2, title: newTodolistTitle});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({id: todolistId2, filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

    const action = fetchTodolistsTC.fulfilled({todolists: startState}, 'requestId' );

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);

});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = changeTodolistEntityStatusAC({id: todolistId2, entityStatus: newStatus});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');

});