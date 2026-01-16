import { Category, CategoryType } from "../models/category.model";
import { store } from "../data/index.store";
import { PartialCategory } from "../types/common";

/**
 * Business-logic controller for Category requests.
 * Includes support for Create, Get All and Get One
 * Formats logic to be consumed by routes
 */

const createCat = (data:PartialCategory) => store.categories.create(data);
const getAllCats = () => store.categories.getAll();
const getOneCat = (id:number) => store.categories.getOne(id);

export default {
    createCat,
    getAllCats,
    getOneCat
};