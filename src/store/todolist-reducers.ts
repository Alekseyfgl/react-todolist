import {FilterValuesTypes, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todoListId: string
    }
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
    }
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title: string
        todoListId: string
    }
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        filter: FilterValuesTypes
        todoListId: string
    }
}

type ActionType = ChangeTodoListFilterAT | ChangeTodoListTitleAT | AddTodoListAT | RemoveTodoListActionType

export const todolistReducers = (todoList: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter((tl: TodoListType) => tl.id !== action.payload.todoListId);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.payload.title,
                filter: 'all',
            };
            return [...todoList, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map((tl: TodoListType) => (tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl))
        default:
            return todoList
    }
}

export const removeTodoLIstAC = (id: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId: id
        }
    }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
        }
    }
}

export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title, todoListId
        }
    }
}
export const changeTodoListFilterAC = (filter: FilterValuesTypes, todoListId: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter, todoListId
        }
    }
}