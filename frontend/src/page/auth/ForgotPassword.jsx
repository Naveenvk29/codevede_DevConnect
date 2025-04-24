import { useState } from "react";
import { useForgetPasswordMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import LoaderMini from "../../components/LoaderMini";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendReset, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendReset({ email }).unwrap();
      toast.success("📧 Reset link sent! Check your email.");
    } catch (err) {
      toast.error(err?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          {isLoading ? <LoaderMini /> : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
