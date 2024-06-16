// Screens
import {
  LoginScreen,
  SchedulesScreen,
  SignupScreen,
  StudentsScreen,
  TeachersScreen,
  TeamsScreen,
  ActivitiesScreen,
} from "@screens";
// Layouts
import { CreateFormLayout } from "@layouts";
// User Enums
import {
  createScheduleRequest,
  createStudentRequest,
  createTeacherRequest,
  createTeamRequest,
  getScheduleRequest,
  getStudentRequest,
  getTeacherRequest,
  getTeamRequest,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest,
  updateTeamRequest,
  updateActivityRequest,
  getActivityRequest,
  createActivityRequest,
  updateAdminAssistantRequest,
  updateAdminRequest
} from "@api";
import {
  DefaultSchedule,
  DefaultStudent,
  DefaultTeacher,
  DefaultTeam,
  DefaultUpdateStudent,
  DefaultUpdateTeacher,
  ScheduleFields,
  ScheduleUpdateFields,
  StudentFields,
  StudentUpdateFields,
  TeacherFields,
  TeacherUpdateFields,
  TeamFields,
  UpdateTeamFields,
  ActivityUpdateFields,
  DefaultActivity,
  ActivityFields,
  DefaultProfile,
  ProfileFields
} from "@enumerables";

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
    apiSlug: "/self/teacher/put",
    path: "/home/self/teacher/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar perfil"
        createButtonText="Editar perfil"
        request={updateTeacherRequest}
        getRequest={getTeacherRequest}
        fields={ProfileFields}
        initialData={DefaultProfile}
        routeToGo="/home/teams"
      />
    ),
  },
  {
    apiSlug: "/self/adminassistant/put",
    path: "/home/self/adminassistant/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar perfil"
        createButtonText="Editar perfil"
        request={updateAdminAssistantRequest}
        getRequest={getTeacherRequest}
        fields={ProfileFields}
        initialData={DefaultProfile}
        routeToGo="/home/teams"
      />
    ),
  },
  {
    apiSlug: "/self/admin/put",
    path: "/home/self/admin/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar perfil"
        createButtonText="Editar perfil"
        request={updateAdminRequest}
        getRequest={getTeacherRequest}
        fields={ProfileFields}
        initialData={DefaultProfile}
        routeToGo="/home/teams"
      />
    ),
  },
  {
    apiSlug: "/self/student/put",
    path: "/home/self/student/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar perfil"
        createButtonText="Editar perfil"
        request={updateStudentRequest}
        getRequest={getStudentRequest}
        fields={ProfileFields}
        initialData={DefaultProfile}
        routeToGo="/home/teams"
      />
    ),
  },
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
      <CreateFormLayout
        layoutTitle="Crear equipo"
        createButtonText="Agregar equipo"
        request={createTeamRequest}
        fields={TeamFields}
        initialData={DefaultTeam}
        routeToGo="/home/teams"
      />
    ),
  },
  {
    apiSlug: "/team/put",
    path: "/home/team/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar equipo"
        createButtonText="Editar equipo"
        request={updateTeamRequest}
        fields={UpdateTeamFields}
        initialData={DefaultTeam}
        getRequest={getTeamRequest}
        routeToGo="/home/teams"
      />
    ),
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
    element: (
      <CreateFormLayout
        layoutTitle="Crear Horario"
        createButtonText="Agregar Horario"
        request={createScheduleRequest}
        fields={ScheduleFields}
        initialData={DefaultSchedule}
        routeToGo="/home/schedules"
      />
    ),
  },
  {
    apiSlug: "/schedule/put",
    path: "/home/schedule/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar Horario"
        createButtonText="Actualizar Horario"
        request={updateScheduleRequest}
        getRequest={getScheduleRequest}
        fields={ScheduleUpdateFields}
        initialData={DefaultSchedule}
        routeToGo="/home/schedules"
      />
    ),
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
    inNav: true,
    label: "ACTIVIDADES",
    element: <ActivitiesScreen />,
  },
  {
    apiSlug: "/schedule/activity/post",
    path: "/home/schedule/activity/add",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Crear Actividad"
        createButtonText="Agregar Actividad"
        request={createActivityRequest}
        fields={ActivityFields}
        initialData={DefaultActivity}
        routeToGo="/home/schedule/activities"
      />
    ),
  },
  {
    apiSlug: "/schedule/activity/put",
    path: "/home/schedule/activity/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Editar Actividad"
        createButtonText="Actualizar Actividad"
        request={updateActivityRequest}
        fields={ActivityUpdateFields}
        initialData={DefaultActivity}
        getRequest={getActivityRequest}
        routeToGo="/home/schedule/activities"
      />
    ),
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
