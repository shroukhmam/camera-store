import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import users from "../data/json.js";

export default function AccountPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.title = "Camera Store";
  }, []);

  const isEmailValid = (email) => email.includes("@gmail.com");

  const handleLogin = (e) => {
    e.preventDefault();

    const startsWithCapital = /^[A-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);

    if (!isEmailValid(email)) {
      showMessage("❌ Invalid email format", false);
      return;
    }

    if (!startsWithCapital || !containsNumber) {
      showMessage(
        "❌ Password must start with a capital letter and include at least one number",
        false
      );
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      showMessage(`✅ Welcome, ${user.name}`, true);
    } else {
      showMessage("❌ Invalid email or password", false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      showMessage("❌ Please enter a valid email address", false);
      return;
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      showMessage("❌ Email already registered", false);
    } else {
      showMessage("✅ Confirmation link sent to your email", true);
      setIsRegistering(false);
      setEmail("");
    }
  };

  const showMessage = (msg, success) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => {
      setMessage("");
      setIsSuccess(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex items-start justify-center pt-20 relative">
      {message && (
        <div
          className={`absolute top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md border transition-all duration-500 text-sm sm:text-base ${
            isSuccess
              ? "bg-white text-green-600 border-green-400"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">
            {isRegistering ? "REGISTER" : "LOGIN"}
          </h2>

          <form
            onSubmit={isRegistering ? handleRegister : handleLogin}
            className="space-y-5"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isRegistering && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded transition"
                >
                  Log In
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm mt-3 gap-2">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <Link to="/forget-password" className="text-orange-600 hover:underline">
                    Lost your password?
                  </Link>
                </div>
              </>
            )}

            {isRegistering && (
              <>
                <p className="text-sm text-gray-600">
                  A link to set a new password will be sent to your email address.
                  Your personal data will be used to support your experience throughout this
                  website, to manage access to your account, and for other purposes described
                  in our privacy policy.
                </p>
                                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded transition"
                >
                  Register
                </button>

              </>
            )}
          </form>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300 mx-2"></div>

        {/* Right Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">
            {isRegistering ? "REGISTER" : "LOGIN"}
          </h2>
          <p className="text-gray-700 mb-2">
            {isRegistering
              ? "Register using your email address."
              : "Enter your credentials to log in."}
          </p>
          <p className="text-gray-700 mb-6">
            Registering for this site allows you to access your order status and history.
            Just fill in the fields below, and we'll get a new account set up for you in no time.
          </p>

          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage("");
              setPasswordError("");
              setEmail("");
              setPassword("");
            }}
            className="mx-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
