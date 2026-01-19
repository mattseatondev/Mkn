import { FaReact } from "react-icons/fa";
import styles from "./Header.module.css";

interface Props {
    toggleCats:() => void;
}

export function Header({ toggleCats }:Props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <FaReact className={styles.logoIcon} />
        <span className={styles.logoText}>TodoApp</span>
      </div>

      <nav className={styles.nav}>
        <a className={styles.navLink} onClick={toggleCats}>
          Categories
        </a>
      </nav>
    </header>
  );
}
