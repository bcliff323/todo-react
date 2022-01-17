import {FormEvent, useState} from 'react';
import Layout from '../components/Layout';
import useLocalStorage from 'use-local-storage';
import cloneDeep from 'lodash/cloneDeep';
import {TodoList} from '../types';
import "../css/styles.css";

type Props = {
	useLocalStorage: typeof useLocalStorage;
  children?: React.ReactNode;
};

export default function Home(props: Props) {
	const {useLocalStorage} = props;
	const [savedListData, setSavedListData] = useLocalStorage<object[]>("todo-lists");
	const [listName, setListName] = useState<string>("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!savedListData) {
			setSavedListData([
				{
					id: 1,
					title: listName,
					todos: [],
					ordinal: 0
				}
			]);
			return;
		}
		const savedData = cloneDeep(savedListData);
		savedData.unshift({
			id: savedData.length + 1,
			title: listName,
			todos: [],
			ordinal: 0
		});
		setSavedListData(savedData.map((list, i) => {
			(list as TodoList).ordinal = i;
			return list;
		}));
	}

	return (
		<Layout>
			<h1>Todo Manager</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="values"
					onChange={
						(e) => { setListName(e.target.value || ""); }
					} />
				<button type="submit">Go</button>
			</form>
			<div>
				{
					savedListData && savedListData.map((list, i) => <div key={i}>{(list as TodoList).title}</div>)
				}
			</div>
		</Layout>
	)
}