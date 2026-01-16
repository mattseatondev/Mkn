import { Category, CategoryType } from "../models/category.model";
import { PartialCategory } from "../types/common";

/**
 * In-memory store for Category objects.
 * Supports creating, listing all, and retrieving by ID.
 * Categories get auto-incremented numeric IDs.
 */

export class CategoryStore {
    private categories: Map<number, Category> = new Map();
    private nextId = 1;
    
    create(data:PartialCategory) {
        const now = new Date();
        const newCategory = {
            id: this.nextId++,
            createdAt: now,
            ...data
        } as Category;
        this.categories.set(newCategory.id, newCategory);
    }

    getAll(){
        return Array.from(this.categories.values()) ?? [];
    }

    getOne(id:number): Category{
        const foundCat = this.categories.get(id);
        if (!foundCat) throw new Error(`Category ${id} not found`);
        return foundCat;
    }
    
}