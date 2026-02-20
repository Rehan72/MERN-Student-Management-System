import Dashboard from "../pages/Dashboard";



export const routeParams = "management";




export default [
  {
    element: Dashboard,
    path: `dashboard`,
    //permission: RoutePermission?.PLATFORM_ADMIN,
    exact: true
  },
 
]