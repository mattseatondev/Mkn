
import { BsBucket } from 'react-icons/bs';
import { FaBook, FaBriefcase, FaDumbbell, FaHeart, FaHome, FaUtensils } from 'react-icons/fa';

import classes from '../components/Sidebar.module.css';

export const iconMap = (color='') => {
    const templateMap: Record<string, JSX.Element> = {
        work: <FaBriefcase className={classes.icon} style={{color: color}} />,
        personal: <FaHome className={classes.icon} style={{color: color}} />,
        exercise: <FaDumbbell className={classes.icon} style={{color: color}} />,
        cooking: <FaUtensils className={classes.icon} style={{color: color}} />,
        housework: <BsBucket className={classes.icon} style={{color: color}} />,
        study: <FaBook className={classes.icon} style={{color: color}} />,
        lifestyle: <FaHeart className={classes.icon} style={{color: color}} />,
    };
    return templateMap;
}