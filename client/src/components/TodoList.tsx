import { useEffect, useState } from "react";
import { useGetCategoriesQuery, useGetTodosQuery } from "../features/api/apiSlice";
import type { RootState } from '../app/store';

import classes from './Todos.module.css';
import { useSelector } from "react-redux";
import { ImInfinite } from "react-icons/im";
import { iconMap } from "../lib/templateMap";
import TodoForm from "./TodoForm";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import { selectCompletedSort } from "../features/sort/todoSelector";

interface Props {
    showCats: boolean;
}

/**
 * TodoList: The primary view component that orchestrates the display of tasks.
 * It integrates:
 * 1. Global State (Active Category)
 * 2. API Data (RTK Query cache)
 * 3. Derived State (Memoized filtering/sorting via Selectors)
 */
export function TodoList({ showCats }: Props) {

    const activeCat = useSelector((state: RootState) => state.categories.activeCat);
    const todos = useGetTodosQuery();

    const qCats = useGetCategoriesQuery();
    const cats = qCats?.data ?? [];

    /**
     * Optimized Data Access:
     * Instead of filtering the todos array here in the component, we use a memoized selector.
     * This ensures the sort/filter logic only recalculates if the data or the active category changes.
     */
    const { pending, completed } = useSelector(selectCompletedSort);

    // Standard guard clauses for API asynchronous states
    if (todos.isLoading) return <div>Todos are Loading...</div>
    if (todos.isError) return <div>Error with Todos</div>

    return (
        <div
            className={`${classes.list} fc js`}
            style={{
                width: `${showCats ? 80 : 98}%`
            }}>

            {/* Dynamic Header: Adapts color and icons based on the Active Category */}
            <header
                className={`${classes.head} fr jc ac`}
                style={{ borderBottom: `4px double var(--${activeCat.type})`, color: `var(--${activeCat.type})` }}>
                {
                    activeCat.name === 'All'
                        ? <ImInfinite
                            style={{
                                width: '22px',
                                height: 'auto',
                                marginRight: '8px'
                            }} />
                        : iconMap()[activeCat.type]
                }
                {
                    activeCat.type === 'all'
                        ? <h3>All Todos</h3>
                        : <h3>{activeCat.name} Todos</h3>
                }
            </header>

            {/* Pending Tasks Section */}
            <div
                className={`${classes.todos} fr js as fw`}>
                <h3 className={classes.todoHeader}>Pending Todos</h3>
                <TodoForm />

                {/* Rendering the filtered 'pending' array from our selector */}
                {
                    pending.map((todo: Todo) => <TodoItem todo={todo} categories={cats} />)
                }
            </div>

            {/* Completed Tasks Section: Separated for visual clarity */}
            <div
                className={`${classes.todos} ${classes.completeTodos} fr js as fw`}
                style={{
                    width: `${showCats ? 80 : 100}%`
                }}>
                <h3 className={classes.todoHeader}>Completed Todos</h3>

                {/* Rendering the filtered 'completed' array from our selector */}
                {
                    completed.map((todo: Todo) => <TodoItem todo={todo} categories={cats} />)
                }
            </div>
        </div>
    )

} 