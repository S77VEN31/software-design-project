// Styles
import styles from "./Students.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
// Layouts
import { TableLayout } from "@layouts";
// Interfaces
interface Student extends Record<string, TableRenderable> {
  id: number;
  name: string;
  age: number;
}

const data: Student[] = [
  { id: 1, name: "Juan", age: 20 },
  { id: 2, name: "Ana", age: 22 },
];

const columns: TableColumn<Student>[] = [
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

const Students = () => {
  return (
    <div className={styles.students}>
      <TableLayout title={"STUDENTS"}>
        <DataTable data={data} columns={columns} />
      </TableLayout>
    </div>
  );
};
export default Students;
