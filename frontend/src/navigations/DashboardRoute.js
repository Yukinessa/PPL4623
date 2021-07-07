import { DashboardLayout } from "../components/layouts"
import PrivateRoute from "./PrivateRoute"
import { Dashboard, Appointment, Publisher, Project } from "../pages"

function DashboardRoute(props) {
  return (
    <DashboardLayout>
      <PrivateRoute path={`${props.basePath}dashboard`} component={Dashboard} />
      <PrivateRoute path={`${props.basePath}appointment`} component={Appointment} />
      <PrivateRoute path={`${props.basePath}publisher`} component={Publisher} />
      <PrivateRoute path={`${props.basePath}project`} component={Project} />
    </DashboardLayout>
  )
}

export default DashboardRoute
