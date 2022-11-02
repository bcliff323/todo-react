import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import MessageCard from "../../components/MessageCard";

expect.extend(toHaveNoViolations);

describe("<Deletable />", () => {
	const message = "This is a message";
	const childText = "This is a child";

	it("should render children", () => {
		render(
			<MessageCard message={message}>
				<div>{childText}</div>
			</MessageCard>
		);

		const child = screen.getByText(childText);
		expect(child).toBeInTheDocument();
	});

	it("should render an error message", () => {
		render(
			<MessageCard message={message}>
				<div>{childText}</div>
			</MessageCard>
		);

		const msg = screen.getByText(message);
		expect(msg).toBeInTheDocument();
	});

	it("should not violate accessibility rules", async () => {
		const { container } = render(
			<MessageCard message={message}>
				<div>{childText}</div>
			</MessageCard>
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	})
});