import { useContext } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import Deletable from '../components/Deletable';
import ClipboardIcon from '../components/ClipboardIcon';
import { LocalStorageContext } from '../context/LocalStorageContext';
import { TodoList } from '../types';
import "../css/styles.css";

type Props = {
	children?: React.ReactNode;
};

export default function Home(props: Props) {
	const {
		savedListData,
		addNewList,
		deleteList
	} = useContext(LocalStorageContext);

	function handleSubmit(listName: string) {
		addNewList(listName);
	}

	return (
		<Layout>
			<h1 className="text-white mb-3 text-2xl">Todos</h1>
			<InputForm handleSubmit={handleSubmit}
				label="Go"
				placeholder="Add a Todo List" />
			<div className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<div className="bg-cyan-50 text-indigo-900 p-2 mb-3 rounded"
								key={(list as TodoList).id}>
								<Deletable id={(list as TodoList).id}
									confirmMessage="Yes"
									cancelMessage="Cancel"
									handleDelete={deleteList}>
									<div className="flex">
										<ClipboardIcon />
										<Link key={i}
											className="block flex-auto"
											to={`/list/${(list as TodoList).id}`}>
											{(list as TodoList).title}
										</Link>
									</div>
								</Deletable>
							</div>
						)
					)
				}
			</div>
		</Layout>
	)
}