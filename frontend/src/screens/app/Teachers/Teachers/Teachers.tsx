// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Teachers.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Button } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Contexts
import { useAuth } from "@contexts";
// Api
import { getTeacherRequest } from "@api";
// Utils
import { checkPermission } from "@utils";
// Interfaces
interface Career {
  _id: string;
  name: string;
}
interface Teacher extends Record<string, TableRenderable> {
  idNumber: number;
  name: string;
  career: Career[];
  email: string;
}

const columns: TableColumn<Teacher, keyof Teacher>[] = [
  {
    accessor: "idNumber",
    header: "Cédula",
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

const Teachers = () => {
  // Navigation
  const navigation = useNavigate();
  // Contexts
  const { permissions } = useAuth();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const getTeachers = async () => {
    getTeacherRequest()
      .then((response) => {
        setTeachers(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const tableLayoutProps = {
    title: "TEACHERS",
    button: checkPermission(permissions, "TEACHER", "POST") && (
      <Button
        variant="contained"
        onClick={() => navigation("/home/teacher/add")}
      >
        Add Teacher
      </Button>
    ),
    children: <DataTable data={teachers} columns={columns} />,
  };

  return (
    <div className={styles.teachers}>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};
export default Teachers;
