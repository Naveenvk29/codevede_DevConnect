import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
    </div>
  );
};

export default Loader;
