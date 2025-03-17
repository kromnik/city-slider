import React, { ReactNode, useCallback, useEffect } from "react";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import { useTheme } from "../ThemeSwitcher/useTheme";
import { useTranslation } from "react-i18next";
import { Portal } from "../Portal/Portal";
import { ModalButtonText } from "./modalTypes";
import  CloseIconNormal  from "../../assets/icons/btn-close_normal.svg";
import CloseIconDark  from "../../assets/icons/btn-close_dark.svg";
import "./Modal.scss";

interface ModalProps {
  title?: string;
  buttonText?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const Modal = (props: ModalProps) => {
  const { title, buttonText, children, isOpen, onClose, onSubmit } = props;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
  }

  return (
    <Portal>
      <div className={`modal ${theme} ${isOpen && "modal__visible"}`}>
        <div className="modal__overlay" onClick={handleClose}>
          <div className="modal__content" onClick={onContentClick}>
            <div className="modal__header">
              <h3 className="modal__title">{t(title || "")}</h3>
              <button
                type="button"
                className="modal__btn-close"
                onClick={handleClose}
              >
                {toggleCloseBtnIcon()}
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal__body">
                {children}
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  className="modal__btn-cancel"
                  onClick={handleClose}
                >
                  {t(ModalButtonText.CANCEL)}
                </button>
                <button
                  type="submit"
                  className="modal__btn-submit"
                >
                  {t(buttonText || "")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
