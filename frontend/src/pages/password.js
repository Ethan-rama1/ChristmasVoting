import {useState} from "react";

const MASTER_KEY = "c4K3sF0r4lL"
const FRONTEND_URL = "http://192.168.1.191:3000";

function Password() {
    const [pass, setPass] = useState('');
    const [correct, setCorrect] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "pword") {
            setPass(value);
        }
    };

    function checkKey() {
        if (pass === MASTER_KEY) {
            window.location.assign(`${FRONTEND_URL}/viewDesserts`)
        } else {
            setCorrect(false)
        }
    }

    function goToHome() {
        window.location.assign(`${FRONTEND_URL}`)
    }

    function goToGenerate() {
        if (pass === MASTER_KEY) {
            window.location.assign(`${FRONTEND_URL}/generateVoter`)
        } else {
            setCorrect(false)
        }
    }

    return (
        <html>
            <body>
                <div className="home-header">
                    <h1 className="home-title">ChristmasVoting</h1>
                </div>
                <div className="home-section">
                    <form onChange={handleChange} className="voter-form">
                        <h1 className="question-title">Enter password:</h1>
                        <input type="password" id="pword" name="pword" placeholder="Password" className="voter-input"/>
                        {correct ? "" : <h2>Incorrect password! Only Admin is allowed past here!</h2>}
                    </form>
                </div>
                <div className="home-footer">
                    <button className="left" onClick={goToHome}>
                        Home
                    </button>
                    <button className="middle" onClick={goToGenerate}>
                        Generate Codes
                    </button>
                    <button className="right" onClick={checkKey}>
                        Desserts
                    </button>
                </div>
            </body>
        </html>
    );
}

export default Password