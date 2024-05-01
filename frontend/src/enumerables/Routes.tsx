import { StudentsScreen } from "@screens";

const authenticationRoutes = [
  { path: "/", element: <div>Login</div> },
  {
    path: "/register",
    element: (
      <div>
        <h1>Register</h1>
      </div>
    ),
  },
];

const errorRoutes = [{ path: "/forbidden", element: <div>Forbidden</div> }];

const appRoutes = [
  {
    path: "/home/teams",
    label: "TEAMS",
    inNav: true,
    element: <div>Teams</div>,
  },
  { path: "/home/team/add", inNav: false, element: <div>Add Team</div> },
  { path: "/home/team/edit", inNav: false, element: <div>Edit Team</div> },
  { path: "/home/team/delete", inNav: false, element: <div>Delete Team</div> },
  { path: "/home/team/view/:id", inNav: false, element: <div>View Team</div> },

  {
    path: "/home/students",
    label: "STUDENTS",
    inNav: true,
    element: <StudentsScreen />,
  },
  { path: "/home/student/add", inNav: false, element: <div>Add Student</div> },
  {
    path: "/home/student/edit",
    inNav: false,
    element: <div>Edit Student</div>,
  },
  {
    path: "/home/student/delete",
    inNav: false,
    element: <div>Delete Student</div>,
  },
  {
    path: "/home/student/view/:id",
    inNav: false,
    element: <div>View Student</div>,
  },

  {
    path: "/home/teachers",
    label: "TEACHERS",
    inNav: true,
    element: <div>Teachers</div>,
  },
  {
    path: "/home/teacher/add",
    inNav: false,
    element: <div>Add Teacher</div>,
  },
  {
    path: "/home/teacher/edit",
    inNav: false,
    element: <div>Edit Teacher</div>,
  },
  {
    path: "/home/teacher/delete",
    inNav: false,
    element: <div>Delete Teacher</div>,
  },
  {
    path: "/home/teacher/view/:id",
    inNav: false,
    element: <div>View Teacher</div>,
  },
  {
    path: "/home/schedules",
    label: "SCHEDULES",
    inNav: true,
    element: <div>Assign Teacher</div>,
  },
  {
    path: "/home/schedule/add",
    inNav: false,
    element: <div>Add Schedule</div>,
  },
  {
    path: "/home/schedule/edit",
    inNav: false,
    element: <div>Edit Schedule</div>,
  },
  {
    path: "/home/schedule/delete",
    inNav: false,
    element: <div>Delete Schedule</div>,
  },
  {
    path: "/home/schedule/view/:id",
    inNav: false,
    element: <div>View Schedule</div>,
  },
  {
    path: "/home/schedule/activities",
    inNav: false,
    element: <div>Activities</div>,
  },
  {
    path: "/home/schedule/activity/add",
    inNav: false,
    element: <div>Add Activity</div>,
  },
  {
    path: "/home/schedule/activity/edit",
    inNav: false,
    element: <div>Edit Activity</div>,
  },
  {
    path: "/home/schedule/activity/delete",
    inNav: false,
    element: <div>Delete Activity</div>,
  },
  {
    path: "/home/schedule/activity/view/:id",
    inNav: false,
    element: <div>View Activity</div>,
  },

  { path: "/home", inNav: false, element: <div>Home</div> },
];

export const Routes = {
  authenticationRoutes,
  errorRoutes,
  appRoutes,
};
