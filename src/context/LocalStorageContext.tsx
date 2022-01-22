import {createContext, useContext} from 'react';
import useLocalStorage from 'use-local-storage';
import {TodoList} from '../types';

interface ILocalStorageContext {
	savedListData: object[] | undefined;
	addNewList: (title: string) => void;
	updateListTitle: (title: string, id: number) => void;
	updateListOrder: (id: number, source: number, destination: number) => void;
	deleteList: (id: number) => void;
}

const defaultState = {
	savedListData: [],
	addNewList: (title: string) => {},
	updateListTitle: (title: string, id: number) => {},
	updateListOrder: (id: number, source: number, destination: number) => {},
	deleteList: (id: number) => {}
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);