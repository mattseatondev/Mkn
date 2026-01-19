import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo, Category } from '../../types';

const baseUrl = 'http://localhost:8080';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Todos', 'Categories'],
    endpoints: builder => ({
        getTodos: builder.query<Todo[], void>({
            query: () => '/todo',
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: newTodo => ({
                url: '/todo',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation<Todo, Partial<Todo> & { id: number}>({
            query: ({ id, ...patch }) => ({
                url: `/todo/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation<{success: boolean, id: string}, string>({
            query: id => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        }),
        getCategories: builder.query<Category[], void>({
            query: () => '/category',
            providesTags: ['Categories']
        }),
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