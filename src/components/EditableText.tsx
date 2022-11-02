import { useState, useRef, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { VisuallyHidden } from "@reach/visually-hidden";
import SaveIcon from "./icons/SaveIcon";
import EditIcon from "./icons/EditIcon";
import "../css/styles.css";

type Props = {
	text: string;
	saveText: (text: string) => void;
	editButtonLabel: string;
	saveButtonLabel: string;
	strike?: boolean;
	testId?: string;
};

export default function EditableText(props: Props) {
	const textInput = useRef<HTMLInputElement | null>(null);
	const {
		text,
		saveText,
		editButtonLabel,
		saveButtonLabel,
		strike = false,
		testId = ''
	} = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newValue, setNewValue] = useState<string>(text);

	async function edit(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		await setIsEditing(true);
		if (textInput?.current) {
			textInput?.current?.focus();
		}
	}

	function saveAndClose(e: FormEvent) {
		e.preventDefault();

		setIsEditing(false);
		saveText(newValue);
	}

	function updateText(e: ChangeEvent<HTMLInputElement>) {
		setNewValue(e.target.value);
	}

	return (
		<div className="flex-auto">
			<form data-testid={`${testId}-form`}
				className="flex items-center"
				onSubmit={saveAndClose}>
				<div className="w-full flex-auto">
					{
						isEditing ?
							<div>
								<input data-testid={testId}
									ref={textInput}
									className="w-full mr-1 rounded px-1 text-indigo-800"
									defaultValue={text}
									onChange={updateText}
									id="edit-text" />
								<VisuallyHidden>
									<label htmlFor="edit-text">Todo Text</label>
								</VisuallyHidden>
							</div> :
							<p className={`${strike ? "line-through" : "mr-1"}`}>
								{text}
							</p>
					}
				</div>
				<div className="flex">
					{
						isEditing &&
						<button data-testid={`${testId}-save`} type="submit" disabled={!isEditing} onClick={saveAndClose} className="flex disabled:opacity-25 ml-1 mr-1">
							<VisuallyHidden>{saveButtonLabel}</VisuallyHidden>
							<SaveIcon />
						</button>
					}
					<button data-testid={`${testId}-edit`} disabled={isEditing || strike} onClick={edit} className="flex disabled:opacity-25 mr-1">
						<VisuallyHidden>{editButtonLabel}</VisuallyHidden>
						<EditIcon />
					</button>
				</div>
			</form>
		</div>
	)
}