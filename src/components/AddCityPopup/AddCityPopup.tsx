import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { City, selectCity, setCity } from "../../features/cities/citiesSlice";
import Modal from "../Modal/Modal";
import { ModalTitle, ModalButtonText } from "../Modal/modalTypes";
import { CityText } from "../../assets/types/cityTextTypes";

interface AddCityPopupProps {
  showModal: boolean;
  handleClose: () => void;
}

const AddCityPopup: React.FC<AddCityPopupProps> = (props) => {
  const { showModal, handleClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => state.cities.cities);
  const [name, setName] = useState("");
  const cityImageRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (cityImageRef.current && !showModal) {
      cityImageRef.current.value = "";
      setName("");
      setDescription("");
    }
  }, [showModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cities.some(city => city.name.toLowerCase() === name.toLowerCase())) {
      alert(t(CityText.CITY_EXISTS));
      return;
    }
    const newCity: City = {
      id: Date.now(),
      name,
      src: cityImageRef.current?.value || "",
      description,
    };
    dispatch(setCity(newCity));
    dispatch(selectCity(newCity));
    setName("");
    setDescription("");
    handleClose();
  };

  return (
    <Modal
      title={t(ModalTitle.ADD_CITY)}
      buttonText={t(ModalButtonText.ADD)}
      isOpen={showModal}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-group">
        <input
          type="text"
          className="modal__form-control"
          id="modalCityName"
          placeholder={t(CityText.CITY_NAME)}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          maxLength={25}
          required
        />
      </div>
      <div className="modal__form-group">
        <input
          type="url"
          className="modal__form-control"
          id="modalCitySrc"
          placeholder={t(CityText.CITY_URL)}
          ref={cityImageRef}
          autoComplete="off"
          required
        />
      </div>
      <div className="modal__form-group">
        <textarea
          className="modal__form-control"
          id="modalCityDescription"
          placeholder={t(CityText.CITY_DESCRIPTION)}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
    </Modal>
  );
};

export default AddCityPopup;
