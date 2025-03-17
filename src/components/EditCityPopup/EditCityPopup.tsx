import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { City, editCity, selectCity } from "../../features/cities/citiesSlice";
import Modal from "../Modal/Modal";
import { ModalTitle, ModalButtonText } from "../Modal/modalTypes";
import { CityText } from "../../assets/types/cityTextTypes";

interface EditCityPopupProps {
  showModal: boolean;
  handleClose: () => void;
}

const EditCityPopup: React.FC<EditCityPopupProps> = (props) => {
  const { showModal, handleClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { cities, selectedCityState } = useSelector((state: RootState) => state.cities);
  const [name, setName] = useState("");
  const cityImageRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(selectedCityState?.name || '')
    setDescription(selectedCityState?.description || '')
    if (cityImageRef.current) {
      cityImageRef.current.value = selectedCityState?.src || '';
    }
  }, [showModal, selectedCityState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cities.some(city => city.id !== selectedCityState?.id && city.name.toLowerCase() === name.toLowerCase())) {
      alert(t(CityText.CITY_EXISTS));
      return;
    }
    if (cityImageRef.current) {
      const updateCity: City = {
        id: selectedCityState?.id ?? 0,
        name,
        src: cityImageRef.current.value,
        description,
      };
      dispatch(editCity(updateCity));
      dispatch(selectCity(updateCity));
      setName("");
      setDescription("");
      cityImageRef.current.value = '';
      handleClose();
    }
  };

  return (
    <Modal
      title={t(ModalTitle.EDIT_CITY)}
      buttonText={t(ModalButtonText.SAVE)}
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
          value={t(name)}
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

export default EditCityPopup;
