import {createContext, useContext} from 'react';
import useLocalStorage from 'use-local-storage';
import {TodoList} from '../types';

interface ILocalStorageContext {
	savedListData: object[] | undefined;
	addNewList: (title: string) => void;
	updateListTitle: (title: string, id: string) => void;
	updateListOrder: (id: string, source: number, destination: number) => void;
	deleteList: (id: string) => void;
}

const defaultState = {
	savedListData: [],
	addNewList: (title: string) => {},
	updateListTitle: (title: string, id: string) => {},
	updateListOrder: (id: string, source: number, destination: number) => {},
	deleteList: (id: string) => {}
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);