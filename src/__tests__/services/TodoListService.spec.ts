import { givenTodoLists } from '../../helpers';
import {
	addNewList
} from '../../services/TodoListService';

describe('addNew list', () => {
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
