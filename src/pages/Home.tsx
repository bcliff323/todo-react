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
import DeleteIcon from '../components/icons/DeleteIcon';

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
				label="Todo List Title"
				placeholder="Add a Todo List" />
			<div data-testid="todo-lists"
				className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<div key={list.id}>
								<div data-testid="todo-list"
									className="bg-cyan-50 p-2 rounded text-indigo-900">
									<Deletable id={(list as TodoList).id}
										confirmMessage="Yes"
										cancelMessage="Cancel"
										ariaLabel="Warning about permanently deleting list"
										warningMessage="Are you sure you want to delete this list?"
										handleDelete={(id: string) => {
											const updatedList = deleteList(id, savedListData);
											setSavedListData(updatedList);
										}}
										icon={<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5 mt-1.5" />}>
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
								<p className="text-xs text-blue-300 mb-3 mt-1">Created: {list.createdDate}</p>
							</div>
						)
					)
				}
			</div>
		</Layout>
	)
}