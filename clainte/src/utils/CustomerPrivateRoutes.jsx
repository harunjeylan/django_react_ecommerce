import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";

function CustomerPrivateRoutes({ children, ...rest }) {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  if (token && user) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
}

export default CustomerPrivateRoutes;
