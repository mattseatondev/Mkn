import categoryController from "../controllers/category.controller";
import { Category } from "../models/category.model";
import { PartialCategory } from "../types/common";

const initCats:PartialCategory[] = [
    {
        type: 'work',
        name: 'Work',
        details: 'Tasks centered around your career.'
    },
    {
        type: 'personal',
        name: 'Personal',
        details: 'Tasks involving family, free-time, hobbies, etc.'
    },
    {
        type: 'exercise',
        name: 'Exercise',
        details: 'Plans and details regarding physical fitness and health'
    },
    {
        type: 'housework',
        name: 'Housework',
        details: 'Shopping, cleaning, laundry, and other goals for keeping a tidy home.'
    },
    {
        type: 'cooking',
        name: 'Cooking',
        details: 'A record of upcoming meals, shopping lists, recipes and reservations.'
    },
    {
        type: 'study',
        name: 'Study',
        details: 'A place to organize your goals for learning and upgrading skills'
    },
    {
        type: 'lifestyle',
        name: 'Lifestyle',
        details: 'Habits, routines, and personal goals that shape your day-to-day way of living.'
    }
];

export const seedInitCategories = () => {
    try {
        console.log(`\n Attempting to seed default Categories...\n`);
        initCats.forEach(cat => categoryController.createCat(cat));
        console.log(`\n ${initCats.length} default Categories seeded to DataStore\n`);
    } catch(seedInitCategoriesErr) {
        console.error({ seedInitCategoriesErr });
    }
}