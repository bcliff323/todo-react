import { useState } from 'react';
import { Dialog } from "@reach/dialog";
import DeleteIcon from "./icons/DeleteIcon";
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
				<DeleteIcon />
			</button>
			<Dialog className="my-4 bg-cyan-50 rounded"
				isOpen={showDialog}
				onDismiss={close}>
				<p>Are you sure you want to delete this?</p>
				<div className="flex justify-end">
					<button className="mt-3 mr-2 py-0.5 px-2.5 rounded bg-indigo-800 hover:bg-indigo-500 text-white"
						onClick={onDelete}>
						{confirmMessage}
					</button>
					<button className="mt-3 py-0.5 px-2.5 rounded bg-indigo-200 hover:bg-indigo-100 text-indigo-800"
						onClick={close}>
						{cancelMessage}
					</button>
				</div>
			</Dialog>
		</div>
	)
}