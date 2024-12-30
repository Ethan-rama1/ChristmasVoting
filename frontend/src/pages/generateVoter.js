import '../styles/generateVoter.css';
import {useState} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = 'http://192.168.1.191:3000';

function GenerateVoter() {
    const [code, setCode] = useState('')

    const sendReq = async () => {
        const newCode = generateUniqueCode();
        setCode(newCode);

        const formData = new FormData();
        formData.append("code", newCode);
        try {
            const response = await fetch(`${API_URL}/voter/generate`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Network Error:', error);
            throw error;
        }
    }

    function goToCreate() {
        window.location.assign(`${FRONTEND_URL}/createVoter`)
    }

    function generateUniqueCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newCode = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newCode += characters[randomIndex];
        }
        console.log(newCode)
        return newCode;
    }


    return (
        <html>
            <body>
                <div className="home-header">
                    <h1 className="home-title">ChristmasVoting</h1>
                </div>
                <div className="generate-section">
                    <h1>Your code:</h1>
                    <h2>{code === '' ? "No code generated" : code}</h2>
                </div>
                <div className="generate-footer">
                    <button className="left" onClick={() => sendReq()}>
                        Generate Code
                    </button>
                    <button className="right" onClick={() => goToCreate()}>
                        Vote
                    </button>
                </div>
            </body>
        </html>
    );
}

export default GenerateVoter;
