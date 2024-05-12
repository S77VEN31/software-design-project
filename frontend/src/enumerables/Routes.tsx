// Screens
import {
  LoginScreen,
  SchedulesScreen,
  SignupScreen,
  StudentsScreen,
  TeachersScreen,
} from "@screens";
// Layouts
import { CreateFormLayout } from "@layouts";
// User Enums
import {
  createStudentRequest,
  createTeacherRequest,
  getStudentRequest,
  getTeacherRequest,
  updateStudentRequest,
  updateTeacherRequest,
} from "@api";
import {
  DefaultStudent,
  DefaultTeacher,
  DefaultUpdateStudent,
  DefaultUpdateTeacher,
  StudentFields,
  StudentUpdateFields,
  TeacherFields,
  TeacherUpdateFields,
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
    apiSlug: "/teams/get",
    path: "/home/teams",
    label: "TEAMS",
    inNav: true,
    element: <div>Teams</div>,
  },
  {
    apiSlug: "/team/post",
    path: "/home/team/add",
    inNav: false,
    element: <div>Add Team</div>,
  },
  {
    apiSlug: "/team/put",
    path: "/home/team/edit",
    inNav: false,
    element: <div>Edit Team</div>,
  },
  {
    apiSlug: "/team/delete",
    path: "/home/team/delete",
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
    label: "STUDENTS",
    inNav: true,
    element: <StudentsScreen />,
  },
  {
    apiSlug: "/student/post",
    path: "/home/student/add",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Create Student"
        createButtonText="Add Student"
        request={createStudentRequest}
        fields={StudentFields}
        initialData={DefaultStudent}
      />
    ),
  },
  {
    apiSlug: "/student/put",
    path: "/home/student/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Edit Student"
        createButtonText="Update Student"
        request={updateStudentRequest}
        fields={StudentUpdateFields}
        initialData={DefaultUpdateStudent}
        getRequest={getStudentRequest}
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
    label: "TEACHERS",
    inNav: true,
    element: <TeachersScreen />,
  },
  {
    apiSlug: "/teacher/post",
    path: "/home/teacher/add",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Create Teacher"
        createButtonText="Add Teacher"
        request={createTeacherRequest}
        fields={TeacherFields}
        initialData={DefaultTeacher}
      />
    ),
  },
  {
    apiSlug: "/teacher/put",
    path: "/home/teacher/edit/:id",
    inNav: false,
    element: (
      <CreateFormLayout
        layoutTitle="Edit Teacher"
        createButtonText="Update Teacher"
        request={updateTeacherRequest}
        fields={TeacherUpdateFields}
        initialData={DefaultUpdateTeacher}
        getRequest={getTeacherRequest}
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
    label: "SCHEDULES",
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
