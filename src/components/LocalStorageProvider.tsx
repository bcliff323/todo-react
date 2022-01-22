import {createContext, useState, useContext, useEffect} from 'react';
import {LocalStorageContext} from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
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
		.sort((a, b) => (a as TodoList).ordinal > (b as TodoList).ordinal);
	
	const addNewList = (title: string) => {
		if (!savedListData) {
			setSavedListData([
				{
					id: 1,
					title: title,
					todos: [],
					ordinal: 0
				}
			]);
			return;
		}

		const savedData = cloneDeep(savedListData);
		savedData.unshift({
			id: savedData.length + 1,
			title: title,
			todos: [],
			ordinal: 0
		});

		const ordered = resetOrdinals(savedData);
		setSavedListData(ordered);
	}

	const updateListTitle = (title: string, id: number) => {
		const savedData = cloneDeep(savedListData || []);

		setSavedListData(savedData.map((list, i) => {
			if (parseInt((list as TodoList).id, 10) === id) {
				(list as TodoList).title = title;
				return list;
			}
			return list;
		}));
	}

	// TODO: (When implementing todo items)
	// Make this smart enough to select list by id before updating order of TODOs.
	const updateListOrder = (id: number, source: number, destination: number) => {
		const updatedData = cloneDeep(savedListData || []);
		const [removed] = updatedData.splice(source, 1);
		updatedData.splice(destination, 0, removed);
		
		const ordered = resetOrdinals(updatedData);
		setSavedListData(ordered);
	}

	const deleteList = (id: number) => {
		const savedData = cloneDeep(savedListData || []);

		const withoutList = savedData.filter((list, i) => {
			const matched = parseInt((list as TodoList).id, 10) === id;
			return !matched;
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