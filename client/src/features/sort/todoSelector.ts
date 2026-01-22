import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import type { RootState } from "../../app/store";

// Grab current Todos' state from apiSlice
const selectTodosResult = apiSlice.endpoints.getTodos.select();

// Creates selectors to return all Todos, if they have been retrieved (defaults to empty array)
const selectAllTodos = createSelector(
    selectTodosResult,
    res => res.data ?? []
);

// Ensures Todos partitioned by completion status are first filtered by Active Catetgory
export const selectFilteredTodos = createSelector(
    [selectAllTodos, (state:RootState) => state.categories.activeCat],
    (todos, activeCat) => activeCat.type === 'all'
        ? todos
        : todos.filter(t => t.category === activeCat.name)
);

// Separates Todos (filtered by Active Category) are partitioned by completion status
export const selectCompletedSort = createSelector(
    [selectFilteredTodos],
    todos => ({
        pending: todos.filter(t => !t.isComplete),
        completed: todos.filter(t => t.isComplete)
    })
);