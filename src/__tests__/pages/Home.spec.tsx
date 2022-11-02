import Home from "../../pages/Home";
import LocalStorageProvider from "../../components/LocalStorageProvider";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { givenTodoLists } from '../../helpers';
import { MemoryRouter, Route, Routes } from "react-router-dom";

expect.extend(toHaveNoViolations);

describe('<Home />', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should not violate accessibility rules", async () => {
		const listTitles = ["List One", "List Two"];
		const lists = givenTodoLists(listTitles);
		global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));

		const { container } = render(
			<MemoryRouter initialEntries={[`/`]}>
				<Routes>
					<Route path="/" element={
						<LocalStorageProvider>
							<Home />
						</LocalStorageProvider>
					} />
				</Routes>
			</MemoryRouter>
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("when there is no saved data", () => {
		beforeEach(() => {
			render(
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<LocalStorageProvider>
								<Home />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should render the submit form", async () => {
			const input = await screen.findByTestId('form-input');
			expect(input.ELEMENT_NODE).toBeTruthy();
		});

		it("should render no lists", async () => {
			const lists = await screen.findByTestId('todo-lists');
			expect(lists.childNodes.length).toEqual(0);
		});
	});

	describe("when there is saved data", () => {
		const listTitles = ["List One", "List Two"];

		beforeEach(() => {
			const lists = givenTodoLists(listTitles);

			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<LocalStorageProvider>
								<Home />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should render all saved lists", async () => {
			const lists = await screen.findAllByTestId('todo-list');

			expect(lists.length).toEqual(2);

			lists.forEach((l, i) => {
				expect(l.textContent).toContain(listTitles[i]);
			})
		});
	});

	describe("when user adds a new list", () => {
		beforeEach(() => {
			render(
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<LocalStorageProvider>
								<Home />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it('should add the new list to the page', async () => {
			const newListTitle = "New List";
			const input = await screen.findByTestId('form-input');
			const submit = await screen.findByTestId('form-submit');

			fireEvent.change(input, { target: { value: newListTitle } });
			await userEvent.click(submit);

			const newElement = await screen.findByTestId('todo-list');
			expect(newElement.textContent).toContain(newListTitle);
		});
	});

	describe("when the user deletes a list", () => {
		beforeEach(() => {
			const lists = givenTodoLists(["List One"]);

			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<LocalStorageProvider>
								<Home />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should remove the list from the UI on confirmation", async () => {
			let listContainer = await screen.findByTestId('todo-lists');
			expect(listContainer.children.length).toEqual(1);

			const deleteButton = await screen.findByTestId('delete-list-button');
			await userEvent.click(deleteButton);
			const confirmButton = await screen.findByTestId('confirm-delete');
			await userEvent.click(confirmButton);

			listContainer = await screen.findByTestId('todo-lists');
			expect(listContainer.children.length).toEqual(0);
		});

		it("should allow the user to cancel deletion", async () => {
			let listContainer = await screen.findByTestId('todo-lists');
			expect(listContainer.children.length).toEqual(1);

			const deleteButton = await screen.findByTestId('delete-list-button');
			await userEvent.click(deleteButton);
			const cancelButton = await screen.findByTestId('cancel-delete');
			await userEvent.click(cancelButton);

			listContainer = await screen.findByTestId('todo-lists');
			expect(listContainer.children.length).toEqual(1);
		})
	});

	describe("when the user selects a list", () => {
		beforeEach(() => {
			const lists = givenTodoLists(["List One"]);

			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<LocalStorageProvider>
								<Home />
							</LocalStorageProvider>
						} />
						<Route path="/list/:id" element={
							<div data-testid="list-page"></div>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should direct to the list detail page", async () => {
			const listLink = await screen.findByTestId('list-link');
			await userEvent.click(listLink);

			const newPage = await screen.findByTestId('list-page');
			expect(newPage).toBeTruthy();
		});
	});
});