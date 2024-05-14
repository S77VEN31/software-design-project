// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Schedules.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { deleteScheduleRequest, getScheduleRequest } from "@api";
// Utils
import { checkPermission, formatDate } from "@utils";
//// Hooks
import { useResponseToast } from "@hooks";
// Interfaces
interface Schedule extends Record<string, TableRenderable> {
  name: number;
  status: string;
  startDate: string;
  endDate: string;
  team: string;
  activities: string;
}

const Schedules = () => {
  // Navigation
  const navigation = useNavigate();
  // States
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  // Hooks
  const toast = useResponseToast();

  const columns: TableColumn<Schedule, keyof Schedule>[] = [
    {
      accessor: "name",
      header: "Name",
    },
    {
      accessor: "status",
      header: "Status",
      render: (status) => (status === "active" ? "Activo" : "Inactivo"),
    },
    {
      accessor: "startDate",
      header: "Start Date",
      render: (date) => (date ? formatDate(date) : "N/A"),
      objectAccessor: (date) => formatDate(date),
    },
    {
      accessor: "endDate",
      header: "End Date",
      render: (date) => (date ? formatDate(date) : "N/A"),
      objectAccessor: (date) => formatDate(date),
    },
  ];
  const actions = [
    {
      permission: checkPermission(permissions, "STUDENT", "PUT"),
      component: (id: string) => (
        <IconButton onClick={() => navigation(`/home/schedule/edit/${id}`)}>
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
    title: "Horarios",
    button: checkPermission(permissions, "SCHEDULE", "POST") && (
      <Button
        variant="contained"
        onClick={() => navigation("/home/schedule/add")}
      >
        Agregar Horario
      </Button>
    ),
    children: <DataTable data={schedules} columns={columns} />,
  };

  const getSchedules = async () => {
    getScheduleRequest()
      .then((response) => {
        setSchedules(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSchedule = async (id: string) => {
    deleteScheduleRequest(id)
      .then(() => {
        getSchedules();
        setOpen(false);
        toast(200, ["Horario eliminado correctamente"]);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al eliminar el horario"]);
      });
  };

  const handleModal = (id: string) => {
    setSelectedSchedule(
      schedules.find((student) => student._id === id) || null
    );
    setOpen(!open);
  };

  useEffect(() => {
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.schedules}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          <h2
            className={styles.warning}
          >{`Seguro de que quieres eliminar a ${selectedSchedule?.name}?`}</h2>
          <hr />
          <div className={styles.rowContainer}>
            <div className={styles.row}>
              <h4>Name:</h4>
              <p>{selectedSchedule?.name}</p>
            </div>
            <div className={styles.row}>
              <h4>Status: </h4>
              <p>{selectedSchedule?.status}</p>
            </div>

            <div className={styles.row}>
              <h4>Start Date:</h4>
              <p>
                {selectedSchedule?.startDate
                  ? formatDate(selectedSchedule.startDate)
                  : "N/A"}
              </p>

              <h4>End Date:</h4>
              <p>
                {selectedSchedule?.endDate
                  ? formatDate(selectedSchedule.endDate)
                  : "N/A"}
              </p>
            </div>
          </div>
          <p className={styles.warning}>Esta accion no se puede deshacer.</p>
          <div className={styles.buttons}>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                deleteSchedule(selectedSchedule?._id);
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
export default Schedules;
