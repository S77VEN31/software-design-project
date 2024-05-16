// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Students.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { deleteStudentRequest, getStudentRequest } from "@api";
// Utils
import { checkPermission } from "@utils";
// Hooks
import { useResponseToast } from "@hooks";
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

const Students = () => {
  // Navigation
  const navigation = useNavigate();
  // States
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  // Hooks
  const toast = useResponseToast();

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
      header: "Carrera",
      accessor: "career",
      objectAccessor: (career) => (career.length > 0 ? career[0].name : "N/A"),
      render: (career) =>
        career.length > 0 ? <span>{career[0].name}</span> : <span>None</span>,
    },
    {
      header: "Correo",
      accessor: "email",
    },
    {
      header: "Estado",
      accessor: "status",
      render: (status) => (status === "active" ? "Activo" : "Inactivo"),
    },
  ];

  const actions = [
    {
      permission: checkPermission(permissions, "STUDENT", "PUT"),
      component: (id: string) => (
        <IconButton onClick={() => navigation(`/home/student/edit/${id}`)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      permission: checkPermission(permissions, "STUDENT", "DELETE"),
      component: (id: string) => (
        <IconButton onClick={() => handleModal(id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  if (actions.some((action) => action.permission)) {
    columns.push({
      header: "Acciones",
      accessor: "_id",
      render: (id) => (
        <div>
          {actions.map((action) =>
            action.permission ? action.component(id) : null
          )}
        </div>
      ),
    });
  }

  const tableLayoutProps = {
    title: "Estudiantes",
    button: checkPermission(permissions, "STUDENT", "POST") && (
      <Button
        variant="contained"
        onClick={() => navigation("/home/student/add")}
      >
        Agregar Estudiante
      </Button>
    ),
    children: <DataTable data={students} columns={columns} />,
  };

  const getStudents = async () => {
    getStudentRequest()
      .then((response) => {
        setStudents(response);
      })
      .catch((error) => {
        console.log(error);
        toast(500 , ["Error al obtener los estudiantes"]);
      });
  };

  const deleteStudent = async (id: string) => {
    deleteStudentRequest(id)
      .then((response) => {
        console.log(response);
        getStudents();
        setOpen(false);
        toast(200, response.message);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al eliminar el estudiante"]);
      });
  };

  const handleModal = (id: string) => {
    setSelectedStudent(students.find((student) => student._id === id) || null);
    setOpen(!open);
  };

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.students}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          <h2
            className={styles.warning}
          >{`Seguro de que quieres eliminar a ${selectedStudent?.name}?`}</h2>
          <hr />
          <div className={styles.rowContainer}>
            <div className={styles.row}>
              <h4>Name:</h4>
              <p>{selectedStudent?.name}</p>
            </div>
            <div className={styles.row}>
              <h4>Carne:</h4>
              <p>{selectedStudent?.carne}</p>
            </div>
          </div>
          <p className={styles.warning}>Esta accion no se puede deshacer.</p>
          <div className={styles.buttons}>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                deleteStudent(selectedStudent?._id);
              }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};
export default Students;
