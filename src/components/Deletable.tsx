import { useRef, useState } from 'react';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "../css/styles.css";
import { VisuallyHidden } from '@reach/visually-hidden';

type Props = {
	children?: React.ReactNode;
	id: string;
	confirmMessage: string;
	cancelMessage: string;
	handleDelete: (id: string) => void;
	ariaLabel: string;
	warningMessage: string;
	icon: React.ReactNode;
	buttonLabel: string;
	showLabel: boolean;
};

export default function Deletable(props: Props) {
	const {
		children,
		handleDelete,
		confirmMessage,
		cancelMessage,
		id,
		ariaLabel,
		warningMessage,
		icon,
		buttonLabel,
		showLabel
	} = props;
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const close = () => setShowDialog(false);
	const open = () => setShowDialog(true);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const onDelete = () => handleDelete(id);

	return (
		<div className="flex items-center">
			{children &&
				<div className="flex-auto">
					{children}
				</div>
			}
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