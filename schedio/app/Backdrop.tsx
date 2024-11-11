import React from "react";


interface TextAreaComponentInterface {
    children: React.ReactNode;
    handleClose: () => void;
}
  

export const Backdrop: React.FC<TextAreaComponentInterface> = ({ handleClose, children }) => {

    return (
        <div
            style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgb(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 20
            }}
            onClick={() => handleClose()}>
            {children}
        </div>
    )
}