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
import { getTeamRequest, deleteTeamRequest } from "@api";
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
    _id: string;
    name: string;
    code: any;
    description: string;
    coordinator: Coordinator;
    createdAt: Date;
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
        accessor: "description",
        header: "Descripción",
        render: (description) => <span>{
            description.length > 63 ? description.slice(0,60).concat("...") : description
          }</span>,
    },
    {
        accessor: "coordinator",
        header: "Coordinador",
        render: (coordinator) => <span>{coordinator.name}</span>,
    },
  ];

  const actions = [
    {
        permission: checkPermission(permissions, "TEAM", "PUT"),
        component: (code: string) => (
          <IconButton onClick={() => navigation(`/home/team/edit/${code}`)}>
            <Edit />
          </IconButton>
        ),
    },
    {
      permission: checkPermission(permissions, "TEAM", "DELETE"),
      component: (code: string) => (
        <IconButton onClick={() => handleModal(code)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  if (actions.some((action) => action.permission)) {
    columns.push({
      header: "Acciones",
      accessor: "code",
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
      <Button
        variant="contained"
        onClick={() => navigation("/home/team/add")}
      >
        Agregar Equipo
      </Button>
    ),
    children: <DataTable data={teams} columns={columns} />,
  };

  const getTeams = async () => {
    getTeamRequest()
      .then((response) => {
        setTeams(response);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al obtener los equipos"]);
      });
  };

  const deleteTeam = async (code: string) => {
    deleteTeamRequest(code)
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

  const handleModal = (code: string) => {
    setSelectedTeam(teams.find((team) => team.code === code) || null);
    setOpen(!open);
  };

  useEffect(() => {
    getTeams();
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
                    deleteTeam(selectedTeam?.code);
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