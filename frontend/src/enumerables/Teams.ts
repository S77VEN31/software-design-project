const DefaultTeam = {
  code: "",
  name: "",
  description: "",
  year: "",
  students: [],
  teachers: [],
  coordinator: [],
  campusBranch: [],
  career: [],
};

const TeamFields = [
  {
    id: "name",
    label: "Nombre del equipo",
    type: "text",
    section: "Información General",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 60,
      minLength: 5,
    },
    validation: (value: string) => value === "" || value.length >= 5,
    helperText: "Name must have at least 5 characters",
  },
  {
    id: "code",
    label: "Código del equipo",
    type: "text",
    section: "Información General",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 10,
      minLength: 5,
    },
    validation: (value: string) =>
      value === "" || (value.length >= 5 && value.length <= 10),
    helperText: "Code must have between 5 and 10 digits",
  },
  {
    id: "year",
    label: "Año",
    type: "year",
    section: "Información General",
    fullWidth: true,
    required: true,
  },
  {
    id: "campusBranch",
    label: "Sede",
    type: "dropdown",
    section: "Información General",
    fullWidth: true,
    required: true,
  },
  {
    id: "career",
    label: "Carrera",
    type: "dropdown",
    section: "Información General",
    fullWidth: true,
    required: true,
  },
  {
    id: "coordinator",
    label: "Coordinador",
    type: "dropdown",
    section: "Integrantes del Equipo",
    fullWidth: true,
    required: true,
  },
  {
    id: "teachers",
    label: "Profesores",
    type: "dropdown-list",
    section: "Integrantes del Equipo",
    fullWidth: true,
    required: true,
  },
  {
    id: "students",
    label: "Estudiantes",
    type: "dropdown-list",
    section: "Integrantes del Equipo",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 10,
      minLength: 5,
    },
  },
  {
    id: "description",
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
];

const UpdateTeamFields = [
  {
    id: "name",
    label: "Nombre del equipo",
    type: "text",
    section: "Información General",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 60,
      minLength: 5,
    },
    validation: (value: string) => value === "" || value.length >= 5,
    helperText: "Name must have at least 5 characters",
  },
  {
    id: "coordinator",
    label: "Coordinador",
    type: "dropdown",
    section: "Información del Equipo",
    fullWidth: true,
    required: true,
  },
  {
    id: "teachers",
    label: "Profesores",
    type: "multiselect",
    section: "Información del Equipo",
    fullWidth: true,
    required: true,
  },
  {
    id: "students",
    label: "Estudiantes",
    type: "multiselect",
    section: "Participantes del Equipo",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 10,
      minLength: 5,
    },
    validation: (value: string) =>
      value === "" || (value.length >= 5 && value.length <= 10),
    helperText: "Code must have between 5 and 10 digits",
  },
  {
    id: "description",
    label: "Descripción de Equipo",
    type: "textarea",
    section: "Más Información",
    fullWidth: true,
    required: true,
    multiline: true,
    rows: 4,
    inputProps: {
      maxLength: 300,
      minLength: 5,
    },
    validation: (value: string) =>
      value === "" || (value.length >= 5 && value.length <= 10),
  },
];

export { DefaultTeam, TeamFields, UpdateTeamFields };
