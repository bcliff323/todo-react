import { ChangeEvent, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	DroppableProvided,
	DraggableProvided
} from "react-beautiful-dnd";
import FadeIn from 'react-fade-in';
import { VisuallyHidden } from "@reach/visually-hidden";
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import EditableText from '../components/EditableText';
import Deletable from '../components/Deletable';
import HomeIcon from '../components/icons/HomeIcon';
import { LocalStorageContext } from '../context/LocalStorageContext';
import { updateListTitle, updateTodoOrder, addNewTodo, updateTodoTitle, deleteTodo } from '../services/TodoListService';
import { TodoList, Todo, Status } from '../types';
import "../css/styles.css";

type Props = {
	children?: React.ReactNode;
};

export default function ListDetail(props: Props) {
	const {
		savedListData,
		setSavedListData,
		updateTodoStatus
	} = useContext(LocalStorageContext);

	const { id } = useParams();
	const listDetails = savedListData?.find((list) => list.id === id);

	const todos = (listDetails as TodoList).todos;

	function handleSubmit(todoName: string) {
		if (todoName.length === 0 || !savedListData) {
			return;
		}

		const listId = (listDetails as TodoList).id;
		const updatedData = addNewTodo(listId, todoName, savedListData);
		setSavedListData(updatedData);
	}

	function handleCheckChange(listId: string, todoId: string, isChecked: boolean) {
		updateTodoStatus(listId, todoId, isChecked);
	}

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		if (!savedListData) {
			return;
		}

		const updatedData = updateTodoOrder(
			(listDetails as TodoList).id,
			result.source.index,
			result.destination.index,
			savedListData
		);

		setSavedListData(updatedData);
	}

	// Todo: clean this up a bit
	if (!listDetails || !savedListData) {
		return (
			<div>Oops! Couldn't find that list.</div>
		)
	}

	return (
		<Layout>
			<div className="flex mb-3 text-white items-center" >
				<Link to="/"
					className="mr-1.5">
					<HomeIcon />
					<VisuallyHidden>home</VisuallyHidden>
				</Link>
				<span aria-hidden className="mx-1 mr-2.5">|</span>
				<h1 className="text-2xl">
					<EditableText
						text={(listDetails as TodoList).title}
						saveText={(title: string) => {
							const updatedData = updateListTitle(title, listDetails.id, savedListData);
							setSavedListData(updatedData);
						}} />
				</h1>
			</div>
			<InputForm handleSubmit={handleSubmit}
				label="Go"
				placeholder="Add a Todo" />
			{
				todos.length > 0 &&
				<div className="my-4 bg-cyan-50 text-indigo-900 p-2 mb-3 rounded">
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="list">
							{(provided: DroppableProvided) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									{todos.map(
										(todo: Todo, i) => {
											const dId = (todo as Todo).id?.toString();
											return (
												<Draggable key={(todo as Todo).id} draggableId={dId} index={(todo as Todo).ordinal}>
													{(provided: DraggableProvided) => (
														<div ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}>
															<FadeIn>
																<Deletable id={(todo as Todo).id}
																	confirmMessage="Yes"
																	cancelMessage="Cancel"
																	handleDelete={(id) => {
																		const updatedData = deleteTodo((listDetails as TodoList).id, id, savedListData);
																		setSavedListData(updatedData);
																	}}>
																	<div className="flex pl-1 py-1">
																		<input type="checkbox"
																			className="mr-2"
																			value={(todo as Todo).id}
																			checked={(todo as Todo).status === Status.Complete}
																			onChange={(event: ChangeEvent<HTMLInputElement>) => {
																				handleCheckChange((listDetails as TodoList).id, event.target.value, event.target.checked);
																			}} />
																		<EditableText
																			text={(todo as Todo).title}
																			strike={(todo as Todo).status === Status.Complete}
																			saveText={(title: string) => {
																				const updatedData = updateTodoTitle(title, (listDetails as TodoList).id, (todo as Todo).id, savedListData);
																				setSavedListData(updatedData);
																			}} />
																	</div>
																</Deletable>
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
			}
		</Layout>
	)
}