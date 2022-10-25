import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ErrorBoundary from "../../components/ErrorBoundary";

describe("<ErrorBoundary />", () => {
	const ThrowError = () => {
		throw new Error('Test');
	};

	beforeEach(() => {
		global.console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render children", () => {
		render(
			<ErrorBoundary>
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<div>Child</div>
						} />
					</Routes>
				</MemoryRouter>
			</ErrorBoundary>
		);

		const child = screen.getByText("Child");
		expect(child).toBeInTheDocument();
	});

	it("should display an error message when errors are thrown", async () => {
		render(
			<ErrorBoundary>
				<MemoryRouter initialEntries={[`/`]}>
					<Routes>
						<Route path="/" element={
							<ThrowError />
						} />
					</Routes>
				</MemoryRouter>
			</ErrorBoundary>
		);
		const errorMessage = screen.getByTestId("error-message");
		expect(errorMessage).toBeInTheDocument();
		expect(global.console.error).toHaveBeenCalled();
	});
});