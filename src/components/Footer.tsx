import type { Todo } from "src/types/Todo";

interface FooterProps {
	todoList: Todo[];
}

export const Footer = ({ todoList }: FooterProps) => {
	return (
		<div className="footer">
			<span>Total todos: {todoList.length}</span>
		</div>
	);
};
