import type { TodoStatus } from "./TodoStatus";

export interface Todo {
	id: string;
	description: string;
	status: TodoStatus;
}
