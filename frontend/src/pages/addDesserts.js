import '../styles/desserts.css';
import {useState} from "react";

const API_URL = 'http://192.168.1.191:8080';
const FRONTEND_URL = 'http://192.168.1.191:3000';

function AddDesserts() {
    const [name, setName] = useState('')
    const [underAge, setUnderAge] = useState(false)
    const [category, setCategory] = useState('')
    const [img, setImg] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        }
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setCategory(value);
        }
    }

    const handleCheckbox = (e) => {
        setUnderAge(e.target.checked);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    const sendReq = async () => {
        try {
            if (name && category) {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("image", img);
                formData.append("isUnder30", underAge);
                formData.append("category", category);

                const response = await fetch(`${API_URL}/desserts/upload`, {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
                    goToView();
                } else {
                    console.error('Error:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Network Error:', error);
            throw error;
        }
    };

    function goToView() {
        window.location.assign(`${FRONTEND_URL}/viewDesserts`)
    }

    return (
        <html>
            <body>
                <div className="home-header">
                    <h1 className="home-title">ChristmasVoting</h1>
                </div>
                <div className="add-dessert-section">
                    {img === null ? '' : <h2>File selected!</h2>}
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*" // Allows only image files
                        onChange={handleFileChange} // Handles image changes
                        required
                    />
                    <label htmlFor="fileInput" className="add-insert-image">+</label>
                    <div className="horizontal-input-section">
                        <input
                            placeholder="Dessert Name"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            className={"add-dessert-text"}
                        />
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={underAge}
                                onChange={handleCheckbox}
                            />
                            <span></span>
                            Under 30 years old?
                        </label>
                    </div>
                    <select name="category" onChange={handleCategoryChange}>
                        <option value="" disabled selected>Select category</option>
                        <option value="cookies">Cookies</option>
                        <option value="cakes">Cakes/Cupcakes/Brownies</option>
                    </select>
                </div>
                <div className="add-dessert-footer">
                    <button className="left" onClick={() => goToView()}>
                        Cancel
                    </button>
                    <button className="right" onClick={() => sendReq()}>
                        Submit
                    </button>
                </div>
            </body>
        </html>
    );
}

export default AddDesserts;