import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
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
                for="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
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
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                confirm Password
              </label>
              <input
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
          </div>
          <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">
            {isLoading ? "signuping..." : "sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default signup;
