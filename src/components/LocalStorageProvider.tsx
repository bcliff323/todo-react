import { LocalStorageContext } from '../context/LocalStorageContext';
import useLocalStorage from 'use-local-storage';
import { v4 as uuidv4 } from 'uuid';
import { TodoList, Status } from '../types';

type Props = {
	children?: React.ReactNode;
};

export default function LocalStorageProvider({ children }: Props) {
	const [savedListData, setSavedListData] = useLocalStorage<TodoList[]>("todo-lists");

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

		savedListData.unshift(newList);

		const ordered = savedListData.map((list, i) => {
			list.ordinal = i;
			return list;
		});

		setSavedListData(ordered);
	}

	const updateListTitle = (title: string, id: string) => {
		const savedData = savedListData || [];

		setSavedListData(savedData.map(list => {
			if (list.id === id) {
				list.title = title;
				return list;
			}
			return list;
		}));
	}

	const updateTodoOrder = (listId: string, source: number, destination: number) => {
		const savedData = savedListData || [];

		const withReOrderedData = savedData.map((list, i) => {
			if (list.id === listId) {
				const todos = list.todos
				const [removed] = todos.splice(source, 1);
				todos.splice(destination, 0, removed);
				todos.forEach((t, i) => {
					t.ordinal = i;
				})
				return list;
			}
			return list;
		});

		setSavedListData(withReOrderedData);
	}

	const deleteList = (id: string) => {
		const savedData = savedListData || [];

		const withoutList = savedData.filter(list => {
			return list.id !== id;
		});

		setSavedListData(withoutList);
	}

	const addNewTodo = (id: string, todoTitle: string) => {
		const savedData = savedListData || [];
		const newTodo = {
			id: uuidv4(),
			title: todoTitle,
			status: Status.NotStarted,
			ordinal: 0
		};

		const withNewTodo = savedData.map(list => {
			if (list.id === id) {
				const todos = list.todos;
				todos.unshift(newTodo);
				todos.forEach((todo, i) => {
					todo.ordinal = i;
				});
				return list;
			}
			return list;
		})

		setSavedListData(withNewTodo);
	}

	const updateTodoTitle = (title: string, listId: string, todoId: string) => {
		const savedData = savedListData || [];

		const withUpdatedTitle = savedData.map(list => {
			if (list.id === listId) {
				const todos = list.todos;
				todos.forEach(todo => {
					if (todo.id === todoId) {
						todo.title = title;
					}
				});
				return list;
			}
			return list;
		});

		setSavedListData(withUpdatedTitle);
	}

	const deleteTodo = (listId: string, todoId: string) => {
		const savedData = savedListData || [];

		const withoutDeletedTodo = savedData.map(list => {
			if (list.id === listId) {
				const todos = list.todos;
				const deletedIndex = todos.findIndex(todo => todo.id === todoId);
				todos.splice(deletedIndex, 1);
				todos.forEach((todo, i) => {
					todo.ordinal = i;
				});
				return list;
			}
			return list;
		});

		setSavedListData(withoutDeletedTodo);
	}

	function updateTodoStatus(listId: string, todoId: string, isChecked: boolean) {
		const savedData = savedListData || [];

		const withUpdatedStatus = savedData.map(list => {
			if (list.id === listId) {
				const todos = list.todos;
				todos.forEach(todo => {
					if (todo.id === todoId) {
						todo.status = isChecked ? Status.Complete : Status.NotStarted;
					}
				});
				return list;
			}
			return list;
		});

		setSavedListData(withUpdatedStatus);
	}

	const ctx = {
		savedListData,
		addNewList,
		updateListTitle,
		updateTodoOrder,
		deleteList,
		addNewTodo,
		updateTodoTitle,
		deleteTodo,
		updateTodoStatus
	};

	return (
		<LocalStorageContext.Provider value={ctx}>
			{children}
		</LocalStorageContext.Provider>
	)
}