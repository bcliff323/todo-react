import { v4 as uuidv4 } from 'uuid';
import { Status, Todo, TodoList } from './types';

export function givenTodo(title: string): Todo {
	return {
		id: uuidv4(),
		title,
		status: Status.NotStarted,
		ordinal: 0
	};
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