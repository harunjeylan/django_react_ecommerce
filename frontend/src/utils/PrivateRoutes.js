import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentRefresh,
} from "../features/auth/authSlice";

function PrivateRoutes({ children, ...rest }) {
  console.log("private route is working");
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
