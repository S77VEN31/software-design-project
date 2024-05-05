// React
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Teachers.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Button } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Interfaces
interface Teacher extends Record<string, TableRenderable> {
  id: number;
  name: string;
  age: number;
}

const data: Teacher[] = [
  { id: 1, name: "Juan", age: 20 },
  { id: 2, name: "Ana", age: 22 },
];

const columns: TableColumn<Teacher>[] = [
  {
    header: "Nombre",
    accessor: "name",
    render: (name) => <strong>{name}</strong>,
  },
  {
    accessor: "id",
    render: (id) => <button onClick={() => alert("ID " + id)}>Click Me</button>,
  },
  { header: "Edad", accessor: "age" },
];

const Teachers = () => {
  const navigation = useNavigate();
  const dataTableProps = {
    data,
    columns,
  };
  const tableLayoutProps = {
    title: "TEACHERS",
    button: (
      <Button
        variant="contained"
        onClick={() => navigation("/home/teacher/add")}
      >
        Add Teacher
      </Button>
    ),
    children: <DataTable {...dataTableProps} />,
  };

  return (
    <div className={styles.teachers}>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};
export default Teachers;
