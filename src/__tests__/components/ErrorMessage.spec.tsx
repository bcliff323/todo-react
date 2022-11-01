import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import { givenTodoLists } from "../../helpers";
import ErrorMessage from "../../components/ErrorMessage";
import LocalStorageProvider from "../../components/LocalStorageProvider";
import { ErrorTypes } from "../../types";
import { LIST_NOT_FOUND_MSG, PAGE_NOT_FOUND_MSG } from "../../constants";

expect.extend(toHaveNoViolations);

describe("<ErrorMessage />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should display a 404 error message", () => {
		render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={
						<ErrorMessage errorType={ErrorTypes.PageNotFound} />
					} />
				</Routes>
			</MemoryRouter>
		);

		const message = screen.getByTestId("error-message");
		expect(message.textContent).toEqual(PAGE_NOT_FOUND_MSG);
	});

	it("should not violate accessibility rules when showing a 404 message", async () => {
		const { container } = render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={
						<ErrorMessage errorType={ErrorTypes.PageNotFound} />
					} />
				</Routes>
			</MemoryRouter>
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should display a missing list error message", () => {
		render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={
						<ErrorMessage errorType={ErrorTypes.ListNotFound} />
					} />
				</Routes>
			</MemoryRouter>
		);

		const message = screen.getByTestId("error-message");
		expect(message.textContent).toEqual(LIST_NOT_FOUND_MSG);
	});

	it('should display a link that directs to the homepage', () => {
		render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={
						<ErrorMessage errorType={ErrorTypes.ListNotFound} />
					} />
				</Routes>
			</MemoryRouter>
		);

		const homeLink = screen.getByTestId("error-button");
		expect(homeLink).toHaveAttribute('href', '/');
	});

	it("should display list suggestion links if lists are saved", () => {
		const lists = givenTodoLists(["List One", "List Two"]);
		global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));

		render(
			<MemoryRouter initialEntries={[`/error`]}>
				<Routes>
					<Route path="/error" element={
						<LocalStorageProvider>
							<ErrorMessage errorType={ErrorTypes.ListNotFound} />
						</LocalStorageProvider>
					} />
				</Routes>
			</MemoryRouter>
		);

		const links = screen.getByTestId("error-view-lists");
		expect(links.children.length).toEqual(2);
	});

	it("should omit list suggestion links if no lists are saved", () => {
		global.Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

		render(
			<MemoryRouter initialEntries={[`/error`]}>
				<Routes>
					<Route path="/error" element={
						<LocalStorageProvider>
							<ErrorMessage errorType={ErrorTypes.ListNotFound} />
						</LocalStorageProvider>
					} />
				</Routes>
			</MemoryRouter>
		);

		const links = screen.queryByTestId("error-view-lists");
		expect(links).not.toBeInTheDocument();
	});

	it("should not violate accessibility rules when displaying a missing list message", async () => {
		const lists = givenTodoLists(["List One", "List Two"]);
		global.Storage.prototype.getItem = jest.fn(() => JSON.stringify(lists));

		const { container } = render(
			<MemoryRouter initialEntries={[`/error`]}>
				<Routes>
					<Route path="/error" element={
						<LocalStorageProvider>
							<ErrorMessage errorType={ErrorTypes.ListNotFound} />
						</LocalStorageProvider>
					} />
				</Routes>
			</MemoryRouter>
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});