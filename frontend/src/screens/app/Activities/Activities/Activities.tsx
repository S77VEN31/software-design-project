// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Activities.module.css";
// Components
import { DataTable, TableColumn, TableRenderable } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
// Layouts
import { TableLayout } from "@layouts";
// Api
import { deleteActivityRequest, getActivityRequest } from "@api";
// Utils
import { checkPermission, formatDate } from "@utils";
// Hooks
import { useResponseToast } from "@hooks";

// Interfaces
interface Activity extends Record<string, TableRenderable> {
  week: number;
  type: string;
  name: string;
  dateTime: string;
  organizers: string[];
  mode: string;
  status: string;
}

const Activities = () => {
  // Navigation
  const navigation = useNavigate();
  // States
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  // Hooks
  const toast = useResponseToast();

  const columns: TableColumn<Activity, keyof Activity>[] = [
    {
      accessor: "week",
      header: "Week",
    },
    {
      accessor: "type",
      header: "Type",
    },
    {
      accessor: "name",
      header: "Name",
    },
    {
      accessor: "dateTime",
      header: "Date and Time",
      render: (date) => (date ? formatDate(date) : "N/A"),
      objectAccessor: (date) => formatDate(date),
    },
    {
      accessor: "mode",
      header: "Mode",
    },
    {
      accessor: "status",
      header: "Status",
      render: (status) => {
        switch (status) {
          case "Planned":
            return "Planned";
          case "Notified":
            return "Notified";
          case "Realized":
            return "Realized";
          case "Canceled":
            return "Canceled";
          default:
            return status;
        }
      },
    },
  ];

  const actions = [
    {
      permission: checkPermission(permissions, "ACTIVITY", "PUT"),
      component: (id: string) => (
        <IconButton
          onClick={() => navigation(`/home/schedule/activity/edit/${id}`)}
        >
          <Edit />
        </IconButton>
      ),
    },
    {
      permission: checkPermission(permissions, "ACTIVITY", "DELETE"),
      component: (id: string) => (
        <IconButton onClick={() => handleModal(id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  if (actions.some((action) => action.permission)) {
    columns.push({
      header: "Actions",
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
    title: "Activities",
    button: checkPermission(permissions, "ACTIVITY", "POST") && (
      <Button
        variant="contained"
        onClick={() => navigation("/home/schedule/activity/add")}
      >
        Add Activity
      </Button>
    ),
    children: <DataTable data={activities} columns={columns} />,
  };

  const getActivities = async () => {
    getActivityRequest()
      .then((response) => {
        setActivities(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteActivity = async (id: string) => {
    deleteActivityRequest(id)
      .then(() => {
        getActivities();
        setOpen(false);
        toast(200, ["Activity deleted successfully"]);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error deleting activity"]);
      });
  };

  const handleModal = (id: string) => {
    setSelectedActivity(
      activities.find((activity) => activity._id === id) || null
    );
    setOpen(!open);
  };

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.activities}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modalContainer}
      >
        <div className={styles.modal}>
          <h2 className={styles.warning}>
            {`Are you sure you want to delete ${selectedActivity?.name}?`}
          </h2>
          <hr />
          <div className={styles.rowContainer}>
            <div className={styles.row}>
              <h4>Name:</h4>
              <p>{selectedActivity?.name}</p>
            </div>
            <div className={styles.row}>
              <h4>Status: </h4>
              <p>{selectedActivity?.status}</p>
            </div>
            <div className={styles.row}>
              <h4>Date and Time:</h4>
              <p>
                {selectedActivity?.dateTime
                  ? formatDate(selectedActivity.dateTime)
                  : "N/A"}
              </p>
              <h4>Mode:</h4>
              <p>{selectedActivity?.mode}</p>
            </div>
          </div>
          <p className={styles.warning}>This action cannot be undone.</p>
          <div className={styles.buttons}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                deleteActivity(selectedActivity?._id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <TableLayout {...tableLayoutProps} />
    </div>
  );
};
export default Activities;
