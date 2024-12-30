import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVoter from "./pages/createVoter";
import Home from "./pages/home";
import ViewDesserts from "./pages/viewDesserts";
import EditDesserts from "./pages/editDesserts";
import VotingQuestions from "./pages/votingQuestions";
import AddDesserts from "./pages/addDesserts";
import GenerateVoter from "./pages/generateVoter";
import Confirmation from "./pages/confirmation";
import Password from "./pages/password";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createVoter" element={<CreateVoter />} />
                <Route path="/generateVoter" element={<GenerateVoter />} />
                <Route path="/votingQuestions" element={<VotingQuestions />} />
                <Route path="/viewDesserts" element={<ViewDesserts />} />
                <Route path="/editDesserts" element={<EditDesserts />} />
                <Route path="/addDesserts" element={<AddDesserts />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/password" element={<Password />} />
            </Routes>
        </Router>
    );
}

export default App;