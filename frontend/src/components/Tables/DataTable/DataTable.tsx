// React
import { ReactElement, ReactNode } from "react";
// Styles
import styles from "./DataTable.module.css";
// Types
type TableRenderable =
  | string
  | number
  | boolean
  | ReactElement
  | null
  | undefined;
// Interfaces
interface TableColumn<T> {
  header?: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
}
interface DataTableProps<
  T extends Record<string, TableRenderable | TableRenderable[]>
> {
  data: T[];
  columns: TableColumn<T>[];
}

const DataTable = <
  T extends Record<string, TableRenderable | TableRenderable[]>
>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className={styles.item} key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {typeof column.render === "function"
                  ? column.render(row[column.accessor], row)
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
export type { TableColumn, TableRenderable };

