import { useState } from "react";
import "./App.css";

/*
Header Component
  Title
  Theme

AddTodo Component
  Input Field
  priority
  Add Button

TodoList Component
  Checkbox
  priority
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
			<button type="button" onClick={handleThemeChange}>
				{theme}
			</button>
		</div>
	);
};

const App: React.FC = () => {
	const [theme, SetTheme] = useState<Theme>("light");
	return (
		<div>
			<Header theme={theme} setTheme={SetTheme} />
		</div>
	);
};

export default App;
