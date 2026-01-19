import { useGetCategoriesQuery } from '../features/api/apiSlice';
import { useState } from 'react';
import classes from './Sidebar.module.css';
import { ImInfinite } from 'react-icons/im';
import Category from './Category';
import { iconMap } from '../lib/templateMap';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { allCat, setActiveCat } from '../features/category/categorySilce';

export function Sidebar() {
    const dispatch = useDispatch();
    const activeCat = useSelector((state: RootState) => state.categories.activeCat);
    const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

    const [hoverIndex, setHoverIndex] = useState<number>(-1);
    const [ expIndex, setExpIndex ] = useState<number>(-1);

    if (isLoading) return <aside className="sidebar">Loading categories...</aside>;
    if (isError) return <aside className="sidebar">Error loading categories</aside>;

    return (
        <aside className={`${classes.sidebar} fc js ac`}>
            <div
                className={`${classes.cat} fr js ac`}
                style={{
                    color: hoverIndex === 0 ? 'var(--bg)' : `var(--lifestyle)`,
                    background: hoverIndex === 0 ? `var(--lifestyle)` : 'none',
                    borderBottom: `1px solid var(--lifestyle)`,
                    borderRadius: hoverIndex === 0 ? '5px' : '0',
                    width: '90%',
                    minHeight: '55px'
                }}
                onMouseOver={() => setHoverIndex(0)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => dispatch(setActiveCat(allCat))}>
                    <ImInfinite className={classes.icon} />
                    All
            </div>
            {categories.map((cat, cx) => (
                <Category
                    cat={cat}
                    index={cx}
                    hoverIndex={hoverIndex}
                    setHoverIndex={setHoverIndex}
                    expIndex={expIndex}
                    setExpIndex={setExpIndex}
                    iconMap={iconMap()} />
            ))}
        </aside>
    );
}
