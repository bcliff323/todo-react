
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
		<div className="bg-fuchsia-400 rounded overflow-hidden p-2">
			<form
				onSubmit={
					(event: FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						handleSubmit(listName);
						setListName("");
					}
				}>
				<div className="flex">
					<input
						className="flex-auto block rounded py-1 px-2"
						name="values"
						value={listName}
						placeholder={placeholder}
						onChange={handleOnChange} />
					<button type="submit"
						className="text-fuchsia-50 hover:text-fuchia-700 ml-2 my-1">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
};
