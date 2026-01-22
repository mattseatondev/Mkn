import { FaReact } from "react-icons/fa";
import styles from "./Header.module.css";
import { MdCategory } from "react-icons/md";

interface Props {
    toggleCats:() => void;
}

export function Header({ toggleCats }:Props) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a className={`${styles.logoText} ${styles.navLink} fr jc ac`} onClick={toggleCats}>
          <MdCategory className={styles.navIcon} />
          Categories
        </a>
      </nav>
      <div className={styles.logo}>
        <FaReact className={styles.logoIcon} />
        <span className={styles.logoText}>TodoApp</span>
      </div>
    </header>
  );
}
