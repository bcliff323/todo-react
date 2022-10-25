import React, { ReactNode, ErrorInfo } from "react";
import { GENERIC_ERROR_MSG } from "../constants";
import Layout from "./Layout";
import MessageCard from "./MessageCard";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}


	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Layout>
					<MessageCard message={GENERIC_ERROR_MSG} />
				</Layout>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;