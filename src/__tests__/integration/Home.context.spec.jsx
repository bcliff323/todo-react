import Home from "../../pages/Home";
import { LocalStorageContext } from "../../context/LocalStorageContext";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { givenTodoLists } from '../../helpers';
import { HashRouter, Routes, Route } from "react-router-dom";

describe('<Home /> Context integration', () => {
	const ctx = {
		savedListData: givenTodoLists(['One']),
		setSavedListData: jest.fn()
	};

	beforeEach(() => {
		render(
			<HashRouter>
				<Routes>
					<Route path="*" element={
						<LocalStorageContext.Provider value={ctx}>
							<Home />
						</LocalStorageContext.Provider>
					} />
				</Routes>
			</HashRouter>
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call setSavedListData on list form submit', async () => {
		const newValue = 'Todo';
		const input = screen.getByTestId('form-input');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: newValue } });
		await userEvent.click(button);

		expect(ctx.setSavedListData).toHaveBeenCalledTimes(1);
	});

	it('should call setSavedListData on list delete', async () => {
		const deletable = await screen.findByText('Delete');
		await userEvent.click(deletable);

		const confirmButton = await screen.findByTestId('confirm-delete');
		await userEvent.click(confirmButton);

		expect(ctx.setSavedListData).toHaveBeenCalledTimes(1);
	});

	it('should not call setSavedList data if user submits empty value', async () => {
		const newValue = '';
		const input = screen.getByTestId('form-input');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: newValue } });
		await userEvent.click(button);

		expect(ctx.setSavedListData).toHaveBeenCalledTimes(0);
	});
});