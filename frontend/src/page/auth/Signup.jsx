import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoaderMini from "../../components/LoaderMini";
const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(
        "🎉 Registered successfully! Check your email for verification link."
      );
      navigate("/login");
    } catch (err) {
      toast.error(`⚠️ ${err?.data?.message || err.error}`);
    }
  };
  return (
    <div className=" bg-slate-50 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Register
            </h1>

            <div>
              <label
                for="username"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-1 text-gray-600 font-semibold"
              >
                confirm Password
              </label>
              <input
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">
            {isLoading ? <LoaderMini /> : "sign up"}
          </button>
          <p className="text-center mt-5 text-gray-600 font-semibold">
            Already have an account ? <Link to={"/login"}>login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default signup;
