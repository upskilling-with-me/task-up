import { Button, TextField } from "@mui/material";
import { type Dispatch, type SetStateAction, useRef } from "react";
import type { TodoStatus } from "src/types/TodoStatus";
import { v4 as uuidv4 } from "uuid";

interface Todo {
	id: string;
	description: string;
	status: TodoStatus;
}

interface AddTodoProp {
	todoList: Todo[];
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
}

export const AddTodo = ({ todoList, setTodoList }: AddTodoProp) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleAddTodo = () => {
		if (!inputRef.current || !inputRef.current.value) return;

		const newTodo: Todo = {
			id: uuidv4(),
			description: inputRef.current.value.trim(),
			status: "todo",
		};

		setTodoList([...todoList, newTodo]);
		inputRef.current.value = "";
	};

	return (
		<div className="todo-item">
			<TextField
				id="standard-basic"
				label="Add New Todo"
				variant="filled"
				inputRef={inputRef}
			/>
			<Button variant="contained" color="primary" onClick={handleAddTodo}>
				Add
			</Button>
		</div>
	);
};
