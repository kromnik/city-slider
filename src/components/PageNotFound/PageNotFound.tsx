import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import { useTheme } from "../ThemeSwitcher/useTheme";
import './PageNotFound.scss';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleClick = () => {
    navigate(-1);
  }
  
  return (
    <section className='page-not-found'>
      <h1 className='page-not-found__title'>404</h1>
      <span className='page-not-found__message'>{t('Страница не найдена')}</span>
      <button
        type="button"
        className={`page-not-found__button ${theme === Theme.LIGHT && 'page-not-found__button-light-color'}`}
        onClick={handleClick}
      >
        {t('Назад')}
      </button>
    </section>
  )
}

export default PageNotFound;
