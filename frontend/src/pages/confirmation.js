import '../styles/confirmation.css';
import {useEffect, useState} from "react";

const FRONTEND_URL = 'http://192.168.1.191:3000';

function Confirmation() {
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFadeOut(true)
        }, 3000)
        setTimeout(() => {
            window.location.assign(`${FRONTEND_URL}/createVoter`)
        }, 4000)
    }, [])

    return (
        <html>
            <body>
                <div className={`confirmation-section ${fadeOut ? "confirm-fade-out" : ""}`}>
                    <h1 className="confirmation-title">Your vote has been casted!</h1>
                </div>
            </body>
        </html>
    );
}

export default Confirmation;