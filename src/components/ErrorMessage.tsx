import Layout from "./Layout";
import { ErrorTypes } from '../types';
import { LIST_NOT_FOUND_MSG, PAGE_NOT_FOUND_MSG, GENERIC_ERROR_MSG } from '../constants';
import { LocalStorageContext } from "../context/LocalStorageContext";
import { useContext } from "react";
import ClipboardIcon from "./icons/ClipboardIcon";
import MessageCard from "./MessageCard";
import "../css/styles.css";
import { Link } from "react-router-dom";

type Props = {
	errorType: ErrorTypes
}

export default function MissingList(props: Props) {
	const {
		savedListData
	} = useContext(LocalStorageContext);
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

	return (
		<Layout>
			<MessageCard message={getMessage(props.errorType)}>
				<div className="flex">
					<Link data-testid="error-button"
						className="my-3 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white inline-block mx-auto"
						to="/">
						Let's go!
					</Link>
				</div>
			</MessageCard>
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