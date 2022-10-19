import { useContext } from 'react';
import LocalStorageProvider from "../../components/LocalStorageProvider";
import { LocalStorageContext } from '../../context/LocalStorageContext';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { givenTodoLists, givenTodos } from '../../helpers';

describe('<ListDetail /> Context integration', () => {
	function TestComponent() {
		const {
			savedListData,
			setSaveListData
		} = useContext(LocalStorageContext);

		return (
			<>
				<h1 data-testid="list-title">
					{savedListData[0].title}
				</h1>
				<button data-testid="save"
					onClick={setSaveListData}>
					Set Saved List Data
				</button>
			</>
		);
	}

	beforeEach(() => {
		const lists = givenTodoLists(["List One"]);
		lists[0].todos = givenTodos(["1", "2", "3"]);

		global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
		global.Storage.prototype.setItem = jest.fn();

		render(
			<LocalStorageProvider>
				<TestComponent />
			</LocalStorageProvider>
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should retrieve items from local storage', async () => {
		const listTitle = await screen.findByTestId('list-title');

		expect(listTitle.textContent).toEqual('List One');
		expect(global.localStorage.getItem).toBeCalledTimes(1);
	});

	it('should make updates in local storage', async () => {
		const saveButton = await screen.findByTestId('save');
		await userEvent.click(saveButton);

		expect(global.localStorage.setItem).toBeCalledTimes(1);
	});
});