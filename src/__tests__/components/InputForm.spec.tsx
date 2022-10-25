import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Deletable from "../../components/Deletable";

describe("<InputForm />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render children", () => {
		expect(true).toBe(false);
	});
});