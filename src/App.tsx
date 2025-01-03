import { Header, type Theme } from "./components/Headers";
import { Footer } from "./components/Footer";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import "./App.css";

import type { Todo } from "./types/Todo";

import { useState } from "react";

const TODO_LIST: Todo[] = [
	{ id: "1", description: "Buy Grocery", status: "todo" },
	{ id: "2", description: "Go for a run", status: "todo" },
	{ id: "3", description: "Do dishes", status: "todo" },
	{ id: "4", description: "Buy milk", status: "done" },
];

const App = () => {
	const [theme, SetTheme] = useState<Theme>("light");
	const [todoList, SetTodoList] = useState(TODO_LIST);

	return (
		<div>
			<Header theme={theme} setTheme={SetTheme} />
			<AddTodo todoList={todoList} setTodoList={SetTodoList} />
			<TodoList todoList={todoList} setTodoList={SetTodoList} />
			<Footer todoList={todoList} />
		</div>
	);
};

export default App;
