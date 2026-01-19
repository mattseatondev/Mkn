import { PiPlusCircle } from "react-icons/pi";
import type { Category } from "../types";
import { useAddCategoryMutation } from "../features/api/apiSlice";
import type { RootState } from "../app/store";;
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import classes from './Sidebar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setActiveCat } from "../features/category/categorySilce";

interface Props {
    cat: Category;
    hoverIndex: number;
    setHoverIndex: (newHover: number) => void;
    expIndex: number;
    setExpIndex: (newExp: number) => void;
    iconMap: Record<string, JSX.Element>
    index: number;
}

export default function Category({
    cat,
    hoverIndex,
    setHoverIndex,
    expIndex,
    setExpIndex,
    iconMap,
    index
}: Props) {

    const dispatch = useDispatch();

    const [addInput, setAddInput] = useState(false);
    const [newCat, setNewCat] = useState<string>('');

    const [postCat] = useAddCategoryMutation();
    const activeCat = useSelector((state: RootState) => state.categories.activeCat)

    const submitNewCat = async () => {
        if (!newCat.trim()) return;

        try {
            await postCat({
                type: cat.type,
                name: newCat,
                details: "New category created from sidebar"
            }).unwrap();
            setAddInput(false);
            setNewCat("");
            setExpIndex(-1);
        } catch (err) {
            console.error("Failed to add category", err);
        }
    };

    const activateCat = () => {
        console.log({ cat })
        setExpIndex(expIndex === index ? -1 : index);
        dispatch(setActiveCat(cat));
    }

    useEffect(() => {
        setAddInput(false);
        setNewCat('');
    }, [expIndex]);

    return (
        <div
            className={`${classes.catouter} fc fjs fac`}
            style={{ background: expIndex === index ? 'rgba(0, 0, 0, 0.5)' : 'none' }}>
            <div
                className={`${classes.cat} fr js ac`}
                key={cat.type}
                style={{
                    color: hoverIndex === index + 1 ? 'var(--bg)' : `var(--${cat.type})`,
                    background: hoverIndex === index + 1 ? `var(--${cat.type})` : 'none',
                    borderBottom: `1px solid var(--${cat.type})`,
                    borderRadius: hoverIndex === index + 1 ? '5px' : '0'
                }}
                onMouseOver={() => setHoverIndex(index + 1)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => activateCat()}>
                {
                    iconMap[cat.type]
                }
                {cat.name}
            </div>
            {
                expIndex === index &&
                <div className={classes.exp}>
                    <div
                        className={`${classes.sub} fr js ac`} style={{ color: `var(--${cat.type})` }}
                        onClick={() => !addInput && setAddInput(true)}>
                        {
                            !addInput
                                ? <>
                                    <PiPlusCircle />
                                    <h5>Add Subcategory</h5>
                                </>
                                : <>
                                    <input
                                        className={classes.input}
                                        placeholder='Enter name'
                                        value={newCat}
                                        onChange={e => setNewCat(e.target.value)} />
                                    <BiCheckCircle
                                        className={classes.submit}
                                        onClick={() => submitNewCat()} />
                                </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}