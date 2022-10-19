import { useContext } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import Deletable from '../components/Deletable';
import ClipboardIcon from '../components/icons/ClipboardIcon';
import { LocalStorageContext } from '../context/LocalStorageContext';
import { addNewList, deleteList } from '../services/TodoListService';
import { TodoList } from '../types';
import "../css/styles.css";

type Props = {
	children?: React.ReactNode;
};

export default function Home(props: Props) {
	const {
		savedListData,
		setSavedListData
	} = useContext(LocalStorageContext);

	function handleSubmit(listName: string) {
		if (listName.length === 0) {
			return;
		}
		const updatedList = addNewList(listName, savedListData);
		setSavedListData(updatedList);
	}

	return (
		<Layout>
			<h1 className="text-white mb-3 text-2xl">Todos</h1>
			<InputForm handleSubmit={handleSubmit}
				label="Go"
				placeholder="Add a Todo List" />
			<div data-testid="todo-lists"
				className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<div data-testid="todo-list"
								className="bg-cyan-50 text-indigo-900 p-2 mb-3 rounded"
								key={(list as TodoList).id}>
								<Deletable id={(list as TodoList).id}
									confirmMessage="Yes"
									cancelMessage="Cancel"
									handleDelete={(id: string) => {
										const updatedList = deleteList(id, savedListData);
										setSavedListData(updatedList);
									}}>
									<div className="flex">
										<ClipboardIcon />
										<Link data-testid="list-link"
											key={i}
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