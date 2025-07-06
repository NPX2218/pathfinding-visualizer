///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';

///////////////////////////////////////
// INTERFACE: NOTE PROPS
///////////////////////////////////////

interface NoteProps {
  title?: string;
  text?: string;
  iconClass?: string;
  node?: string;
  children?: React.ReactNode;
}

///////////////////////////////////////
// COMPONENT: NOTE
///////////////////////////////////////

const Note = ({
  title,
  text,
  iconClass,
  node,
  children,
}: NoteProps): JSX.Element => {
  return (
    <div className="note-wrapper" style={{zIndex: 0}}>
      <div className="card" style={{width: '18rem', height: '14rem'}}>
        {children && children}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {node && (
            <div
              style={{
                width: '25px',
                height: '25px',
                outline: '1px solid rgb(175, 216, 248)',
                display: 'flex',
                margin: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                verticalAlign: 'text-bottom',
              }}
              className={iconClass && iconClass}></div>
          )}
        </div>

        <div className="card-body">
          {title && (
            <h5 style={{color: 'black'}} className="card-title">
              {title}
            </h5>
          )}
          {text && (
            <p style={{fontSize: '10px'}} className="card-text">
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

///////////////////////////////////////
// EXPORTING NOTE
///////////////////////////////////////

export default Note;
