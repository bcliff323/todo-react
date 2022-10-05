import { useState, useRef, ChangeEvent } from 'react';
import { VisuallyHidden } from "@reach/visually-hidden";
import SaveIcon from "./icons/SaveIcon";
import EditIcon from "./icons/EditIcon";
import "../css/styles.css";

type Props = {
	text: string;
	strike?: boolean;
	saveText: (text: string) => void;
};

export default function EditableText(props: Props) {
	const textInput = useRef<HTMLInputElement | null>(null);
	const { text, saveText, strike = false } = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newValue, setNewValue] = useState<string>(text);

	async function edit() {
		await setIsEditing(true);
		if (textInput?.current) {
			textInput?.current?.focus();
		}
	}

	function saveAndClose() {
		setIsEditing(false);
		saveText(newValue);
	}

	function updateText(e: ChangeEvent<HTMLInputElement>) {
		setNewValue(e.target.value);
	}

	return (
		<div className="flex-auto">
			<div className="flex items-center">
				<div className="w-full flex-auto">
					{
						isEditing ?
							<input ref={textInput}
								className="w-full mr-1 rounded px-1 text-indigo-900"
								defaultValue={text}
								onChange={updateText} /> :
							<p className={`${strike ? "line-through" : "mr-1"}`}>{text}</p>
					}
				</div>
				<div className="flex">
					{
						isEditing &&
						<button disabled={!isEditing} onClick={saveAndClose} className="flex disabled:opacity-25 ml-1 mr-1">
							<VisuallyHidden>Save</VisuallyHidden>
							<SaveIcon />
						</button>
					}
					<button disabled={isEditing || strike} onClick={edit} className="flex disabled:opacity-25 mr-1">
						<VisuallyHidden>Edit</VisuallyHidden>
						<EditIcon />
					</button>
				</div>
			</div>
		</div>
	)
}