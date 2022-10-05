import { createContext, useContext, Dispatch } from 'react';
import { TodoListService, TodoList } from "../types";

interface ILocalStorageContext extends TodoListService {
	savedListData: TodoList[] | undefined;
	setSavedListData: Dispatch<TodoList[]>;
}

const defaultState = {
	savedListData: [],
	setSavedListData: () => { },
	updateListTitle: (title: string, id: string) => { },
	addNewTodo: (id: string, todoTitle: string) => { },
	updateTodoOrder: (listId: string, source: number, destination: number) => { },
	updateTodoTitle: (title: string, listId: string, todoId: string) => { },
	deleteTodo: (listId: string, todoId: string) => { },
	updateTodoStatus: (listId: string, todoId: string, isChecked: boolean) => { }
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);