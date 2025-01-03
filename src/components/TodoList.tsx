import { Button, Checkbox, Input } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import type { Todo } from "src/types/Todo";

interface TodoListProps {
	todoList: Todo[];
	setTodoList: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
	const handleStatusUpdate = (id: string) => {
		setTodoList(
			todoList.map((todo) =>
				todo.id === id
					? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
					: todo,
			),
		);
	};

	const handleDeleteTodo = (id: string) => {
		setTodoList(todoList.filter((todo) => todo.id !== id));
	};

	return (
		<div className="container">
			<ul className="todo-list-card">
				{todoList.map((todo) => (
					<li key={todo.id}>
						<div className="todo-item">
							<Checkbox
								checked={todo.status === "done"}
								onChange={() => handleStatusUpdate(todo.id)}
							/>
							<Input
								placeholder={todo.description}
								className={todo.status === "done" ? "todo-done" : ""}
							/>
							<Button
								variant="contained"
								color="error"
								onClick={() => handleDeleteTodo(todo.id)}
							>
								Delete
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
