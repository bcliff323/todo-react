import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MessageCard from "../../components/MessageCard";

describe("<Deletable />", () => {
	const message = "This is a message";
	const childText = "This is a child";

	beforeEach(() => {
		render(
			<MessageCard message={message}>
				<div>{childText}</div>
			</MessageCard>
		)
	})
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render children", () => {
		const child = screen.getByText(childText);
		expect(child).toBeInTheDocument();
	});

	it("should render an error message", () => {
		const msg = screen.getByText(message);
		expect(msg).toBeInTheDocument();
	});
});