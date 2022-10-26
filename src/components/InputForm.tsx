
import { VisuallyHidden } from '@reach/visually-hidden';
import { FormEvent, ChangeEvent, useState } from 'react';
import PlusIcon from './icons/PlusIcon';

type Props = {
	handleSubmit: (listName: string) => void;
	placeholder: string;
	label: string;
};

export default function InputForm(props: Props) {
	const {
		handleSubmit,
		placeholder,
		label
	} = props;

	const [listName, setListName] = useState<string>("");

	function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
		setListName(event.target.value || "");
	}

	return (
		<div className="rounded overflow-hidden">
			<form data-testid="form"
				onSubmit={
					(event: FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						handleSubmit(listName);
						setListName("");
					}
				}>
				<div className="flex items-center flex-start text-2xl md:text-base">
					<input data-testid="form-input"
						className="w-full block rounded-l py-1 px-2 bg-blue-200 text-indigo-900 placeholder-indigo-400"
						id="values"
						value={listName}
						placeholder={placeholder}
						onChange={handleOnChange} />
					<button data-testid="form-submit"
						type="submit"
						className="text-fuchsia-50 hover:text-fuchia-700 p-2 bg-indigo-600 rounded-r">
						<VisuallyHidden>Submit</VisuallyHidden>
						<PlusIcon />
					</button>
				</div>
				<label className="text-cyan-200 text-xs"
					htmlFor="values">
					{label}
				</label>
			</form>
		</div>
	);
};
