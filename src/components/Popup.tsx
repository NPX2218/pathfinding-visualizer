///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React, {useState} from 'react';
import {popupData} from '../assets/data/popupData';

///////////////////////////////////////
// INTERFACE: POPUP
///////////////////////////////////////
interface PopupProps {
  popupShow: boolean;
  instructions: () => void;
}

///////////////////////////////////////
// COMPONENT: POPUP
///////////////////////////////////////

const Popup = ({popupShow, instructions}: PopupProps): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  return (
    <div className="text-center ">
      {popupShow && (
        <div className="popup-container">
          <div className="instructions-popup">
            <div className="header">
              <h2
                style={{color: 'black', fontWeight: 'bold'}}
                className="title">
                {popupData[page].title && popupData[page].title}
              </h2>

              <button onClick={() => instructions()} className="close-button">
                &times;
              </button>
            </div>
            {popupData[page].component && popupData[page].component}
            <div>
              <p style={{}}>{popupData[page].description}</p>
            </div>
            <div className="flex items-center justify-center">
              {popupData[page].image && (
                <img
                  src={popupData[page].image}
                  alt={popupData[page].image}
                  className="image"
                  width={popupData[page].image.width}
                  height={popupData[page].image.height}
                />
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {page != 0 && (
                <button className="px-4 py-2" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              )}

              {page + 1 != popupData.length && (
                <button className="px-4 py-2" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              )}

              {page + 1 === popupData.length && (
                <button className="px-4 py-2" onClick={() => instructions()}>
                  Exit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

///////////////////////////////////////
// EXPORTING POPUP
///////////////////////////////////////

export default Popup;
