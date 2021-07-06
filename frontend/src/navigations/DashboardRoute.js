import { DashboardLayout } from "../components/layouts"
import PrivateRoute from "./PrivateRoute"
import { Dashboard, Appointment, Publisher } from "../pages"

function DashboardRoute(props) {
  return (
    <DashboardLayout>
      <PrivateRoute path={`${props.basePath}dashboard`} component={Dashboard} />
      <PrivateRoute path={`${props.basePath}appointment`} component={Appointment} />
      <PrivateRoute path={`${props.basePath}publisher`} component={Publisher} />
    </DashboardLayout>
  )
}

export default DashboardRoute
