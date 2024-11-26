import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./App.css";
import {
	Button,
	Checkbox,
	TextField,
} from "@mui/material";

import { v4 as uuidv4 } from 'uuid';

/*
Header Component
  Title
  Theme

AddTodo Component
  Input Field
  Add Button

TodoList Component
  List of Todos

Todo Component
  Checkbox
  Description
  Edit Button
  Delete Button

Footer Component
  Total Todos
  Filter Todos Button
  Sort Todos Button
  Clear All Todos Button
*/

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

interface TodoItemProps {
	description: string;
	status: TodoStatus;
}

const TodoItem: React.FC<TodoItemProps> = ({ description, status }) => {
	return (
		<div className="todo-card">
			<Checkbox checked={status == 'done'} />
			<span>{status}</span>
			<TextField label={description} />
			<Button variant="contained" color="error">
				delete
			</Button>
		</div>
	);
};

const TODO_LIST: Todo[] = [
	{ id: '1', description: "Buy Grocery", status: "todo" },
	{ id: '2', description: "Go for a run", status: "todo" },
	{ id: '3', description: "Do dishes", status: "todo" },
	{ id: '4', description: "Buy milk", status: "done" },
];

interface TodoListProps {
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	return (
		<div className="container">
			<ul className="todo-list-card">
				{todos.map((todo) => (
					<li key={todo.id}>
						<TodoItem description={todo.description} status={todo.status} />
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
	  if (!inputRef.current || !inputRef.current.value ) return;
  
	  const newTodo: Todo = {
		id: uuidv4(),
		description: inputRef.current.value.trim(),
		status: "todo",
	  };
  
	  addTodo([...todos, newTodo]);
	  inputRef.current.value = "";
	};
  
	return (
	  <div className="todo-card">
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

const App: React.FC = () => {
	const [theme, SetTheme] = useState<Theme>("light");
	const [todoList, SetTodoList] = useState(TODO_LIST);

	return (
		<div>
			<Header theme={theme} setTheme={SetTheme} />
			<AddTodo todos={todoList} addTodo={SetTodoList} />
			<TodoList todos={todoList} />
		</div>
	);
};

export default App;
