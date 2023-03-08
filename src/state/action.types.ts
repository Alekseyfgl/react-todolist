import {
    AddTaskActionType,
    AddTodoListActionType,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType, ChangeTodoListFilterActionType, ChangeTodoListTitleActionType,
    RemoveTaskActionType,
    RemoveTodoListActionType
} from './tasks-reducer';

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType