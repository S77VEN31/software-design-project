// React
import { ReactNode } from "react";
// Styles
import styles from "./TableLayout.module.css";
// Interfaces
interface TableLayoutProps {
  title: string;
  children: ReactNode;
}

const TableLayout = ({ children, title }: TableLayoutProps) => {
  return (
    <div className={styles.tableLayout}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <div className={styles.line} />
      </div>
      {children}
    </div>
  );
};
export default TableLayout;
