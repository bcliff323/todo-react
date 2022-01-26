import {useState} from 'react';
import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
	id: string;
	confirmMessage: string;
	cancelMessage: string;
	handleDelete: (id: string) => void;
};

export default function Deletable(props: Props) {
	const {
		children,
		handleDelete,
		confirmMessage,
		cancelMessage,
		id
	} = props;
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	return (
		<div className="flex">
			{
				isDeleting && 
					<div>
						<button onClick={() => {
								handleDelete(id);
								setIsDeleting(false);
							}}>{confirmMessage}</button>
						<button onClick={() => setIsDeleting(false)}>{cancelMessage}</button>
					</div>
			}
			<div>
				{children}
			</div>
			<button onClick={e => {
					setIsDeleting(true);
				}}>
				Delete
			</button>
		</div>
	)
}