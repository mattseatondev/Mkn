import { CategoryStore } from "./category.store";
import { TodoStore } from "./todo.store";

export const store = {
    todos: new TodoStore(),
    categories: new CategoryStore()
};