import { store } from "../data/index.store";
import { Todo } from "../models/todo.model";
import { PartialTodo } from "../types/common";


const createTodo = (data:PartialTodo) => store.todos.create(data);
const getAllTodos = () => store.todos.getAll();
const getOneTodo = (id:number) => store.todos.getOne(id);
const updateTodo = (id:number, newData:PartialTodo) => store.todos.update(id, newData);
const deleteTodo = (id:number) => store.todos.delete(id);

export default {
    createTodo,
    getAllTodos,
    getOneTodo,
    updateTodo,
    deleteTodo
};