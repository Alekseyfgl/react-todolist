import {FilterValuesTypes, TodoListType} from '../App';
import {v1} from 'uuid';
import {ActionsType} from './tasks-reducer';


export const todolistReducers = (todoList: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter((tl: TodoListType) => tl.id !== action.todoListId);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all',
            };
            return [...todoList, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map((tl: TodoListType) => (tl.id === action.todoListId ? {
                ...tl,
                filter: action.filter
            } : tl))
        default:
            return todoList
    }
}

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListId: todoListId
    } as const
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListId: v1()
    } as const
}

export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListId
    } as const
}
export const changeTodoListFilterAC = (filter: FilterValuesTypes, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListId
    } as const
}