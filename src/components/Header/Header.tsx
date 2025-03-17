import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { clearSelectedCity } from "../../features/cities/citiesSlice";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "../ThemeSwitcher/useTheme";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import  AddCityPopup  from "../AddCityPopup/AddCityPopup";
import CityIconNormal from "../../assets/icons/city_normal.svg";
import CityIconDark from "../../assets/icons/city_dark.svg";
import "./Header.scss";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const username =useSelector((state: RootState) => state.auth.username);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const toggleCityIcon = () => {
    switch (theme) {
      case Theme.LIGHT:
        return <CityIconNormal />;
      case Theme.DARK:
        return <CityIconDark />;
      default:
        return null;
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearSelectedCity());
    localStorage.clear();
    navigate("/");
  };

  if (isAuth) {
    return (
      <header className="header">
        <div className="header__user-info">
          {t('Привет,')} 
          <span className="header__user-info-span">
            {`${username}`}!
          </span>
        </div>
        <div className="header__button-block">
          <div className="header__city-add-block">
            <button 
              className="header__city-add-button" 
              onClick={() => setShowModal(true)}
            >
              {toggleCityIcon()}
              {'+'}
            </button>
            <AddCityPopup 
              showModal={showModal} 
              handleClose={() => setShowModal(false)}
            />
          </div>
          <ThemeSwitcher />
          <LangSwitcher />
          <button className="header__logout-button" onClick={handleLogout}>
            {t('Выйти')}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__button-block">
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </header>
  );
};

export default Header;
