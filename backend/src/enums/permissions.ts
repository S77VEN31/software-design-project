const AdminPermissions = [
  // Profile
  {
    slug: "/self/admin/put",
    description: "Update admin profile",
    type: "PUT",
    selector: "PROFILE",
  },
  // Reports
  {
    slug: "/reports/get",
    description: "Get reports",
    type: "GET",
    selector: "REPORTS",
  },
  // Team
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAMS",
  },
  {
    slug: "/team/post",
    description: "Post team",
    type: "POST",
    selector: "TEAM",
  },
  {
    slug: "/team/put",
    description: "Put team",
    type: "PUT",
    selector: "TEAM",
  },
  {
    slug: "/team/delete",
    description: "Delete team",
    type: "DELETE",
    selector: "TEAM",
  },
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAM",
  },
  // Students
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENTS",
  },
  {
    slug: "/student/post",
    description: "Post students",
    type: "POST",
    selector: "STUDENT",
  },
  {
    slug: "/student/put",
    description: "Put students",
    type: "PUT",
    selector: "STUDENT",
  },
  {
    slug: "/student/delete",
    description: "Delete students",
    type: "DELETE",
    selector: "STUDENT",
  },
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENT",
  },
  //Teachers
  {
    slug: "/teachers/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHERS",
  },
  {
    slug: "/teacher/post",
    description: "Post teachers",
    type: "POST",
    selector: "TEACHER",
  },
  {
    slug: "/teacher/put",
    description: "Put teachers",
    type: "PUT",
    selector: "TEACHER",
  },
  {
    slug: "/teacher/delete",
    description: "Delete teachers",
    type: "DELETE",
    selector: "TEACHER",
  },
  {
    slug: "/teacher/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHER",
  },
  //Schedule
  {
    slug: "/schedules/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULES",
  },
  {
    slug: "/schedule/post",
    description: "Post schedule",
    type: "POST",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/put",
    description: "Put schedule",
    type: "PUT",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/delete",
    description: "Delete schedule",
    type: "DELETE",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULE",
  },
  //Schedule Activity
  {
    slug: "/schedule/activities/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITIES",
  },
  {
    slug: "/schedule/activity/post",
    description: "Post schedule activities",
    type: "POST",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/put",
    description: "Put schedule activities",
    type: "PUT",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/delete",
    description: "Delete schedule activities",
    type: "DELETE",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITY",
  },
];

const AdministrativeAssistantPermissions = [
  // Profile
  {
    slug: "/self/adminassistant/put",
    description: "Update admin assistant profile",
    type: "PUT",
    selector: "PROFILE",
  },
  // Reports
  {
    slug: "/reports/get",
    description: "Get reports",
    type: "GET",
    selector: "REPORTS",
  },
  // Team
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAMS",
  },
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAM",
  },
  // Students
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENTS",
  },
  {
    slug: "/student/post",
    description: "Post students",
    type: "POST",
    selector: "STUDENT",
  },
  {
    slug: "/student/put",
    description: "Put students",
    type: "PUT",
    selector: "STUDENT",
  },
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENT",
  },
  //Teachers
  {
    slug: "/teachers/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHERS",
  },
  {
    slug: "/teacher/post",
    description: "Post teachers",
    type: "POST",
    selector: "TEACHER",
  },
  {
    slug: "/teacher/put",
    description: "Put teachers",
    type: "PUT",
    selector: "TEACHER",
  },
  {
    slug: "/teacher/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHER",
  },
  //Schedule
  {
    slug: "/schedules/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULES",
  },
  {
    slug: "/schedule/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULE",
  },
  //Schedule Activity
  {
    slug: "/schedule/activities/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITIES",
  },
  {
    slug: "/schedule/activity/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITY",
  },
];

const TeacherPermissions = [
  // Profile
  {
    slug: "/self/teacher/put",
    description: "Update teacher profile",
    type: "PUT",
    selector: "PROFILE",
  },
  // Reports
  {
    slug: "/reports/get",
    description: "Get reports",
    type: "GET",
    selector: "REPORTS",
  },
  // Team
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAMS",
  },
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAM",
  },
  // Students
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENTS",
  },
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENT",
  },
  //Teachers
  //Schedule
  {
    slug: "/schedules/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULES",
  },
  {
    slug: "/schedule/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULE",
  },
  //Schedule Activity
  {
    slug: "/schedule/activities/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITIES",
  },
  {
    slug: "/schedule/activity/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITY",
  },
];

const StudentPermissions = [
  // Profile
  {
    slug: "/self/student/put",
    description: "Update student profile",
    type: "PUT",
    selector: "PROFILE",
  },
  // Team
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAMS",
  },
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAM",
  },
  //Schedule
  {
    slug: "/schedules/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULES",
  },
  {
    slug: "/schedule/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULE",
  },
  //Schedule Activity
  {
    slug: "/schedule/activities/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITIES",
  },
  {
    slug: "/schedule/activity/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITY",
  },
];

const CoordinatorPermissions = [
  // Profile
  {
    slug: "/self/teacher/put",
    description: "Update teacher profile",
    type: "PUT",
    selector: "PROFILE",
  },
  {
    slug: "/reports/get",
    description: "Get reports",
    type: "GET",
    selector: "REPORTS",
  },
  // Team
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAMS",
  },
  {
    slug: "/team/get",
    description: "Get team",
    type: "GET",
    selector: "TEAM",
  },
  {
    slug: "/team/put",
    description: "Put team",
    type: "PUT",
    selector: "TEAM",
  },
  // Students
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENTS",
  },
  {
    slug: "/students/get",
    description: "Get students",
    type: "GET",
    selector: "STUDENT",
  },
  {
    slug: "/student/put",
    description: "Put students",
    type: "PUT",
    selector: "STUDENT",
  },
  //Teachers
  {
    slug: "/teachers/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHERS",
  },
  {
    slug: "/teacher/get",
    description: "Get teachers",
    type: "GET",
    selector: "TEACHER",
  },
  //Schedule
  {
    slug: "/schedules/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULES",
  },
  {
    slug: "/schedule/post",
    description: "Post schedule",
    type: "POST",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/put",
    description: "Put schedule",
    type: "PUT",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/delete",
    description: "Delete schedule",
    type: "DELETE",
    selector: "SCHEDULE",
  },
  {
    slug: "/schedule/get",
    description: "Get schedule",
    type: "GET",
    selector: "SCHEDULE",
  },
  //Schedule Activity
  {
    slug: "/schedule/activities/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITIES",
  },
  {
    slug: "/schedule/activity/post",
    description: "Post schedule activities",
    type: "POST",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/put",
    description: "Put schedule activities",
    type: "PUT",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/delete",
    description: "Delete schedule activities",
    type: "DELETE",
    selector: "ACTIVITY",
  },
  {
    slug: "/schedule/activity/get",
    description: "Get schedule activities",
    type: "GET",
    selector: "ACTIVITY",
  },
];

export {
  AdminPermissions,
  AdministrativeAssistantPermissions,
  CoordinatorPermissions,
  StudentPermissions,
  TeacherPermissions,
};

