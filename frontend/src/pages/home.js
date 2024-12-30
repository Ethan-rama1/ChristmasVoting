import "../styles/home.css"
import {useEffect, useState} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = "http://192.168.1.191:3000";

function Home() {
    const [desserts, setDesserts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [ndx, setNdx] = useState(0);

    function goToGenerate() {
        window.location.assign(`${FRONTEND_URL}/createVoter`)
    }

    function goToView() {
        window.location.assign(`${FRONTEND_URL}/password`)
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

    const nextDessert = () => {
        setNdx((ndx + 1) % desserts.length);
    };

    const prevDessert = () => {
        setNdx((ndx - 1 + desserts.length) % desserts.length);
    };

    return (
        <html>
            <body className="no-scroll">
                <div className="home-header">
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
                <div className="home-footer">
                    <button className="home-left" onClick={() => goToGenerate()}>
                        Vote
                    </button>
                    {/*<button className="home-right" onClick={() => goToView()}>*/}
                    {/*    Manage Desserts*/}
                    {/*</button>*/}
                </div>
            </body>
        </html>
    );
}

export default Home;