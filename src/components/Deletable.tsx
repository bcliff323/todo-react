import { useState } from 'react';
import { Dialog } from "@reach/dialog";
import { VisuallyHidden } from "@reach/visually-hidden";
import "@reach/dialog/styles.css";
import "../css/styles.css";

type Props = {
	children?: React.ReactNode;
	id: string;
	confirmMessage: string;
	cancelMessage: string;
	handleDelete: (id: string) => void;
};

export default function Deletable(props: Props) {
	const {
		children,
		handleDelete,
		confirmMessage,
		cancelMessage,
		id
	} = props;
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const close = () => setShowDialog(false);
	const open = () => setShowDialog(true);
	const onDelete = () => handleDelete(id);

	return (
		<div className="flex">
			<div className="flex-auto">
				{children}
			</div>
			<button onClick={open}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
			<Dialog className="my-4 bg-cyan-50 rounded"
				isOpen={showDialog}
				onDismiss={close}>
				<p>Are you sure you want to delete this?</p>
				<div className="flex justify-end">
					<button className="mt-3 mr-2 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white" onClick={onDelete}>{confirmMessage}</button>
					<button className="mt-3 py-0.5 px-2.5 rounded bg-indigo-200 hover:bg-indigo-100 text-indigo-800" onClick={close}>{cancelMessage}</button>
				</div>
			</Dialog>
		</div>
	)
}