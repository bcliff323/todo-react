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

export default function ListDetail(props: Props) {
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
			<h1>List Detail Page</h1>
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
											<Draggable key={(list as TodoList).id} draggableId={dId} index={(list as TodoList).ordinal}>
												{provided => (
													<div ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}>
														<FadeIn>
															<EditableText
																text={(list as TodoList).title}
																saveText={(title: string) => {
																	updateListTitle(title, (list as TodoList).id);
																}}
																deleteList={() => {
																	deleteList((list as TodoList).id);
																}} />
														</FadeIn>
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