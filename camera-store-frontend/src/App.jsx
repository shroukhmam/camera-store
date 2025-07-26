import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountPage from "./Pages/AccountPage.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
