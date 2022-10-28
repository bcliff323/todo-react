import { useRef, useState } from 'react';
import { Dialog } from "@reach/dialog";
import DeleteIcon from "./icons/DeleteIcon";
import "@reach/dialog/styles.css";
import "../css/styles.css";
import { VisuallyHidden } from '@reach/visually-hidden';

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
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	return (
		<div className="flex">
			<div className="flex-auto">
				{children}
			</div>
			<button data-testid="delete-list-button"
				onClick={open}>
				<VisuallyHidden>Delete</VisuallyHidden>
				<DeleteIcon />
			</button>
			<Dialog className="my-4 bg-cyan-50 rounded"
				isOpen={showDialog}
				onDismiss={close}
				aria-label="Warning about permanently deleting item"
				initialFocusRef={buttonRef}>
				<p>Are you sure you want to delete this?</p>
				<div className="flex justify-end">
					<button data-testid="confirm-delete"
						className="mt-3 mr-2 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white"
						onClick={onDelete}>
						{confirmMessage}
					</button>
					<button data-testid="cancel-delete"
						ref={buttonRef}
						className="mt-3 py-0.5 px-2.5 rounded bg-indigo-200 hover:bg-indigo-100 text-indigo-800"
						onClick={close}>
						{cancelMessage}
					</button>
				</div>
			</Dialog>
		</div>
	)
}