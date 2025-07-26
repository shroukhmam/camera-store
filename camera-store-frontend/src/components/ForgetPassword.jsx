import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/json.js";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Camera Store";
  }, []);

  const handleReset = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === email);
    if (user) {
      setMessage("✅ A reset link has been sent to your email.");
      setIsSuccess(true);
    } else {
      setMessage("❌ No account found with this email.");
      setIsSuccess(false);
    }

    setTimeout(() => {
      setMessage("");
      setIsSuccess(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-24 px-6">
      {message && (
        <div
          className={`absolute top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md border text-sm sm:text-base ${
            isSuccess
              ? "bg-white text-green-600 border-green-400"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-md space-y-8">
        <p className="text-center text-md text-gray-600">
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </p>

        <hr className="my-6 border-gray-300" />

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-3 text-base"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
