// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Teachers.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { deleteTeacherRequest, getTeacherRequest } from "@api";
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

const Teachers = () => {
  // Navigation
  const navigation = useNavigate();
  // Modal State
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

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
    {
      header: "Es Coordinator",
      accessor: "roles",
      render: (roles) => (
        <span>{roles.includes("Coordinator") ? "Sí" : "No"}</span>
      ),
    },
  ];

  const actions = [
    {
      permission: checkPermission(permissions, "TEACHER", "PUT"),
      component: (id: string) => (
        <IconButton onClick={() => navigation(`/home/teacher/edit/${id}`)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      permission: checkPermission(permissions, "TEACHER", "DELETE"),
      component: (id: string) => (
        <IconButton onClick={() => handleModal(id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  // Add the actions column if any permissions are granted
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
    title: "Profesores",
    button: checkPermission(permissions, "TEACHER", "POST") && (
      <Button
        variant="contained"
        onClick={() => navigation("/home/teacher/add")}
      >
        Agregar Profesor
      </Button>
    ),
    children: <DataTable data={teachers} columns={columns} />,
  };

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

  const deleteTeacher = async (id: string) => {
    deleteTeacherRequest(id)
      .then(() => {
        getTeachers(); // Refresh the list after deletion
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModal = (id: string) => {
    setSelectedTeacher(teachers.find((teacher) => teacher._id === id) || null);
    setOpen(!open);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className={styles.teachers}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          <h2
            className={styles.warning}
          >{`Seguro de que quieres eliminar a ${selectedTeacher?.name}?`}</h2>
          <div className={styles.row}>
            <h4>Nombre:</h4>
            <p>{selectedTeacher?.name}</p>
          </div>
          <div className={styles.row}>
            <h4>Cédula:</h4>
            <p>{selectedTeacher?.idNumber}</p>
          </div>
          <p className={styles.warning}>Esta accion no se puede deshacer.</p>
          <div className={styles.buttons}>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => deleteTeacher(selectedTeacher?._id)}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};

export default Teachers;
