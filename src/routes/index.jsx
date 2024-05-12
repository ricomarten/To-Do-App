//import react router dom
import { Routes, Route } from "react-router-dom";
//import view homepage
import Home from '../components/Home';
import FastApiHome from '../components/FastApiHome';
//import view post edit
import SignUp from '../components/SignUp';

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/" */}
            <Route path="/" element={<Home />} />
            <Route path="/fastapi" element={<FastApiHome />} />
            {/* route "/posts" */}
            <Route path="/signup" element={<SignUp />} />

        </Routes>
    )
}

export default RoutesIndex