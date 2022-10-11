import { v4 as uuidv4 } from 'uuid';
import { TodoList, Status } from '../types';
import cloneDeep from 'lodash/cloneDeep';

function order(list: TodoList, i: number) {
	list.ordinal = i;
	return list;
}

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

	const ordered = updatedList.map(order);
	return ordered;
}

export function deleteList(id: string, todoLists: TodoList[]) {
	const withoutList = todoLists.filter(list => {
		return list.id !== id;
	});

	const ordered = withoutList.map(order);
	return ordered;
}

export function updateListTitle(title: string, id: string, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const updatedLists = lists.map(list => {
		if (list.id === id) {
			list.title = title;
			return list;
		}
		return list;
	});

	return updatedLists;
}

export function addNewTodo(id: string, todoTitle: string, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const newTodo = {
		id: uuidv4(),
		title: todoTitle,
		status: Status.NotStarted,
		ordinal: 0
	};

	const withNewTodo = lists.map(list => {
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

export function deleteTodo(listId: string, todoId: string, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const withoutDeletedTodo = lists.map(list => {
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

export function updateTodoTitle(title: string, listId: string, todoId: string, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const withUpdatedTitle = lists.map(list => {
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

export function updateTodoOrder(listId: string, source: number, destination: number, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const withReOrderedData = lists.map((list, i) => {
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

export function updateTodoStatus(listId: string, todoId: string, isChecked: boolean, todoLists: TodoList[]) {
	const lists = cloneDeep(todoLists);

	const withUpdatedStatus = lists.map(list => {
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
