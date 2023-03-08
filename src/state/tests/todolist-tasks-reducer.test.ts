import {TasksStateType, TodoListType} from '../../App';
import {AddTodoListActionType, RemoveTodoListActionType, tasksReducer} from '../tasks-reducer';
import {addTodoListAC, removeTodoListAC, todolistReducers} from '../todolist-reducers';
import {v1} from 'uuid';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action: AddTodoListActionType = addTodoListAC('new todolist');

    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)
    const endTodolistsState: TodoListType[] = todolistReducers(startTodolistsState, action)

    const keys: string[] = Object.keys(endTasksState);
    const idFromTasks: string = keys[0];
    const idFromTodolists: string = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    };

    const action: RemoveTodoListActionType = removeTodoListAC('todolistId2');

    const endState: TasksStateType = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});