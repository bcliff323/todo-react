import ErrorMessage from "../components/ErrorMessage";
import { ErrorTypes } from "../types";

type Props = {
	children?: React.ReactNode;
};

export default function NotFound(props: Props) {
	return (
		<ErrorMessage errorType={ErrorTypes.PageNotFound} />
	)
}