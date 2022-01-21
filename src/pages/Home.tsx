import {FormEvent, useState, useContext} from 'react';
import Layout from '../components/Layout';
import EditableText from '../components/EditableText';
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


	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		addNewList(listName);
		setListName("");
	}

	return (
		<Layout>
			<h1>Todo Manager</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="values"
					value={listName}
					placeholder="Enter List Name"
					onChange={
						(e) => {
							setListName(e.target.value || "");
						}
					} />
				<button type="submit">Go</button>
			</form>
			<div>
				{
					savedListData && savedListData.map(
						(list, i) => 
							<EditableText key={i} 
								text={(list as TodoList).title}
								saveText={(title: string) => {
									const i = parseInt((list as TodoList).id, 10);
									updateListTitle(title, i);
								}}
								deleteList={() => {	
									const i = parseInt((list as TodoList).id, 10);
									deleteList(i);
								}}
								/>
						)
				}
			</div>
		</Layout>
	)
}