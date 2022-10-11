import { givenTodoLists, givenTodos } from '../../helpers';
import {
	addNewList,
	addNewTodo,
	deleteList,
	deleteTodo,
	updateListTitle,
	updateTodoOrder,
	updateTodoStatus,
	updateTodoTitle
} from '../../services/TodoListService';
import { Status } from '../../types';

describe('addNewList', () => {
	it('adds a new todo list to the beginning of the lists', () => {
		const lists = givenTodoLists(['My List']);
		const updated = addNewList("Second List", lists);

		// The correct title is added
		expect(updated[0].title).toEqual("Second List");
		// The original list is still in the list, moved down 1 place
		expect(updated[1].title).toEqual(lists[0].title);
		// The new list is now one longer than the original list
		expect(updated.length).toEqual(lists.length + 1);
	});

	it('should maintain correct ordinals', () => {
		const lists = givenTodoLists(['My List', 'Second List']);
		const updated = addNewList("Third List", lists);

		// addNew re-orders the ordinals to always be [0,1,2, ...]
		updated.forEach((list, i) => {
			expect(list.ordinal).toEqual(i);
		});
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['My List']);

		addNewList("Second List", lists);
		expect(lists[0].title).toEqual("My List");
	});
});

describe('deleteList', () => {
	it('should remove lists by id', () => {
		const lists = givenTodoLists(['First List', 'Second List']);
		const listId = lists[0].id;

		const updatedLists = deleteList(listId, lists);
		const updatedIds = updatedLists.map(l => l.id);

		// The list has been removed
		expect(updatedIds.includes(listId)).toBeFalsy();
	});

	it('should maintain the correct list order', () => {
		const lists = givenTodoLists(['List one', 'List two', 'List three']);
		const listId = lists[1].id;
		const updatedList = deleteList(listId, lists);

		// deleteList re-orders the ordinals to always be [0,1,2, ...]
		updatedList.forEach((list, i) => {
			expect(list.ordinal).toEqual(i);
		});
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one', 'List two']);
		const listId = lists[0].id;
		const deletedList = deleteList(listId, lists);

		expect(deletedList.length).toEqual(1);
		expect(lists.length).toEqual(2);
	});
});

describe('updateListTitle', () => {
	it('should update the correct list title', () => {
		const lists = givenTodoLists(['List one', 'List two', 'List three']);
		const listId = lists[1].id;
		const newTitle = 'New list name';
		const updatedList = updateListTitle(newTitle, listId, lists);

		// Title of list matching intended id has been updated
		expect(updatedList.find(l => l.id === listId)?.title).toBe(newTitle);
	});

	it('should not mutate lists passed in', () => {
		const oldTitle = 'List one';
		const lists = givenTodoLists([oldTitle, 'List two', 'List three']);
		const listId = lists[0].id;
		updateListTitle('New list name', listId, lists);

		expect(lists.find(l => l.id === listId)?.title).toBe(oldTitle);
	});
});

describe('addNewTodo', () => {
	it('should add a new todo to the list if there are no todos', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		const newTodoTitle = 'new';

		// Verify this list has no todos
		expect(list.todos.length).toEqual(0);

		const withNewTodo = addNewTodo(list.id, newTodoTitle, lists);

		const todos = withNewTodo.find(l => l.id === list.id)?.todos;
		const newTodo = todos?.find(t => t.title === newTodoTitle);

		// A todo has been added with the correct title
		expect(newTodo).toBeTruthy();
	});

	it('should add a new todo to the top of an existing list', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		const newTodoTitle = 'new';
		const withNewTodo = addNewTodo(list.id, newTodoTitle, lists);

		const todos = withNewTodo.find(l => l.id === list.id)?.todos;
		const newTodo = todos?.find(t => t.title === newTodoTitle);

		// A new todo has been added to the beginning/top, ordinal 0
		expect(newTodo?.ordinal).toEqual(0);
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		const newTodoTitle = 'new';
		addNewTodo(list.id, newTodoTitle, lists);

		expect(list.todos.find(l => l.title === newTodoTitle)).toBeFalsy();
	});
});

describe('deleteTodo', () => {
	it('should remove todos by list and todo id', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);

		const withoutDeletedTodo = deleteTodo(list.id, list.todos[0].id, lists);
		const todos = withoutDeletedTodo.find(l => l.id === list.id)?.todos;

		// There is one fewer todo in the list
		expect(todos?.length).toEqual(2);
		// There is no longer a todo list matching the id passed to the function
		expect(todos?.find(t => t.id === list.todos[0].id)).toBeFalsy();
	});

	it('should maintain correct todo order', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);

		const withoutDeletedTodo = deleteTodo(list.id, list.todos[1].id, lists);

		// deleteTodo resets the ordinals after the todo is deleted
		const todos = withoutDeletedTodo.find(l => l.id === list.id)?.todos;
		todos?.forEach((t, i) => {
			expect(t.ordinal).toEqual(i);
		});
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		deleteTodo(list.id, list.todos[1].id, lists);

		expect(list.todos.length).toEqual(3);
	});
});

describe('updateTodoTitle', () => {
	it('should update the correct title', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		const newTitle = 'new';

		// Searches through all lists, first matching a list id, then searching through todos until a todo id is matched, before updating the title
		const withUpdatedTodoTitle = updateTodoTitle(newTitle, list.id, list.todos[0].id, lists);

		const todos = withUpdatedTodoTitle.find(l => l.id === list.id)?.todos;
		const successfullyUpdated = todos?.find(t => t.title === newTitle);

		// The title of the todo matching both the list id and todo id, has been updated
		expect(successfullyUpdated).toBeTruthy();
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		const newTitle = 'new';

		updateTodoTitle(newTitle, list.id, list.todos[0].id, lists);
		const hasChanged = list.todos.find(t => t.title === newTitle);

		expect(hasChanged).toBeFalsy();
	});
});

describe('updateTodoOrder', () => {
	it('should swap order correctly', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);

		const reorderedTodos1 = updateTodoOrder(list.id, 0, 2, lists);
		const todosTitles1 = reorderedTodos1
			.find(l => l.id === list.id)
			?.todos.map(t => t.title);

		// The todo at position 0 has been moved to the end of the list. The two other items were moved up one position.
		expect(todosTitles1).toEqual(['two', 'three', 'one']);

		const reorderedTodos2 = updateTodoOrder(list.id, 1, 0, lists);
		const todosTitles2 = reorderedTodos2
			.find(l => l.id === list.id)
			?.todos.map(t => t.title);

		// The todo at the second position was moved to be top/beginning. Pushing the first todo down to the second position.
		expect(todosTitles2).toEqual(['two', 'one', 'three']);
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);

		updateTodoOrder(list.id, 0, 1, lists);

		const originalTitles = list.todos.map(t => t.title);
		expect(originalTitles).toEqual(['one', 'two', 'three']);
	});
});

describe('updateTodoStatus', () => {
	it('should update the status correctly', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);
		const todoIndex = 1;

		// Passing true indicates that the todo is complete
		const withUpdatedStatus = updateTodoStatus(list.id, list.todos[todoIndex].id, true, lists);

		const todos = withUpdatedStatus.find(l => l.id === list.id)?.todos || [];

		// Status of the todo at index 1 should be complete. Otherwise they should all be not started.
		todos.forEach((t, i) => {
			if (i === todoIndex) {
				expect(t.status).toEqual(Status.Complete);
			} else {
				expect(t.status).toEqual(Status.NotStarted);
			}
		});
	});

	it('should not mutate lists passed in', () => {
		const lists = givenTodoLists(['List one']);
		const list = lists[0];
		list.todos = givenTodos(['one', 'two', 'three']);

		updateTodoStatus(list.id, list.todos[0].id, true, lists);

		list.todos.forEach(t => {
			expect(t.status).toEqual(Status.NotStarted);
		});
	});
});