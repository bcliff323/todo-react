import { ChangeEvent, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	DroppableProvided,
	DraggableProvided
} from "react-beautiful-dnd";
import FadeIn from 'react-fade-in';
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
			<div>
				<a href="/">{`<`} home</a>
				<h1 className="text-blue-200 my-2">
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
				<div className="my-4 bg-cyan-50 p-2 mr-6 mb-3 rounded text-sm">
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
																	confirmMessage="Confirm"
																	cancelMessage="Cancel"
																	handleDelete={(id) => {
																		deleteTodo((listDetails as TodoList).id, id);
																	}}>
																	<div className="flex p-1">
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