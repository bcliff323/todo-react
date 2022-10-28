import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Deletable from "../../components/Deletable";

describe("<Deletable />", () => {
	const id = "1";
	const defaultConfirm = "confirm";
	const defaultCancel = "cancel";
	const defaultAriaLabel = "Warning about deleting";
	const defaultWarning = "Are you sure?";
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
				warningMessage={defaultWarning}>
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
				warningMessage={defaultWarning}>
				<div>Child</div>
			</Deletable>
		);

		const button = screen.getByTestId("delete-list-button");
		expect(button).toBeInTheDocument();
	});

	it("should launch the modal window", async () => {
		render(
			<Deletable
				id={id}
				confirmMessage={defaultConfirm}
				cancelMessage={defaultCancel}
				handleDelete={defaultHandle}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}>
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

	it("should display confirm/cancel labels", async () => {
		const confirmMsg = "confirm!";
		const cancelMsg = "cancel!";

		render(
			<Deletable id={id}
				handleDelete={defaultHandle}
				confirmMessage={confirmMsg}
				cancelMessage={cancelMsg}
				ariaLabel={defaultAriaLabel}
				warningMessage={defaultWarning}>
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
				warningMessage={defaultWarning}>
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
				warningMessage={defaultWarning} />
		);

		const button = screen.getByTestId("delete-list-button");
		await userEvent.click(button);

		const cancelButton = await screen.findByTestId("confirm-delete");
		await userEvent.click(cancelButton);

		expect(deleteFn).toHaveBeenCalledTimes(1);
		expect(deleteFn).toBeCalledWith(id);
	});
});