// Types
import { Schedule } from "@enumerables";

const DefaultSchedule: Schedule = {
  name: "",
  startDate: "",
  endDate: "",
  activities: [],
  teams: [],
};

const ScheduleFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 60,
      minLength: 4,
    },
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
    id: "teams",
    label: "Equipo",
    type: "dropdown",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "description",
    label: "Descripción",
    type: "textarea",
    section: "Información extra del Horario",
    multiline: true,
    rows: 4,
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
  },
];

const ScheduleUpdateFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 60,
      minLength: 4,
    },
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
  },
  {
    id: "endDate",
    label: "Fecha de Finalización",
    type: "date",
    section: "Información del Horario",
    fullWidth: true,
  },
  {
    id: "teams",
    label: "Equipo",
    type: "dropdown",
    section: "Información del Horario",
    fullWidth: true,
    required: true,
  },
  {
    id: "description",
    label: "Descripción",
    type: "textarea",
    section: "Información extra del Horario",
    multiline: true,
    rows: 4,
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
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
export { DefaultSchedule, ScheduleFields, ScheduleUpdateFields };

