// Types
import { Schedule } from "@enumerables";

const DefaultSchedule: Schedule = {
  name: "",
  // Date to string
  startDate: "",
  endDate: "",
  status: "",
  activities: [],
};

const ScheduleFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "status",
    label: "Status",
    type: "dropdown",
    options: [
      {
        value: "active",
        label: "Activo",
      },
      {
        value: "inactive",
        label: "Inactivo",
      },
    ],
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "startDate",
    label: "Fecha de Inicio",
    type: "date",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "endDate",
    label: "Fecha de Finalización",
    type: "date",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "team",
    label: "Equipo",
    type: "dropdown",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
];
/**
 *   {
    id: "activities",
    label: "Actividades",
    type: "dropdown-list",
    section: "Actividades",
    options: [
      {
        value: "activity1",
        label: "Actividad 1",
      },
      {
        value: "activity2",
        label: "Actividad 2",
      },
    ],
    fullWidth: true,
    required: true,
  },
 */
export { DefaultSchedule, ScheduleFields };
