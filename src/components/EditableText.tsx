import {useEffect, useState, useRef, ChangeEvent} from 'react';
import "../css/styles.css";

type Props = {
  text: string;
	saveText: (text: string) => void;
};

export default function EditableText(props: Props) {
	const textInput = useRef<HTMLInputElement | null>(null);
	const {text, saveText} = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newValue, setNewValue] = useState<string>(text);

	async function toggleIsEditing() {
		await setIsEditing(!isEditing);
		if (textInput?.current) {
			textInput?.current?.focus();
		}
	}

	function toggleAndSave() {
		toggleIsEditing();
		saveText(newValue);
	}

	function updateText(e: ChangeEvent<HTMLInputElement>) {
		setNewValue(e.target.value);
	}
	
	return (
		<div>
			{
				isEditing ? 
					<div className="flex">
						<div className="flex-auto">
							<input ref={textInput}
								defaultValue={text}
								onChange={updateText}
								onBlur={toggleAndSave} />
						</div>
						<button onClick={toggleAndSave}>Save</button>
					</div> :
					<div className="flex">
						<p>{text}</p>
						<button onClick={toggleIsEditing}>Edit</button>
					</div>
			}
		</div>
	)
}