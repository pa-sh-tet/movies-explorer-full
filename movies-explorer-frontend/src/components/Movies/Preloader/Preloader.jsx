import React from 'react';

export default function Preloader({
  isFind,
  isLoading
}) {

  return (
    <div className="preloader" data-layer="4">
      {isLoading ? (
        <div className='preloader__spinner'>
          <div className="preloader__container">
            <div className="preloader__rotator">
              <div className="preloader__left">
                <div className="preloader__circle"></div>
              </div>
              <div className="preloader__right">
                <div className="preloader__circle"></div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          !isFind && (<h3 className="preloader__text">Ничего не найдено</h3>)
        )}
    </div>
  );
}