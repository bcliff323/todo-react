import { useState } from 'react';
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
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
			<button
				onClick={open}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
			<Dialog isOpen={showDialog} onDismiss={close}>
				<button className="close-button" onClick={close}>
					<VisuallyHidden>{cancelMessage}</VisuallyHidden>
					<span aria-hidden>×</span>
				</button>
				<button onClick={onDelete}>{confirmMessage}</button>
			</Dialog>
		</div>
	)
}