import Dialog from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { useRef, useState } from "react";

type Props = {
	listId: string;
	handleDelete: (id: string) => void;
	confirmMessage: string;
	cancelMessage: string;
	ariaLabel: string;
	warningMessage: string;
	icon: React.ReactNode;
	buttonLabel: string;
	showLabel: string;
}

export default function DeleteModal(props: Props) {
	const {
		listId,
		handleDelete,
		confirmMessage,
		cancelMessage,
		warningMessage,
		ariaLabel,
		buttonLabel,
		showLabel,
		icon
	} = props;
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const close = () => setShowDialog(false);
	const open = () => setShowDialog(true);
	const onDelete = () => handleDelete(listId);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	return (
		<>
			<button data-testid="delete-list-button"
				onClick={open}>
				{
					showLabel ?
						buttonLabel :
						<VisuallyHidden>{buttonLabel}</VisuallyHidden>
				}
				{icon}
			</button>
			<Dialog className="my-4 bg-cyan-50 rounded"
				isOpen={showDialog}
				onDismiss={close}
				aria-label={ariaLabel}
				initialFocusRef={buttonRef}>
				<p>{warningMessage}</p>
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
		</>
	)
}