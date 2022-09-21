import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import Deletable from '../components/Deletable';
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
			<h1 className="text-white mb-3">Todo Manager</h1>
			<InputForm handleSubmit={handleSubmit}
				label="Go"
				placeholder="Add a Todo List" />
			<div className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<div className="bg-cyan-50 text-indigo-900 p-2 mb-3 rounded text-sm"
								key={(list as TodoList).id}>
								<Deletable id={(list as TodoList).id}
									confirmMessage="Confirm"
									cancelMessage="Cancel"
									handleDelete={deleteList}>
									<div className="flex">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
										</svg>
										<a key={i}
											className="block flex-auto"
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