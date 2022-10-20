import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { ErrorTypes } from '../types';
import { LIST_NOT_FOUND_MSG, PAGE_NOT_FOUND_MSG, GENERIC_ERROR_MSG } from '../constants';
import { LocalStorageContext } from "../context/LocalStorageContext";
import { useContext } from "react";
import ClipboardIcon from "./icons/ClipboardIcon";
import "../css/styles.css";

type Props = {
	errorType: ErrorTypes
}

export default function MissingList(props: Props) {
	const {
		savedListData
	} = useContext(LocalStorageContext);
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
				<p data-testid="error-message" className="p-4">{getMessage(props.errorType)}</p>
				<button data-testid="error-button"
					className="my-3 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white block mx-auto"
					onClick={directHome}>
					Let's go!
				</button>
			</div>
			{savedListData && savedListData.length > 0 &&
				<div className="flex justify-center">
					<div>
						<p className="text-indigo-200 mb-2 pt-2">Were you looking for these lists?</p>
						<div data-testid="error-view-lists" className="text-cyan-300">
							{savedListData.map((l, i) =>
								<Link data-testid="error-view-list"
									key={i}
									className="flex hover:text-cyan-50"
									to={`/list/${l.id}`}>
									<ClipboardIcon /> {l.title}
								</Link>
							)}
						</div>
					</div>
				</div>
			}
		</Layout>
	)
}