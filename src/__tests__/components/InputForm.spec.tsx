import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import InputForm from "../../components/InputForm";

expect.extend(toHaveNoViolations);

describe("<InputForm />", () => {
	const handleSubmitFn = jest.fn();
	const placeholderText = "New Item";
	const updatedValue = "New List Was Created";
	const labelText = "List Title";

	beforeEach(() => {
		render(
			<InputForm handleSubmit={handleSubmitFn}
				placeholder={placeholderText}
				label={labelText} />
		)
	})
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render an input field", () => {
		const input = screen.getByTestId("form-input");
		expect(input).toBeInTheDocument();
	});

	it("should render a placeholder", () => {
		const input = screen.getByPlaceholderText(placeholderText);
		expect(input).toBeInTheDocument();
	});

	it("should render a field label", () => {
		const label = screen.getByLabelText(labelText);
		expect(label).toBeInTheDocument();
	});

	it("should render a submit button", () => {
		const button = screen.getByTestId("form-submit");
		expect(button).toBeInTheDocument();
	});

	it("should fire the handle submit with the correct form field value", () => {
		const input = screen.getByTestId("form-input");
		fireEvent.change(input, { target: { value: updatedValue } });

		const form = screen.getByTestId('form');
		fireEvent.submit(form);

		expect(handleSubmitFn).toHaveBeenCalledTimes(1);
		expect(handleSubmitFn).toHaveBeenLastCalledWith(updatedValue);
	});

	it("should not violate accessibility rules", async () => {
		const form = screen.getByTestId("form");
		const results = await axe(form);
		expect(results).toHaveNoViolations();
	});
});