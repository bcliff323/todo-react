import {useEffect, useState, useRef, ChangeEvent, MouseEvent, FocusEvent} from 'react';
import "../css/styles.css";

type Props = {
  text: string;
	strike: boolean;
	saveText: (text: string) => void;
};

export default function EditableText(props: Props) {
	const textInput = useRef<HTMLInputElement | null>(null);
	const {text, saveText, strike} = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newValue, setNewValue] = useState<string>(text);

	async function toggleIsEditing() {
		console.log('clicked edit');
		await setIsEditing(!isEditing);
		if (textInput?.current) {
			textInput?.current?.focus();
		}
	}

	function toggleAndSave() {
		console.log('clicked save');
		toggleIsEditing();
		saveText(newValue);
	}

	function updateText(e: ChangeEvent<HTMLInputElement>) {
		setNewValue(e.target.value);
	}
	
	return (
		<div className="flex-auto">
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
						<p className={`flex-auto ${strike ? "line-through" : ""}`}>{text}</p>
						{
							!strike && <button className="block" onClick={toggleIsEditing}>Edit</button>
						}
					</div>
			}
		</div>
	)
}