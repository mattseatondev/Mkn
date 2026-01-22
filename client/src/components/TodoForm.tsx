import { useEffect, useState } from 'react';
import classes from './Todos.module.css';
import type { Category, Todo } from '../types';
import { BiPlusCircle } from 'react-icons/bi';
import { useAddTodoMutation, useGetCategoriesQuery } from '../features/api/apiSlice';
import { iconMap } from '../lib/templateMap';
import { LuThumbsUp } from 'react-icons/lu';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { allCat, setActiveCat } from '../features/category/categorySilce';

interface Props {
    initFormData?: Partial<Todo>;
}

/**
 * TodoForm: A multi-step interactive form for creating new tasks.
 * Flow: 
 * 1. Initial State: Simple "Add New Todo" call-to-action.
 * 2. Category Selection: If no category is active, user picks one.
 * 3. Data Entry: User provides title and body.
 */
export default function TodoForm({ initFormData }: Props) {
    const activeCat = useSelector((state: RootState) => state.categories.activeCat);
    const cats = useGetCategoriesQuery();
    const categories = cats.data ?? [];
    const [postTodo] = useAddTodoMutation();

    const defaultFormData = { category: '', title: '', body: '' };
    const [formData, setFormData] = useState<Partial<Todo>>(initFormData ?? defaultFormData);

    /**
     * initForm: Boolean to toggle the form from a "button" view to an "active form" view.
     * selCat: Tracks the specific category object to drive UI colors and icon logic.
     */
    const [initForm, setInitForm] = useState(!!initFormData);
    const [selCat, setSelCat] = useState<Category | null>(null);

    /**
     * Handler: Updates the form's category and UI state when a category node is clicked.
     */
    const udFormData = (cat: Category) => {
        setSelCat(cat);
        setFormData({ ...formData, category: cat.name });
    }

    /**
     * API Handler: Submits the Todo. 
     * Uses .unwrap() to catch potential errors in the catch block.
     */
    const submitPost = async () => {
        try {
            await postTodo(formData).unwrap();
            // Resets local state on success
            setFormData(defaultFormData);
            setInitForm(false);
            setSelCat(null);
        } catch (err) {
            console.error("Failed to add category", err);
        }
    }

    /**
     * Effect: Pre-filling.
     * If a user is already viewing a specific category, we pre-select that category for the new Todo.
     */
    useEffect(() => {
        if (activeCat && activeCat.type !== 'all') {
            setSelCat(activeCat);
            setFormData({ ...formData, category: activeCat.name });
        }
    }, [initForm]);

    // Reset form state if the user switches categories in the Sidebar
    useEffect(() => {
        setInitForm(false);
    }, [activeCat]);

    return (
        <form
            className={`${classes.todo} fc jc ac`}
            style={{ color: `lightgray` }}
            onClick={() => setInitForm(true)}
            onSubmit={submitPost}>

            {/* Step 1: Default 'Add' Invitation */}
            {
                !initForm &&
                <>
                    <BiPlusCircle className={classes.plus} />
                    <h3>Add New Todo.</h3>
                </>
            }

            {/* Step 2: Category Selector (Shown if form is open but no category is chosen) */}
            {
                initForm && !formData.category &&
                <div className={`${classes.cats} fr js as fw`}>
                    {
                        categories.map((cat: any) => (
                            <div
                                className={`${classes.catnode} fc jc ac`}
                                style={{
                                    background: `var(--${cat.type})`
                                }}
                                onClick={() => udFormData(cat)}>
                                {
                                    iconMap('var(--dark)')[cat.type]
                                }
                                <small>{cat.name}</small>
                            </div>
                        ))
                    }
                </div>
            }

            {/* Step 3: Text Input Fields (Shown once category is confirmed) */}
            {
                initForm && selCat &&
                <div className={classes.info}>
                    <header className='fr js ac' style={{
                        borderBottom: `1px solid var(--${selCat.type})`
                    }}>
                        <div
                            className={`${classes.catnode} fc jc ac`}
                            style={{
                                background: `var(--${selCat.type})`,
                            }}>
                            {
                                iconMap('var(--dark)')[selCat.type]
                            }
                            <small>{selCat.name}</small>
                        </div>
                        <input value={formData.title} placeholder='Title' onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </header>
                    <textarea value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} placeholder='Body (Optional)' />

                    {/* Submit UI: Only appears when a title exists: Todo body is optional */}
                    {
                        formData.title &&
                        <LuThumbsUp className={classes.thumbs} onClick={() => submitPost()} />
                    }
                </div>
            }
        </form>
    )
}