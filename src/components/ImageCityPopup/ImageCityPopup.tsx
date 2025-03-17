import React, { useCallback, useEffect } from "react";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import { useTheme } from "../ThemeSwitcher/useTheme";
import { useTranslation } from "react-i18next";
import { Portal } from "../Portal/Portal";
import CloseIconNormal from "../../assets/icons/btn-close_normal.svg";
import CloseIconDark from "../../assets/icons/btn-close_dark.svg";
import "./ImageCityPopup.scss";

interface ImageCityPopupProps {
  cityName?: string;
  cityLink?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const ImageCityPopup = (props: ImageCityPopupProps) => {
  const { cityName, cityLink, isOpen, onClose  } = props;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  }, [handleClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);


  const toggleCloseBtnIcon = () => {
    switch (theme) {
      case Theme.LIGHT:
        return <CloseIconNormal />;
      case Theme.DARK:
        return <CloseIconDark />;
      default:
        return null;
    }
  };

  return (
    <Portal>
      <div className={`modal-img ${theme} ${isOpen && "modal-img__visible"}`}>
        <div className="modal-img__overlay" onClick={handleClose}>
          <div className="modal-img__content" onClick={onContentClick}>
            <img 
              className="modal-img__image"
              src={cityLink}
              alt={`Slide ${t(cityName || "")}`}
            />
            <button
              type="button"
              className="modal-img__btn-close"
              onClick={handleClose}
            >
              {toggleCloseBtnIcon()}
            </button>
            <h3 className="modal-img__title">{t(cityName || '')}</h3>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ImageCityPopup;
