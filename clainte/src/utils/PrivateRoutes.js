import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentRefresh,
  selectCurrentUser,
} from "../features/auth/authSlice";

function PrivateRoutes({ children, ...rest }) {
  console.log("private route is working");
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return token && user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
