import { Category } from "../models/category.model";
import { Todo } from "../models/todo.model";

// Allows POST and PUT requests to use partials for each interface
export type PartialTodo = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;
export type PartialCategory = Partial<Omit<Category, 'id' | 'createdAt'>>;