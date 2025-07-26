import React from "react";
import { useNavigate } from "react-router-dom";
  import { useEffect } from "react";


export default function ForgetPassword() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Camera Store";
  }, []);
  


  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-24 px-6">
      <div className="w-full max-w-md space-y-8">
        <p className="text-center text-md text-gray-600">
Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.

        </p>

        {/* الخط الفاصل */}
        <hr className="my-6 border-gray-300" />

        {/* الفورم */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Username or email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-3 text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
