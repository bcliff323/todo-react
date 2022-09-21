
import { FormEvent, ChangeEvent, useState } from 'react';

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
						className="w-full block rounded-l py-1 px-2 bg-blue-200 text-indigo-900 placeholder-indigo-400 text-sm"
						name="values"
						value={listName}
						placeholder={placeholder}
						onChange={handleOnChange} />
					<button type="submit"
						className="text-fuchsia-50 hover:text-fuchia-700 p-1.5 bg-indigo-600">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 26 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
};
