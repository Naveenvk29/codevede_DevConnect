import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoaderMini from "../../components/LoaderMini";
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/users/verify-email?token=${token}`,
          { withCredentials: true }
        );
        toast.success(data.message || "✅ Email verified successfully!");
        toast.success("✅ Email verified successfully!");
        navigate("/login");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Verification failed");
      }
    };

    if (token) {
      verify();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <p className="text-xl font-medium">
        Verifying your email... <LoaderMini />
      </p>
    </div>
  );
};

export default VerifyEmail;
