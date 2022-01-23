import {createContext, useState, useContext, useEffect} from 'react';
import {LocalStorageContext} from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import {TodoList, Todo, Status} from '../types';

type Props = {
  children?: React.ReactNode;
};

export default function LocalStorageProvider({children}: Props) {
	const [savedListData, setSavedListData] = useLocalStorage<object[]>("todo-lists");

	const resetOrdinals = (savedData: object[]) => savedData
		.map((list, i) => {
			(list as TodoList | Todo).ordinal = i;
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

	const addNewTodo = (id: string, todoTitle: string) => {
		const savedData = cloneDeep(savedListData || []);
		const newTodo = {
			id: uuidv4(),
			title: todoTitle,
			status: Status.NotStarted,
			ordinal: 0
		};

		const withNewTodo = savedData.map((list, i) => {
			if ((list as TodoList).id === id) {
				const todos = (list as TodoList).todos;
				todos.unshift(newTodo);
				todos.forEach((todo: Todo, i: number) => {
					todo.ordinal = i;
				})
				return list;
			}
			return list;
		})
		
		setSavedListData(withNewTodo);
	}

	const ctx = {
		savedListData,
		addNewList,
		updateListTitle,
		updateListOrder,
		deleteList,
		addNewTodo
	};
	
	return (
		<LocalStorageContext.Provider value={ctx}>
      {children}
    </LocalStorageContext.Provider>
	)
}