import {useState} from 'react';
import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
	id: string;
	message: string;
	handleDelete: (id: string) => void;
};

export default function Deletable(props: Props) {
	const {children, handleDelete, message, id} = props;
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	return (
		isDeleting ? 
			<div className="flex">
				<p>{message}</p>
				<button onClick={() => {
						handleDelete(id);
						setIsDeleting(false);
					}}>Fer sure</button>
				<button onClick={() => setIsDeleting(false)}>Cancel</button>
			</div> : 
			<div className="flex">
				<div className="flex-auto">
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