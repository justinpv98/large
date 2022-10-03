import { Navigate, Outlet } from "react-router-dom";
import withAuth from "../components/hoc/WithAuth";

function PrivateRoute({ isAuth, redirectPath = "/", children }) {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default withAuth(PrivateRoute);
