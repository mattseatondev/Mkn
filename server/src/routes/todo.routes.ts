import { Router, Request, Response, NextFunction } from 'express';
import controller from '../controllers/index.controller';
import { PartialTodo } from '../types/common';

const router = Router();

/**
 * POST /todo
 * Adds a new todo to DataStore
 * @returns new Todo
 */
router.post('/', (req: Request<{}, {}, PartialTodo>, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        controller.createTodo(body);
        return res.status(201).json(body);
    } catch(createTodoErr) {
        next(createTodoErr);
    }
});

/**
 * GET /todo
 * @returns array containing all todos in DataStore
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = controller.getAllTodos();
        res.json(todos);
    } catch(getTodosErr) {
        next(getTodosErr);
    }
});

/**
 * GET /todo/sorted/by_category
 * Allows UI to group todo elems without performing sort logic
 * @param sorted indicates sorted/grouped response
 * @param by_category indicates sort key
 * @returns {[category.type]: Todo.category === category.type[]}
 */
router.get('/sorted/by_category', (req: Request, res: Response, next: NextFunction) => {
    try {
        const todosByCat = controller.getTodosByCat();
        res.json(todosByCat);
    } catch(getTodosByCatErr) {
        next(getTodosByCatErr);
    }
});

/**
 * GET /todo/:id
 * @param id [todo.id]
 * @returns a single todo by numerical id
 */
router.get('/:id', (req: Request<{id: string}, {}, PartialTodo>, res:Response, next: NextFunction) => {
    try {
        const idStr = req.params.id;
        const id = parseInt(idStr);
        const todo = controller.getOneTodo(id);
        res.json(todo);
    } catch(getOneTodoErr) {
        next(getOneTodoErr);
    }
});

/**
 * PUT /todo/:id
 * @param id [todo.id]
 * @body Partial Todo instance (auto-props Omitted)
 * @returns Complete Todo instance with validated props updated
 */
router.put('/:id', (req: Request<{id: string}, {}, PartialTodo>, res: Response, next: NextFunction) => {
    try {
        const idStr = req.params.id;
        const id = parseInt(idStr);
        const body = req.body;
        const udTodo = controller.updateTodo(id, body)
        res.status(200).json(udTodo);
    } catch(updateTodoErr) {
        next(updateTodoErr);
    }
});

/**
 * DELETE /todo/:id
 * Removes a requested todo from the Datastore
 * @param [todo.id]
 * @returns -
 */
router.delete('/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const idStr = req.params.id;
        const id = parseInt(idStr);
        controller.deleteTodo(id);
        // 204 for no content response
        res.sendStatus(204);
    } catch(deleteTodoErr) {
        next(deleteTodoErr);
    }
});

export default router;