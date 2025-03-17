import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Slider, { CustomArrowProps } from "react-slick";
import { RootState } from "../../app/store";
import { useTheme } from "../ThemeSwitcher/useTheme";
import { Theme } from "../ThemeSwitcher/ThemeContext";
import ImageCityPopup from "../ImageCityPopup/ImageCityPopup";
import { City } from "../../features/cities/citiesSlice";
import ArrowNextThemeNormal from "../../assets/arrows/arrow_next_theme_normal.svg";
import ArrowPrevThemeNormal from "../../assets/arrows/arrow_prev_theme_normal.svg";
import ArrowNextThemeDark from "../../assets/arrows/arrow_next_theme_dark.svg";
import ArrowPrevThemeDark from "../../assets/arrows/arrow_prev_theme_dark.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.scss";

const SliderComponent: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const sliderRef = useRef<Slider>(null);
  const { cities, selectedCityState } = useSelector(
    (state: RootState) => state.cities
  );
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState<City>(cities[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (selectedCityState && sliderRef.current) {
      const selectedIndex = cities.findIndex(
        (city) => city.id === selectedCityState.id
      );
      if (selectedIndex !== -1) {
        sliderRef.current.slickGoTo(selectedIndex);
        setCity(cities[selectedIndex]);
        setCurrentSlide(selectedIndex);
      }
    }
  }, [selectedCityState, cities]);

  
  useEffect(() => {
    if (cities.length > 0 && currentSlide >= cities.length) {
      setCurrentSlide(cities.length - 3);
      setCity(cities[cities.length - 3]);
    } else if (cities.length > 0 && currentSlide < cities.length) {
      setCity(cities[currentSlide]);
    }
    if (cities.length === 1) {
      setCurrentSlide(0);
      setCity(cities[0]);
    }
  }, [cities, currentSlide]);
  
  const handleAfterChange = (currentSlide: number) => {
    setCity(cities[currentSlide]);
    setCurrentSlide(currentSlide);
  };

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props}: CustomArrowProps) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (slideCount !== undefined && currentSlide === 0 ? "slick-disabled" : "")
      }
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      {theme === Theme.DARK ? <ArrowPrevThemeDark /> : <ArrowPrevThemeNormal />}
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props}: CustomArrowProps) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (slideCount !== undefined && currentSlide === slideCount - 1
          ? "slick-disabled"
          : "")
      }
      aria-disabled={
        slideCount !== undefined && currentSlide === slideCount - 1
          ? true
          : false
      }
      type="button"
    >
      {theme === Theme.DARK ? <ArrowNextThemeDark /> : <ArrowNextThemeNormal />}
    </button>
  );

  const settings = {
    className: "center",
    centerMode: true,
    infinite: cities.length > 1,
    centerPadding: "60px",
    slidesToShow: cities.length >= 3 ? 3 : cities.length,
    speed: 500,
    variableWidth: true,
    dots: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    afterChange: handleAfterChange,
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
         {cities.map((city, index) => (
            <article
              key={city.id}
              className="slider-item"
              onClick={() => {
                if (index === currentSlide) {
                  setShowModal(true);
                }
              }}
            >
              <img
                className="slider-img"
                src={city.src}
                alt={`Slide ${city.id}`}
              />
              <h3 className="slider-title">{t(`${city.name}`)}</h3>
              <div className="slider-title-overlay"></div>
            </article>
        ))}
      </Slider>
      <ImageCityPopup
        isOpen={showModal}
        cityName={city?.name}
        cityLink={city?.src}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SliderComponent;
