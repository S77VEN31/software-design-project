// Types
import { Schedule, Activity } from "@enumerables";

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

const DefaultActivity: Activity = {
  type: "Orientation",
  week: 1,
  name: "",
  dateTime: "",
  organizers: [],
  anouncementDays: 1,
  reminderDays: 1,
  mode: "Online",
  status: "Planned",
  meetingLink: "",
  poster: "",
  evidence: "",
  comments: [],
};

const ActivityFields = [
  {
    id: "name",
    label: "Nombre",
    type: "text",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "week",
    label: "Semana",
    type: "number",
    section: "Información de la Actividad",
    inputProps: {
      min: 1,
      max: 18,
    },
    fullWidth: true,
    required: true,
  },
  {
    id: "type",
    label: "Tipo",
    type: "dropdown",
    options: [
      {
        value: "Orientation",
        label: "Orientación",
      },
      {
        value: "Motivational",
        label: "Motivacional",
      },
      {
        value: "Support",
        label: "Apoyo",
      },
      {
        value: "Technical",
        label: "Técnico",
      },
      {
        value: "Recreational",
        label: "Recreativo",
      },
    ],
    section: "Configuración de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "dateTime",
    label: "Fecha y Hora",
    type: "date",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "organizers",
    label: "Organizadores",
    type: "dropdown-list",
    section: "Configuración de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "anouncementDays",
    label: "Días de Anuncio",
    type: "number",
    section: "Configuración de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "mode",
    label: "Modalidad",
    type: "dropdown",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
    options: [
      {
        value: "Online",
        label: "En Línea",
      },
      {
        value: "Presential",
        label: "Presencial",
      },
    ],
  },
  {
    id: "reminderDays",
    label: "Días de Recordatorio",
    type: "number",
    section: "Configuración de la Actividad",
    fullWidth: true,
    required: true,
  },
];

const ActivityUpdateFields = [
  {
    id: "type",
    label: "Tipo",
    type: "dropdown",
    options: [
      {
        value: "Orientation",
        label: "Orientación",
      },
      {
        value: "Motivational",
        label: "Motivacional",
      },
      {
        value: "Support",
        label: "Apoyo",
      },
      {
        value: "Technical",
        label: "Técnico",
      },
      {
        value: "Recreational",
        label: "Recreativo",
      },
    ],
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "week",
    label: "Semana",
    type: "number",
    section: "Información de la Actividad",
    inputProps: {
      min: 1,
      max: 18,
    },
    fullWidth: true,
    required: true,
  },
  {
    id: "name",
    label: "Nombre",
    type: "text",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "dateTime",
    label: "Fecha y Hora",
    type: "date",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "organizers",
    label: "Organizadores",
    type: "dropdown",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "anouncementDays",
    label: "Días de Anuncio",
    type: "number",
    inputProps: {
      min: 1,
    },
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "evidence",
    label: "Descripción de Equipo",
    type: "textarea",
    section: "Información Extra",
    fullWidth: true,
    multiline: true,
    rows: 4,
    inputProps: {
      maxLength: 100,
      minLength: 5,
    },
  },
  {
    id: "reminderDays",
    label: "Días de Recordatorio",
    inputProps: {
      min: 1,
    },
    type: "number",
    section: "Información de la Actividad",
    fullWidth: true,
    required: true,
  },
  {
    id: "mode",
    label: "Modalidad",
    type: "dropdown",
    options: [
      {
        value: "Online",
        label: "En Línea",
      },
      {
        value: "Presential",
        label: "Presencial",
      },
    ],
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
export {
  DefaultSchedule,
  ScheduleFields,
  ScheduleUpdateFields,
  DefaultActivity,
  ActivityFields,
  ActivityUpdateFields,
};

