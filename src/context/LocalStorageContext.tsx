import { createContext, useContext, Dispatch } from 'react';
import { TodoList } from "../types";

interface ILocalStorageContext {
	savedListData: TodoList[] | undefined;
	setSavedListData: Dispatch<TodoList[]>;
}

const defaultState = {
	savedListData: [],
	setSavedListData: () => { },
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);