import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './LangSwitcher.scss';

export const LangSwitcher = memo(() => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' || i18n.language === 'ru-RU'? 'en' : 'ru');
  };

  return (
    <button
      className='lang-button'
      onClick={toggle}
    >
      {t('Язык')}
    </button>
  );
});
