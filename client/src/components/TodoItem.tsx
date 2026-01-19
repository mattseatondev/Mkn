import { useSelector } from "react-redux";
import type { Category, Todo } from "../types";
import type { RootState } from '../app/store';

import classes from './Todos.module.css';
import { iconMap } from "../lib/templateMap";

import moment from 'moment';
import { CgCheck } from "react-icons/cg";
import { SiSquare } from "react-icons/si";

import { useUpdateTodoMutation } from "../features/api/apiSlice";
import { BiCheckCircle } from "react-icons/bi";

interface Props {
    todo: Todo;
    categories: Category[];
}

export default function TodoItem({ todo, categories }: Props) {

    const tdCat = categories.find(cat => cat.name === todo.category);
    const [udTodo] = useUpdateTodoMutation();

    const completeTodo = async (removeComplete = false) => {
        try {
            await udTodo({ ...todo, isComplete: !todo.isComplete }).unwrap();
        } catch (err) {
            console.error("Failed to add category", err);
        }
    }

    const delTodo = async () => {
        try {

        } catch(err) {

        }
    }

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
                    <h3>{todo.title}</h3>
                    <div className='fr jc ac'>
                        <button
                            className={`${classes.hbtn} ${classes.compbtn} ${todo.isComplete && classes.iscomplete}`}
                            onClick={() => completeTodo()}>
                            {
                                todo.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'
                            }
                        </button>
                        <button
                            className={`${classes.hbtn} ${classes.delbtn}`}
                            onClick={() => delTodo()}>
                                Delete
                            </button>
                    </div>
                </div>
            </header>
            <p>
                {
                    todo.body || "No Description Provided..."
                }
                <span>Created: {moment(todo.createdAt).format('MM/DD @ h:mma')}</span>
            </p>
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