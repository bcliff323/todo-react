import { v4 as uuidv4 } from 'uuid';
import { TodoList, Status } from '../types';
import cloneDeep from 'lodash/cloneDeep';

export function addNewList(title: string, todoLists: TodoList[] = []) {
	const newList = {
		id: uuidv4(),
		title: title,
		todos: [],
		ordinal: 0
	};

	const updatedList = cloneDeep(todoLists);

	if (updatedList.length === 0) {
		return [newList];
	}

	updatedList.unshift(newList);

	const ordered = updatedList.map((list, i) => {
		list.ordinal = i;
		return list;
	});

	return ordered;
}

export function deleteList(id: string, todoLists: TodoList[]) {
	const withoutList = todoLists.filter(list => {
		return list.id !== id;
	});
	return withoutList;
}

export function updateListTitle(title: string, id: string, todoLists: TodoList[]) {
	const updatedLists = todoLists.map(list => {
		if (list.id === id) {
			list.title = title;
			return list;
		}
		return list;
	});
	return updatedLists;
}

export function updateTodoOrder(listId: string, source: number, destination: number, todoLists: TodoList[]) {
	const withReOrderedData = todoLists.map((list, i) => {
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

	return withReOrderedData;
}

export function addNewTodo(id: string, todoTitle: string, todoLists: TodoList[]) {
	const newTodo = {
		id: uuidv4(),
		title: todoTitle,
		status: Status.NotStarted,
		ordinal: 0
	};

	const withNewTodo = todoLists.map(list => {
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

	return withNewTodo;
}

export function updateTodoTitle(title: string, listId: string, todoId: string, todoLists: TodoList[]) {
	const withUpdatedTitle = todoLists.map(list => {
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

	return withUpdatedTitle;
}

export function deleteTodo(listId: string, todoId: string, todoLists: TodoList[]) {
	const withoutDeletedTodo = todoLists.map(list => {
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

	return withoutDeletedTodo;
}

export function updateTodoStatus(listId: string, todoId: string, isChecked: boolean, todoLists: TodoList[]) {
	const withUpdatedStatus = todoLists.map(list => {
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

	return withUpdatedStatus;
}
