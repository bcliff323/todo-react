import { useRef, useState } from 'react';
import { Dialog } from "@reach/dialog";
import DeleteIcon from "./icons/DeleteIcon";
import "@reach/dialog/styles.css";
import "../css/styles.css";
import { VisuallyHidden } from '@reach/visually-hidden';
import DeleteModal from './DeleteModal';

type Props = {
	children?: React.ReactNode;
	id: string;
	confirmMessage: string;
	cancelMessage: string;
	handleDelete: (id: string) => void;
	ariaLabel: string;
	warningMessage: string;
	icon: React.ReactNode;
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
		icon
	} = props;
	const onDelete = () => handleDelete(id);

	return (
		<div className="flex">
			<div className="flex-auto">
				{children}
			</div>
			<DeleteModal handleDelete={onDelete}
				confirmMessage={confirmMessage}
				cancelMessage={cancelMessage}
				ariaLabel={ariaLabel}
				warningMessage={warningMessage}
				icon={icon}
				buttonLabel="Delete"
				showLabel={false} />
		</div>
	)
}