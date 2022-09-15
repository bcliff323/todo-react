import { useState, useRef, ChangeEvent, MouseEvent, FocusEvent } from 'react';
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
			<div className="flex">
				<div className="flex-auto">
					{
						isEditing ?
							<input ref={textInput}
								defaultValue={text}
								onChange={updateText}
								onBlur={saveAndClose} /> :
							<p className={`${strike ? "line-through" : ""}`}>{text}</p>
					}
				</div>
				<div className="flex">
					<button disabled={isEditing} className="block" onClick={edit}>Edit</button>
					<button disabled={!isEditing} onClick={saveAndClose}>Save</button>
				</div>
			</div>
		</div>
	)
}