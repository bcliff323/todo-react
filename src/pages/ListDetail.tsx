import { ChangeEvent, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "react-beautiful-dnd";
import { VisuallyHidden } from "@reach/visually-hidden";
import Layout from '../components/Layout';
import InputForm from '../components/InputForm';
import EditableText from '../components/EditableText';
import Deletable from '../components/Deletable';
import HomeIcon from '../components/icons/HomeIcon';
import ErrorMessage from '../components/ErrorMessage';
import { LocalStorageContext } from '../context/LocalStorageContext';
import { updateListTitle, updateTodoOrder, addNewTodo, updateTodoTitle, deleteTodo, updateTodoStatus, deleteAllTodosInList } from '../services/TodoListService';
import { TodoList, Todo, Status, ErrorTypes } from '../types';
import "../css/styles.css";
import DeleteIcon from '../components/icons/DeleteIcon';

type Props = {
	children?: React.ReactNode;
};

export default function ListDetail(props: Props) {
	const {
		savedListData,
		setSavedListData
	} = useContext(LocalStorageContext);
	if (!savedListData?.length) {
		return <ErrorMessage errorType={ErrorTypes.ListNotFound} />
	}

	const { id } = useParams();
	const listDetails = savedListData?.find((list) => list.id === id);

	if (!listDetails) {
		return <ErrorMessage errorType={ErrorTypes.ListNotFound} />
	}

	const todos = listDetails.todos;

	function handleSubmit(todoName: string) {
		if (todoName.length === 0 || !savedListData) {
			return;
		}

		const listId = (listDetails as TodoList).id;
		const updatedData = addNewTodo(listId, todoName, savedListData);
		setSavedListData(updatedData);
	}

	function handleCheckChange(listId: string, todoId: string, isChecked: boolean) {
		if (!savedListData) {
			return;
		}

		const updatedData = updateTodoStatus(listId, todoId, isChecked, savedListData);
		setSavedListData(updatedData);
	}

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		if (!savedListData || !listDetails) {
			return;
		}

		const updatedData = updateTodoOrder(
			listDetails.id,
			result.source.index,
			result.destination.index,
			savedListData
		);

		setSavedListData(updatedData);
	}

	function deleteAll() {
		if (!listDetails || !savedListData) {
			return;
		}
		const updatedData = deleteAllTodosInList(listDetails.id, savedListData);
		setSavedListData(updatedData);
	}

	return (
		<Layout>
			<div data-testid="detail-header"
				className="flex mb-3 text-white items-center" >
				<Link data-testid="home-link"
					to="/"
					className="mr-1.5">
					<HomeIcon />
					<VisuallyHidden>home</VisuallyHidden>
				</Link>
				<span aria-hidden className="mx-1 mr-2.5">|</span>
				<h1 data-testid="list-title"
					className="text-2xl">
					<EditableText
						testId="list-title-edit"
						text={(listDetails as TodoList).title}
						saveText={(title: string) => {
							const updatedData = updateListTitle(title, listDetails.id, savedListData);
							setSavedListData(updatedData);
						}} />
				</h1>
			</div>
			<InputForm handleSubmit={handleSubmit}
				label="Todo Item Title"
				placeholder="Add a Todo" />
			{todos.length > 0 &&
				<div className="my-4 bg-cyan-50 text-indigo-800 p-2 mb-3 rounded text-2xl md:text-base">
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="list">
							{(provided, dropSnapshot) => (
								<div data-testid="todos"
									ref={provided.innerRef}
									className={`rounded ${dropSnapshot.isDraggingOver ? 'bg-cyan-100' : ''}`}
									{...provided.droppableProps}>
									{todos.map(
										(todo: Todo, i) => {
											const dId = (todo as Todo).id?.toString();
											return (
												<Draggable key={(todo as Todo).id} draggableId={dId} index={(todo as Todo).ordinal}>
													{(provided, snapshot) => (
														<div ref={provided.innerRef}
															data-testid="todo"
															className={`px-1 rounded ${snapshot.isDragging ? 'bg-blue-200' : ''}`}
															{...provided.draggableProps}
															{...provided.dragHandleProps}>
															<Deletable id={(todo as Todo).id}
																confirmMessage="Yes"
																cancelMessage="Cancel"
																ariaLabel="Warning about permanently deleting todo item"
																warningMessage="Are you sure you want to delete this todo?"
																handleDelete={(id) => {
																	const updatedData = deleteTodo((listDetails as TodoList).id, id, savedListData);
																	setSavedListData(updatedData);
																}}
																icon={<DeleteIcon sizing="w-7 h-7 md:h-5 md:w-5" />}
																buttonLabel="Delete Todo"
																showLabel={false}>
																<div className="flex pl-1 py-1 items-center">
																	<input data-testid={`check-input-${i}`}
																		type="checkbox"
																		className="mr-2 accent-indigo-800 h-[20px] w-[20px]"
																		value={(todo as Todo).id}
																		checked={(todo as Todo).status === Status.Complete}
																		onChange={(event: ChangeEvent<HTMLInputElement>) => {
																			handleCheckChange((listDetails as TodoList).id, event.target.value, event.target.checked);
																		}} />
																	<EditableText
																		testId={`todo-input-${i}`}
																		text={(todo as Todo).title}
																		strike={(todo as Todo).status === Status.Complete}
																		saveText={(title: string) => {
																			const updatedData = updateTodoTitle(title, (listDetails as TodoList).id, (todo as Todo).id, savedListData);
																			setSavedListData(updatedData);
																		}} />
																</div>
															</Deletable>
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
			{todos.length > 0 &&
				<div data-testid="delete-all-todos"
					className="flex justify-end text-white text-sm">
					<Deletable id={listDetails.id}
						confirmMessage="Yes"
						cancelMessage="Cancel"
						ariaLabel="Warning about permanently deleting all todo items in list"
						warningMessage="Are you sure you want to delete all todos in this list?"
						handleDelete={deleteAll}
						icon={<DeleteIcon sizing="w-5 h-5 ml-2" />}
						buttonLabel="Delete All"
						showLabel={true} />
				</div>
			}
		</Layout>
	)
}