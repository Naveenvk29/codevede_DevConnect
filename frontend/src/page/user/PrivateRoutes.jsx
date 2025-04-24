import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    toast.warning("⚠️ Please login to continue");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default PrivateRoutes;
