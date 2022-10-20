import ListDetail from "../../pages/ListDetail";
import LocalStorageProvider from "../../components/LocalStorageProvider";
import { render, screen, fireEvent, waitFor, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { givenTodoLists, givenTodos } from '../../helpers';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe('<Home />', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when there are no saved todos", () => {
		const listTitle = "List One";
		const lists = givenTodoLists([listTitle]);
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should render the home link", () => {
			const homeLink = screen.getByTestId("home-link");
			expect(homeLink).not.toBeNull();
		});

		it("should render the list title", () => {
			const title = screen.getByText(listTitle);
			expect(title).not.toBeNull();
		});

		it("should render the submit form", () => {
			const input = screen.getByTestId('form-input');
			expect(input.ELEMENT_NODE).toBeTruthy();
		});

		it("should render no todos", () => {
			const todos = screen.queryByTestId('todos');
			expect(todos).not.toBeInTheDocument();
		});
	});

	describe("when there are saved todos", () => {
		const listTitle = "List One";
		const lists = givenTodoLists([listTitle]);
		const todoData = givenTodos(["1", "2", "3"]);
		lists[0].todos = todoData;
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should render the list of todos", () => {
			const todos = screen.queryByTestId('todos');
			expect(todos?.children.length).toEqual(todoData.length);
		});
	});

	describe("when the user adds a todo", () => {
		const lists = givenTodoLists(["List One"]);
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should add the todo item to the list", async () => {
			const newTodoTitle = "New Todo";
			const input = await screen.findByTestId('form-input');
			const submit = await screen.findByTestId('form-submit');

			fireEvent.change(input, { target: { value: newTodoTitle } });
			await userEvent.click(submit);

			const newElement = await screen.findByTestId('todo');
			expect(newElement.textContent).toContain(newTodoTitle);
		});
	});

	describe("when the user deletes a todo", () => {
		const listTitle = "List One";
		const lists = givenTodoLists([listTitle]);
		const todoData = givenTodos(["1"]);
		lists[0].todos = todoData;
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should remove the todo item from the list", async () => {
			let listContainer = await screen.findByTestId('todos');
			expect(listContainer.children.length).toEqual(1);

			const deleteButton = await screen.findByTestId('delete-list-button');
			await userEvent.click(deleteButton);
			const confirmButton = await screen.findByTestId('confirm-delete');
			await userEvent.click(confirmButton);

			const container = screen.queryByTestId('todos');
			await waitFor(() => {
				expect(container).not.toBeInTheDocument();
			})
		});
	});

	describe("when a user selects the todo checkbox", () => {
		const todoTitle = "1";
		const lists = givenTodoLists(["List One"]);
		const todoData = givenTodos([todoTitle]);
		lists[0].todos = todoData;
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});
		it("should strike the todo", async () => {
			const checkbox = screen.getByTestId('check-input-0');
			await userEvent.click(checkbox);

			const stricken = await screen.findByText(todoTitle);
			expect(stricken.classList.contains('line-through')).toEqual(true);
		});

		it("should disable the edit button", async () => {
			const checkbox = screen.getByTestId('check-input-0');
			await userEvent.click(checkbox);

			const editButton = screen.getByTestId('todo-input-0-edit');
			expect(editButton).toBeDisabled();
		});
	});

	describe("when the user edits a todo", () => {
		const listTitle = "List One";
		const lists = givenTodoLists([listTitle]);
		const todoData = givenTodos(["1", "2", "3"]);
		lists[0].todos = todoData;
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should update the text value", async () => {
			const newTodoTitle = "New Todo Title";
			const editButton = screen.getByTestId("todo-input-0-edit");

			await userEvent.click(editButton!);

			const input = await screen.findByTestId("todo-input-0");
			fireEvent.change(input, { target: { value: newTodoTitle } });

			const saveButton = await screen.findByTestId("todo-input-0-save");

			await userEvent.click(saveButton);

			const updatedTitle = await screen.findByText(newTodoTitle);
			expect(updatedTitle).not.toBeNull();
		});
	});

	describe("when the user edits the list title", () => {
		const listTitle = "List One";
		const lists = givenTodoLists([listTitle]);
		const todoData = givenTodos(["1", "2", "3"]);
		lists[0].todos = todoData;
		const id = lists[0].id;

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/${id}`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			);
		});

		it("should update the text value", async () => {
			const newListTitle = "New Title";
			const header = screen.getByTestId("detail-header");
			const editButton = header.querySelector('button');

			await userEvent.click(editButton!);

			const input = await screen.findByTestId("list-title-edit");
			fireEvent.change(input, { target: { value: newListTitle } });

			const saveButton = await screen.findByTestId("list-title-edit-save");

			await userEvent.click(saveButton);

			const updatedTitle = await screen.findByText(newListTitle);
			expect(updatedTitle).not.toBeNull();
		});
	});

	describe("when user somehow navigates to lists page before any lists exist", () => {
		beforeEach(() => {
			global.console.error = jest.fn();
			global.Storage.prototype.getItem = jest.fn();
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/1234`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			)
		});

		it("should display the error message view", () => {
			const errorMessage = screen.getByTestId("error-message");
			const errorButton = screen.getByTestId('error-button');

			expect(errorMessage).toBeInTheDocument();
			expect(errorButton).toBeInTheDocument();
		});

		it("should not render error view lists", async () => {
			const lists = screen.queryByTestId('error-view-lists');
			expect(lists).not.toBeInTheDocument();
		});
	});

	describe("when user navigates to lists page using an invalid list id", () => {
		const lists = givenTodoLists(["List One"]);

		beforeEach(() => {
			global.console.error = jest.fn();
			global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));
			global.Storage.prototype.setItem = jest.fn();

			render(
				<MemoryRouter initialEntries={[`/list/1234`]}>
					<Routes>
						<Route path="/list/:id" element={
							<LocalStorageProvider>
								<ListDetail />
							</LocalStorageProvider>
						} />
					</Routes>
				</MemoryRouter>
			)
		});

		it("should display the error message view", () => {
			const errorMessage = screen.getByTestId("error-message");
			const errorButton = screen.getByTestId('error-button');

			expect(errorMessage).toBeInTheDocument();
			expect(errorButton).toBeInTheDocument();
		});

		it("should render error view lists", async () => {
			const lists = screen.queryByTestId('error-view-lists');
			expect(lists).toBeInTheDocument();
		});
	});
});