import {FormEvent, useState, useContext} from 'react';
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import FadeIn from 'react-fade-in';
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
		updateListOrder,
		deleteList
	} = useContext(LocalStorageContext);

	const [listName, setListName] = useState<string>("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		addNewList(listName);
		setListName("");
	}

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		updateListOrder(result.draggableId, result.source.index, result.destination.index);
	}

	return (
		<Layout>
			<h1>Todo Manager</h1>
			<div className="bg-rose-200">
				<form onSubmit={handleSubmit}>
					<div className="flex bg-rose-400">
						<input
							className="flex-auto block"
							name="values"
							value={listName}
							placeholder="Enter List Name"
							onChange={
								(e) => {
									setListName(e.target.value || "");
								}
							} />
						<button
							type="submit">
							Go
						</button>
					</div>
				</form>
			</div>
			<div className="py-4">
				{
					savedListData && savedListData.map(
						(list, i) => (
							<a className="inline-block px-5 py-2 mr-1 mb-1 bg-rose-600 text-rose-100 rounded-md"
								href={`/list/${(list as TodoList).id}`}>{(list as TodoList).title}</a>
						)
					)
				}
			</div>
		</Layout>
	)
}