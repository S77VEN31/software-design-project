// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Teams.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { deleteTeamRequest, getTeamRequest } from "@api";
// Utils
import { checkPermission } from "@utils";
// Hooks
import { useResponseToast } from "@hooks";
// Interfaces
interface Coordinator {
  _id: string;
  name: string;
}
interface Team extends Record<string, TableRenderable> {
  name: string;
  code: string;
  description: string;
  coordinator: Coordinator[];
  createdAt: Date;
  campusBranch: string[];
  career: string[];
  students: string[];
  teachers: string[];
}

const Teams = () => {
  // Navigation
  const navigation = useNavigate();
  // States
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  // Hooks
  const toast = useResponseToast();

  const columns: TableColumn<Team, keyof Team>[] = [
    {
      accessor: "code",
      header: "Código",
    },
    {
      accessor: "name",
      header: "Nombre",
      render: (name) => <strong>{name}</strong>,
    },
    {
      accessor: "year",
      header: "Año",
      render: (year) => <strong>{year || "N/A"}</strong>,
      objectAccessor: (year) => year,
    },
    {
      accessor: "coordinator",
      header: "Coordinador",
      render: (coordinator) =>
        (coordinator.length > 0 && coordinator[0].name) || "N/A",
      objectAccessor: (coordinator) =>
        (coordinator.length > 0 && coordinator[0].name) || "N/A",
    },
    {
      accessor: "students",
      header: "Estudiantes",
      render: (students) => students.length,
    },
    {
      accessor: "teachers",
      header: "Profesores",
      render: (teachers) => teachers.length,
    },
    {
      accessor: "campusBranch",
      header: "Sede",
      render: (campusBranch) =>
        campusBranch.length > 0 ? campusBranch[0].name : "N/A",
      objectAccessor: (campusBranch) =>
        (campusBranch.length > 0 && campusBranch[0].name) || "N/A",
    },
    {
      accessor: "career",
      header: "Carrera",
      render: (career) => (career.length > 0 ? career[0].name : "N/A"),
      objectAccessor: (career) =>
        (career.length > 0 && career[0].name) || "N/A",
    },
  ];

  const actions = [
    {
      permission: checkPermission(permissions, "TEAM", "PUT"),
      component: (id: string) => (
        <IconButton onClick={() => navigation(`/home/team/edit/${id}`)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      permission: checkPermission(permissions, "TEAM", "DELETE"),
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
    title: "Equipos",
    button: checkPermission(permissions, "TEAM", "POST") && (
      <Button variant="contained" onClick={() => navigation("/home/team/add")}>
        Agregar Equipo
      </Button>
    ),
    children: <DataTable data={teams} columns={columns} />,
  };

  const getTeams = async () => {
    getTeamRequest()
      .then((response) => {
        setTeams(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al obtener los equipos"]);
      });
  };

  const deleteTeam = async (id: string) => {
    deleteTeamRequest(id)
      .then((response) => {
        console.log(response);
        getTeams();
        setOpen(false);
        toast(200, response.message);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al eliminar el equipo"]);
      });
  };

  const handleModal = (id: string) => {
    setSelectedTeam(teams.find((team) => team._id === id) || null);
    setOpen(!open);
  };

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.teams}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          <h2
            className={styles.warning}
          >{`Seguro de que quieres eliminar a ${selectedTeam?.name}?`}</h2>
          <hr />
          <div className={styles.rowContainer}>
            <div className={styles.row}>
              <h4>Nombre:</h4>
              <p>{selectedTeam?.name}</p>
            </div>
            <div className={styles.row}>
              <h4>Código:</h4>
              <p>{selectedTeam?.code}</p>
            </div>
            <p className={styles.warning}>Esta accion no se puede deshacer.</p>
            <div className={styles.buttons}>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button
                onClick={() => {
                  deleteTeam(selectedTeam?._id);
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};

export default Teams