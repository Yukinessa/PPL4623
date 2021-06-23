import { DashboardLayout } from "../components/layouts"
import PrivateRoute from "./PrivateRoute"
import { Dashboard } from "../pages"

function DashboardRoute(props) {
  return (
    <DashboardLayout>
      <PrivateRoute path={`${props.basePath}dashboard`} component={Dashboard} />
    </DashboardLayout>
  )
}

export default DashboardRoute
