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

// Sidebar subcomponent used to change Active Category in context,
// As well as add new subcategories extended from base set.
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

    /**
     * Logic: Submits a new subcategory to the backend via RTK Mutation.
     * On success, it resets local UI states and closes the expansion panel.
     */
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

    /**
     * UI Handler: Updates the global Redux state for the active category
     * and toggles the expansion of the subcategory drawer.
     */
    const activateCat = () => {
        setExpIndex(expIndex === index ? -1 : index);
        dispatch(setActiveCat(cat));
    }

    // Effect: Reset the subcategory input if the user switches to a different top-level category
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

            {/* Expansion Drawer: Shown only when this category is active/expanded */}
            {
                expIndex === index &&
                <div className={classes.exp}>
                    <div
                        className={`${classes.sub} fr js ac`} style={{ color: `var(--${cat.type})` }}
                        onClick={() => !addInput && setAddInput(true)}>
                            
                        {/* Conditional Rendering: Toggle between "Add" button and text input */}
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