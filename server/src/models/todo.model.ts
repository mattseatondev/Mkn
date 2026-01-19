import { CategoryType } from "./category.model"

export interface Todo {
    id: number;
    category: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body?: string;
}