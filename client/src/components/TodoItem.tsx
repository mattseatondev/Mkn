import type { Category, Todo } from "../types";
import classes from './Todos.module.css';
import { iconMap } from "../lib/templateMap";
import moment from 'moment';
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../features/api/apiSlice";
import { BiCheckCircle, BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { LuThumbsUp } from "react-icons/lu";

interface Props {
    todo: Todo;
    categories: Category[];
}

/**
 * TodoItem: Displays a single task with options to edit, delete, or toggle completion.
 * It uses a "dual-state" render: 
 * 1. Read-only Mode: Displays title, body, and metadata.
 * 2. Edit Mode: Replaces text with inputs to allow direct updates.
 */
export default function TodoItem({ todo, categories }: Props) {

    const tdCat = categories.find(cat => cat.name === todo.category);

    const [udTodo] = useUpdateTodoMutation();
    const [delTodo] = useDeleteTodoMutation();

    /**
     * editFormData: When null, the component is in "Read-only" mode.
     * When populated with a Todo object, the component switches to "Edit Mode".
     */
    const [editFormData, setEditFormData] = useState<Partial<Todo> | null>(null);

    /**
     * Action: Toggles the completion status.
     * Note: Uses unwrap() to allow the catch block to handle API failures.
     */
    const completeTodo = async () => {
        try {
            await udTodo({ ...todo, isComplete: !todo.isComplete }).unwrap();
        } catch (err) {
            console.error("Failed to add category", err);
        }
    }

    /**
     * Action: Deletes the item.
     */
    const initDelete = async () => {
        try {
            await delTodo(todo.id.toString());
        } catch (err) {
            console.error("Failed to delete todo", err)
        }
    }

    /**
     * Action: Submits edited changes.
     * Combines the original todo with the new form data and resets the edit state.
     */
    const submitEdit = async () => {
        try {
            await udTodo({ ...todo, ...editFormData });
            setEditFormData(null);
        } catch (submitEditErr) {
            console.log({ submitEditErr });
        }
    }

    // Defensive check: Only render if a valid category match is found
    return tdCat && (
        <div className={`${classes.todo} fc js ac`}>
            <header
                className='fr fbtw ac'
                style={{
                    borderBottom: `1px solid var(--${tdCat.type})`,
                    color: `var(--${tdCat.type})`
                }}>
                <div
                    className={`${classes.catnode} fc jc ac`}
                    style={{
                        background: `var(--${tdCat.type})`,
                    }}>
                    {
                        iconMap('var(--dark)')[tdCat.type]
                    }
                    <small>{tdCat.name}</small>
                </div>
                <div className={`${classes.htext} fc jc ac`}>

                    {/* Conditional Header: Text vs Input */}
                    {
                        !editFormData
                            ? <h3 className='fr jc'>{todo.title}</h3>
                            : <input
                                value={editFormData.title}
                                onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} />
                    }

                    {/* Utility Controls */}
                    <div className={`${classes.util} fr ac`}>
                        <TbTrash
                            className={`${classes.utilIcon} ${classes.delIcon}`}
                            onClick={() => initDelete()} />

                        <BiEditAlt
                            className={`${classes.utilIcon} ${classes.editIcon}`}
                            onClick={() => setEditFormData(!editFormData ? { ...todo } : null)} />

                        <BiCheckCircle
                            className={`${classes.utilIcon} ${classes.completeIcon}`}
                            onClick={() => completeTodo()} />
                    </div>
                </div>
            </header>

            {/* Content Area: Conditional rendering for description vs textarea */}
            {
                !editFormData
                    ? <p>
                        {
                            todo.body || "No Description Provided..."
                        }
                        <span>Created: {moment(todo.createdAt).format('MM/DD @ h:mma')}</span>
                    </p>
                    : <>
                        <textarea
                            value={editFormData.body}
                            onChange={e => setEditFormData({ ...editFormData, body: e.target.value })}
                            className={classes.bodyarea} />
                        {
                            JSON.stringify(todo) !== JSON.stringify(editFormData) &&
                            <LuThumbsUp className={classes.thumbs} onClick={() => submitEdit()} />
                        }
                    </>
            }

            {/* Visual Overlay: Appears when todo is marked as complete */}
            {
                todo.isComplete &&
                <div className={classes.completed} onClick={() => completeTodo()}>
                    <BiCheckCircle className={classes.check} />
                    <h3>Item Complete</h3>
                </div>
            }
        </div>
    )
}