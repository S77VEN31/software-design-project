import { DataTable, TableColumn, TableRenderable } from "@components";

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
];

const Students = () => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default Students;
