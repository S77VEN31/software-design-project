// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
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
  return <DataTable data={data} columns={columns} />;
};
export default Teachers;
