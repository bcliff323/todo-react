import { useState, useRef, ChangeEvent } from 'react';
import { VisuallyHidden } from "@reach/visually-hidden";
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
				<div className="w-full flex-auto">
					{
						isEditing ?
							<input ref={textInput}
								className="w-full mr-1 rounded px-1"
								defaultValue={text}
								onChange={updateText} /> :
							<p className={`${strike ? "line-through" : "mr-1"}`}>{text}</p>
					}
				</div>
				<div className="flex">
					{
						isEditing &&
						<button disabled={!isEditing} onClick={saveAndClose} className="flex disabled:opacity-25 ml-1">
							<VisuallyHidden>Save</VisuallyHidden>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
								<path fill-rule="evenodd" d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zm10.857 5.691a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
							</svg>
						</button>
					}
					<button disabled={isEditing || strike} onClick={edit} className="flex disabled:opacity-25">
						<VisuallyHidden>Edit</VisuallyHidden>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
							<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
							<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}