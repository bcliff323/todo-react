
import { FormEvent, ChangeEvent, useState } from 'react';
import PlusIcon from './PlusIcon';

type Props = {
	handleSubmit: (listName: string) => void;
	label: string;
	placeholder: string;
};

export default function InputForm(props: Props) {
	const {
		handleSubmit,
		placeholder
	} = props;

	const [listName, setListName] = useState<string>("");

	function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
		setListName(event.target.value || "");
	}

	return (
		<div className="rounded overflow-hidden">
			<form
				onSubmit={
					(event: FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						handleSubmit(listName);
						setListName("");
					}
				}>
				<div className="flex items-center">
					<input
						className="w-full block rounded-l py-1 px-2 bg-blue-200 text-indigo-900 placeholder-indigo-400"
						name="values"
						value={listName}
						placeholder={placeholder}
						onChange={handleOnChange} />
					<button type="submit"
						className="text-fuchsia-50 hover:text-fuchia-700 p-2 bg-indigo-600">
						<PlusIcon />
					</button>
				</div>
			</form>
		</div>
	);
};
