import { CategoryType } from "../models/category.model";
import { Todo } from "../models/todo.model";
import { PartialTodo } from "../types/common";

/**
 * In-memory store for Todo Objets
 * Supports full CRUD
 * Todo ids are auto-incremented
 * Protection established against discrepancies on delete
 * by enforing nextId logic
 */

export class TodoStore {

    private todos: Map<number, Todo> = new Map();
    private nextId = 1;

    create(data: PartialTodo): Todo {
        const now = new Date();
        const newTodo = {
            id: this.nextId++,
            isComplete: false,
            createdAt: now,
            updatedAt: now,
            ...data
        } as Todo;
        this.todos.set(newTodo.id, newTodo);
        return newTodo;
    }

    getAll(): Todo[] {
        return Array.from(this.todos.values());
    }

    getOne(id: number): Todo {
        const todo = this.todos.get(id);
        if (todo) return todo;
        else throw new Error(`Todo ${id} not found`);
    }

    update(id: number, newData: PartialTodo): Todo {
        const todo = this.getOne(id);
        const updated = { ...todo, ...newData, updatedAt: new Date() };
        this.todos.set(id, updated);
        return updated;
    }

    delete(id: number): string {
        try {
            // For validation (check if todo exists)
            const todo = this.getOne(id);
            this.todos.delete(id);
            return `Todo ${id} successfully deleted`;
        } catch (deleteTodoErr) {
            throw deleteTodoErr
        }
    }

}