import React from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "../components/ThemeSwitcher/useTheme";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import PageNotFound from "../components/PageNotFound/PageNotFound";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className="content-page">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />  
        </Routes>
      </div>
    </div>
  );
};

export default App;
