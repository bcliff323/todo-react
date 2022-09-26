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
import { LocalStorageContext } from '../context/LocalStorageContext';
import { TodoList, Todo, Status } from '../types';
import "../css/styles.css";

type Props = {
	children?: React.ReactNode;
};

export default function ListDetail(props: Props) {
	const {
		savedListData,
		updateListTitle,
		addNewTodo,
		updateTodoOrder,
		updateTodoTitle,
		updateTodoStatus,
		deleteTodo
	} = useContext(LocalStorageContext);

	const { id } = useParams();
	const listDetails = savedListData?.find((list) => (list as TodoList).id === id);
	const todos = (listDetails as TodoList).todos;

	function handleSubmit(todoName: string) {
		const listId = (listDetails as TodoList).id;
		addNewTodo(listId, todoName);
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

		updateTodoOrder(
			(listDetails as TodoList).id,
			result.source.index,
			result.destination.index
		);
	}

	return (
		<Layout>
			<div className="flex mb-3 text-white items-center" >
				<Link to="/"
					className="mr-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
						<path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
					</svg>
					<VisuallyHidden>home</VisuallyHidden>
				</Link>
				<span aria-hidden className="mx-1 mr-2.5">|</span>
				<h1 className="text-2xl">
					<EditableText
						text={(listDetails as TodoList).title}
						saveText={(title: string) => {
							updateListTitle(title, (listDetails as TodoList).id);
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
																		deleteTodo((listDetails as TodoList).id, id);
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
																				updateTodoTitle(title, (listDetails as TodoList).id, (todo as Todo).id);
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