import {createContext, useContext} from 'react';
import useLocalStorage from 'use-local-storage';
import {TodoList} from '../types';

interface ILocalStorageContext {
	savedListData: object[] | undefined;
	addNewList: (title: string) => void;
	updateListTitle: (title: string, id: string) => void;
	deleteList: (id: string) => void;
	addNewTodo: (id: string, todoTitle: string) => void;
	updateTodoOrder: (listId: string, source: number, destination: number) => void;
	updateTodoTitle: (title: string, listId: string, todoId: string) => void;
	deleteTodo: (listId: string, todoId: string) => void;
}

const defaultState = {
	savedListData: [],
	addNewList: (title: string) => {},
	updateListTitle: (title: string, id: string) => {},
	deleteList: (id: string) => {},
	addNewTodo: (id: string, todoTitle: string) => {},
	updateTodoOrder: (listId: string, source: number, destination: number) => {},
	updateTodoTitle: (title: string, listId: string, todoId: string) => {},
	deleteTodo: (listId: string, todoId: string) => {}
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);