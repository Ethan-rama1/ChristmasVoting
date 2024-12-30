import '../styles/createVoter.css';
import {useState} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = 'http://192.168.1.191:3000';

function CreateVoter() {
    const [formData, setFormData] = useState({
        name: '',
        code: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function goToHome() {
        window.location.assign(`${FRONTEND_URL}`)
    }

    const sendReq = async () => {
        if (formData.name && formData.code) {
            try {
                console.log(formData)
                const response = await fetch(`${API_URL}/voter/update?name=${formData.name}&code=${formData.code}`, {
                    method: 'PUT',
                });
                if (response.status === 200) {
                    window.location.assign(`${FRONTEND_URL}/votingQuestions?code=${encodeURIComponent(formData.code)}`);
                } else if (response.status === 201) {
                    setError('Invalid code entered!')
                    console.log('Invalid code')
                } else if (response.status === 202) {
                    setError('Code is being used by another voter! Talk to Ethan for help.')
                    console.log('Code being used')
                }
            } catch (error) {
                console.error('Network Error:', error);
                throw error;
            }
        } else {
            setError('Please fill in all of the fields!')
        }
    }

    return (
        <html>
            <body>
                <div className="home-header">
                    <h1 className="home-title">ChristmasVoting</h1>
                </div>
                <div className="voter-section">
                    <form onChange={handleChange} className="voter-form">
                        <input type="text" id="name" name="name" placeholder="Name" className="voter-input"/>
                        <input type="text" id="code" name="code" placeholder="Code" className="voter-input"/>
                        <p className="error">{error !== '' ? error : ''}</p>
                    </form>

                </div>
                <div className="voter-footer">
                    <button className="left" onClick={() => goToHome()}>
                        Cancel
                    </button>
                    <button className="right" onClick={() => sendReq()}>
                        Let's Go!!
                    </button>
                </div>
            </body>
        </html>
    );
}

export default CreateVoter;
