import { givenTodoLists } from '../../helpers';
import {
	addNewList,
	deleteList
} from '../../services/TodoListService';

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
		deleteList(listId, lists);

		expect(lists.length).toEqual(2);
	});
})
