import React from "react";

export default function InfoToolTip({ isOpen, onClose, isSuccess }) {

  return (
    <section className={`info-popup ${isOpen ? `info-popup_active` : ""}`}>
      <div className="info-popup__container">
        <div className={`info-popup__image ${isSuccess ? `info-popup__image_ok` : `info-popup__image_bad`}`}></div>
        <h3 className="info-popup__title">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
        <button type="button" className="info-popup__close-button" onClick={onClose}></button>
      </div>
    </section>
  )
}
