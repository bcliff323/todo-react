
import {FormEvent, ChangeEvent, useState} from 'react';

type Props = {
  handleSubmit: (listName: string) => void;
	label: string;
	placeholder: string;
};

export default function InputForm(props: Props) {
	const {
		handleSubmit,
		label,
		placeholder
	} = props;

	const [listName, setListName] = useState<string>("");

	function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
		setListName(event.target.value || "");
	}

	return (
		<div className="bg-rose-200">
			<form
				onSubmit={
					(event: FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						handleSubmit(listName);
						setListName("");
					}
				}>
				<div className="flex bg-rose-400">
					<input
						className="flex-auto block"
						name="values"
						value={listName}
						placeholder={placeholder}
						onChange={handleOnChange} />
					<button type="submit">{label}</button>
				</div>
			</form>
		</div>
	);
};
