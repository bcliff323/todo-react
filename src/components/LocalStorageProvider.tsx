import { LocalStorageContext } from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
import useTodoList from '../services/TodoListService';
import { v4 as uuidv4 } from 'uuid';
import { TodoList, Status } from '../types';

type Props = {
	children?: React.ReactNode;
};

export default function LocalStorageProvider({ children }: Props) {
	const [savedListData, setSavedListData] = useLocalStorage<TodoList[]>("todo-lists");
	const todoLists = useTodoList(savedListData, setSavedListData);

	const ctx = {
		savedListData,
		...todoLists
	};

	return (
		<LocalStorageContext.Provider value={ctx}>
			{children}
		</LocalStorageContext.Provider>
	)
}