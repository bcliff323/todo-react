import {createContext, useState, useContext, useEffect} from 'react';
import {LocalStorageContext} from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import {TodoList} from '../types';

type Props = {
  children?: React.ReactNode;
};

export default function LocalStorageProvider({children}: Props) {
	const [savedListData, setSavedListData] = useLocalStorage<object[]>("todo-lists");

	const resetOrdinals = (savedData: object[]) => savedData
		.map((list, i) => {
			(list as TodoList).ordinal = i;
			return list;
		})
		.sort((a, b) => (a as TodoList).ordinal - (b as TodoList).ordinal);
	
	const addNewList = (title: string) => {
		const newList = {
			id: uuidv4(),
			title: title,
			todos: [],
			ordinal: 0
		};

		if (!savedListData) {
			setSavedListData([newList]);
			return;
		}

		const savedData = cloneDeep(savedListData);
		savedData.unshift(newList);

		const ordered = resetOrdinals(savedData);
		setSavedListData(ordered);
	}

	const updateListTitle = (title: string, id: string) => {
		const savedData = cloneDeep(savedListData || []);

		setSavedListData(savedData.map((list, i) => {
			if ((list as TodoList).id === id) {
				(list as TodoList).title = title;
				return list;
			}
			return list;
		}));
	}

	// TODO: (When implementing todo items)
	// Make this smart enough to select list by id before updating order of TODOs.
	const updateListOrder = (id: string, source: number, destination: number) => {
		const updatedData = cloneDeep(savedListData || []);
		const [removed] = updatedData.splice(source, 1);
		updatedData.splice(destination, 0, removed);
		
		const ordered = resetOrdinals(updatedData);
		setSavedListData(ordered);
	}

	const deleteList = (id: string) => {
		const savedData = cloneDeep(savedListData || []);

		const withoutList = savedData.filter((list, i) => {
			return (list as TodoList).id !== id;
		});

		const ordered = resetOrdinals(withoutList);
		setSavedListData(ordered);
	}

	const ctx = {
		savedListData,
		addNewList,
		updateListTitle,
		updateListOrder,
		deleteList
	};
	
	return (
		<LocalStorageContext.Provider value={ctx}>
      {children}
    </LocalStorageContext.Provider>
	)
}