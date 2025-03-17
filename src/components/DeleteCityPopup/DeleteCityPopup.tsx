import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearSelectedCity, deleteCity } from "../../features/cities/citiesSlice";
import Modal from "../Modal/Modal";
import { ModalTitle, ModalButtonText } from "../Modal/modalTypes";

interface DeleteCityPopupProps {
  showModal: boolean;
  handleClose: () => void;
}

const DeleteCityPopup: React.FC<DeleteCityPopupProps> = (props) => {
  const { showModal, handleClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCityState } = useSelector((state: RootState) => state.cities);
  const [name, setName] = useState("");

  useEffect(() => {
    if(selectedCityState) {
      setName(selectedCityState.name)
    } 
  }, [selectedCityState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(selectedCityState) {
      dispatch(deleteCity(selectedCityState.id));
    }
    setName("");
    dispatch(clearSelectedCity());
    handleClose(); 
  };

  return (
    <Modal
      title={t(ModalTitle.DELETE_CITY)}
      buttonText={t(ModalButtonText.DELETE)}
      isOpen={showModal}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-group">
        <input
          type="text"
          className="modal__form-control"
          id="modalCityName"
          value={t(name)}
          readOnly
        />
      </div>
    </Modal>
  );
};

export default DeleteCityPopup;
