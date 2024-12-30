import '../styles/viewDesserts.css';
import '../styles/home.css';

import {useState, useEffect} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = 'http://192.168.1.191:3000';

function ViewDesserts() {
    const [desserts, setDesserts] = useState([]);
    const [ndx, setNdx] = useState(0);

    function goHome() {
        window.location.assign(`${FRONTEND_URL}/`)
    }

    function goToAdd() {
        window.location.assign(`${FRONTEND_URL}/addDesserts`)
    }

    // TODO: Pass dessert_id to /editDesserts page
    function goToEdit() {
        window.location.assign(`${FRONTEND_URL}/editDesserts?id=${desserts[ndx].id}`)
    }

    useEffect(() => {
        // Fetch desserts from the backend
        const fetchDesserts = async () => {
            try {
                const response = await fetch(`${API_URL}/desserts/get`);
                if (response.ok) {
                    const data = await response.json();
                    setDesserts(data);  // Set the retrieved desserts data
                } else {
                    console.error("Error fetching desserts:", response.statusText);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchDesserts();
    }, []);

    const nextDessert = () => {
        setNdx((ndx + 1) % desserts.length);
    };

    const prevDessert = () => {
        setNdx((ndx - 1 + desserts.length) % desserts.length);
    };

    return (
        <html>
            <body>
                <div className="header">
                    <h1 className="home-title">ChristmasVoting</h1>
                </div>
                <div className="view-section">
                    <button onClick={prevDessert} className="view-left">
                        {"<"}
                    </button>
                    <div className="carousel-container">
                        {desserts.length > 0 ? (
                            <div className="carousel">
                                <div className="carousel-item">
                                    <img
                                        src={`data:image/png;base64,${desserts[ndx].imageBase64}`}
                                        alt={desserts[ndx].name}
                                        className="image-style"
                                    />
                                    <h1 className="text-style">{desserts[ndx].name}</h1>
                                    <h3 className="counter-style">{ndx + 1}/{desserts.length}</h3>
                                </div>
                            </div>
                        ) : (
                            <h1 className="counter-style">Loading desserts...</h1>
                        )}
                    </div>
                    <button onClick={nextDessert} className="view-right">
                        {">"}
                    </button>
                </div>
                <div className="view-footer">
                    <button className="left" onClick={() => goHome()}>
                        Home
                    </button>
                    <button className="middle" onClick={() => goToAdd()}>
                        Add Dessert
                    </button>
                    <button className="right" onClick={() => goToEdit()}>
                        Edit Dessert
                    </button>
                </div>
            </body>
        </html>
    );
}

export default ViewDesserts;