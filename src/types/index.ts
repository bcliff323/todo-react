export enum ErrorTypes {
	ListNotFound = "LIST_NOT_FOUND",
	PageNotFound = "PAGE_NOT_FOUND",
	GenericError = "GENERIC_ERROR"
}

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