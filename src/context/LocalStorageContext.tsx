import { createContext, useContext } from 'react';
import { TodoListService, TodoList } from "../types";

interface ILocalStorageContext extends TodoListService {
	savedListData: TodoList[] | undefined;
}

const defaultState = {
	savedListData: [],
	addNewList: (title: string) => { },
	updateListTitle: (title: string, id: string) => { },
	deleteList: (id: string) => { },
	addNewTodo: (id: string, todoTitle: string) => { },
	updateTodoOrder: (listId: string, source: number, destination: number) => { },
	updateTodoTitle: (title: string, listId: string, todoId: string) => { },
	deleteTodo: (listId: string, todoId: string) => { },
	updateTodoStatus: (listId: string, todoId: string, isChecked: boolean) => { }
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);