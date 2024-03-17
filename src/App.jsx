
import "./App.css";

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import AllApp from "./AllApp.jsx"
function App() {

  return (
    <Router>
    <div className="App">
      <Routes>

        <Route path="/" element={<AllApp />} />
        <Route path="/dash" element={<Dashboard />} />


      </Routes>
    </div>
  </Router>
  )
}

export default App
