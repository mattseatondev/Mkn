import { Category, CategoryType } from "../models/category.model";
import { Todo } from "../models/todo.model";
import categoryController from "./category.controller";
import todoController from "./todo.controller";

/**
 * Groups all todos by their category name.
 * @returns An object mapping category names to arrays of Todos.
 *          e.g. { "Food": [Todo, Todo], "Work": [Todo] }
 * @throws Error if no todos exist in the store.
 */
const getTodosByCat = ():{ [category: string]: Todo[] } => {
    const todos = todoController.getAllTodos();
    console.log({ todos })
    if (!todos.length) throw new Error('No todos found in data store');
    else {
        return todos.reduce((byCat: { [category: string]: Todo[] }, todo: Todo) => {
            const cat = todo.category;
            if (byCat[cat]) byCat[cat].push(todo);
            else byCat[cat] = [todo];
            return byCat;
        }, {});
    }
}

/**
 * Retrieves all todos for a specific category by ID.
 * @param catId - Numeric ID of the requested category
 * @returns An object containing the category and its todos
 *          { category: Category, todos: Todo[] }
 * @throws Error if the category does not exist.
 */
const getCatTodos = (
    catId: number
): { category: Category; todos: Todo[] } => {
    const category = categoryController.getOneCat(catId);
    const todos = todoController
        .getAllTodos()
        .filter(todo => todo.category === category.type);

    return { category, todos };
};


export default {
    ...categoryController,
    ...todoController,
    getTodosByCat,
    getCatTodos
}