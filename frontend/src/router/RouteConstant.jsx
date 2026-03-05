import Dashboard from "../pages/Dashboard";
import StudentManagement from "../pages/StudentManagement";
import TeacherManagement from "../pages/TeacherManagement";
import ClassManagement from "../pages/ClassManagement";

export const routeParams = "management";

export default [
  {
    element: Dashboard,
    path: `dashboard`,
    exact: true
  },
  {
    element: StudentManagement,
    path: `students`,
    exact: true
  },
  {
    element: TeacherManagement,
    path: `teachers`,
    exact: true
  },
  {
    element: ClassManagement,
    path: `classes`,
    exact: true
  }
]