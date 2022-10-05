import { LocalStorageContext } from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
import { TodoList } from '../types';

type Props = {
	children?: React.ReactNode;
};

export default function LocalStorageProvider({ children }: Props) {
	const [savedListData, setSavedListData] = useLocalStorage<TodoList[]>("todo-lists");

	const ctx = {
		savedListData,
		setSavedListData
	};

	return (
		<LocalStorageContext.Provider value={ctx}>
			{children}
		</LocalStorageContext.Provider>
	)
}