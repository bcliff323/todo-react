import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import Deletable from "../../components/Deletable";
import DeleteIcon from "../../components/icons/DeleteIcon";

expect.extend(toHaveNoViolations);

describe("<Deletable />", () => {
	const id = "1";
	const defaultConfirm = "confirm";
	const defaultCancel = "cancel";
	const defaultAriaLabel = "Warning about deleting";
	const defaultWarning = "Are you sure?";
	const defaultButtonLabel = "Delete";
	const defaultHandle = () => { }

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render children", () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const child = screen.getByText("Child");
		expect(child).toBeInTheDocument();
	});

	it("should render a delete button", () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		expect(button).toBeInTheDocument();
	});

	it("should render a delete button label", () => {
		const labelTxt = "Delete This Please";
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={labelTxt}
				showLabel={true}>
				<div>Child</div>
			</Deletable>
		);

		const label = screen.getByText(labelTxt);
		expect(label).toBeInTheDocument();
	});

	it("should launch the modal window", async () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const confirmButton = await screen.findByTestId("confirm-delete");
		const cancelButton = await screen.findByTestId("cancel-delete");

		expect(confirmButton).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
	});

	it("should display accessible modal content", async () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const dialog = await screen.findByTestId('delete-modal');
		const results = await axe(dialog);
		expect(results).toHaveNoViolations();
	});

	it("should display confirm/cancel labels", async () => {
		const confirmMsg = "confirm!";
		const cancelMsg = "cancel!";

		render(
			<Deletable id={id}
				handleDelete={defaultHandle}
				confirmMessage={confirmMsg}
				cancelMessage={cancelMsg}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const confirmButton = await screen.findByTestId("confirm-delete");
		const cancelButton = await screen.findByTestId("cancel-delete");

		expect(confirmButton.textContent).toEqual(confirmMsg);
		expect(cancelButton.textContent).toEqual(cancelMsg);
	})

	it("should allow the user to cancel deletion", async () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const cancelButton = await screen.findByTestId("cancel-delete");
		await userEvent.click(cancelButton);

		expect(screen.queryByTestId("cancel-delete")).not.toBeInTheDocument();
	});

	it("should call a deletion function on confirm button click", async () => {
		const deleteFn = jest.fn();
		const deletionId = 1;

		render(
			<Deletable
				handleDelete={deleteFn}
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false} />
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const cancelButton = await screen.findByTestId("confirm-delete");
		await userEvent.click(cancelButton);

		expect(deleteFn).toHaveBeenCalledTimes(1);
		expect(deleteFn).toBeCalledWith(id);
	});

	it("should not violate accessibility rules when label is visibly hidden", async () => {
		const { container } = render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={false}>
				<div>Child</div>
			</Deletable>
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should not violate accessibility rules when label is shown", async () => {
		const { container } = render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}
				icon={
					<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />
				}
				buttonLabel={defaultButtonLabel}
				showLabel={true}>
				<div>Child</div>
			</Deletable>
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});