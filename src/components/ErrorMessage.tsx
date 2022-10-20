import { useNavigate } from "react-router-dom";
import "../css/styles.css";
import Layout from "./Layout";
import { ErrorTypes } from '../types';
import { LIST_NOT_FOUND_MSG, PAGE_NOT_FOUND_MSG, GENERIC_ERROR_MSG } from '../constants';

type Props = {
	errorType: ErrorTypes
}

export default function MissingList(props: Props) {
	const navigate = useNavigate();

	function getMessage(errType: ErrorTypes) {
		switch (errType) {
			case (ErrorTypes.ListNotFound):
				return LIST_NOT_FOUND_MSG;
			case (ErrorTypes.PageNotFound):
				return PAGE_NOT_FOUND_MSG;
			case (ErrorTypes.GenericError):
			default:
				return GENERIC_ERROR_MSG;
		}
	}

	function directHome() {
		navigate('/');
	}

	return (
		<Layout>
			<div className="my-4 bg-cyan-50 text-indigo-900 p-4 mb-3 rounded">
				<p className="p-4">{getMessage(props.errorType)}</p>
				<button className="my-3 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white block mx-auto"
					onClick={directHome}>
					Let's go!
				</button>
			</div>
		</Layout>
	)
}