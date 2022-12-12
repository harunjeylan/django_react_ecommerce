import { Outlet,Navigate } from "react-router-dom";

function PrivateRoutes({ children, ...rest }) {
  console.log("private route is warking");
  const auth = {token:false}
  return ( 
        auth.token ? <Outlet />:<Navigate to="/auth/login" /> 
    )
}

export default PrivateRoutes;
