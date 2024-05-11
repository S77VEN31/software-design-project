// React
import { ReactElement, ReactNode } from "react";
// Styles
import styles from "./DataTable.module.css";
// Types
// @ts-expect-error - This type is used in the DataTable component
type TableRenderable =
  | string
  | number
  | boolean
  | ReactElement
  | null
  | undefined
  | Record<string, TableRenderable>;

// Interfaces
interface TableColumn<T, K extends keyof T> {
  header?: string;
  accessor: K;
  render?: (value: T[K], row: T) => ReactNode;
}
interface DataTableProps<
  T extends Record<string, TableRenderable | TableRenderable[]>
> {
  data: T[];
  columns: TableColumn<T, keyof T>[];
}

const DataTable = <
  T extends Record<string, TableRenderable | TableRenderable[]>
>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <div className={styles.dataTable}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className={styles.item} key={index}>
                {column.header}
              </th>
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
    </div>
  );
};
export default DataTable;
export type { TableColumn, TableRenderable };

