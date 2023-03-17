import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

function AdminPrivateRoutes({ children, ...rest }) {
  console.log("admin route is working");
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  if (token && user && user?.is_superuser) {
    return <Outlet />;
  } else if (token && user) {
    dispatch(logOut());
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
}

export default AdminPrivateRoutes;
