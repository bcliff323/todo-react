import {FormEvent, useState, useContext} from 'react';
import FadeIn from 'react-fade-in';
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import EditableText from '../components/EditableText';
import Deletable from '../components/Deletable';
import {LocalStorageContext} from '../context/LocalStorageContext';
import cloneDeep from 'lodash/cloneDeep';
import {TodoList} from '../types';
import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
};

export default function Home(props: Props) {
	const {
		savedListData,
		addNewList,
		updateListTitle,
		deleteList
	} = useContext(LocalStorageContext);

	const [listName, setListName] = useState<string>("");

	function handleSubmit(listName: string) {
		addNewList(listName);
	}

	return (
		<Layout>
			<h1>Todo Manager</h1>
			<div className="bg-rose-200">
				<InputForm handleSubmit={handleSubmit}
					label="Go"
					placeholder="Add a Todo List" />
			</div>
			<div className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<div key={(list as TodoList).id}>
								<Deletable id={(list as TodoList).id}
									confirmMessage="Confirm"
									cancelMessage="Cancel"
									handleDelete={deleteList}>
									<div className="flex">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
										</svg>
										<a key={i}
										className="block"
										href={`/list/${(list as TodoList).id}`}>{(list as TodoList).title}</a>
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