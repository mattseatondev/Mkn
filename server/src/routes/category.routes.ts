import { Router, Request, Response, NextFunction } from 'express';
import controller from '../controllers/index.controller';
import { PartialCategory } from '../types/common';

const router = Router();


/**
 * POST /category
 * Adds new category to DataStore
 * @returns new Category
 */
router.post('/', (req: Request<{}, {}, PartialCategory>, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        controller.createCat(body);
        return res.status(201).json(body);
    } catch(createCatErr) {
        next(createCatErr);
    }
});

/**
 * GET /category
 * @returns array containing categories
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const cats = controller.getAllCats();
        res.json(cats);
    } catch (getCatsErr) {
        next(getCatsErr);
    }
});

/**
 * Get /category/:id (Get One)
 * @param id: [category.id]
 * @returns a single category by numerical id
 */
router.get('/:id', (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    try {
        const idStr = req.params.id;
        const id = parseInt(idStr, 10);
        if (isNaN(id)) throw new Error("ID must be a number");
        const cat = controller.getOneCat(id);
        res.json(cat);
    } catch(getOneCatErr) {
        next(getOneCatErr);
    }
});

/**
 * Get /category/todos/:id
 * Gets all todos for a particular category
 * @param id: [category.id]
 * @returns {category: Category, todos: Todo[]}
 */
router.get('/todos/:id', (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const idStr = req.params.id;
        const id = parseInt(idStr, 10);
        if (isNaN(id)) throw new Error("ID must be a number");
        const catTodos = controller.getCatTodos(id);
        res.json(catTodos);
    } catch(getCatTodosErr) {
        next(getCatTodosErr);
    } 
})

export default router;