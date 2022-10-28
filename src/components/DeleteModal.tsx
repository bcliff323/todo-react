import Dialog from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { useRef, useState } from "react";

type Props = {
	handleDelete: () => void;
	confirmMessage: string;
	cancelMessage: string;
	ariaLabel: string;
	warningMessage: string;
	icon: React.ReactNode;
	buttonLabel: string;
	showLabel: boolean;
}

export default function DeleteModal(props: Props) {
	const {
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
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	return (
		<div className="flex">
			<button data-testid="delete-list-button"
				onClick={open} className="flex">
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
						onClick={handleDelete}>
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