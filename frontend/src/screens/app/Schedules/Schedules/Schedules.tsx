// Styles
import styles from "./Schedules.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { TableLayout } from "@layouts";
// Interfaces
interface Schedule extends Record<string, TableRenderable> {
  carne: number;
  active: boolean;
  email: string;
  name: string;
  age: number;
}

const data: Schedule[] = [
  {
    carne: 20190001,
    active: true,
    email: "20190001@estudiantec.cr",
    name: "Juan",
    age: 20,
  },
];

const columns: TableColumn<Schedule>[] = [
  {
    header: "Nombre",
    accessor: "name",
    render: (name) => <strong>{name}</strong>,
  },
  {
    header: "Correo",
    accessor: "email",
    render: (email) => <a href={`mailto:${email}`}>{email}</a>,
  },

  {
    header: "Carne",
    accessor: "carne",
  },
  {
    header: "Activo",
    accessor: "active",
  },
  {
    header: "Edad",
    accessor: "age",
  },
];

const Schedules = () => {
  return (
    <div className={styles.schedules}>
      <TableLayout title={"SCHEDULES"}>
        <DataTable data={data} columns={columns} />
      </TableLayout>
    </div>
  );
};
export default Schedules;
