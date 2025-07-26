import React, { useState } from "react";
import { Link } from "react-router-dom";
  import { useEffect } from "react";


export default function AccountPage() {
  const [isRegistering, setIsRegistering] = useState(false);

useEffect(() => {
  document.title = "Camera Store";
}, []);


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center pt-20">
      <div className="w-full max-w-6xl flex gap-6">
        {/* LOGIN / REGISTER LEFT SECTION */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">
            {isRegistering ? "REGISTER" : "LOGIN"}
          </h2>

          {!isRegistering ? (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username or email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded transition"
              >
                Log In
              </button>

              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link to="/forget-password" className="text-orange-600 hover:underline">
                  Lost your password?
                </Link>
              </div>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <p className="text-gray-600 text-sm">
                A link to set a new password will be sent to your email address.
              </p>

              <p className="text-gray-600 text-sm">
                Anti-spam<br />
                Your personal data will be used to support your experience throughout this website,
                to manage access to your account, and for other purposes described in our privacy policy.
              </p>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded transition"
              >
                Register
              </button>
            </form>
          )}
        </div>

        {/* DIVIDER */}
        <div className="w-px bg-gray-300 mx-2"></div>

        {/* RIGHT SECTION */}
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">
            {isRegistering ? "REGISTER" : "LOGIN"}
          </h2>
          <p className="text-gray-700 mb-2">
            Registering for this site allows you to access your order status and history.
            Just fill in the fields below, and we’ll get a new account set up for you in no time.
          </p>
          <p className="text-gray-700 mb-6">
            We will only ask you for information necessary to make the purchase process faster and easier.
          </p>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="mx-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
