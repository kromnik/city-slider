import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { useTheme } from "../components/ThemeSwitcher/useTheme";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className="content-page">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
