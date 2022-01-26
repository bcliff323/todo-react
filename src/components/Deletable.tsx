import {useState} from 'react';
import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
	id: string;
	handleDelete: (id: string) => void;
};

export default function Deletable(props: Props) {
	const {children, handleDelete, id} = props;
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	return (
		isDeleting ? 
			<div className="flex">
				<p>srsly?</p>
				<button onClick={() => setIsDeleting(false)}>Cancel</button>
			</div> : 
			<div className="flex">
				<div className="flex-auto">
					{children}
				</div>
				<button onClick={e => {
						setIsDeleting(true);
						handleDelete(id);
					}}>
					Delete
				</button>
			</div>
	)
}