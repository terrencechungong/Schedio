import React from "react";


interface BackdropProps {
    children: React.ReactNode;
    handleClose: () => void;
}
  

export const Backdrop: React.FC<BackdropProps> = ({ handleClose, children }) => {

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
            onClick={() =>{
                
                console.log("closing")
                handleClose()}}>
            <div style={{ width: '200px', height: '200px', backgroundColor: 'white', zIndex: 22 }}
                onClick={(e) => {
                    e.stopPropagation()
                    console.log("STOP")
                }}
            >

            </div>
        </div>
    )
}