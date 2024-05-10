// React
import { useEffect, useState } from "react";
// Styles
import styles from "./Students.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { getStudentRequest } from "@api";
// Interfaces
interface Career {
  _id: string;
  name: string;
}
interface Student extends Record<string, TableRenderable> {
  carne: number;
  name: string;
  career: Career[];
  email: string;
}

const columns: TableColumn<Student, keyof Student>[] = [
  {
    accessor: "carne",
    header: "Carné",
  },
  {
    header: "Nombre",
    accessor: "name",
    render: (name) => <strong>{name}</strong>,
  },
  {
    header: "Careera",
    accessor: "career",
    render: (career) => <span>{career[0].name}</span>,
  },
  {
    header: "Correo",
    accessor: "email",
  },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const getStudents = async () => {
    getStudentRequest()
      .then((response) => {
        setStudents(response);

        console.log(response);
      })
      .catch((error) => {
        // TODO: Handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className={styles.students}>
      <TableLayout title={"STUDENTS"}>
        <DataTable data={students} columns={columns} />
      </TableLayout>
    </div>
  );
};
export default Students;
