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
    initFormData?:Partial<Todo>;
}

export default function TodoForm({ initFormData }:Props) {
    const activeCat = useSelector((state: RootState) => state.categories.activeCat);
    const cats = useGetCategoriesQuery();
    const categories = cats.data ?? [];
    const [postTodo] = useAddTodoMutation();

    const defaultFormData = { category: '', title: '', body: '' };
    const [formData, setFormData] = useState<Partial<Todo>>(initFormData ?? defaultFormData);
    const [initForm, setInitForm] = useState(false);
    const [selCat, setSelCat] = useState<Category | null>(null);

    const dispatch = useDispatch();

    const udFormData = (cat: Category) => {
        setSelCat(cat);
        setFormData({ ...formData, category: cat.name });
    }

    const submitPost = async () => {
        try {
            await postTodo(formData).unwrap();
            setFormData(defaultFormData);
            setInitForm(false);
            setSelCat(null);
        } catch (err) {
            console.error("Failed to add category", err);
        }
    }

    useEffect(() => {
        if (initForm) dispatch(setActiveCat(allCat));
    }, [initForm]);

    return (
        <form
            className={`${classes.todo} fc jc ac`}
            style={{ color: `lightgray` }}
            onClick={() => setInitForm(true)}
            onSubmit={submitPost}>
            {
                !initForm &&
                <>
                    <BiPlusCircle className={classes.plus} />
                    <h3>Add New Todo.</h3>
                </>
            }
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
                    {
                        formData.title &&
                        <LuThumbsUp className={classes.thumbs} onClick={() => submitPost()} />
                    }
                </div>
            }
        </form>
    )
}