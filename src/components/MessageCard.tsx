import { ReactNode } from "react";
import "../css/styles.css";

type Props = {
	message: string;
	children?: ReactNode;
};

export default function MessageCard(props: Props) {
	const { message, children } = props;
	return (
		<div className="my-4 bg-cyan-50 text-indigo-900 p-4 mb-3 rounded">
			<p data-testid="error-message" className="p-4">{message}</p>
			{children}
		</div>
	)
}