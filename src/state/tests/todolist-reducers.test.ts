import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducers
} from '../todolist-reducers';
import {FilterValuesTypes, TodoListType} from '../../App';
import {v1} from 'uuid';
import {AddTodoListActionType, ChangeTodoListFilterActionType, ChangeTodoListTitleActionType, RemoveTodoListActionType} from '../tasks-reducer';

let todolistId1 = v1();
let todolistId2 = v1();
let startState: TodoListType[] = []


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist should be removed', () => {
    //тестовые данные

    //выполнение тестируемого кода
    const action: RemoveTodoListActionType = removeTodoListAC(todolistId1)
    const endState: TodoListType[] = todolistReducers(startState, action)
    //сверка результата с ожидаемым
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist';

    const action: AddTodoListActionType = addTodoListAC(newTodolistTitle)
    const endState: TodoListType[] = todolistReducers(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {


    const newFilter: FilterValuesTypes = 'all';


    const action: ChangeTodoListFilterActionType = changeTodoListFilterAC(newFilter, todolistId1)
    const endState: TodoListType[] = todolistReducers(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {

    const newTodolistTitle: string = 'New Todolist';

    const action: ChangeTodoListTitleActionType = changeTodoListTitleAC(todolistId2, newTodolistTitle)
    const endState: TodoListType[] = todolistReducers(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})