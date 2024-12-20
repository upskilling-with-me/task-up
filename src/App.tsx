import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import "./App.css";
import {
	Button,
	Checkbox,
	Input,
	TextField
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";

type Theme = "light" | "dark";
type TodoStatus = "todo" | "done";

interface HeaderProps {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
	const handleThemeChange = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className="header">
			<h1>Task Us</h1>
			<Button
				type="button"
				variant="outlined"
				color="inherit"
				onClick={handleThemeChange}
			>
				{theme}
			</Button>
		</div>
	);
};

interface Todo {
	id: string;
	description: string;
	status: TodoStatus;
}


const TODO_LIST: Todo[] = [
	{ id: "1", description: "Buy Grocery", status: "todo" },
	{ id: "2", description: "Go for a run", status: "todo" },
	{ id: "3", description: "Do dishes", status: "todo" },
	{ id: "4", description: "Buy milk", status: "done" },
];

interface TodoListProps {
	todos: Todo[];
	updateTodo: Dispatch<SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo }) => {
	const handleStatusUpdate = (id: string) => {
		updateTodo(
			todos.map((todo) =>
				todo.id === id ? { ...todo, status: todo.status === "todo" ? "done" : "todo" } : todo
			)
		);
	}

	const handleDeleteTodo = (id: string) => {
		updateTodo(todos.filter((todo) => todo.id !== id));
	}

	return (
		<div className="container">
			<ul className="todo-list-card">
				{todos.map((todo) => (

					<li key={todo.id}>
						<div className="todo-item">
							<Checkbox checked={todo.status == "done"} onChange={() => handleStatusUpdate(todo.id)} />
							<Input
								placeholder={todo.description}
								className={todo.status == "done" ? "todo-done" : ""} />
							<Button variant="contained" color="error" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

interface AddTodoProp {
	todos: Todo[];
	addTodo: Dispatch<SetStateAction<Todo[]>>;
}

const AddTodo: React.FC<AddTodoProp> = ({ todos, addTodo }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleAddTodo = () => {
		if (!inputRef.current || !inputRef.current.value) return;

		const newTodo: Todo = {
			id: uuidv4(),
			description: inputRef.current.value.trim(),
			status: "todo",
		};

		addTodo([...todos, newTodo]);
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

interface FooterProps {
	todos: Todo[];
}

const Footer: React.FC<FooterProps> = ({ todos }) => {

	return (
		<div className="footer">
			<span>Total todos: {todos.length}</span>
		</div>
	);
}
const App: React.FC = () => {
	const [theme, SetTheme] = useState<Theme>("light");
	const [todoList, SetTodoList] = useState(TODO_LIST);

	return (
		<div>
			<Header theme={theme} setTheme={SetTheme} />
			<AddTodo todos={todoList} addTodo={SetTodoList} />
			<TodoList todos={todoList} updateTodo={SetTodoList} />
			<Footer todos={todoList} />
		</div>
	);
};

export default App;
