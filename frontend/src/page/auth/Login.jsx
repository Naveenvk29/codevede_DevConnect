import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoaderMini from "../../components/LoaderMini";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/profile");
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            {isLoading ? <LoaderMini /> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <Link to="/forgot-password" className="text-indigo-600">
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
