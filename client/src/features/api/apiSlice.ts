import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo, Category } from '../../types';

const baseUrl = 'http://localhost:8080';

// Central slice to manage and sync server-based state
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    // For invalidating cache
    tagTypes: ['Todos', 'Categories'],
    endpoints: builder => ({
        // GET all Todos
        getTodos: builder.query<Todo[], void>({
            query: () => '/todo',
            providesTags: ['Todos']
        }),
        // POST Todo
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: newTodo => ({
                url: '/todo',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos']
        }),
        // PUT Todo
        updateTodo: builder.mutation<Todo, Partial<Todo> & { id: number }>({
            query: ({ id, ...patch }) => ({
                url: `/todo/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Todos']
        }),
        // DELETE Todo
        deleteTodo: builder.mutation<{ success: boolean, id: string }, string>({
            query: id => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        }),
        // Get all Categories
        getCategories: builder.query<Category[], void>({
            query: () => '/category',
            providesTags: ['Categories'],
            // Transformed to appease TS: Casts Date type to ISO string
            transformResponse: (response:Category[]) => {
                return response.map(category => ({
                    ...category,
                    createdAt: category.createdAt instanceof Date
                        ? category.createdAt.toISOString()
                        : category.createdAt
                }));
            },
        }),
        // POST Category
        addCategory: builder.mutation<Category, Partial<Category>>({
            query: newCat => ({
                url: '/category',
                method: 'POST',
                body: newCat
            }),
            invalidatesTags: ['Categories']
        })
    })
});

// Auto-generated hooks based on endpoint names from RTK
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useGetCategoriesQuery,
    useAddCategoryMutation
} = apiSlice;