import { useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderMini from "../../components/LoaderMini";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ token, newPassword }).unwrap();
      toast.success("🎉 Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err?.data?.message || "Reset failed"}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          required
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          {isLoading ? <LoaderMini /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
