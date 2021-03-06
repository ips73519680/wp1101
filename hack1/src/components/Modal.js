/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import './css/Modal.css'

export default function Modal({ restartGame, backToHome, win }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    return (

        <div className="modal">
            <div children="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult"></div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn">{win ? "New Game" : "Try Again"}</div>
                    <div className="modalBtn"></div>
                </div>
            </div>
        </div>
    );
}

{/* -- TODO 5-1 -- */ }
        /* Useful Hint: style = {{opacity: 1 or 0 }} */