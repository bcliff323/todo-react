import { createContext, useContext, Dispatch } from 'react';
import { TodoListService, TodoList } from "../types";

interface ILocalStorageContext extends TodoListService {
	savedListData: TodoList[] | undefined;
	setSavedListData: Dispatch<TodoList[]>;
}

const defaultState = {
	savedListData: [],
	setSavedListData: () => { },
	updateTodoStatus: (listId: string, todoId: string, isChecked: boolean) => { }
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);