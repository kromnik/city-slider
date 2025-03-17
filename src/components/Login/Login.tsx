import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import { useTheme } from "../ThemeSwitcher/useTheme";
import "./Login.scss";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
    navigate("/dashboard");
  };

  if (!isAuth) {
    return (
      <div className="login-container">
        <h2 className="login-title">{t('Войти в панель')}</h2>
        <form className="login-form"  onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="login-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('Введите логин')}
              maxLength={30}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              className="login-input login-input-password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Введите пароль')}
              maxLength={15}
              required
              autoComplete="off"
            />
          </div>
          <button 
            className={`login-button ${theme === Theme.LIGHT && 'login-button-light-color'} `} 
            type="submit"
          >
            {t('Войти')}
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
