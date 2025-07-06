///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';

///////////////////////////////////////
// INTERFACE: TEXT AREA PROPS
///////////////////////////////////////

interface TextAreaProps {
  text?: string;
  secondaryText?: string;
  children?: React.ReactNode;
}

///////////////////////////////////////
// COMPONENT: TEXT AREA
///////////////////////////////////////

const TextArea = ({
  text,
  secondaryText,
  children,
}: TextAreaProps): JSX.Element => {
  return (
    <div className="note-wrapper">
      <div
        style={{
          boxShadow: '0 0 12px rgba(0, 0, 0, 0.078)',
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
        className="p-5 note text-black
">
        {text && <h3 className="text-black font-semibold">{text}</h3>}

        {children && children}
        {secondaryText && (
          <h6 className="text-black" style={{fontWeight: 'normal'}}>
            {secondaryText}
          </h6>
        )}
      </div>
    </div>
  );
};

///////////////////////////////////////
// EXPORTING TEXT AREA
///////////////////////////////////////

export default TextArea;
