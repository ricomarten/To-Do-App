//import Link from react router dom
import { Link } from "react-router-dom";

//import routes
import Routes from './routes';
import Navbar from "./components/Navbar";

export default function App() {

  return (
    <>

      <div>
        <Navbar></Navbar>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar-brand">FIREBASE</Link> || 
            <Link to="/fastapi" className="navbar-brand"> FAST API</Link> 
          </div>
        </nav>
      </div>

      <Routes />

    </>
  )
  
}