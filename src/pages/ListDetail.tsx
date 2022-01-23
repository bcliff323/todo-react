import {FormEvent, ChangeEvent, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import FadeIn from 'react-fade-in';
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import EditableText from '../components/EditableText';
import {LocalStorageContext} from '../context/LocalStorageContext';
import cloneDeep from 'lodash/cloneDeep';
import {TodoList, Todo} from '../types';
import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
};

export default function ListDetail(props: Props) {
	const {
		savedListData,
		addNewTodo,
		updateListOrder
	} = useContext(LocalStorageContext);

	const { id } = useParams();
	const listDetails = savedListData?.find((list) => (list as TodoList).id === id);
	const todos = (listDetails as TodoList).todos;

	function handleSubmit(todoName: string) {
		const listId = (listDetails as TodoList).id;
		addNewTodo(listId, todoName);
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
			<InputForm handleSubmit={handleSubmit}
				label="Go"
				placeholder="Add a Todo" />
			<div>
				{todos.map((todo: Todo, i) => <div key={i}>{(todo as Todo).title}</div>)}
				{/*
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="list">
						{provided => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{savedListData?.map(
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
				*/}
			</div>
		</Layout>
	)
}