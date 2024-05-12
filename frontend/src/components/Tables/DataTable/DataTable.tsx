// React
import { ReactElement, ReactNode, useEffect, useState } from "react";
// Styles
import styles from "./DataTable.module.css";
// Components
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectAccessor?: (value: any) => string;
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
  // Estado para mantener la cadena de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para mantener los datos filtrados
  const [filteredData, setFilteredData] = useState(data);

  // Efecto para filtrar los datos cada vez que `data` o `searchTerm` cambien
  useEffect(() => {
    const filtered = data.filter((row) =>
      columns.some((column) => {
        const rawValue = row[column.accessor];
        let value = rawValue;
        if (
          column.objectAccessor &&
          rawValue !== null &&
          rawValue !== undefined
        ) {
          // @ts-expect-error - Esto no debería ser necesario
          value = column.objectAccessor(rawValue);
        }
        // Filtra basándote en el valor procesado
        return (
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
    setFilteredData(filtered);
  }, [data, searchTerm, columns]);
  return (
    <div className={styles.dataTable}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "1rem" }}
      />
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
          {filteredData.map((row, rowIndex) => (
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

