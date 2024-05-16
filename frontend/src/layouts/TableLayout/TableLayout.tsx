// React
import { ReactNode } from "react";
// Styles
import styles from "./TableLayout.module.css";
// Interfaces
interface TableLayoutProps {
  title: string;
  children: ReactNode;
  button?: ReactNode;
  reportsButton?: ReactNode;
}

const TableLayout = ({
  children,
  title,
  button,
  reportsButton,
}: TableLayoutProps) => {
  return (
    <div className={styles.tableLayout}>
      <div className={styles.header}>
        <div className={styles.content}>
          <h1>{title}</h1>
          {reportsButton}
          {button}
        </div>
        <div className={styles.line} />
      </div>
      {children}
    </div>
  );
};
export default TableLayout;
