//import Link from react router dom
import { Link } from "react-router-dom";

//import routes
import Routes from './routes';

export default function App() {

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar-brand">HOME</Link> 
          </div>
        </nav>
      </div>

      <Routes />

    </>
  )
  
}