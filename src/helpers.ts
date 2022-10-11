import { v4 as uuidv4 } from 'uuid';
import { Status, Todo, TodoList } from './types';

export function givenTodos(titles: string[]): Todo[] {
	let todos = [];
	for (let i = 0; i < titles.length; i++) {
		todos.push({
			id: uuidv4(),
			title: titles[i],
			status: Status.NotStarted,
			ordinal: i
		});
	}
	return todos;
}

export function givenTodoLists(titles: string[]): TodoList[] {
	let lists = [];
	for (let i = 0; i < titles.length; i++) {
		lists.push({
			id: uuidv4(),
			title: titles[i],
			todos: [] as Todo[],
			ordinal: i
		});
	}
	return lists;
}