import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../app/store";
import { selectCity, clearSelectedCity } from "../../features/cities/citiesSlice";
import Slider from "../Slider/Slider";
import EditCityPopup from "../EditCityPopup/EditCityPopup";
import DeleteCityPopup from "../DeleteCityPopup/DeleteCityPopup";
import { useTheme } from "../ThemeSwitcher/useTheme";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import EditBtnIcon from "../../assets/icons/btn-edit.svg";
import DeleteBtnIcon from "../../assets/icons/been-full.svg";
import { CityText } from "../../assets/types/cityTextTypes";
import "./Dashboard.scss";


const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { theme } = useTheme();
  const { cities, selectedCityState } = useSelector((state: RootState) => state.cities);
  const [selectedCity, setSelectedCity] = useState<string>(selectedCityState?.name || "");
  const [ showEditCityModal, setShowEditCityModal ] = useState(false);
  const [ showDeleteCityModal, setShowDeleteCityModal ] = useState(false);
  
  useEffect(() => {
    if (selectedCityState) {
      setSelectedCity(selectedCityState.name);
    }
    return () => {
      setSelectedCity('')
    }

  }, [selectedCityState]);

  const handleCitySelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    const city = cities.find((city) => city.name === e.target.value);
    if (city) {
      dispatch(selectCity(city));
    } else {
      dispatch(clearSelectedCity())
    }
  }, [cities, dispatch, setSelectedCity]);

  const toggleArrowSelect = () => {
    switch (theme) {
      case Theme.DARK:
        return 'dashboard__select-form-theme-dark ';
      default:
        return null;
    }
  };

  if (isAuth) {
    return (
      <div className="dashboard">
        <div className="dashboard__select-city">
          <select 
            className={`dashboard__select-form  ${toggleArrowSelect()}`}
            value={selectedCity}
            onChange={handleCitySelect}
            name="city"
            autoFocus
          >
            <option value="" disabled hidden>{t(CityText.SELECT_CITY)}</option>
            <option value=""></option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {t(`${city.name}`)}
              </option>
            ))}
          </select>
        </div>
        <Slider />
        {selectedCity ? 
          (
            <div className="dashboard__city-info">
              <div className="dashboard__city-info-btn-block">
                <h2 className="dashboard__city-info-title">{t(`${selectedCity}`)}</h2>
                <button 
                  className="dashboard__city-info-edit-button"
                  onClick={() => setShowEditCityModal(true)}
                >
                  {<EditBtnIcon />}
                </button>
                <EditCityPopup 
                  showModal={showEditCityModal} 
                  handleClose={() => setShowEditCityModal(false)}
                 />
                <button 
                  className="dashboard__city-info-delete-button"
                  onClick={() => setShowDeleteCityModal(true)}
                >
                  {<DeleteBtnIcon />}
                </button>
                <DeleteCityPopup 
                  showModal={showDeleteCityModal} 
                  handleClose={() => setShowDeleteCityModal(false)}
                 />
              </div>
              <p 
                className={`dashboard__city-info-description ${theme === Theme.LIGHT && 'dashboard__city-info-description-light-color'}`}
              >
                {cities.find(city => city.name === selectedCity)?.description}
              </p>
            </div>
          ) : (
            <div 
              className={`dashboard__city-not-selected ${theme === Theme.LIGHT && 'dashboard__city-not-selected-light-color'}`}
            >
              {cities.length > 0 ? t(CityText.NOT_SELECTED_CITY) : t(CityText.ADD_CITY)}
            </div>
          )}
      </div>
    );
  }

  return <div className="dashboard__login-to-account">{t('Пожалуйста, войдите в систему')}</div>;
};

export default Dashboard;
