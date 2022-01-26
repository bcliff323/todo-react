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
							<div className="inline-block px-5 py-2 mr-1 mb-1 bg-rose-600 text-rose-100 rounded-md">
								<Deletable id={(list as TodoList).id}
									handleDelete={(id: string) => {
										console.log(id);
									}}>
									<a key={i}
										href={`/list/${(list as TodoList).id}`}>{(list as TodoList).title}</a>
								</Deletable>
							</div>
						)
					)
				}
			</div>
		</Layout>
	)
}