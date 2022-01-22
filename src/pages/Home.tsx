import {FormEvent, useState, useContext} from 'react';
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
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

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		console.log(result);
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
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="list">
						{provided => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{savedListData && savedListData.map(
									(list, i) => {
										const dId = (list as TodoList).id?.toString();
										return (
											<Draggable key={i} draggableId={dId} index={(list as TodoList).ordinal}>
												{provided => (
													<div ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}>
														<EditableText
															text={(list as TodoList).title}
															saveText={(title: string) => {
																const i = parseInt((list as TodoList).id, 10);
																updateListTitle(title, i);
															}}
															deleteList={() => {	
																const i = parseInt((list as TodoList).id, 10);
																deleteList(i);
															}} />
													</div>
												)}
											</Draggable>
										);
									}
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</Layout>
	)
}