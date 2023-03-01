import {TasksStateType, TasksType} from '../App';
import {v1} from 'uuid';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './todolist-reducers';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':

            const newTask: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false,
            };
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) => (t.id === action.taskId ? {...t, isDone: action.isDone} : t))
            }
        case 'CHANGE-TASK-TITLE' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) => (t.id === action.taskId ? {...t, title: action.taskTitle} : t))
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todoListId]: []}

        case 'REMOVE-TODOLIST' :
            // const copyState = {...state}
            // delete copyState[action.payload.todoListId]
            // return copyState

            const {[action.todoListId]: [], ...rest} = {...state}
            return rest

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoLIstId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId: todoLIstId} as const
}
export const changeTaskTitleAC = (taskId: string, taskTitle: string, todoLIstId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, taskTitle, todoListId: todoLIstId} as const
}
