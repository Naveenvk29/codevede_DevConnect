import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { setCredentials, logout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/LoaderMini";
import LoaderMini from "../../components/LoaderMini";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useFetchUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      toast.info("Please login to view profile");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Load profile data
  useEffect(() => {
    if (data?.user) {
      setUsername(data.user.username);
      setEmail(data.user.email);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ username, email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success("✅ Profile updated!");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser().unwrap();
      dispatch(logout());
      toast.success("👋 Account deleted");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4 text-center">My Profile</h2>

        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded mb-3"
        >
          {isUpdating ? <LoaderMini /> : "Update Profile"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default Profile;
