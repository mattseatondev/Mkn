import { useState } from "react";
import { useGetCategoriesQuery, useGetTodosQuery } from "../features/api/apiSlice";
import type { RootState } from '../app/store';

import classes from './Todos.module.css';
import { useSelector } from "react-redux";
import { ImInfinite } from "react-icons/im";
import { iconMap } from "../lib/templateMap";
import TodoForm from "./TodoForm";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";

export function TodoList() {
    const activeCat = useSelector((state: RootState) => state.categories.activeCat);
    const qTodos = useGetTodosQuery(); // queried todos
    const cTodos = qTodos?.data ?? []; // validated component todos
    const todos = activeCat.type === 'all' ? cTodos : cTodos.filter((todo:Todo) => todo.category === activeCat.name);
    const qCats = useGetCategoriesQuery();
    const cats = qCats?.data ?? [];

    const [hoverIndex, setHoverIndex] = useState<number>(-1);
    const [selIndex, setSelIndex] = useState<number>(-1);

    if (qTodos.isLoading) return <div>Todos are Loading...</div>
    if (qTodos.isError) return <div>Error with Todos</div>

    return (
        <div className={`${classes.list} fc js`}>
            <header
                className={`${classes.head} fr js ac`}
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
            <div className={`${classes.todos} fr js as fw`}>
                <TodoForm />
                {
                    todos.map((todo:Todo, tx) => (
                        <TodoItem todo={todo} categories={cats} />
                    ))
                }
            </div>
        </div>
    )

}