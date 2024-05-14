// Screens
import {
  LoginScreen,
  SchedulesScreen,
  SignupScreen,
  StudentsScreen,
  TeachersScreen,
  TeamsScreen,
} from "@screens";
// Layouts
import { CreateFormLayout } from "@layouts";
// User Enums
import {
  createStudentRequest,
  createTeacherRequest,
  createTeamRequest,
  getStudentRequest,
  getTeacherRequest,
  getTeamRequest,
  updateStudentRequest,
  updateTeacherRequest,
  updateTeamRequest,
} from "@api";
import {
  CreateTeamFields,
  DefaultStudent,
  DefaultTeacher,
  DefaultTeam,
  DefaultUpdateStudent,
  DefaultUpdateTeacher,
  DefaultUpdateTeam,
  StudentFields,
  StudentUpdateFields,
  TeacherFields,
  TeacherUpdateFields,
  UpdateTeamFields,
} from "@enumerables";
import { TeamForm } from "@components";

const authenticationRoutes = [
  { path: "/", element: <LoginScreen /> },
  {
    path: "/register",
    element: <SignupScreen />,
  },
];

const errorRoutes = [
  { path: "/forbidden", element: <div>Forbidden</div> },
  { path: "*", element: <div>Not Found</div> },
];

const appRoutes = [
  {
    apiSlug: "/team/get",
    path: "/home/teams",
    label: "EQUIPOS",
    inNav: true,
    element: <TeamsScreen />,
  },
  {
    apiSlug: "/team/post",
    path: "/home/team/add",
    inNav: false,
    element: (
      <TeamForm 
        layoutTitle="Crear equipo"
        createButtonText="Agregar equipo"
        request={createTeamRequest}
        fields={CreateTeamFields}
        initialData={DefaultTeam}
        routeToGo="/home/teams"
      />
    ),
  },
  {
    apiSlug: "/team/put",
    path: "/home/team/edit/:code",
    inNav: false,
    element: <TeamForm 
    layoutTitle="Editar equipo"
    createButtonText="Editar equipo"
    request={updateTeamRequest}
    fields={UpdateTeamFields}
    initialData={DefaultUpdateTeam}
    getRequest={getTeamRequest}
    routeToGo="/home/teams"
  />,
  },
  {
    apiSlug: "/team/delete",
    path: "/home/team/delete/:id",
    inNav: false,
    element: <div>Delete Team</div>,
  },
  {
    apiSlug: "/team/get",
    path: "/home/team/view/:id",
    inNav: false,
    element: <div>View Team</div>,
  },
  {
    apiSlug: "/students/get",
    path: "/home/students",
    label: "ESTUDIANTES",
    inNav: true,
    element: <StudentsScreen />,
  },
  {
    apiSlug: "/student/post",
    path: "/home/student/add",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Crear Estudiante"
        createButtonText="Agregar Estudiante"
        request={createStudentRequest}
        fields={StudentFields}
        initialData={DefaultStudent}
        routeToGo="/home/students"
      />
    ),
  },
  {
    apiSlug: "/student/put",
    path: "/home/student/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar Estudiante"
        createButtonText="Actualizar Estudiante"
        request={updateStudentRequest}
        fields={StudentUpdateFields}
        initialData={DefaultUpdateStudent}
        getRequest={getStudentRequest}
        routeToGo="/home/students"
      />
    ),
  },
  {
    apiSlug: "/student/get",
    path: "/home/student/view/:id",
    inNav: false,
    element: <div>View Student</div>,
  },
  {
    apiSlug: "/teachers/get",
    path: "/home/teachers",
    label: "PROFESORES",
    inNav: true,
    element: <TeachersScreen />,
  },
  {
    apiSlug: "/teacher/post",
    path: "/home/teacher/add",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Crear Profesor"
        createButtonText="Agregar Profesor"
        request={createTeacherRequest}
        fields={TeacherFields}
        initialData={DefaultTeacher}
        routeToGo="/home/teachers"
      />
    ),
  },
  {
    apiSlug: "/teacher/put",
    path: "/home/teacher/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar Profesor"
        createButtonText="Actualizar Profesor"
        request={updateTeacherRequest}
        fields={TeacherUpdateFields}
        initialData={DefaultUpdateTeacher}
        getRequest={getTeacherRequest}
        routeToGo="/home/teachers"
      />
    ),
  },
  {
    apiSlug: "/teacher/get",
    path: "/home/teacher/view/:id",
    inNav: false,
    element: <div>View Teacher</div>,
  },
  {
    apiSlug: "/schedules/get",
    path: "/home/schedules",
    label: "HORARIOS",
    inNav: true,
    element: <SchedulesScreen />,
  },
  {
    apiSlug: "/schedule/post",
    path: "/home/schedule/add",
    inNav: false,
    element: <div>Add Schedule</div>,
  },
  {
    apiSlug: "/schedule/put",
    path: "/home/schedule/edit",
    inNav: false,
    element: <div>Edit Schedule</div>,
  },
  {
    apiSlug: "/schedule/delete",
    path: "/home/schedule/delete",
    inNav: false,
    element: <div>Delete Schedule</div>,
  },
  {
    apiSlug: "/schedule/get",
    path: "/home/schedule/view/:id",
    inNav: false,
    element: <div>View Schedule</div>,
  },
  {
    apiSlug: "/schedule/activities/get",
    path: "/home/schedule/activities",
    inNav: false,
    element: <div>Activities</div>,
  },
  {
    apiSlug: "/schedule/activity/post",
    path: "/home/schedule/activity/add",
    inNav: false,
    element: <div>Add Activity</div>,
  },
  {
    apiSlug: "/schedule/activity/put",
    path: "/home/schedule/activity/edit",
    inNav: false,
    element: <div>Edit Activity</div>,
  },
  {
    apiSlug: "/schedule/activity/delete",
    path: "/home/schedule/activity/delete",
    inNav: false,
    element: <div>Delete Activity</div>,
  },
  {
    apiSlug: "/schedule/activity/get",
    path: "/home/schedule/activity/view/:id",
    inNav: false,
    element: <div>View Activity</div>,
  },
  {
    apiSlug: "*",
    path: "/home",
    inNav: false,
    element: <div>Home</div>,
  },
];


export const Routes = {
  authenticationRoutes,
  errorRoutes,
  appRoutes,
};
