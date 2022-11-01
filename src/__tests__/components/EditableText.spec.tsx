import { findByRole, fireEvent, queryByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import EditableText from "../../components/EditableText";

expect.extend(toHaveNoViolations);

describe("<EditableText />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should display un-editable text by default", async () => {
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={() => { }} testId="edit-text" />
		);

		const text = screen.getByText(content);
		expect(text).toBeInTheDocument();

		const editInput = await screen.queryByTestId('edit-text');
		expect(editInput).not.toBeInTheDocument();
	});

	it("should not violate accessibility rules by default", async () => {
		const content = "Text Here";

		const { container } = render(
			<EditableText text={content} saveText={() => { }} testId="edit-text" />
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should show editable field when user selects edit button", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		// The plain text element should be hidden
		const text = screen.queryByText(content);
		expect(text).not.toBeInTheDocument();

		// The input element should appear
		const input = screen.getByTestId('edit-text');
		expect(input).toBeInTheDocument();
	});

	it("should not violate accessibility rules in edit-mode", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		const { container } = render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should show the save button when the user selects the edit button", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const saveButton = screen.getByTestId("edit-text-save");
		await userEvent.click(saveButton);

		expect(screen.queryByTestId("edit-text-save")).not.toBeInTheDocument();
	});

	it("should hide the editable field when the user selects save button", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const saveButton = screen.getByTestId('edit-text-save');
		await userEvent.click(saveButton);

		expect(screen.queryByTestId("edit-text")).not.toBeInTheDocument();
	});

	it("should save the text when the user selects the save button", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";
		const updatedContent = "New text";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const input = screen.getByTestId('edit-text');
		fireEvent.change(input, { target: { value: updatedContent } });

		const saveButton = screen.getByTestId('edit-text-save');
		await userEvent.click(saveButton);

		expect(saveFn).lastCalledWith(updatedContent);
	});

	it("should save the text when the user hits enter with the field focused", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";
		const updatedContent = "New text";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const input = screen.getByTestId('edit-text');
		fireEvent.change(input, { target: { value: updatedContent } });

		const form = screen.getByTestId('edit-text-form');
		fireEvent.submit(form);

		expect(saveFn).lastCalledWith(updatedContent);
	});

	it("should hide the save button when the user selects save", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const saveButton = screen.getByTestId("edit-text-save");
		await userEvent.click(saveButton);

		expect(screen.queryByTestId("edit-text-save")).not.toBeInTheDocument();
	});

	it("should hide the save button when the user submits the form", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";
		const updatedContent = "New text";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const input = screen.getByTestId('edit-text');
		fireEvent.change(input, { target: { value: updatedContent } });

		const form = screen.getByTestId('edit-text-form');
		fireEvent.submit(form);

		expect(screen.queryByTestId("edit-text-save")).not.toBeInTheDocument();
	});

	it("should show the un-editable text when the user submits the form", async () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" />
		);

		const editButton = screen.getByTestId("edit-text-edit");
		await userEvent.click(editButton);

		const saveButton = screen.getByTestId("edit-text-save");
		await userEvent.click(saveButton);

		const uneditable = screen.getByTestId('edit-text-text');

		expect(uneditable).toBeInTheDocument();
	});

	it("should allow the text to be stricken", () => {
		const saveFn = jest.fn();
		const content = "Text Here";

		render(
			<EditableText text={content} saveText={saveFn} testId="edit-text" strike={true} />
		);

		const text = screen.getByTestId('edit-text-text');
		expect(text.classList.contains('line-through')).toBe(true);
	});
});