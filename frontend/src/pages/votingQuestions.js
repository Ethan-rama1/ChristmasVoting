import '../styles/votingQuestions.css';
import {useEffect, useState} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = 'http://192.168.1.191:3000';

function VotingQuestions() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [desserts, setDesserts] = useState([]);
    const [vote1, setVote1] = useState('')
    const [vote2, setVote2] = useState('')
    const [vote3, setVote3] = useState('')
    const [vote4, setVote4] = useState('')
    const [vote5, setVote5] = useState('')
    const [cookies, setCookies] = useState([])
    const [cakes, setCakes] = useState([])
    const [under30, setUnder30] = useState([])
    const [selectedImages, setSelectedImages] = useState({
        cookies: null,
        cakes: null,
        under30: null,
        creative: null,
        overall: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the vote state based on the selected dessert
        if (name === "cookies") {
            setVote1(value);
            const selectedItem = cookies.find((item) => item.id === parseInt(value));
            setSelectedImages((prevState) => ({
                ...prevState,
                cookies: selectedItem ? selectedItem.image : null,
            }));
        } else if (name === "cakes") {
            setVote2(value);
            const selectedItem = cakes.find((item) => item.id === parseInt(value));
            setSelectedImages((prevState) => ({
                ...prevState,
                cakes: selectedItem ? selectedItem.image : null,
            }));
        } else if (name === "under30") {
            setVote3(value);
            const selectedItem = under30.find((item) => item.id === parseInt(value));
            setSelectedImages((prevState) => ({
                ...prevState,
                under30: selectedItem ? selectedItem.image : null,
            }));
        } else if (name === "creative") {
            setVote4(value);
            const selectedItem = desserts.find((item) => item.id === parseInt(value));
            setSelectedImages((prevState) => ({
                ...prevState,
                creative: selectedItem ? selectedItem.image : null,
            }));
        } else if (name === "overall") {
            setVote5(value);
            const selectedItem = desserts.find((item) => item.id === parseInt(value));
            setSelectedImages((prevState) => ({
                ...prevState,
                overall: selectedItem ? selectedItem.image : null,
            }));
        }
    };


    const sendReq = async () => {
        console.log(vote1 + ' ' + vote2 + ' ' + vote3 + ' ' + vote4 + ' ' + vote5)
        if (vote1 && vote2 && vote3 && vote4 && vote5) {
            try {
                const response = await fetch(`${API_URL}/votes/cast?code=${code}&vote1=${vote1}&vote2=${vote2}&vote3=${vote3}&vote4=${vote4}&vote5=${vote5}`, {
                    method: 'POST',
                });
                if (response.ok) {
                    setIsSubmitting(true)
                    setTimeout(() => {},1000)
                    window.location.assign(`${FRONTEND_URL}/confirmation`)
                }
            } catch (error) {
                console.error('Network Error:', error);
                throw error;
            }
        }
    }

    const goToCreate = async () => {
        try {
            const response = await fetch(`${API_URL}/voter/revert?code=${code}`, {
                method: 'PUT',
            });
            if (response.status === 200) {
                window.location.assign(`${FRONTEND_URL}/createVoter`)
            } else if (response.status === 201) {
                console.log("Bad code")
            }
        } catch (error) {
            console.error('Network Error:', error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const response = await fetch(`${API_URL}/desserts/get`);
                if (response.ok) {
                    const data = await response.json();
                    setDesserts(data);
                } else {
                    console.error("Error fetching desserts:", response.statusText);
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchDesserts();
    }, []);

    // Update filtered categories when desserts data changes
    useEffect(() => {
        if (!loading) {
            setCookies(desserts.filter(e => e.category === 'cookies'));
            setCakes(desserts.filter(e => e.category === 'cakes'));
            setUnder30(desserts.filter(e => e.under30 === true));
        }
    }, [desserts, loading]);

    // Helper function to render options dynamically
    const renderOptions = (items) => {
        return items.map((item) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ));
    };

    //TODO: Display selected dessert
    return (
        <html>
            <body className={`${isSubmitting ? "fade-out" : ""}`}>
                <div className="question-header">
                    <h1 className="question-main-title">ChristmasVoting</h1>
                </div>
                <section className="question-section">
                    <h1 className="question-title">Best Cookies:</h1>
                    {loading ? (
                        <p className="question-loading">Loading options...</p>
                    ) : (
                        <select id="cookies" name="cookies" onChange={handleChange} className="question-select">
                            <option value="" disabled selected>Select dessert</option>
                            {renderOptions(cookies)}
                        </select>
                    )}
                    {selectedImages.cookies && (
                        <div>
                            <img
                                src={`data:image/png;base64,${selectedImages.cookies}`}
                                alt="Selected Dessert"
                                className="dessert-image"
                            />
                        </div>
                    )}
                    <h1 className="question-title">Best Cakes/Cupcakes/Brownies:</h1>
                    {loading ? (
                        <p className="question-loading">Loading options...</p>
                    ) : (
                        <select id="cakes" name="cakes" onChange={handleChange} className="question-select">
                            <option value="" disabled selected>Select dessert</option>
                            {renderOptions(cakes)}
                        </select>
                    )}
                    {selectedImages.cakes && (
                        <div>
                            <img
                                src={`data:image/png;base64,${selectedImages.cakes}`}
                                alt="Selected Dessert"
                                className="dessert-image"
                            />
                        </div>
                    )}
                    <h1 className="question-title">Best Baker under the age of 30:</h1>
                    {loading ? (
                        <p className="question-loading">Loading options...</p>
                    ) : (
                        <select id="under30" name="under30" onChange={handleChange} className="question-select">
                            <option value="" disabled selected>Select dessert</option>
                            {renderOptions(under30)}
                        </select>
                    )}
                    {selectedImages.under30 && (
                        <div>
                            <img
                                src={`data:image/png;base64,${selectedImages.under30}`}
                                alt="Selected Dessert"
                                className="dessert-image"
                            />
                        </div>
                    )}
                    <h1 className="question-title">Most Creative:</h1>
                    <h3 className="question-subtitle">(Vote based off name, design, presentation, etc.)</h3>
                    {loading ? (
                        <p className="question-loading">Loading options...</p>
                    ) : (
                        <select id="desserts" name="creative" onChange={handleChange} className="question-select">
                            <option value="" disabled selected>Select dessert</option>
                            {renderOptions(desserts)}
                        </select>
                    )}
                    {selectedImages.creative && (
                        <div>
                            <img
                                src={`data:image/png;base64,${selectedImages.creative}`}
                                alt="Selected Dessert"
                                className="dessert-image"
                            />
                        </div>
                    )}
                    <h1 className="question-title">Best Overall:</h1>
                    {loading ? (
                        <p className="question-loading">Loading options...</p>
                    ) : (
                        <select id="desserts" name="overall" onChange={handleChange} className="question-select">
                            <option value="" disabled selected>Select dessert</option>
                            {renderOptions(desserts)}
                        </select>
                    )}
                    {selectedImages.overall && (
                        <div>
                            <img
                                src={`data:image/png;base64,${selectedImages.overall}`}
                                alt="Selected Dessert"
                                className="dessert-image"
                            />
                        </div>
                    )}
                </section>
                <footer className="question-footer">
                    <button className="left" onClick={() => goToCreate()}>
                        Cancel
                    </button>
                    <button className="right" onClick={() => sendReq()}>
                        Submit
                    </button>
                </footer>
            </body>
        </html>
    );
}

export default VotingQuestions;