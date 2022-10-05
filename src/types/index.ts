export enum Status {
	NotStarted = "NOT_STARTED",
	Complete = "COMPLETE"
}

export interface Todo {
	id: string;
	title: string;
	status: Status;
	ordinal: number;
}

export interface TodoList {
	id: string;
	title: string;
	todos: Todo[];
	ordinal: number;
}

export interface ListDomain {
	todo_lists: TodoList[];
}

export interface TodoListService {
	addNewList: (title: string) => void;
	updateListTitle: (title: string, id: string) => void;
	deleteList: (id: string) => void;
	addNewTodo: (id: string, todoTitle: string) => void;
	updateTodoOrder: (listId: string, source: number, destination: number) => void;
	updateTodoTitle: (title: string, listId: string, todoId: string) => void;
	deleteTodo: (listId: string, todoId: string) => void;
	updateTodoStatus: (listId: string, todoId: string, isChecked: boolean) => void;
}